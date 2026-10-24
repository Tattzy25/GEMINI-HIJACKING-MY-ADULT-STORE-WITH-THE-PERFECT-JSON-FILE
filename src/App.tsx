import React, { useState } from 'react';
import { AgeGateModal } from './components/AgeGateModal';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HardwareCatalog } from './components/HardwareCatalog';
import { VRCinemaSection } from './components/VRCinemaSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InteractiveVRPlayer } from './components/InteractiveVRPlayer';
import { UsdCheckoutDrawer } from './components/UsdCheckoutDrawer';
import { DiscreetShippingModal } from './components/DiscreetShippingModal';
import { Footer } from './components/Footer';

import { PUPULIK_PRODUCTS, VR_CINEMA_FILMS } from './data/mockData';
import type { CartItem, CinemaFilm, Product } from './types';
import { MessageCircle, X, ShieldCheck, Truck, HelpCircle } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: PUPULIK_PRODUCTS[0]?.id || '9908112687328',
      variantId: PUPULIK_PRODUCTS[0]?.variantId || '53293807665376',
      title: PUPULIK_PRODUCTS[0]?.title || "Adam & Eve Eve's Ravishing Rose Rainbow Rose Vibrator",
      handle: PUPULIK_PRODUCTS[0]?.handle || "adam-eve-eves-ravishing-rose-rainbow-rose-vibrator",
      price: PUPULIK_PRODUCTS[0]?.price || 69.99,
      quantity: 1,
      image: PUPULIK_PRODUCTS[0]?.image || '',
      url: PUPULIK_PRODUCTS[0]?.url || 'https://pupulik.com',
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilm, setActiveFilm] = useState<CinemaFilm | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isShippingOpen, setIsShippingOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<'hardware' | 'cinema' | 'shipping'>('hardware');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          variantId: product.variantId,
          title: product.title,
          handle: product.handle,
          price: product.price,
          quantity: 1,
          image: product.image,
          url: product.url,
        },
      ];
    });
    showToast(`Added "${product.title}" to Bag ($${product.price.toFixed(2)} USD)`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (section: 'hardware' | 'cinema' | 'lab' | 'shipping') => {
    if (section === 'shipping') {
      setIsShippingOpen(true);
      return;
    }
    setActiveSection(section === 'cinema' ? 'cinema' : 'hardware');
    const elem = document.getElementById(
      section === 'cinema' ? 'vr-cinema-section' : 'hardware-section'
    );
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-200">
      {/* Age Verification Gate (21+ Unfiltered Store) */}
      <AgeGateModal onConfirm={() => {}} />

      {/* Top Navigation matching pupulik.com header */}
      <Navbar
        cartCount={cartTotalItems}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Storefront Area */}
      <main className="flex-1">
        <HeroSection
          onExploreHardware={() => handleNavigate('hardware')}
          onLaunchCinema={() => handleNavigate('cinema')}
          onOpenShippingGuide={() => setIsShippingOpen(true)}
        />

        {/* 5-Column Storefront matching pupulik.com screenshot */}
        <HardwareCatalog
          products={PUPULIK_PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleAddToCart}
          onInspect3D={(p) => setSelectedProduct(p)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 8K VR Cinema section */}
        <VRCinemaSection
          onPlayFilm={(film) => setActiveFilm(film)}
        />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive 8K Spatial VR Cinema Player */}
      {activeFilm && (
        <InteractiveVRPlayer
          film={activeFilm}
          onClose={() => setActiveFilm(null)}
          onAddToCart={() => {}}
        />
      )}

      {/* Official Pupulik Store Checkout Drawer with Shopify routing */}
      <UsdCheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Discreet Delivery Guarantee Modal */}
      <DiscreetShippingModal
        isOpen={isShippingOpen}
        onClose={() => setIsShippingOpen(false)}
      />

      {/* Site Footer */}
      <Footer
        onOpenShipping={() => setIsShippingOpen(true)}
        onNavigateSection={handleNavigate}
      />

      {/* Floating Purple Chat Widget Icon matching Pupulik.com screenshot */}
      <div className="fixed bottom-6 right-6 z-40">
        {isChatOpen ? (
          <div className="w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-fadeIn mb-2">
            <div className="bg-[#5433FF] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Pupulik Support</span>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs text-neutral-600 bg-neutral-50 max-h-64 overflow-y-auto">
              <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs space-y-1">
                <p className="font-semibold text-neutral-900">Welcome to Pupulik!</p>
                <p>Have questions about discreet shipping, sizing, or our 8K spatial VR cinema?</p>
              </div>
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsShippingOpen(true)}
                  className="w-full text-left p-2.5 rounded-lg bg-white border border-neutral-200 hover:border-black text-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-[#5433FF]" />
                  <span>How discreet is the packaging?</span>
                </button>
                <a
                  href="https://pupulik.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left p-2.5 rounded-lg bg-white border border-neutral-200 hover:border-black text-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Shopify Secure Checkout Info</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-[#5433FF] hover:bg-[#4828ea] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
            aria-label="Open support chat"
            title="Chat with Pupulik Support"
          >
            <MessageCircle className="w-7 h-7 fill-white" />
          </button>
        )}
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
