import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderTotals,
  generateStealthAddress,
  verifyZeroKnowledgeAgeProof,
  calculateHapticFrequencyWave,
  SUPPORTED_CRYPTO_RATES,
} from './crypto_cart.ts';
import type { CartItem } from '../types.ts';

test('calculateOrderTotals applies Monero 10% privacy discount and free shipping above $120', () => {
  const items: CartItem[] = [
    {
      id: 'wand-01',
      itemType: 'product',
      title: 'Aetheria Arc Dual-Motor Wand',
      subtitle: 'Liquid silicone',
      priceUsd: 140,
      quantity: 1,
      category: 'smart-wands',
      isDigital: false,
    },
  ];

  const result = calculateOrderTotals(items, 'XMR', 'discreet-standard');
  assert.equal(result.subtotalUsd, 140);
  assert.equal(result.hasPhysicalItems, true);
  // Free shipping because 140 >= 120
  assert.equal(result.shippingUsd, 0);
  assert.equal(result.packagingUsd, 0);
  // 10% discount on 140 = 14
  assert.equal(result.discountUsd, 14);
  // Total = 140 - 14 = 126
  assert.equal(result.totalUsd, 126);
  // XMR amount = 126 * 0.00625 = 0.7875 XMR
  assert.equal(result.cryptoAmount, 0.7875);
  assert.equal(result.cryptoUnit, 'XMR');
});

test('calculateOrderTotals charges shipping for physical orders under $120 and zero shipping for pure digital VR films', () => {
  // Digital only
  const digitalItems: CartItem[] = [
    {
      id: 'vr-film-01',
      itemType: 'film',
      title: 'Obsidian Velvet: 8K Spatial VR',
      subtitle: 'Spatial Cinema',
      priceUsd: 35,
      quantity: 1,
      category: 'Spatial VR',
      isDigital: true,
    },
  ];

  const digitalResult = calculateOrderTotals(digitalItems, 'BTC_LN', 'vacuum-shield');
  assert.equal(digitalResult.hasPhysicalItems, false);
  assert.equal(digitalResult.shippingUsd, 0);
  assert.equal(digitalResult.packagingUsd, 0); // No packaging fee for digital

  // Physical under $120
  const smallPhysical: CartItem[] = [
    {
      id: 'wand-mini',
      itemType: 'product',
      title: 'Mini Wand',
      subtitle: 'Pocket',
      priceUsd: 80,
      quantity: 1,
      category: 'smart-wands',
      isDigital: false,
    },
  ];
  const physResult = calculateOrderTotals(smallPhysical, 'USDT', 'vacuum-shield');
  assert.equal(physResult.hasPhysicalItems, true);
  assert.equal(physResult.shippingUsd, 9.5);
  assert.equal(physResult.packagingUsd, 7); // vacuum-shield fee
  assert.equal(physResult.discountUsd, 0); // 0% discount on USDT
  assert.equal(physResult.totalUsd, 80 + 9.5 + 7);
});

test('generateStealthAddress returns valid prefix for XMR and BTC Lightning', () => {
  const xmrAddr = generateStealthAddress('XMR', 'test-order-123');
  assert.match(xmrAddr, /^8/); // Monero sub-address standard prefix
  assert.ok(xmrAddr.length > 20);

  const lnInvoice = generateStealthAddress('BTC_LN', 'test-order-123');
  assert.match(lnInvoice, /^lnbc/); // Lightning prefix
});

test('verifyZeroKnowledgeAgeProof checks age >= 21 correctly and generates cryptographic commitment', () => {
  const validUser = verifyZeroKnowledgeAgeProof(2000, 2026); // age 26
  assert.equal(validUser.isValid, true);
  assert.equal(validUser.age, 26);
  assert.match(validUser.zkProofHash, /^zk-snark-0x/);

  const underageUser = verifyZeroKnowledgeAgeProof(2010, 2026); // age 16
  assert.equal(underageUser.isValid, false);
  assert.equal(underageUser.age, 16);
});

test('calculateHapticFrequencyWave produces smooth frequency and amplitude within bounds', () => {
  const wave1 = calculateHapticFrequencyWave('pulse', 500, 80);
  assert.ok(wave1.amplitude >= 0 && wave1.amplitude <= 1);
  assert.equal(wave1.frequencyHz, 85);

  const wave2 = calculateHapticFrequencyWave('sub-bass', 1200, 100);
  assert.ok(wave2.amplitude >= 0 && wave2.amplitude <= 1);
  assert.ok(wave2.frequencyHz >= 20 && wave2.frequencyHz <= 50);
});
