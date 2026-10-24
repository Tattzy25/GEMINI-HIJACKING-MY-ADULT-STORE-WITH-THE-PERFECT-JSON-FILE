import React from 'react';
import { Eye, Shield, Sparkles, Box, Film } from 'lucide-react';

interface HeroSectionProps {
  onExploreHardware: () => void;
  onLaunchCinema: () => void;
  onOpenShippingGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreHardware,
  onLaunchCinema,
  onOpenShippingGuide,
}) => {
  return (
    <section className="bg-neutral-50 border-b border-neutral-200 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
              <span className="text-rose-600 font-semibold">21+ Unfiltered</span>
              <span>·</span>
              <span>Shopify Verified</span>
              <span>·</span>
              <span>Discreet Plain-Box Delivery</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
              Adult Novelties &amp; 8K Spatial VR Cinema
            </h1>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-xl">
              Authentic hardware, wands, masturbators, and immersions from Pupulik.com. Real USD checkout powered by Shopify.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onExploreHardware}
              className="px-5 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Shop All Toys
            </button>
            <button
              type="button"
              onClick={onLaunchCinema}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-semibold border border-neutral-300 shadow-xs transition-colors cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-rose-500" />
              <span>8K VR Cinema</span>
            </button>
            <button
              type="button"
              onClick={onOpenShippingGuide}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-500 hover:text-black transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Discreet Shipping</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
