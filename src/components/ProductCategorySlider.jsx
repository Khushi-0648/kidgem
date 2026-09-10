import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  Sparkles,
  ShoppingBag,
  Zap,
  Star,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldCheck,
  Eye,
  ArrowRight
} from 'lucide-react';

const CATEGORY_META = {
  clothing: { emoji: '👕', label: 'Clothing', gradient: 'from-rose-500 to-pink-500' },
  toys: { emoji: '🧸', label: 'Toys', gradient: 'from-amber-500 to-rose-500' },
  'remote-car': { emoji: '🏎️', label: 'Remote Cars', gradient: 'from-blue-600 to-indigo-600' },
  stationery: { emoji: '✏️', label: 'Stationery', gradient: 'from-pink-500 to-rose-500' },
  'learning-sets': { emoji: '🔬', label: 'STEM Sets', gradient: 'from-emerald-500 to-teal-600' },
  'building-blocks': { emoji: '🧱', label: 'Blocks', gradient: 'from-purple-600 to-pink-600' },
  accessories: { emoji: '🎒', label: 'Accessories', gradient: 'from-rose-500 to-amber-500' },
  'gift-items': { emoji: '🎁', label: 'Gift Items', gradient: 'from-yellow-500 to-amber-600' },
  'indoor-games': { emoji: '🎲', label: 'Indoor Games', gradient: 'from-indigo-600 to-sky-600' }
};

export const ProductCategorySlider = () => {
  const { addToCart, buyNow, formatPrice, setQuickViewProduct, setSelectedCategory } = useStore();

  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // Curated list of top 18 featured products across all categories
  const featuredProducts = useMemo(() => {
    return [
      PRODUCTS.find((p) => p.id === 'cloth-1') || PRODUCTS[48],
      PRODUCTS.find((p) => p.id === 'toy-1') || PRODUCTS[0],
      PRODUCTS.find((p) => p.id === 'rc-1') || PRODUCTS[6],
      PRODUCTS.find((p) => p.id === 'learn-1') || PRODUCTS[18],
      PRODUCTS.find((p) => p.id === 'block-1') || PRODUCTS[24],
      PRODUCTS.find((p) => p.id === 'gift-1') || PRODUCTS[36],
      PRODUCTS.find((p) => p.id === 'cloth-3') || PRODUCTS[50],
      PRODUCTS.find((p) => p.id === 'stat-1') || PRODUCTS[12],
      PRODUCTS.find((p) => p.id === 'game-1') || PRODUCTS[42],
      PRODUCTS.find((p) => p.id === 'acc-1') || PRODUCTS[30],
      PRODUCTS.find((p) => p.id === 'toy-4') || PRODUCTS[3],
      PRODUCTS.find((p) => p.id === 'rc-5') || PRODUCTS[10],
      PRODUCTS.find((p) => p.id === 'learn-4') || PRODUCTS[21],
      PRODUCTS.find((p) => p.id === 'block-5') || PRODUCTS[28],
      PRODUCTS.find((p) => p.id === 'gift-5') || PRODUCTS[40],
      PRODUCTS.find((p) => p.id === 'stat-4') || PRODUCTS[15],
      PRODUCTS.find((p) => p.id === 'game-5') || PRODUCTS[46],
      PRODUCTS.find((p) => p.id === 'acc-4') || PRODUCTS[33]
    ].filter(Boolean);
  }, []);

  // Duplicate items 3 times for a seamless, continuous infinite loop
  const loopProducts = useMemo(() => {
    return [...featuredProducts, ...featuredProducts, ...featuredProducts];
  }, [featuredProducts]);

  // Smooth low-speed continuous auto-scroller
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId;
    let lastTime = performance.now();
    const speed = 0.055; // Pixels per millisecond (~45px per second for calm, low-speed auto-scroll)

    const step = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isPaused && slider) {
        slider.scrollLeft += speed * delta;

        // When scrolled halfway through duplicated items, reset smoothly to maintain infinite feel
        const halfScroll = slider.scrollWidth / 3;
        if (slider.scrollLeft >= halfScroll * 2) {
          slider.scrollLeft -= halfScroll;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const handleManualScroll = (direction) => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-rose-50/25 to-white relative overflow-hidden border-y border-rose-100/70">
      
      {/* Background ambient radial glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. SECTION HEADER WITH LIVE CONTROLS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 bg-rose-100/80 border border-rose-200 text-rose-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>Trending in Real Time • Low-Speed Auto-Scroll</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              Trending <span className="text-rose-600">Products</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
              Hover over any item to pause. Tap to view specifications or add straight to cart with direct guest checkout.
            </p>
          </div>

          {/* Controls: Manual Navigation Arrows */}
          <div className="flex items-center gap-1.5 self-start md:self-end">
            <button
              onClick={() => handleManualScroll('left')}
              className="w-9 h-9 rounded-full bg-white hover:bg-rose-600 text-slate-700 hover:text-white border border-rose-200 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleManualScroll('right')}
              className="w-9 h-9 rounded-full bg-white hover:bg-rose-600 text-slate-700 hover:text-white border border-rose-200 shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AUTO-SCROLLING PRODUCT CAROUSEL TRACK */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none cursor-grab active:cursor-grabbing select-none"
          style={{ scrollBehavior: 'auto' }}
        >
          {loopProducts.map((product, idx) => {
            const meta = CATEGORY_META[product.category] || { emoji: '✨', label: product.categoryLabel };
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            return (
              <div
                key={`${product.id}-${idx}`}
                className="w-64 sm:w-72 flex-shrink-0 bg-white rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 p-3.5 flex flex-col justify-between group text-left relative"
              >
                {/* Top Image & Badges */}
                <div>
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-rose-50/50 via-white to-rose-50/20 overflow-hidden mb-3 cursor-pointer border border-rose-100/60"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Category Pill on Image Top-Left */}
                    <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1 border border-rose-100">
                      <span>{meta.emoji}</span>
                      <span>{product.categoryLabel}</span>
                    </span>

                    {/* Discount Badge on Image Top-Right */}
                    {discount > 0 && (
                      <span className="absolute top-2.5 right-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                        {discount}% OFF
                      </span>
                    )}

                    {/* Quick View Hover Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="absolute bottom-2.5 inset-x-3 py-1.5 bg-white/95 backdrop-blur-md text-slate-900 hover:text-rose-600 text-xs font-black rounded-xl shadow-md border border-rose-200 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-rose-500" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Rating & In-Stock */}
                  <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-slate-900 font-black">{product.rating}</span>
                      <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                      In Stock
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="text-xs sm:text-sm font-black text-slate-900 line-clamp-2 hover:text-rose-600 transition-colors cursor-pointer leading-snug"
                    style={{ fontFamily: 'Fredoka, sans-serif' }}
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-3 pt-2.5 border-t border-rose-50">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base sm:text-lg font-black text-rose-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] text-slate-400 line-through font-normal">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {product.ageGroup}
                    </span>
                  </div>

                  {/* 1-Click Action Buttons */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-xl border border-rose-200 transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>+ Cart</span>
                    </button>

                    <button
                      onClick={() => buyNow(product)}
                      className="py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                      title="Direct to Checkout"
                    >
                      <Zap className="w-3 h-3 fill-white text-white" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
