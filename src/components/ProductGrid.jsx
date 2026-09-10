import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { productMatchesAgeBucket } from '../utils/ageRange';
import { ProductCard } from './ProductCard';
import { ShopFilterSidebar } from './ShopFilterSidebar';
import {
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Truck,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

const PRODUCTS_PER_PAGE = 20;

export const ProductGrid = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    selectedAgeGroup,
    minRating,
    inStockOnly,
    formatPrice,
    navigateTo,
    currentPage,
    products
  } = useStore();

  const isShopPage = currentPage === 'shop';
  const allProducts = products && products.length > 0 ? products : PRODUCTS;

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q)
      );
    }

    // Filter by Price range (in INR)
    list = list.filter((p) => p.price <= priceRange);

    // Filter by Age Group (shop page sidebar)
    if (isShopPage && selectedAgeGroup && selectedAgeGroup !== 'all') {
      list = list.filter((p) => productMatchesAgeBucket(p, selectedAgeGroup));
    }

    // Filter by minimum rating (shop page sidebar)
    if (isShopPage && minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Filter by stock availability (shop page sidebar)
    if (isShopPage && inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [allProducts, isShopPage, selectedCategory, searchQuery, priceRange, selectedAgeGroup, minRating, inStockOnly, sortBy]);

  // Shop page pagination - keeps the grid to a manageable page instead of
  // one endless scroll that only gets longer as the catalog grows.
  const [pageNum, setPageNum] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  // Clamp during render (not in an effect) so a filter change that shrinks
  // the result set never leaves pageNum pointing past the last page.
  const safePageNum = Math.min(pageNum, totalPages);

  useEffect(() => {
    setPageNum(1);
  }, [isShopPage, selectedCategory, searchQuery, priceRange, selectedAgeGroup, minRating, inStockOnly, sortBy]);

  const goToPage = (n) => {
    setPageNum(n);
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Determine products to display:
  // On Home page: showcase 9 diverse flagship products (1 from each of the 9 categories)
  // On Shop page: show the current page of products matching search/filters
  const displayedProducts = useMemo(() => {
    if (!isShopPage) {
      const categoryOrder = [
        'clothing',
        'toys',
        'remote-car',
        'stationery',
        'learning-sets',
        'building-blocks',
        'accessories',
        'gift-items',
        'indoor-games'
      ];
      const featured = categoryOrder
        .map((catId) => allProducts.find((p) => p.category === catId))
        .filter(Boolean);

      return featured.length === 9 ? featured : allProducts.slice(0, 9);
    }
    const start = (safePageNum - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [allProducts, isShopPage, filteredProducts, safePageNum]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange(2500);
  };

  return (
    <section id="product-catalog" className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFCFD] via-rose-50/20 to-[#FDFCFD] relative overflow-hidden scroll-mt-20 animate-fadeIn">
      
      {/* Ambient background depth glows */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-2/3 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. HIGH-AESTHETIC EDITORIAL SECTION HEADER */}
        {isShopPage ? (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-rose-200/90 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm shadow-rose-950/5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
              <span>Direct Zero-Login Checkout</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              All KidzGem <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">Toys & Essentials</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Browse our complete catalog of certified child-safe toys, STEM science sets, and vehicles.
            </p>
          </div>
        ) : (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-rose-200/90 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm shadow-rose-950/5">
              <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-500 animate-pulse" />
              <span>Curated Play Universes • 100% Certified Child-Safe</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14]"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              Explore Curated <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">Play Worlds</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Dive into our themed collections of certified non-toxic toys, STEM learning sets, high-speed remote cars, and birthday gift hampers.
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-1 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full border border-rose-100 shadow-2xs text-rose-700 font-extrabold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Non-Toxic & BIS Tested</span>
              </span>
              <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full border border-rose-100 shadow-2xs text-slate-700 font-extrabold">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                <span>Free Delivery over ₹499</span>
              </span>
              <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full border border-rose-100 shadow-2xs text-slate-700 font-extrabold">
                <RotateCw className="w-3.5 h-3.5 text-rose-500" />
                <span>7-Day Easy Replacement</span>
              </span>
            </div>
          </div>
        )}

        <div className={isShopPage ? 'lg:flex lg:gap-8 lg:items-start' : ''}>
        {isShopPage && <ShopFilterSidebar />}
        <div className="flex-1 min-w-0">

        {/* PRODUCT CARDS GRID */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              No products match your filter
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              We couldn't find items in "{activeCategoryObj.name}" under {formatPrice(priceRange)} {searchQuery && `matching "${searchQuery}"`}. Try resetting your filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* SHOP PAGE PAGINATION */}
        {isShopPage && totalPages > 1 && (
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => goToPage(safePageNum - 1)}
              disabled={safePageNum === 1}
              className="w-10 h-10 rounded-xl bg-white border border-rose-200 text-slate-700 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => n === 1 || n === totalPages || Math.abs(n - safePageNum) <= 1)
              .reduce((acc, n, idx, arr) => {
                if (idx > 0 && n - arr[idx - 1] > 1) acc.push('…');
                acc.push(n);
                return acc;
              }, [])
              .map((n, idx) =>
                n === '…' ? (
                  <span key={`gap-${idx}`} className="w-10 h-10 flex items-center justify-center text-slate-400 text-xs font-bold">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => goToPage(n)}
                    className={`w-10 h-10 rounded-xl text-xs font-black flex items-center justify-center transition-colors cursor-pointer ${
                      n === safePageNum
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                        : 'bg-white border border-rose-200 text-slate-700 hover:bg-rose-50'
                    }`}
                  >
                    {n}
                  </button>
                )
              )}

            <button
              onClick={() => goToPage(safePageNum + 1)}
              disabled={safePageNum === totalPages}
              className="w-10 h-10 rounded-xl bg-white border border-rose-200 text-slate-700 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* VIEW MORE IN SHOP BUTTON (Home Page Only) */}
        {!isShopPage && (
          <div className="mt-12 sm:mt-16 text-center flex flex-col items-center justify-center">
            <button
              onClick={() => {
                navigateTo('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-rose-100" />
              <span>View More Products</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        )}

        </div>
        </div>

      </div>
    </section>
  );
};
