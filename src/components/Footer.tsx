import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  onOpenShipping: () => void;
  onNavigateSection: (section: 'hardware' | 'cinema' | 'lab') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenShipping,
  onNavigateSection,
}) => {
  return (
    <footer className="w-full bg-neutral-50 border-t border-neutral-200 py-12 text-xs text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-neutral-200">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2">
              <img src="/pupulik-logo.png" alt="Pupulik" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Modern adult novelties, wands, masturbators, and 8K spatial VR cinema. Unfiltered pleasure for adults 21+. All checkouts fulfilled directly via Shopify at Pupulik.com.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-neutral-900">Collections</div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('hardware')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Vibrators &amp; Wands
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('hardware')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Dildos &amp; Dongs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('hardware')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    Masturbators &amp; Strokers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('cinema')}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    8K Spatial VR Cinema
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-neutral-900">Privacy &amp; Billing</div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>
                  <button
                    type="button"
                    onClick={onOpenShipping}
                    className="hover:text-black transition-colors cursor-pointer"
                  >
                    100% Plain Box Shipping
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500">Discreet Bank Statement</span>
                </li>
                <li>
                  <span className="text-neutral-500">Zero Third-Party Trackers</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-neutral-900">Official Store</div>
              <ul className="space-y-1.5 text-neutral-500">
                <li>
                  <a
                    href="https://pupulik.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    Visit pupulik.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://pupulik.com/account"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors"
                  >
                    Shopify Customer Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-neutral-400" />
            <span>&copy; {new Date().getFullYear()} Pupulik.com. Strictly for adults aged 21 and older.</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Shopify Secure Checkout Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
