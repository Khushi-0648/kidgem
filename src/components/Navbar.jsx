import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Sparkles,
  Percent,
  X,
  Menu,
  Home,
  Info,
  Phone,
  Mail,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentPage,
    navigateTo,
    totalCartCount,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
    subtotal,
    currency,
    setCurrency,
    formatPrice
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-rose-100/90 shadow-xs transition-all">
      {/* 1. TOP ANNOUNCEMENT TICKER STRIP */}
      <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-700 text-white text-[11px] py-2 px-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center font-semibold">
          
          {/* Announcement with deal code */}
          <div className="flex items-center justify-center gap-2">
            <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
              <Percent className="w-3 h-3 text-amber-300" /> 20% OFF
            </span>
            <span className="text-rose-50">
              Free Express Shipping Over ₹499 • Use Code <strong className="text-amber-300 underline decoration-wavy">KIDZ20</strong>
            </span>
          </div>

          {/* Quick contact & Currency toggle */}
          <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-3 text-rose-100 text-xs">
            <a href="tel:+919999659104" className="hover:text-white flex items-center gap-1 font-bold transition-colors">
              <Phone className="w-3 h-3 text-amber-300" />
              <span>+91 99996 59104</span>
            </a>
            <span className="opacity-40 hidden md:inline">•</span>
            <a href="mailto:welcome@kidzgem.com" className="hover:text-white hidden md:flex items-center gap-1 font-medium transition-colors">
              <Mail className="w-3 h-3" />
              <span>welcome@kidzgem.com</span>
            </a>
            <span className="opacity-40 hidden sm:inline">•</span>

            {/* Currency Selector (Dual INR / USD) */}
            <div className="flex items-center bg-black/20 rounded-full p-0.5 text-[11px] font-black border border-white/10">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  currency === 'INR'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN FLOATING NAVBAR ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* BRAND LOGO with animated ruby sparkle */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-rose-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Kidz<span className="text-slate-900">Gem</span>
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-rose-500 -mt-1">
                Certified Kids Boutique
              </span>
            </div>
          </div>

          {/* CENTERED FLOATING NAVIGATION CAPSULE (Desktop) */}
          <nav className="hidden lg:flex items-center bg-rose-50/70 p-1.5 rounded-full border border-rose-200/70 shadow-2xs">
            <button
              onClick={() => navigateTo('home')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                currentPage === 'home'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/80'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigateTo('categories')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                currentPage === 'categories' || currentPage === 'category-detail'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/80'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                currentPage === 'shop'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/80'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shop</span>
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                currentPage === 'about'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/80'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                currentPage === 'contact'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md scale-105'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/80'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Us</span>
            </button>
          </nav>

          {/* RIGHT ACTIONS: Search pill, Wishlist & Cart Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Search Input (Hidden on mobile, expandable) */}
            <div className="relative hidden md:block w-44 lg:w-56">
              <Search className="w-3.5 h-3.5 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value && currentPage !== 'shop') {
                    navigateTo('shop');
                  }
                }}
                placeholder="Search toys..."
                className="w-full pl-9 pr-7 py-2 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200/80 focus:border-rose-500 rounded-full text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <div
              onClick={() => navigateTo('shop')}
              title="Saved to Wishlist"
              className="relative p-2.5 rounded-full hover:bg-rose-50 text-slate-700 hover:text-rose-600 cursor-pointer transition-colors border border-transparent hover:border-rose-200"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Luxury Shopping Cart Button (Direct Add to Cart to Payment) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2.5 rounded-full shadow-md shadow-rose-600/25 hover:shadow-lg hover:shadow-rose-600/35 transition-all duration-200 active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-rose-600 text-[10px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none pr-0.5">
                <span className="text-[9px] uppercase font-bold text-rose-100 tracking-wider">Cart</span>
                <span className="text-xs font-black">{formatPrice(subtotal)}</span>
              </div>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl text-slate-700 hover:bg-rose-50 border border-rose-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-rose-100 space-y-3 animate-fadeIn">
            {/* Mobile Search */}
            <div className="relative pb-1">
              <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value && currentPage !== 'shop') {
                    navigateTo('shop');
                  }
                }}
                placeholder="Search Bubble Gun, Toys, RC Cars..."
                className="w-full pl-10 pr-9 py-2.5 bg-rose-50/60 border border-rose-200 rounded-full text-xs font-medium placeholder-slate-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigateTo('home');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs text-left transition-all ${
                  currentPage === 'home'
                    ? 'bg-rose-600 text-white shadow-xs font-black'
                    : 'bg-rose-50/70 text-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('categories');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs text-left transition-all ${
                  currentPage === 'categories' || currentPage === 'category-detail'
                    ? 'bg-rose-600 text-white shadow-xs font-black'
                    : 'bg-rose-50/70 text-slate-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Categories</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('about');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs text-left transition-all ${
                  currentPage === 'about'
                    ? 'bg-rose-600 text-white shadow-xs font-black'
                    : 'bg-rose-50/70 text-slate-800'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>About Us</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('shop');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs text-left transition-all col-span-2 ${
                  currentPage === 'shop'
                    ? 'bg-rose-600 text-white shadow-xs font-black'
                    : 'bg-rose-50/70 text-slate-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-rose-600" />
                <div className="flex flex-col">
                  <span className="font-black">Shop</span>
                  <span className="text-[10px] text-slate-500 font-medium">Toys, RC Cars, Learning Sets, Blocks</span>
                </div>
              </button>

              <button
                onClick={() => {
                  navigateTo('contact');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs text-left transition-all col-span-2 ${
                  currentPage === 'contact'
                    ? 'bg-rose-600 text-white shadow-xs font-black'
                    : 'bg-rose-50/70 text-slate-800'
                }`}
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <div className="flex flex-col">
                  <span className="font-black">Contact Helpline (+91 99996 59104)</span>
                  <span className="text-[10px] text-slate-500 font-medium">welcome@kidzgem.com</span>
                </div>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
