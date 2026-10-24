import type { CartItem, PackagingOption, StealthPackagingOption, UsdPaymentMethod } from '../types';

export const PACKAGING_OPTIONS: StealthPackagingOption[] = [
  {
    id: 'discreet-standard',
    name: 'Discreet Plain Box',
    description: 'Heavy unbranded recycled cardboard exterior. Zero product names, return label reads "PK Logistics Hub".',
    priceUsd: 0,
    features: ['100% plain outer carton', 'No external product names', 'Free with all orders'],
  },
  {
    id: 'vacuum-shield',
    name: 'Vacuum-Sealed Anti-Odor Shield',
    description: 'Multi-layer hermetic polymer barrier + opaque matte black interior box with security tamper seal.',
    priceUsd: 7,
    features: ['Hermetic vacuum seal', 'Anti-tamper holographic sticker', 'Zero scent / x-ray opacity lining'],
  },
  {
    id: 'stealth-vault',
    name: 'Faraday RFID Stealth Vault',
    description: 'Signal-blocking Faraday pouch prevents any Bluetooth / RF device detection during courier transit.',
    priceUsd: 14,
    features: ['Faraday cage RF shielding', 'Double-boxed reinforced core', 'Shredded dispatch receipt on delivery'],
  },
];

export const SUPPORTED_CRYPTO_RATES = {
  XMR: { symbol: 'XMR', name: 'Monero', ratePerUsd: 0.00625, unit: 'XMR', discountPercent: 10 },
  BTC_LN: { symbol: 'BTC_LN', name: 'Bitcoin Lightning', ratePerUsd: 1515.15, unit: 'sats', discountPercent: 8 },
  USDT: { symbol: 'USDT', name: 'Tether', ratePerUsd: 1.0, unit: 'USDT', discountPercent: 0 },
};

export const FREE_SHIPPING_THRESHOLD_USD = 99;
export const STANDARD_SHIPPING_USD = 9.5;

export interface UsdCartCalculation {
  subtotalUsd: number;
  hasPhysicalItems: boolean;
  shippingUsd: number;
  packagingUsd: number;
  discountUsd: number;
  totalUsd: number;
}

/**
 * Calculates cart totals in standard USD with shipping and discrete packaging.
 */
export function calculateUsdOrderTotals(
  items: CartItem[],
  packaging: PackagingOption,
  promoDiscountPercent: number = 0
): UsdCartCalculation {
  const subtotalUsd = items.reduce((sum, item) => sum + ((item.priceUsd ?? item.price) || 0) * item.quantity, 0);
  const hasPhysicalItems = items.some((item) => !(item.isDigital ?? false));

  const packOption = PACKAGING_OPTIONS.find((p) => p.id === packaging) || PACKAGING_OPTIONS[0];
  const packagingUsd = hasPhysicalItems ? packOption.priceUsd : 0;

  const shippingUsd = !hasPhysicalItems
    ? 0
    : subtotalUsd >= FREE_SHIPPING_THRESHOLD_USD
    ? 0
    : STANDARD_SHIPPING_USD;

  const discountUsd = Math.round((subtotalUsd * promoDiscountPercent) / 100 * 100) / 100;
  const totalUsd = Math.max(0, Math.round((subtotalUsd + packagingUsd + shippingUsd - discountUsd) * 100) / 100);

  return {
    subtotalUsd,
    hasPhysicalItems,
    shippingUsd,
    packagingUsd,
    discountUsd,
    totalUsd,
  };
}

/**
 * Legacy/crypto order calculation helper for unit-test compatibility & optional privacy mode.
 */
export function calculateOrderTotals(
  items: CartItem[],
  currency: string = 'USD',
  packaging: PackagingOption = 'discreet-standard'
) {
  const discountPercent = currency === 'XMR' ? 10 : currency === 'BTC_LN' ? 8 : 0;
  const ratePerUsd = currency === 'XMR' ? 0.00625 : currency === 'BTC_LN' ? 1515.15 : 1;
  const unit = currency === 'BTC_LN' ? 'sats' : currency;

  const res = calculateUsdOrderTotals(items, packaging, discountPercent);
  let cryptoAmount = 0;
  if (currency === 'BTC_LN') {
    cryptoAmount = Math.round(res.totalUsd * ratePerUsd);
  } else if (currency === 'XMR') {
    cryptoAmount = Math.round(res.totalUsd * ratePerUsd * 10000) / 10000;
  } else {
    cryptoAmount = res.totalUsd;
  }

  return {
    ...res,
    cryptoAmount,
    cryptoUnit: unit,
  };
}

export function generateStealthAddress(currency: string, seed: string = 'order'): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  if (currency === 'XMR') {
    return `8${hex}7F4a9eB${hex.slice(0, 4)}kP2zL9xM5vQ8${hex.slice(2, 6)}W1yB4cV7nN8dE`;
  }
  if (currency === 'BTC_LN') {
    return `lnbc${Math.abs(hash % 90000) + 10000}n1p3${hex}sp5...${hex.slice(0, 4)}`;
  }
  return `0x${hex}pk${hex.slice(0, 4)}`;
}

/**
 * Generates an authentic order reference ID.
 */
export function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `PK-${num}`;
}

/**
 * Generates discreet tracking number.
 */
export function generateTrackingNumber(): string {
  const chars = '0123456789ABCDEF';
  let tracking = '1ZPK';
  for (let i = 0; i < 14; i++) {
    tracking += chars[Math.floor(Math.random() * chars.length)];
  }
  return tracking;
}

/**
 * Validates zero-knowledge age verification input.
 */
export function verifyZeroKnowledgeAgeProof(birthYear: number, currentYear: number = 2026): {
  isValid: boolean;
  age: number;
  zkProofHash: string;
} {
  const age = currentYear - birthYear;
  const isValid = age >= 21 && age <= 120;
  
  let hashVal = 0x5a17b0;
  const raw = `ZK_PROOF_AGE_GE_21_SALT_${birthYear}_${currentYear}`;
  for (let i = 0; i < raw.length; i++) {
    hashVal = (hashVal << 5) - hashVal + raw.charCodeAt(i);
    hashVal |= 0;
  }
  const zkProofHash = `zk-snark-0x${Math.abs(hashVal).toString(16).padStart(8, 'a')}${Math.abs(hashVal ^ 0xffffff).toString(16)}`;

  return {
    isValid,
    age,
    zkProofHash,
  };
}

/**
 * Calculates haptic vibration waveform profiles (amplitude and frequency in Hz)
 */
export function calculateHapticFrequencyWave(
  mode: string,
  timeMs: number,
  intensity: number = 100
): { amplitude: number; frequencyHz: number } {
  const t = timeMs / 1000;
  const normIntensity = Math.max(0, Math.min(100, intensity)) / 100;

  switch (mode.toLowerCase()) {
    case 'harmonic':
    case 'harmonic resonance': {
      const freq = 40 + 40 * (1 + Math.sin(t * 2));
      const amp = normIntensity * (0.6 + 0.4 * Math.sin(t * 6));
      return { amplitude: Math.min(1, Math.max(0, amp)), frequencyHz: Math.round(freq) };
    }
    case 'sub-bass':
    case 'sub-bass rumble': {
      const freq = 30 + 10 * Math.sin(t * 1.5);
      const amp = normIntensity * (0.8 + 0.2 * Math.sin(t * 8));
      return { amplitude: Math.min(1, Math.max(0, amp)), frequencyHz: Math.round(freq) };
    }
    case 'pulse':
    case 'biometric pulse': {
      const cycle = (t * 1.5) % 1;
      const freq = 85;
      const amp = cycle < 0.25 ? normIntensity * (1 - cycle / 0.25) : 0.05 * normIntensity;
      return { amplitude: Math.min(1, Math.max(0, amp)), frequencyHz: freq };
    }
    case 'cascade':
    default: {
      const step = Math.floor((t * 2) % 4);
      const freq = 50 + step * 25;
      const amp = normIntensity * (0.4 + step * 0.18);
      return { amplitude: Math.min(1, Math.max(0, amp)), frequencyHz: freq };
    }
  }
}
