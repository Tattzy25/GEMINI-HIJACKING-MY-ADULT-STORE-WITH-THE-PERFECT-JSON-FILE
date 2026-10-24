import React, { useState } from 'react';
import { ShoppingBag, Eye, ExternalLink } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onInspect3D?: (product: Product) => void;
  onSelect?: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onInspect3D,
  onSelect,
  onQuickAdd,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayImage = isHovered && product.secondaryImage ? product.secondaryImage : product.image;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickAdd) {
      onQuickAdd(product);
    } else {
      onAddToCart(product);
    }
  };

  const handleInspect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onInspect3D) {
      onInspect3D(product);
    } else if (onSelect) {
      onSelect(product);
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    } else if (onInspect3D) {
      onInspect3D(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col justify-start bg-white text-neutral-900 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title & Price on Top (Matching pupulik.com layout in reference screenshot) */}
      <div className="mb-2 space-y-1">
        <h3
          className="text-sm font-normal text-neutral-900 leading-snug line-clamp-2 h-10 group-hover:underline"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-normal text-neutral-900">
            ${product.price.toFixed(2)} USD
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-xs text-neutral-400 line-through">
              ${product.comparePrice.toFixed(2)} USD
            </span>
          )}
        </div>
      </div>

      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-white border border-neutral-100/80 rounded-xs flex items-center justify-center overflow-hidden">
        {/* Sale Tag if on sale */}
        {product.isSale && (
          <span className="absolute top-2 left-2 z-10 text-[11px] font-semibold text-neutral-900 bg-white px-2 py-0.5 shadow-xs border border-neutral-200">
            Sale
          </span>
        )}

        {/* Real Product Image from Shopify CDN */}
        {!imageError && displayImage ? (
          <img
            src={displayImage}
            alt={product.title}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-50 text-neutral-400 text-xs p-4 text-center">
            {product.title}
          </div>
        )}

        {/* Floating Quick Action Buttons on Hover (Matching reference screenshot) */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          {(onInspect3D || onSelect) && (
            <button
              type="button"
              onClick={handleInspect}
              title="View 3D / Features"
              className="w-9 h-9 rounded-full bg-neutral-900/90 hover:bg-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-rose-300" />
            </button>
          )}

          {/* Authentic Floating Black Bag Button matching reference screenshot */}
          <button
            type="button"
            onClick={handleAdd}
            title="Add to Bag"
            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
