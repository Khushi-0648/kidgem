import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  Gift,
  Sparkles,
  ShoppingBag,
  Zap,
  Star,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Heart,
  Baby,
  Palette,
  Microscope,
  Gauge
} from 'lucide-react';

const RECOMMENDATION_COUNT = 4;

export const GiftFinderWizard = () => {
  const { addToCart, buyNow, formatPrice, setQuickViewProduct } = useStore();

  const [selectedPersona, setSelectedPersona] = useState('creator');
  const [selectedBudget, setSelectedBudget] = useState('popular');

  const personas = [
    {
      id: 'toddler',
      label: 'Toddler (1–3 yrs)',
      icon: Baby,
      tagline: 'Soft, sensory & motor play',
      category: 'toys'
    },
    {
      id: 'creator',
      label: 'Creative Kid (4–6 yrs)',
      icon: Palette,
      tagline: 'Laughter, art & imaginative play',
      category: 'toys'
    },
    {
      id: 'stem',
      label: 'STEM Pioneer (7–10 yrs)',
      icon: Microscope,
      tagline: 'Space, science & building',
      category: 'learning-sets'
    },
    {
      id: 'speed',
      label: 'Speed Lover (10+ yrs)',
      icon: Gauge,
      tagline: 'RC cars, stunts & games',
      category: 'remote-car'
    }
  ];

  const budgets = [
    { id: 'budget', label: 'Under ₹500', max: 500, min: 0 },
    { id: 'popular', label: '₹500 – ₹1,000', max: 1000, min: 500 },
    { id: 'premium', label: 'Above ₹1,000', max: 99999, min: 1000 }
  ];

  // Dynamically find top matches based on persona category + budget
  const recommendations = useMemo(() => {
    const budgetObj = budgets.find((b) => b.id === selectedBudget) || budgets[1];

    let matches = PRODUCTS.filter((p) => {
      const matchCat =
        selectedPersona === 'toddler'
          ? p.category === 'toys' || p.category === 'clothing' || p.category === 'accessories'
          : selectedPersona === 'creator'
          ? p.category === 'toys' || p.category === 'stationery' || p.category === 'gift-items'
          : selectedPersona === 'stem'
          ? p.category === 'learning-sets' || p.category === 'building-blocks'
          : p.category === 'remote-car' || p.category === 'indoor-games';

      const matchPrice = p.price >= budgetObj.min && p.price <= budgetObj.max;
      return matchCat && matchPrice;
    });

    // Expand if fewer than RECOMMENDATION_COUNT in exact price range - stays
    // within the same relevant categories for this persona, ignoring the
    // budget cap, rather than ever padding with unrelated products.
    if (matches.length < RECOMMENDATION_COUNT) {
      const categoryMatches = PRODUCTS.filter((p) => {
        const matchCat =
          selectedPersona === 'toddler'
            ? p.category === 'toys' || p.category === 'clothing' || p.category === 'accessories' || p.category === 'indoor-games'
            : selectedPersona === 'creator'
            ? p.category === 'toys' || p.category === 'stationery' || p.category === 'gift-items'
            : selectedPersona === 'stem'
            ? p.category === 'learning-sets' || p.category === 'building-blocks'
            : p.category === 'remote-car' || p.category === 'indoor-games';
        return matchCat && !matches.some((m) => m.id === p.id);
      });
      matches = [...matches, ...categoryMatches];
    }

    return matches.slice(0, RECOMMENDATION_COUNT);
  }, [selectedPersona, selectedBudget]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F6] via-white to-[#FFF5F6] relative overflow-hidden border-t border-rose-100">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-rose-200/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-100/90 border border-rose-300/80 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <Gift className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Smart Gift Finder • 10-Second Match</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Find The Perfect Gift in <span className="text-rose-600">3 Quick Taps</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Not sure which toy to choose? Tell us who you're surprising and your budget, and our smart algorithm will curate the highest-rated picks!
          </p>
        </div>

        {/* Wizard Interactive Container */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-950/5 p-6 sm:p-10 lg:p-12">
          
          {/* Step 1 & Step 2 Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10 pb-8 border-b border-rose-100">
            
            {/* Step 1: Persona */}
            <div className="lg:col-span-7 space-y-3 text-left">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Select Recipient & Age</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {personas.map((persona) => {
                  const isSelected = selectedPersona === persona.id;
                  return (
                    <button
                      key={persona.id}
                      onClick={() => setSelectedPersona(persona.id)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-rose-50/90 border-rose-500 shadow-md ring-2 ring-rose-300/60 scale-[1.02]'
                          : 'bg-white border-slate-200 hover:border-rose-300 hover:bg-rose-50/30'
                      }`}
                    >
                      <persona.icon className="w-6 h-6 mb-1.5 text-rose-600" />
                      <div className="text-xs font-black text-slate-900 leading-snug">{persona.label}</div>
                      <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{persona.tagline}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">2</span>
                <span>Select Budget</span>
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {budgets.map((budget) => {
                  const isSelected = selectedBudget === budget.id;
                  return (
                    <button
                      key={budget.id}
                      onClick={() => setSelectedBudget(budget.id)}
                      className={`py-3.5 px-2 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-600 shadow-md shadow-rose-600/30 ring-2 ring-rose-200 scale-[1.02]'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-rose-300 hover:bg-rose-50/30'
                      }`}
                    >
                      <span className="text-xs font-black leading-tight">{budget.label}</span>
                      <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                        {budget.id === 'popular' ? 'Most Loved' : budget.id === 'premium' ? 'Deluxe' : 'Best Value'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results: Top Matched Products */}
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600 fill-rose-500" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Recommended For You
                </h3>
              </div>
              <div className="text-xs font-bold text-slate-500 hidden sm:flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>100% Non-Toxic • BIS Certified • Pan-India Free Delivery over ₹499</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recommendations.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      onClick={() => setQuickViewProduct(prod)}
                      className="w-24 h-24 rounded-xl bg-rose-50/60 overflow-hidden flex-shrink-0 cursor-pointer border border-rose-100"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-slate-800">{prod.rating}</span>
                        <span className="text-slate-400 text-[10px]">({prod.reviewsCount})</span>
                      </div>
                      <h4
                        onClick={() => setQuickViewProduct(prod)}
                        className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2 hover:text-rose-600 cursor-pointer leading-snug"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                      >
                        {prod.name}
                      </h4>
                      <div className="mt-1 text-base font-black text-rose-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        {formatPrice(prod.price)}
                        {prod.originalPrice > prod.price && (
                          <span className="text-xs text-slate-400 line-through ml-1.5 font-normal">
                            {formatPrice(prod.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-rose-50">
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl border border-rose-200 transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => buyNow(prod)}
                      className="py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
