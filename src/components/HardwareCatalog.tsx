import React, { useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface HardwareCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onInspect3D: (product: Product) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const HardwareCatalog: React.FC<HardwareCatalogProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onInspect3D,
  searchQuery = '',
  onClearSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Shop All' },
    { id: 'vibrators', label: 'Vibrators' },
    { id: 'dolls', label: 'Dolls & Masturbators' },
    { id: 'dongs', label: 'Dongs & Dildos' },
    { id: 'anal', label: 'Anal Products' },
    { id: 'bdsm', label: 'BDSM & Restraints' },
    { id: 'lingerie', label: 'Lingerie' },
  ];

  const filtered = products.filter((p) => {
    let matchesCat = true;
    if (selectedCategory === 'vibrators') {
      matchesCat = p.productType.toLowerCase().includes('vibrat') || p.title.toLowerCase().includes('vibrat') || p.title.toLowerCase().includes('wand');
    } else if (selectedCategory === 'dolls') {
      matchesCat = p.productType.toLowerCase().includes('doll') || p.productType.toLowerCase().includes('masturbat') || p.title.toLowerCase().includes('stroker');
    } else if (selectedCategory === 'dongs') {
      matchesCat = p.productType.toLowerCase().includes('dong') || p.productType.toLowerCase().includes('dildo') || p.title.toLowerCase().includes('dildo');
    } else if (selectedCategory === 'anal') {
      matchesCat = p.productType.toLowerCase().includes('anal') || p.productType.toLowerCase().includes('prostate') || p.title.toLowerCase().includes('anal');
    } else if (selectedCategory === 'bdsm') {
      matchesCat = p.productType.toLowerCase().includes('bdsm') || p.productType.toLowerCase().includes('bondage') || p.title.toLowerCase().includes('hood');
    } else if (selectedCategory === 'lingerie') {
      matchesCat = p.productType.toLowerCase().includes('lingerie') || p.title.toLowerCase().includes('pantie');
    }

    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <section id="hardware-section" className="py-6 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto border-b border-neutral-100 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          {searchQuery && (
            <div className="flex items-center gap-2 pl-4 text-xs text-neutral-600">
              <span>Filtering by: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="text-neutral-900 underline font-medium hover:text-rose-600 cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* 5-Column Product Grid (Matching user's reference screenshot) */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="text-neutral-800 font-medium text-sm">No items match your selection</div>
            <p className="text-neutral-500 text-xs mt-1">Try another category or clear search</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                onClearSearch?.();
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-black text-white text-xs font-semibold cursor-pointer"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
            {filtered.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={onSelectProduct}
                onAddToCart={onQuickAdd}
                onQuickAdd={onQuickAdd}
                onInspect3D={onInspect3D}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
