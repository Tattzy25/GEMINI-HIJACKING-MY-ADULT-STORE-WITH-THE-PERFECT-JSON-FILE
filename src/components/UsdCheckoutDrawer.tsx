import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ExternalLink, ShieldCheck } from 'lucide-react';
import type { CartItem } from '../types';

interface UsdCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const UsdCheckoutDrawer: React.FC<UsdCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleCheckoutOnShopify = () => {
    // Generate native Shopify checkout permalink or direct to cart
    if (items.length > 0 && items[0].variantId) {
      // Build Shopify cart permalink: /cart/variant_id:qty,...
      const permalinkParts = items.map((i) => `${i.variantId}:${i.quantity}`).join(',');
      window.location.href = `https://pupulik.com/cart/${permalinkParts}`;
    } else {
      window.location.href = 'https://pupulik.com/cart';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white text-neutral-900 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="text-base font-bold text-neutral-900">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice of Live Shopify Fulfillment */}
        <div className="p-4 bg-neutral-50 border-b border-neutral-200 text-xs text-neutral-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Orders and payment are processed directly by <strong className="text-neutral-900">Pupulik.com</strong> via Shopify Payments.
          </p>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto" />
              <div className="text-neutral-700 font-medium">Your bag is empty</div>
              <p className="text-neutral-500 text-xs">
                Explore our collections on Pupulik.com
              </p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="w-16 h-16 bg-neutral-50 rounded-sm border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-neutral-900 line-clamp-2 leading-tight">
                      {item.title}
                    </div>
                    <div className="text-xs font-semibold text-neutral-900 mt-1">
                      ${(item.price || 0).toFixed(2)} USD
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 text-neutral-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold px-1 text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 text-neutral-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-500 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Link */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="flex justify-between text-sm font-semibold text-neutral-900">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)} USD</span>
            </div>

            <button
              type="button"
              onClick={handleCheckoutOnShopify}
              className="w-full py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Check out on Pupulik.com</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-neutral-500 text-center">
              Taxes and shipping calculated at checkout on pupulik.com
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
