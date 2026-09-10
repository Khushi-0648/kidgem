import React, { useState, useMemo, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  Smile,
  Car,
  PenTool,
  BookOpen,
  Boxes,
  Watch,
  Gift,
  Gamepad2,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Search,
  X,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Truck,
  RotateCw,
  Heart,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Sparkle,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Smile: Smile,
  Car: Car,
  PenTool: PenTool,
  BookOpen: BookOpen,
  Boxes: Boxes,
  Watch: Watch,
  Gift: Gift,
  Gamepad2: Gamepad2
};

// Rich Photographic Metadata & Personality for all 9 Play Worlds
const CATEGORY_DETAILS = {
  all: {
    name: 'All Treasures',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80',
    emoji: '✨',
    gradient: 'from-rose-600 via-red-600 to-rose-700',
    tag: 'Full Catalog',
    subtext: '54 Certified Gems',
    ringColor: 'ring-rose-500',
    borderHover: 'hover:border-rose-400'
  },
  clothing: {
    name: 'Kids Clothing',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80',
    emoji: '👕',
    gradient: 'from-rose-500 to-pink-600',
    tag: '100% Organic',
    subtext: 'Rompers & Pajamas',
    ringColor: 'ring-rose-500',
    borderHover: 'hover:border-rose-400'
  },
  toys: {
    name: 'Toys & Bubble Fun',
    image: 'https://kidzgem.com/wp-content/uploads/2025/11/bubble-gun.webp',
    emoji: '🧸',
    gradient: 'from-amber-500 to-rose-500',
    tag: 'Viral Sensation',
    subtext: 'Bubbles & Cuddles',
    ringColor: 'ring-amber-500',
    borderHover: 'hover:border-amber-400'
  },
  'remote-car': {
    name: 'Remote Cars & RC',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=500&q=80',
    emoji: '🏎️',
    gradient: 'from-blue-600 to-indigo-600',
    tag: '25 km/h Drift',
    subtext: 'High-Torque 4WD',
    ringColor: 'ring-blue-500',
    borderHover: 'hover:border-blue-400'
  },
  stationery: {
    name: 'Art & Stationery',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80',
    emoji: '✏️',
    gradient: 'from-pink-500 to-rose-500',
    tag: 'Safe & Washable',
    subtext: 'Pastels & Pens',
    ringColor: 'ring-pink-500',
    borderHover: 'hover:border-pink-400'
  },
  'learning-sets': {
    name: 'STEM & Learning',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    emoji: '🔬',
    gradient: 'from-emerald-500 to-teal-600',
    tag: 'STEM Certified',
    subtext: 'Solar & Magna',
    ringColor: 'ring-emerald-500',
    borderHover: 'hover:border-emerald-400'
  },
  'building-blocks': {
    name: 'Building Blocks',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=500&q=80',
    emoji: '🧱',
    gradient: 'from-purple-600 to-pink-600',
    tag: '3D Architecture',
    subtext: 'MagnaTiles & Castles',
    ringColor: 'ring-purple-500',
    borderHover: 'hover:border-purple-400'
  },
  accessories: {
    name: 'Kids Accessories',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=500&q=80',
    emoji: '🎒',
    gradient: 'from-rose-500 to-amber-500',
    tag: 'Everyday Gear',
    subtext: 'Watches & Bags',
    ringColor: 'ring-rose-500',
    borderHover: 'hover:border-rose-400'
  },
  'gift-items': {
    name: 'Curated Gifts',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=500&q=80',
    emoji: '🎁',
    gradient: 'from-yellow-500 to-amber-600',
    tag: 'Boxed Hampers',
    subtext: 'Galaxy Magic',
    ringColor: 'ring-yellow-500',
    borderHover: 'hover:border-yellow-400'
  },
  'indoor-games': {
    name: 'Indoor Games',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=500&q=80',
    emoji: '🎲',
    gradient: 'from-indigo-600 to-sky-600',
    tag: 'Screen-Free',
    subtext: 'Family Bonding',
    ringColor: 'ring-indigo-500',
    borderHover: 'hover:border-indigo-400'
  }
};

// Curated Category Personality & Highlights from kidzgem.com
const CATEGORY_SPOTLIGHTS = {
  all: {
    badge: 'Complete Official KidzGem Collection',
    tagline: 'Explore all 54 certified child-safe toys, organic clothing sets, STEM learning sets, and gifts designed for everyday smiles.',
    highlight: '100% Non-Toxic • BIS Certified • Pan-India Express Delivery',
    icon: '✨'
  },
  clothing: {
    badge: 'Organic Cotton & Playful Kids Fashion',
    tagline: 'Super-soft breathable organic cotton rompers, playful dinosaur fleece sets, and glow-in-the-dark astronaut pajamas.',
    highlight: '100% GOTS Cotton • Flatlock Seams • Hypoallergenic & Gentle',
    icon: '👕'
  },
  toys: {
    badge: 'Trending Toys & Playtime Fun',
    tagline: 'Home of the viral multi-hole bubble gun, solid beechwood express trains, and interactive lights.',
    highlight: 'Viral Bubble Gun • Non-Toxic ABS • Screen-Free Joy',
    icon: '🧸'
  },
  'remote-car': {
    badge: 'High-Speed Remote Cars & Stunt Vehicles',
    tagline: 'Tear across all terrains with 25 km/h high-speed stunt drift cars, 360° flips, and dual batteries.',
    highlight: '2.4GHz Anti-Interference • Heavy-Duty Shock Absorbers',
    icon: '🏎️'
  },
  stationery: {
    badge: 'Creative Art & Writing Essentials',
    tagline: 'Vibrant pastel highlighters, ergonomic triangular gel pens, and safe washable art markers.',
    highlight: 'Washable Safe Ink • Child Ergonomic Triangular Grip',
    icon: '✏️'
  },
  'learning-sets': {
    badge: 'Award-Winning STEM & Educational Sets',
    tagline: 'Stimulate growing minds with 3D MagnaTiles, revolving solar planetarium projectors, and guided science kits.',
    highlight: 'STEM Certified • Rare Earth Magnets • Hands-on Discovery',
    icon: '🔬'
  },
  'building-blocks': {
    badge: 'Architectural & Sensory Building Blocks',
    tagline: 'Build towering dream castles and architectural wonders with precision interlocking ABS blocks.',
    highlight: 'Food-Grade ABS • Smooth Rounded Corners • Boundless Creativity',
    icon: '🧱'
  },
  accessories: {
    badge: 'Kids Accessories & Daily Gear',
    tagline: 'Durable waterproof silicone LED watches, ergonomic backpacks, and cute school accessories.',
    highlight: 'Hypoallergenic Silicone • Water-Resistant • Child-Friendly',
    icon: '🎒'
  },
  'gift-items': {
    badge: 'Curated Birthday & Celebration Gifts',
    tagline: 'Unbox pure wonder with rotating musical snow globes, astronaut galaxy night lights, and birthday hampers.',
    highlight: 'Luxury Satin Gift Box • Custom Wish Card • Ready to Present',
    icon: '🎁'
  },
  'indoor-games': {
    badge: 'Screen-Free Indoor Family Games',
    tagline: 'Family board games, arcade tabletop soccer, and strategic puzzle challenges for wholesome bonding.',
    highlight: 'Family Bonding • Cognitive Skill Building • Screen-Free',
    icon: '🎲'
  }
};

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
    formatPrice,
    navigateTo,
    currentPage,
    products
  } = useStore();

  const isShopPage = currentPage === 'shop';
  const allProducts = products && products.length > 0 ? products : PRODUCTS;

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Filter by Category (only when not on shop page)
    if (!isShopPage && selectedCategory && selectedCategory !== 'all') {
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
  }, [allProducts, isShopPage, selectedCategory, searchQuery, priceRange, sortBy]);

  // Determine products to display:
  // On Home page: showcase 9 diverse flagship products (1 from each of the 9 categories)
  // On Shop page: show all products matching search/filters
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
    return filteredProducts;
  }, [allProducts, isShopPage, filteredProducts]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const spotlight = CATEGORY_SPOTLIGHTS[selectedCategory] || CATEGORY_SPOTLIGHTS.all;
  const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '' || sortBy !== 'featured' || priceRange < 2500;

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
              <span>All {PRODUCTS.length} Products Available • Direct Zero-Login Checkout</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              All KidzGem <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">Toys & Essentials</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Browse our complete catalog of all {PRODUCTS.length} certified child-safe toys, STEM science sets, and vehicles.
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
            <p className="text-xs text-slate-500 font-medium mt-3">
              Explore all {allProducts.length} certified child-safe toys & play universes in our full shop
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
