import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { getCategoryIcon } from '../utils/categoryIcons';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Gift,
  Smile
} from 'lucide-react';

const CATEGORY_SHOWCASES = {
  clothing: {
    id: 'clothing',
    name: 'Kids Clothing & Outfits',
    badge: '100% Organic Cotton',
    gradient: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    coverImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    tagline: 'Breathable organic cotton rompers, cozy dino fleece sets, and glowing astronaut pajamas.',
    idealAge: 'Ages 0 to 10',
    highlights: ['Organic Cotton Safari Romper', 'Dinosaur Explorer Fleece Set', 'Glow-in-the-Dark Pajamas']
  },
  toys: {
    id: 'toys',
    name: 'Toys & Action Fun',
    badge: 'Trending Worldwide',
    gradient: 'from-amber-500 to-rose-600',
    bgLight: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    coverImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    tagline: 'Collectible wind-up tin robots, interactive gadgets, and tactile sensory toys.',
    idealAge: 'Ages 3 to 10',
    highlights: ['Vintage Marching Tin Robot', 'Retro Wooden Railway Train', 'Silicone Sensory Board']
  },
  'remote-car': {
    id: 'remote-car',
    name: 'Remote Cars & High-Speed Vehicles',
    badge: '25 km/h Top Speeds',
    gradient: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    coverImage: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Blistering all-terrain monster buggies, 360° acrobatic rollers, and wall racers.',
    idealAge: 'Ages 5 to 14',
    highlights: ['TurboDrift 4WD Buggy', '360° Tornado Stunt Car', 'Gravity Zero Climber']
  },
  stationery: {
    id: 'stationery',
    name: 'Art, Drawing & School Stationery',
    badge: 'Premium Creative Kit',
    gradient: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50/70',
    borderColor: 'border-pink-200',
    coverImage: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    tagline: 'Deluxe metallic art suitcases, ergonomic handwriting pens, and 3D pencil cases.',
    idealAge: 'Ages 4 to 14',
    highlights: ['48-Pc Art Studio Suitcase', 'Ergonomic Fountain Pen', '3D Rocket EVA Pencil Case']
  },
  'learning-sets': {
    id: 'learning-sets',
    name: 'STEM, Science & Learning Sets',
    badge: 'STEM Certified Play',
    gradient: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tagline: '360° revolving planetary projectors, 1200x student microscopes, and electronic kits.',
    idealAge: 'Ages 6 to 14',
    highlights: ['Solar Planetarium Projector', '1200x LED Microscope', 'Snap-Circuit Electronic Lab']
  },
  'building-blocks': {
    id: 'building-blocks',
    name: '3D Building Blocks & Architecture',
    badge: 'Brain & Spatial Builder',
    gradient: 'from-purple-600 to-indigo-700',
    bgLight: 'bg-purple-50/70',
    borderColor: 'border-purple-200',
    coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    tagline: 'Ultrasonic neodymium magnetic tiles, hydraulic technic cranes, and marble runs.',
    idealAge: 'Ages 3 to 12',
    highlights: ['100-Pc 3D MagnaTiles Castle', 'Hydraulic Technic Crane', 'Marble Run Roller Coaster']
  },
  accessories: {
    id: 'accessories',
    name: 'Kids Accessories & Daily Gear',
    badge: 'Daily Essentials',
    gradient: 'from-rose-500 to-orange-600',
    bgLight: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    coverImage: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
    tagline: 'Orthopedic 3D dinosaur backpacks, kid-safe LED smartwatches, and insulated flasks.',
    idealAge: 'Ages 3 to 12',
    highlights: ['3D Dino Waterproof Backpack', 'Waterproof LED Kids Watch', 'Astronaut Steel Sipper']
  },
  'gift-items': {
    id: 'gift-items',
    name: 'Birthday & Festive Gift Hampers',
    badge: 'Celebration Ready',
    gradient: 'from-yellow-500 to-amber-600',
    bgLight: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    coverImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    tagline: 'Curated joyful birthday gift boxes, musical carousel boxes, and DIY glow slime labs.',
    idealAge: 'All Ages',
    highlights: ['Deluxe Birthday Joy Hamper', 'Wooden Carousel Music Box', 'DIY Glow Slime Magic Lab']
  },
  'indoor-games': {
    id: 'indoor-games',
    name: 'Indoor Games & Family Arcade',
    badge: '100% Screen-Free',
    gradient: 'from-indigo-600 to-sky-600',
    bgLight: 'bg-indigo-50/70',
    borderColor: 'border-indigo-200',
    coverImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    tagline: 'High-speed wooden sling puck battles, tabletop arcade pinball, and memory cubes.',
    idealAge: 'Ages 4 to Adult',
    highlights: ['Fast Track Sling Puck Battle', 'Tabletop Arcade Pinball', 'Flash Memory Pattern Cube']
  }
};

export const CategoriesPage = () => {
  const { navigateTo, setSelectedCategory } = useStore();
  const [activeTab, setActiveTab] = useState('all');

  const categoriesList = CATEGORIES.filter((c) => c.id !== 'all');

  const filteredCategories = activeTab === 'all'
    ? categoriesList
    : categoriesList.filter((c) => c.id === activeTab);

  const handleOpenCategory = (catId) => {
    setSelectedCategory(catId);
    navigateTo('category-detail', catId);
  };

  return (
    <div className="bg-[#FDFCFD] min-h-screen animate-fadeIn">
      
      {/* 1. FULL-SCREEN EDITORIAL HERO BANNER */}
      <div className="relative w-full min-h-[72vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16">
        <img
          src="https://images.unsplash.com/photo-1647687663833-fcc91fd99792?auto=format&fit=crop&w=1920&q=85"
          alt="Children Playing With Vibrant Creative Toys"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-95"
        />
        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-rose-950/85 to-red-950/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40"></div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-16">
          
          {/* Super-Aesthetic Floating Pill Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent">
              9 Curated Play Universes • 100% Certified Safe
            </span>
          </div>

          {/* Dramatic Typography */}
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.06] drop-shadow-2xl break-words"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Discover Endless <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
              Worlds of Wonder
            </span>
          </h1>

          {/* Sophisticated Editorial Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-rose-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            From blistering all-terrain remote racers to cozy organic clothing & celestial planetariums — explore certified childhood universes engineered for boundless joy.
          </p>

          {/* Glassmorphic Trust Badges Strip */}
          <div className="pt-3 flex items-center justify-center flex-wrap gap-3 sm:gap-4 text-xs font-black">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white shadow-lg">
              <Smile className="w-4 h-4 text-amber-300" />
              <span>Curated Play Themes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white shadow-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>BIS Non-Toxic Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white shadow-lg">
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Free Express Delivery &gt; ₹499</span>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 pb-16">

        {/* 2. INTERACTIVE CATEGORY TABS STRIP */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                Jump to <span className="text-rose-600">Category Universe</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Tap any category tab to filter or open its dedicated catalog page.
              </p>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-black text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full border border-rose-200 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>View All Gems in Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer flex-shrink-0 select-none ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Universes</span>
            </button>

            {categoriesList.map((cat) => {
              const TabIcon = getCategoryIcon(cat.id);

              return (
                <button
                  key={cat.id}
                  onClick={() => handleOpenCategory(cat.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer flex-shrink-0 select-none bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-rose-200/80"
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. EDITORIAL SHOWCASE BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredCategories.map((cat) => {
            const showcase = CATEGORY_SHOWCASES[cat.id] || {
              name: cat.name,
              badge: 'Exclusive',
              gradient: 'from-red-600 to-rose-600',
              coverImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
              tagline: 'Curated toys certified child-safe.',
              idealAge: 'All Ages',
              highlights: []
            };
            const ShowcaseIcon = getCategoryIcon(cat.id);

            return (
              <div
                key={cat.id}
                className="group bg-white rounded-3xl sm:rounded-[2rem] border border-rose-100 hover:border-rose-300/80 shadow-md hover:shadow-2xl hover:shadow-rose-950/10 transition-all duration-300 flex flex-col justify-between overflow-hidden relative text-left"
              >
                {/* Top Image Frame with Badge & Emoji */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-rose-50">
                  <img
                    src={showcase.coverImage}
                    alt={showcase.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"></div>

                  {/* Floating Badge */}
                  <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{showcase.badge}</span>
                  </span>

                  {/* Bottom Category Title Overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
                    <div>
                      <ShowcaseIcon className="w-6 h-6 text-white drop-shadow-md mb-1" />
                      <h3
                        className="text-lg font-black text-white leading-tight tracking-tight drop-shadow-md line-clamp-1"
                        style={{ fontFamily: 'Fredoka, sans-serif' }}
                      >
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {showcase.tagline}
                    </p>

                    {/* Ideal Age Pill */}
                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-500">
                      <span className="bg-rose-50 border border-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full">
                        {showcase.idealAge}
                      </span>
                      <span>• Non-Toxic Certified</span>
                    </div>

                    {/* Product Preview Snippets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Top Featured Stars:
                      </span>
                      <div className="space-y-1">
                        {showcase.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Navigate directly to dedicated page */}
                  <div className="pt-3 border-t border-rose-50">
                    <button
                      onClick={() => handleOpenCategory(cat.id)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-2xl shadow-md shadow-rose-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn cursor-pointer active:scale-98"
                    >
                      <span>Explore {cat.name} Collection</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. VALUE & TRUST FOOTER BANNER */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-rose-50/70 via-white to-rose-50/50 border border-rose-200/80 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                BIS Certified Child Safety
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Every toy across all categories passes rigorous non-toxic material and drop safety tests.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Fast Pan-India Delivery
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Orders dispatch within 24 hours. Enjoy free express delivery on all orders over ₹499.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shadow-xs">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                7-Day Hassle-Free Exchange
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Damaged or incorrect item? Instant zero-friction replacement with dedicated WhatsApp support.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
