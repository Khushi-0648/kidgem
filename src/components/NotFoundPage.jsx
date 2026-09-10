import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { Home, ShoppingBag, Search, Gem } from 'lucide-react';

export const NotFoundPage = () => {
  const { navigateTo, searchQuery, setSearchQuery } = useStore();

  const quickCategories = CATEGORIES.filter((c) => c.id !== 'all').slice(0, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigateTo('shop');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 bg-[#FDFCFD] relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-rose-200/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-xl w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-red-700 flex items-center justify-center text-white shadow-xl shadow-rose-600/30 mx-auto">
          <Gem className="w-10 h-10 animate-pulse-subtle" />
        </div>

        <div className="space-y-2">
          <h1
            className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent tracking-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Oops! This Gem Doesn't Exist
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you're looking for may have been moved, renamed, or never existed. Let's get you back to the treasure hunt!
          </p>
        </div>

        {/* Quick search */}
        <form onSubmit={handleSearch} className="relative max-w-sm mx-auto">
          <Search className="w-4 h-4 text-rose-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for toys, RC cars, gifts..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-rose-200 rounded-full text-xs font-medium placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400/30 shadow-sm"
          />
        </form>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-xs rounded-2xl shadow-lg shadow-rose-600/25 transition-all active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-white hover:bg-rose-50 text-rose-700 font-black text-xs rounded-2xl border border-rose-200 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Shop</span>
          </button>
        </div>

        {/* Quick category links */}
        <div className="pt-6 border-t border-rose-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Or browse a category</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigateTo('category-detail', cat.id)}
                className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-full border border-rose-100 transition-colors cursor-pointer"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
