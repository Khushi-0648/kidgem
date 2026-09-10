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
  Sparkle
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
    subtext: '24 Certified Gems',
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
    tagline: 'Explore all 24 certified child-safe toys, STEM learning sets, and gifts designed for everyday smiles.',
    highlight: '100% Non-Toxic • BIS Certified • Pan-India Express Delivery',
    icon: '✨'
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
    formatPrice
  } = useStore();

  // Layout mode switcher: 'capsules' (Instagram / Boutique Stories) vs 'bento' (Luxury Bento Gallery)
  const [layoutMode, setLayoutMode] = useState('capsules');
  const carouselRef = useRef(null);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

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
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];
  const spotlight = CATEGORY_SPOTLIGHTS[selectedCategory] || CATEGORY_SPOTLIGHTS.all;
  const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '' || sortBy !== 'featured' || priceRange < 2500;

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange(2500);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="product-catalog" className="py-16 sm:py-24 bg-gradient-to-b from-[#FDFCFD] via-rose-50/20 to-[#FDFCFD] relative overflow-hidden scroll-mt-20 animate-fadeIn">
      
      {/* Ambient background depth glows */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-2/3 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. HIGH-AESTHETIC EDITORIAL SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5">
          
          {/* Glowing pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-rose-200/90 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm shadow-rose-950/5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-500 animate-pulse" />
            <span>Curated Play Universes • 100% Certified Child-Safe</span>
          </div>

          {/* Expressive Editorial Display Title */}
          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14]"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Explore Curated <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">Play Worlds</span>
          </h2>

          {/* Inspiring Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Dive into our themed collections of certified non-toxic toys, STEM learning sets, high-speed remote cars, and birthday gift hampers.
          </p>

          {/* Micro Trust & Feature Pills */}
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

          {/* Dual Layout Switcher Controls */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1">Layout:</span>
            <button
              onClick={() => setLayoutMode('capsules')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                layoutMode === 'capsules'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-white text-slate-600 hover:bg-rose-50 border border-rose-100'
              }`}
            >
              <span>✨ Story Capsules</span>
            </button>
            <button
              onClick={() => setLayoutMode('bento')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                layoutMode === 'bento'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-white text-slate-600 hover:bg-rose-50 border border-rose-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>🗂️ Bento Tiles</span>
            </button>
          </div>

        </div>

        {/* 2. CATEGORY VIEW LAYOUTS */}

        {/* LAYOUT A: VISUAL STORY CAPSULES (Instagram / Zara Kids Luxury Style) */}
        {layoutMode === 'capsules' && (
          <div className="relative mb-10 group">
            
            {/* Left Carousel Chevron Button */}
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 transition-all z-20 hidden md:flex cursor-pointer"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Track with Snap Alignment & Smooth Touch */}
            <div
              ref={carouselRef}
              className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
            >
              {CATEGORIES.map((cat) => {
                const details = CATEGORY_DETAILS[cat.id] || CATEGORY_DETAILS.all;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex flex-col items-center flex-shrink-0 snap-center group/card cursor-pointer focus:outline-hidden select-none transition-all duration-300 w-24 sm:w-28 text-center"
                  >
                    {/* Photographic Circular Capsule Avatar */}
                    <div className="relative mb-2.5">
                      <div
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-tr ${details.gradient} ring-4 ${details.ringColor} ring-offset-3 shadow-xl scale-108`
                            : 'bg-gradient-to-tr from-slate-200 via-rose-100 to-rose-200 hover:ring-3 hover:ring-rose-300/80 group-hover/card:scale-105 shadow-sm'
                        }`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white relative">
                          <img
                            src={details.image}
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover/card:scale-115 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          <div className={`absolute inset-0 transition-opacity ${isSelected ? 'bg-black/10' : 'bg-transparent'}`}></div>
                        </div>
                      </div>

                      {/* Emoji Floating Badge */}
                      <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md border border-rose-100 flex items-center justify-center text-sm transform group-hover/card:rotate-12 transition-transform">
                        {details.emoji}
                      </span>

                      {/* Selected Star Pill */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-black shadow-md border border-white animate-bounce">
                          ★
                        </span>
                      )}
                    </div>

                    {/* Category Name */}
                    <span
                      className={`text-xs font-black leading-snug line-clamp-2 transition-colors ${
                        isSelected ? 'text-rose-600' : 'text-slate-900 group-hover/card:text-rose-600'
                      }`}
                      style={{ fontFamily: 'Fredoka, sans-serif' }}
                    >
                      {cat.name}
                    </span>

                    {/* Count Pill */}
                    <span
                      className={`text-[10px] font-extrabold mt-1 px-2.5 py-0.5 rounded-full transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs'
                          : 'bg-rose-50 text-slate-500 border border-rose-100'
                      }`}
                    >
                      {cat.count} items
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Carousel Chevron Button */}
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 transition-all z-20 hidden md:flex cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        )}

        {/* LAYOUT B: LUXURY BENTO TILES (Apple / Lego Store Style) */}
        {layoutMode === 'bento' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4 mb-10">
            {CATEGORIES.map((cat) => {
              const details = CATEGORY_DETAILS[cat.id] || CATEGORY_DETAILS.all;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 text-left flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-red-600 to-rose-700 text-white border-red-600 shadow-xl shadow-rose-600/30 scale-[1.02] ring-4 ring-rose-300/60'
                      : 'bg-white text-slate-900 border-rose-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100/60 hover:-translate-y-1'
                  }`}
                >
                  {/* Top Photographic Header Frame */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-rose-50">
                    <img
                      src={details.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Top Floating Tag */}
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      {details.tag}
                    </span>

                    {/* Emoji Badge on Bottom-Right */}
                    <span className="absolute bottom-2 right-2 text-xl drop-shadow-md">
                      {details.emoji}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 flex flex-col justify-between flex-1">
                    <div>
                      <h3
                        className={`text-xs sm:text-sm font-black leading-snug line-clamp-1 ${
                          isSelected ? 'text-white' : 'text-slate-900 group-hover:text-rose-600'
                        }`}
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                      >
                        {cat.name}
                      </h3>
                      <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                        {details.subtext}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100/30 flex items-center justify-between text-[10px] font-black">
                      <span className={isSelected ? 'text-rose-200' : 'text-slate-400'}>
                        {cat.count} products
                      </span>
                      <span className={`flex items-center gap-0.5 ${isSelected ? 'text-white' : 'text-rose-600'}`}>
                        <span>Filter</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 3. ACTIVE CURATED UNIVERSE SHOWCASE BANNER (Dynamic Glassmorphic Bento) */}
        <div
          key={`spotlight-${selectedCategory}`}
          className="mb-10 rounded-3xl p-6 sm:p-8 bg-white border border-rose-200/90 shadow-xl shadow-rose-950/5 relative overflow-hidden animate-fadeIn"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-200/20 via-rose-100/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 text-left">
            
            {/* Left: Category Personality & Story */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 text-white flex items-center justify-center font-black text-base shadow-xs">
                  {spotlight.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                  {spotlight.badge}
                </span>
                <span className="text-xs font-bold text-slate-300">•</span>
                <span className="text-xs font-black bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
                  {activeCategoryObj.count} Products Available
                </span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {activeCategoryObj.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {spotlight.tagline}
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs font-extrabold text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{spotlight.highlight}</span>
              </div>
            </div>

            {/* Right: Quick Perks & Reset Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3.5 flex-shrink-0">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-600 flex-wrap">
                <div className="flex items-center gap-1.5 bg-rose-50/80 border border-rose-100 px-3 py-1.5 rounded-xl">
                  <Truck className="w-3.5 h-3.5 text-rose-600" />
                  <span>Free Express Over ₹499</span>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50/80 border border-rose-100 px-3 py-1.5 rounded-xl">
                  <RotateCw className="w-3.5 h-3.5 text-rose-600" />
                  <span>7-Day Replacements</span>
                </div>
              </div>

              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-2xl text-xs font-black transition-all flex items-center gap-2 active:scale-95 cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  <span>View All 24 Treasures</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 5. PRODUCT CARDS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
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

      </div>
    </section>
  );
};
