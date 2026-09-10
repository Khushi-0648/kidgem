import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { AGE_BUCKETS } from '../utils/ageRange';
import { SlidersHorizontal, Star, RotateCcw, ChevronDown, CheckCircle2 } from 'lucide-react';

const RATING_OPTIONS = [4.5, 4, 3];

export const ShopFilterSidebar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedAgeGroup,
    setSelectedAgeGroup,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly,
    setSearchQuery,
    setSortBy,
    formatPrice
  } = useStore();

  const [mobileOpen, setMobileOpen] = useState(false);

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (priceRange < 2500 ? 1 : 0) +
    (selectedAgeGroup !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(2500);
    setSelectedAgeGroup('all');
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const FilterBody = () => (
    <div className="space-y-7">
      {/* Category */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Category</h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-rose-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className={selectedCategory === cat.id ? 'text-rose-100' : 'text-slate-400'}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Price Range</h4>
        <input
          type="range"
          min="199"
          max="2500"
          step="50"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-rose-600 cursor-pointer"
        />
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mt-1.5">
          <span>₹199</span>
          <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">Up to {formatPrice(priceRange)}</span>
        </div>
      </div>

      {/* Age Group */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Age Group</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedAgeGroup('all')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
              selectedAgeGroup === 'all'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white text-slate-600 border-rose-200 hover:bg-rose-50'
            }`}
          >
            All Ages
          </button>
          {AGE_BUCKETS.map((bucket) => (
            <button
              key={bucket.id}
              onClick={() => setSelectedAgeGroup(bucket.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                selectedAgeGroup === bucket.id
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white text-slate-600 border-rose-200 hover:bg-rose-50'
              }`}
            >
              {bucket.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Rating */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Customer Rating</h4>
        <div className="space-y-1">
          <button
            onClick={() => setMinRating(0)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              minRating === 0 ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'
            }`}
          >
            <span>Any Rating</span>
          </button>
          {RATING_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`w-full flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                minRating === r ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${minRating === r ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'}`} />
              <span>{r}+ &amp; above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">Availability</h4>
        <button
          onClick={() => setInStockOnly(!inStockOnly)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            inStockOnly ? 'bg-rose-600 border-rose-600' : 'border-slate-300'
          }`}>
            {inStockOnly && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
          </span>
          <span className="text-xs font-bold text-slate-700">In Stock Only</span>
        </button>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-rose-200 rounded-2xl shadow-xs mb-4 cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-black text-slate-900">
          <SlidersHorizontal className="w-4 h-4 text-rose-600" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden bg-white border border-rose-100 rounded-3xl p-5 mb-6 shadow-sm">
          <FilterBody />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white border border-rose-100 rounded-3xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>Filters</h3>
          </div>
          <FilterBody />
        </div>
      </aside>
    </>
  );
};
