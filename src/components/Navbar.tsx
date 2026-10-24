import React, { useState } from 'react';
import { Search, User, ShoppingBag, Film, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartSubtotal?: number;
  onOpenCart: () => void;
  onSelectCategory?: (cat: string) => void;
  activeCategory?: string;
  onNavigate?: (section: 'hardware' | 'cinema' | 'lab' | 'shipping') => void;
  activeSection?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory = 'all',
  onNavigate,
  activeSection = 'hardware',
  searchQuery = '',
  onSearchChange,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleNavClick = (section: 'hardware' | 'cinema' | 'lab' | 'shipping') => {
    if (onNavigate) {
      onNavigate(section);
    }
    if (onSelectCategory) {
      onSelectCategory(section === 'cinema' ? 'vr-cinema' : 'all');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Authentic Pupulik Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hardware');
            }}
            className="flex items-center"
            title="Pupulik Official Store"
          >
            <img
              src="/pupulik-logo.png"
              alt="Pupulik"
              className="h-12 w-auto object-contain cursor-pointer"
            />
          </a>
        </div>

        {/* Center: Navigation Links matching pupulik.com */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-800">
          <button
            type="button"
            onClick={() => handleNavClick('hardware')}
            className={`transition-colors cursor-pointer ${
              activeSection === 'hardware' && activeCategory === 'all' && !showSearch
                ? 'text-black font-semibold'
                : 'hover:text-black text-neutral-600'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('hardware')}
            className={`transition-colors cursor-pointer pb-1 border-b-2 ${
              activeSection === 'hardware'
                ? 'text-black font-semibold border-black'
                : 'hover:text-black text-neutral-600 border-transparent'
            }`}
          >
            Shop All
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('hardware')}
            className="text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            All collections
          </button>

          {/* 8K VR Cinema Experience */}
          <button
            type="button"
            onClick={() => handleNavClick('cinema')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
              activeSection === 'cinema'
                ? 'bg-black text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-rose-500" />
            <span>8K Spatial VR Cinema</span>
          </button>
        </nav>

        {/* Right: Search, Account, Bag */}
        <div className="flex items-center gap-5 text-neutral-800 shrink-0">
          {/* Search Toggle / Input */}
          <div className="relative flex items-center">
            {showSearch ? (
              <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1.5 border border-neutral-300 animate-fadeIn">
                <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  autoFocus
                  className="w-36 sm:w-56 text-xs bg-transparent outline-none text-neutral-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    onSearchChange?.('');
                  }}
                  className="text-neutral-400 hover:text-black ml-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="p-1.5 text-neutral-700 hover:text-black transition-colors cursor-pointer"
                aria-label="Search"
                title="Search Store"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>
            )}
          </div>

          <a
            href="https://pupulik.com/account"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-neutral-700 hover:text-black transition-colors hidden sm:block"
            aria-label="Account"
            title="My Account"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-1.5 text-neutral-800 hover:text-black transition-colors cursor-pointer"
            aria-label={`Shopping bag with ${cartCount} items`}
            title="Shopping Bag"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
