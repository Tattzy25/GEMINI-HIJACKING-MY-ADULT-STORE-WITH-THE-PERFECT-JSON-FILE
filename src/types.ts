export interface Product3DSpec {
  geometryType: 'wand' | 'ring' | 'pod' | 'sculpture' | 'dildo';
  primaryColor: string;
  accentColor: string;
  roughness: number;
  metalness: number;
  motorNodes: { x: number; y: number; z: number; label: string; maxRpm: number }[];
  thermalZones: { name: string; targetTempC: number }[];
}

export interface RealProduct {
  id: string;
  variantId: string;
  title: string;
  handle: string;
  price: number;
  comparePrice?: number | null;
  isSale?: boolean;
  image: string;
  secondaryImage?: string;
  url: string;
  vendor: string;
  productType: string;
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  description?: string;
  name?: string;
  subtitle?: string;
  category?: string;
  priceUsd?: number;
  features?: string[];
  specs?: Record<string, string>;
  hapticModes?: string[];
  vrSyncSupported?: boolean;
  thermalSupported?: boolean;
  model3D?: Product3DSpec;
}

export type Product = RealProduct;

export type PackagingOption = 'discreet-standard' | 'vacuum-shield' | 'stealth-vault' | 'vacuum-stealth' | 'neutral-gift';

export interface StealthPackagingOption {
  id: PackagingOption;
  name: string;
  description: string;
  priceUsd: number;
  feeUsd?: number;
  descriptorOnBox?: string;
  features?: string[];
}

export type UsdPaymentMethod = 'shopify-pay' | 'apple-pay' | 'google-pay' | 'credit-card';

export interface CinemaFilm {
  id: string;
  title: string;
  studio: string;
  durationMin: number;
  resolution: '8K 60FPS' | '4K 60FPS' | '12K Spatial';
  povModes: ('Director' | 'Partner A' | 'Partner B' | '360 Ambient')[];
  category: string;
  synopsis: string;
  cast: string[];
  priceDigitalUsd: number;
  pupulikUrl: string;
  hapticTrackAvailable: boolean;
  hapticIntensityDefault: number;
  rating: number;
  viewsCount: string;
  previewColorGradient: string;
}

export interface CartItem {
  id: string;
  variantId?: string;
  title: string;
  handle?: string;
  price?: number;
  quantity: number;
  image?: string;
  url?: string;
  itemType?: string;
  subtitle?: string;
  priceUsd?: number;
  category?: string;
  isDigital?: boolean;
  pupulikUrl?: string;
}
