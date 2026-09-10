import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import {
  Smile,
  Car,
  PenTool,
  BookOpen,
  Boxes,
  Watch,
  Gift,
  Gamepad2,
  Sparkles,
  ArrowRight,
  Layers,
  Shirt
} from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Shirt: Shirt,
  Smile: Smile,
  Car: Car,
  PenTool: PenTool,
  BookOpen: BookOpen,
  Boxes: Boxes,
  Watch: Watch,
  Gift: Gift,
  Gamepad2: Gamepad2
};

export const CategoryNav = ({ title = 'Shop by Category', subtitle = 'Click any category widget below to explore our certified safe, premium collection.' }) => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    const el = document.getElementById('product-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-white border-b border-rose-100 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 fill-rose-500" />
              <span>Explore Official KidzGem Collection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              {title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Category Widgets Grid (All 9: "All Categories" + 8 Authentic KidzGem Categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-3.5">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`group relative flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border cursor-pointer select-none ${
                  isSelected
                    ? 'bg-gradient-to-b from-red-600 via-rose-600 to-red-700 text-white border-red-600 shadow-xl shadow-rose-600/30 scale-105 z-10'
                    : 'bg-rose-50/40 hover:bg-white text-slate-800 border-rose-100 hover:border-rose-300 hover:shadow-md hover:shadow-rose-100 hover:-translate-y-1'
                }`}
              >
                {/* Icon Container */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-110 shadow-xs ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-rose-600 border border-rose-200 group-hover:border-rose-400'
                }`}>
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Title */}
                <span className={`text-[11px] sm:text-xs font-black leading-snug line-clamp-2 ${
                  isSelected ? 'text-white' : 'text-slate-900 group-hover:text-rose-600'
                }`} style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  {cat.name}
                </span>

                {/* Item Count Tag */}
                <span className={`text-[10px] font-bold mt-1.5 px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/25 text-white' : 'text-slate-500 bg-white border border-rose-100'
                }`}>
                  {cat.count} items
                </span>

                {/* Active Indicator Pulse Dot */}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-300 border-2 border-white rounded-full shadow-xs animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Reset Pill if filtered */}
        {selectedCategory !== 'all' && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 text-xs font-black text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-5 py-2 rounded-full border border-rose-200 shadow-xs transition-all"
            >
              <span>Showing "{CATEGORIES.find(c => c.id === selectedCategory)?.name}" — Reset to Show All ({PRODUCTS.length} Products)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
