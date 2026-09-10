import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Sparkles, Gift, ShoppingBag, Search } from 'lucide-react';

export const MobileBottomBar = () => {
  const {
    currentPage,
    navigateTo,
    totalCartCount,
    setIsCartOpen,
    setSelectedCategory
  } = useStore();

  const scrollToSection = (sectionId) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-rose-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.06)] md:hidden safe-area-pb"
    >
      <div className="grid grid-cols-4 items-center h-16 px-2">
        
        {/* 1. Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-black transition-all cursor-pointer ${
            currentPage === 'home'
              ? 'text-rose-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {currentPage === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* 2. Shop Catalog */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-black transition-all cursor-pointer ${
            currentPage === 'shop'
              ? 'text-rose-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5" />
            {currentPage === 'shop' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Shop</span>
        </button>

        {/* 3. Gift Finder */}
        <button
          onClick={() => scrollToSection('product-catalog')}
          className="flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-black text-slate-500 hover:text-rose-600 transition-all cursor-pointer"
        >
          <div className="relative">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Gift Finder</span>
        </button>

        {/* 4. Cart Drawer Toggle */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-black text-slate-500 hover:text-rose-600 transition-all cursor-pointer relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-rose-600/30 animate-pulse">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight text-rose-600 font-black">
            Cart {totalCartCount > 0 ? `(${totalCartCount})` : ''}
          </span>
        </button>

      </div>
    </aside>
  );
};
