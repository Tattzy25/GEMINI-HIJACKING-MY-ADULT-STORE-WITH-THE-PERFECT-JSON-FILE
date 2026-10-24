import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Zap, ShoppingBag, Eye, Layers } from 'lucide-react';
import type { Product } from '../types';
import { ThreeDProductViewer } from './ThreeDProductViewer';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | '3d'>('photo');
  const [activeHapticTest, setActiveHapticTest] = useState<boolean>(false);
  const [selectedHapticMode, setSelectedHapticMode] = useState<string>('Harmonic Resonance');

  if (!product) return null;

  const model3DSpec = {
    geometryType: (product.productType.toLowerCase().includes('masturbat')
      ? 'pod'
      : product.productType.toLowerCase().includes('dildo') || product.title.toLowerCase().includes('dildo')
      ? 'dildo'
      : product.productType.toLowerCase().includes('anal')
      ? 'sculpture'
      : 'wand') as 'wand' | 'ring' | 'pod' | 'sculpture' | 'dildo',
    primaryColor: '#18181b',
    accentColor: '#e11d48',
    roughness: 0.35,
    metalness: 0.65,
    motorNodes: [
      { x: 0, y: 1.2, z: 0, label: 'Resonant Core', maxRpm: 12000 },
      { x: 0, y: -0.6, z: 0, label: 'Base Motor', maxRpm: 9000 },
    ],
    thermalZones: [{ name: 'Silicone Tip', targetTempC: 38 }],
  };

  const productFor3D = {
    ...product,
    name: product.title,
    subtitle: product.productType,
    category: 'vibrators' as const,
    priceUsd: product.price,
    rating: product.rating || 4.9,
    reviewsCount: product.reviewsCount || 120,
    description: product.title,
    longDescription: `${product.title} by ${product.vendor}. Available with discreet shipping on Pupulik.com.`,
    features: ['100% Body-safe materials', 'Waterproof design', 'Whisper quiet motors'],
    specs: {
      material: 'Medical-Grade Liquid Silicone',
      waterproof: 'IPX8 Waterproof',
      batteryLife: '3 Hours Run-Time',
      charging: 'USB Fast Charging',
      noiseLevel: '< 30 dB',
      connectivity: 'Wireless Control',
      dimensions: 'Standard ergonomic fit',
    },
    hapticModes: ['Harmonic Resonance', 'Sub-bass Rumble', 'Biometric Pulse'],
    vrSyncSupported: true,
    thermalSupported: true,
    model3D: model3DSpec,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white text-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto border border-neutral-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              {product.vendor} · {product.productType}
            </span>
            <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1">
              {product.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Product View (Photo vs 3D) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('photo')}
                className={`text-xs font-semibold pb-1 cursor-pointer transition-colors ${
                  activeTab === 'photo'
                    ? 'border-b-2 border-black text-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Product Image
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('3d')}
                className={`text-xs font-semibold pb-1 flex items-center gap-1 cursor-pointer transition-colors ${
                  activeTab === '3d'
                    ? 'border-b-2 border-black text-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive 3D / Haptic</span>
              </button>
            </div>

            {activeTab === 'photo' ? (
              <div className="w-full aspect-square bg-white border border-neutral-100 rounded-lg flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-full h-72 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800">
                  <ThreeDProductViewer
                    product={productFor3D}
                    activeHapticMode={selectedHapticMode}
                    isHapticActive={activeHapticTest}
                  />
                </div>
                <div className="p-2.5 bg-neutral-100 rounded-lg flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveHapticTest(!activeHapticTest)}
                    className={`px-3 py-1 rounded font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeHapticTest
                        ? 'bg-rose-600 text-white'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{activeHapticTest ? 'Vibration On' : 'Test Vibration'}</span>
                  </button>
                  <select
                    value={selectedHapticMode}
                    onChange={(e) => setSelectedHapticMode(e.target.value)}
                    className="bg-white border border-neutral-300 rounded px-2 py-1 text-xs outline-none"
                  >
                    {productFor3D.hapticModes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Right: Details & Buying */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wide">
                {product.productType}
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 leading-snug mt-1">
                {product.title}
              </h2>
              <div className="mt-2 text-2xl font-bold text-neutral-900">
                ${product.price.toFixed(2)} USD
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Shopify Verified on Pupulik.com</span>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                Orders are processed and fulfilled by <strong className="text-neutral-900">Pupulik.com</strong> with 100% plain box delivery and discrete billing.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold text-xs border border-neutral-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Buy Directly on Pupulik.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
