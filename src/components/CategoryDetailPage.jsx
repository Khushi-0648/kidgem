import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  Search,
  ArrowUpDown,
  RotateCw,
  Home,
  Layers,
  HelpCircle,
  CheckCircle2,
  Filter
} from 'lucide-react';

const CATEGORY_DETAILS = {
  clothing: {
    id: 'clothing',
    title: 'Kids Clothing & Daily Fashion',
    subtitle: '100% breathable organic cotton rompers, cozy dino fleece sets, UV50+ swimwear, and glowing astronaut pajamas.',
    emoji: '👕',
    badge: '100% GOTS Organic Cotton',
    gradient: 'from-rose-600 via-pink-600 to-red-700',
    bannerImg: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'What fabric is used in KidzGem kids clothing?', a: 'Our rompers and daytime sets are made from 100% GOTS-certified organic combed cotton that is hypoallergenic and free from harsh chemical dyes.' },
      { q: 'How do I choose the right size for my child?', a: 'All our clothes follow standard age-based sizing with room for active growth and stretch. If in doubt, we suggest sizing up for growing toddlers.' },
      { q: 'Are the glowing astronaut pajamas safe and washable?', a: 'Yes! The photoluminescent ink is non-toxic, skin-safe, and embedded directly into the fiber, staying bright wash after wash.' }
    ]
  },
  toys: {
    id: 'toys',
    title: 'Toys & Action Universe',
    subtitle: 'Viral bubble guns, interactive dancing robots, and fidget sensory creations for pure laughter.',
    emoji: '🧸',
    badge: 'Trending Worldwide',
    gradient: 'from-amber-600 via-rose-600 to-red-700',
    bannerImg: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'Are all bubble fluids safe if touched by toddlers?', a: 'Yes! KidzGem bubble solution is certified 100% non-toxic, odorless, and gentle on sensitive skin with BIS approval.' },
      { q: 'Are the batteries included with battery-powered toys?', a: 'USB rechargeable models include the charging cables. Standard AA/AAA models clearly mention battery requirements in the specifications.' }
    ]
  },
  'remote-car': {
    id: 'remote-car',
    title: 'High-Speed Remote Cars & Vehicles',
    subtitle: 'Conquer gravel, grass, and vertical walls with 25 km/h high-speed 4WD buggies and 360° stunt rollers.',
    emoji: '🏎️',
    badge: '25 km/h Top Speeds',
    gradient: 'from-blue-700 via-indigo-700 to-slate-900',
    bannerImg: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'How far is the 2.4GHz remote control range?', a: 'Our high-grade 2.4GHz transmitters provide up to 50 meters of interference-free control radius, allowing multiple cars to race together without cross-talk.' },
      { q: 'Can the cars handle rough outdoor terrain?', a: 'Yes! Equipped with independent suspension springs and rubber grip tires, our buggies are designed for gravel, dirt, asphalt, and grass.' }
    ]
  },
  stationery: {
    id: 'stationery',
    title: 'Art, Drawing & School Stationery',
    subtitle: 'Deluxe metallic art suitcases, ergonomic handwriting pens, and crash-resistant 3D pencil cases.',
    emoji: '✏️',
    badge: 'Creative Excellence',
    gradient: 'from-pink-600 via-rose-600 to-red-800',
    bannerImg: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'Are the colored markers and crayons washable?', a: 'All pigments in our stationery sets are water-washable and easily clean off cotton clothes, skin, and tabletops.' },
      { q: 'What is the pencil case made of?', a: 'Crafted from shock-absorbing high-density EVA material that is water-resistant, ultra-lightweight, and drop-proof.' }
    ]
  },
  'learning-sets': {
    id: 'learning-sets',
    title: 'STEM, Science & Learning Sets',
    subtitle: 'Inspire future astronomers, scientists, and engineers with motorized planetariums and 1200x student microscopes.',
    emoji: '🔬',
    badge: 'STEM Certified Play',
    gradient: 'from-emerald-700 via-teal-800 to-slate-900',
    bannerImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'Are experiments safe for kids to conduct independently?', a: 'All STEM kits come with illustrated step-by-step experiment guides and use child-safe, low-voltage components without hazardous chemicals.' },
      { q: 'Does the microscope include prepared glass slides?', a: 'Yes, it comes with a starter pack of safe acrylic prepared specimen slides plus blank slides for collecting garden leaves and petals.' }
    ]
  },
  'building-blocks': {
    id: 'building-blocks',
    title: '3D Building Blocks & Architecture',
    subtitle: 'Ultrasonic neodymium magnetic tiles, mechanical technic cranes, and cascading marble run coaster tracks.',
    emoji: '🧱',
    badge: 'Spatial & Logic Growth',
    gradient: 'from-purple-700 via-indigo-800 to-slate-900',
    bannerImg: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'Can the magnets fall out of the tiles?', a: 'Never. Our MagnaTiles feature ultrasonic welded seams with internal metal reinforcement rivets that prevent magnets from escaping even if dropped.' },
      { q: 'Are these tiles compatible with other magnetic tile brands?', a: 'Yes, our 3D magnetic tiles follow the standard 3-inch sizing and are 100% compatible with major global magnetic brands.' }
    ]
  },
  accessories: {
    id: 'accessories',
    title: 'Kids Accessories & Daily Gear',
    subtitle: 'Ergonomic 3D dinosaur school backpacks, smart LED silicone watches, and insulated vacuum steel bottles.',
    emoji: '🎒',
    badge: 'Daily Essentials',
    gradient: 'from-rose-600 via-amber-600 to-red-800',
    bannerImg: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'Is the backpack water-resistant for monsoon school days?', a: 'Yes! Fabricated from multi-layer water-repellent nylon with waterproof taped zippers to protect textbooks and artwork.' },
      { q: 'Does the water bottle keep drinks warm or cold?', a: 'Double-walled food-grade 316 stainless steel vacuum insulation keeps drinks cold for 12 hours and warm for 8 hours.' }
    ]
  },
  'gift-items': {
    id: 'gift-items',
    title: 'Birthday & Festive Gift Hampers',
    subtitle: 'Ready-to-gift surprise gift boxes, nostalgic wooden carousel music boxes, and DIY glowing slime labs.',
    emoji: '🎁',
    badge: 'Celebration Ready',
    gradient: 'from-amber-600 via-rose-600 to-yellow-600',
    bannerImg: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'Can I send this directly as a gift to someone?', a: 'Yes! During checkout, enter the recipient’s delivery address. All gift items ship in elegant gift packaging with price tags discreetly shielded upon request.' },
      { q: 'Does the carousel music box require batteries?', a: 'No, it uses a classic clockwork mechanical winding key that plays sweet soothing lullaby tunes naturally.' }
    ]
  },
  'indoor-games': {
    id: 'indoor-games',
    title: 'Indoor Games & Family Arcade',
    subtitle: 'High-speed wooden sling puck battles, tabletop arcade pinball, and pattern flash cubes for screen-free family nights.',
    emoji: '🎲',
    badge: '100% Screen-Free Fun',
    gradient: 'from-indigo-700 via-sky-700 to-slate-900',
    bannerImg: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1920&q=85',
    faqs: [
      { q: 'What is the wooden sling puck board made from?', a: 'Crafted from solid sustainable pinewood with laser-smooth sanded edges and elastic cords built to withstand thousands of games.' },
      { q: 'How many players can participate?', a: 'Designed for 2-player head-to-head fast battles, with tournament modes for the whole family.' }
    ]
  }
};

export const CategoryDetailPage = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    navigateTo,
    formatPrice
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [localPriceMax, setLocalPriceMax] = useState(2500);

  // Fallback to 'toys' if 'all' or empty is selected
  const activeCatId = selectedCategory && selectedCategory !== 'all' ? selectedCategory : 'toys';
  const categoryMeta = CATEGORY_DETAILS[activeCatId] || CATEGORY_DETAILS.toys;
  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCatId) || CATEGORIES[1];

  const categoriesList = CATEGORIES.filter((c) => c.id !== 'all');

  // Filter products for this category
  const filteredCategoryProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === activeCatId);

    // Search query
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag?.toLowerCase().includes(q)
      );
    }

    // Price range
    list = list.filter((p) => p.price <= localPriceMax);

    // Sorting
    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'popular') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [activeCatId, searchFilter, localPriceMax, sortOption]);

  const handleSelectCategory = (catId) => {
    navigateTo('category-detail', catId);
    setSearchFilter('');
  };

  return (
    <div className="bg-[#FDFCFD] min-h-screen animate-fadeIn">
      
      {/* 1. FULL-SCREEN THEMATIC CATEGORY HERO BANNER */}
      <div className="relative w-full min-h-[68vh] sm:min-h-[78vh] flex flex-col justify-between overflow-hidden mb-10 sm:mb-14">
        <img
          src={categoryMeta.bannerImg}
          alt={categoryMeta.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-90"
        />
        {/* Dynamic Category Color Gradient Scrim */}
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryMeta.gradient} opacity-90`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/40"></div>

        {/* Ambient Depth Glows */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Breadcrumbs Inside Banner */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-10">
          <nav aria-label="Breadcrumb" className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-white/80 bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-full border border-white/20 shadow-md max-w-full">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-amber-300" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <button
              onClick={() => navigateTo('categories')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-white/70" />
              <span>Categories</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-amber-300 font-extrabold flex items-center gap-1">
              <span>{categoryMeta.emoji}</span>
              <span>{currentCategoryObj.name}</span>
            </span>
          </nav>
        </div>

        {/* Banner Content Center */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-5 py-12">
          
          {/* Aesthetic Category Pill */}
          <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-xl">
            <span className="text-sm">{categoryMeta.emoji}</span>
            <span className="text-amber-300 font-black">•</span>
            <span>{categoryMeta.badge}</span>
            <span className="text-amber-300 font-black">•</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
              {filteredCategoryProducts.length} Items
            </span>
          </div>

          {/* Majestic Typography */}
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.06] drop-shadow-2xl break-words"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            {categoryMeta.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-rose-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            {categoryMeta.subtitle}
          </p>

          {/* Trust Guarantees Strip */}
          <div className="pt-2 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 text-xs font-black text-white">
            <span className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>100% BIS Tested Safe</span>
            </span>
            <span className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-1.5 shadow-md">
              <Truck className="w-4 h-4 text-amber-300" />
              <span>Free Shipping Over ₹499</span>
            </span>
            <span className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-1.5 shadow-md">
              <RotateCcw className="w-4 h-4 text-rose-300" />
              <span>7-Day Replacement</span>
            </span>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 pb-16">

        {/* 3. IN-PAGE CATEGORY SWITCHER TABS (Seamless switching without back button) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Browse Other Universes:
            </span>
            <button
              onClick={() => navigateTo('categories')}
              className="text-xs font-black text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Categories Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {categoriesList.map((cat) => {
              const details = CATEGORY_DETAILS[cat.id];
              const isSelected = activeCatId === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex-shrink-0 select-none ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105 ring-2 ring-rose-300'
                      : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200/80 hover:border-rose-300'
                  }`}
                >
                  <span className="text-sm">{details?.emoji || '🧸'}</span>
                  <span>{cat.name}</span>
                  {isSelected && <span className="text-amber-300 text-xs">★</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. FILTER & SORTING CONTROL BAR */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-rose-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search within this category */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={`Search in ${currentCategoryObj.name}...`}
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-rose-50/40 border border-rose-200 focus:border-rose-500 focus:bg-white rounded-full text-xs font-medium placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 transition-all"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown & Price Range */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-xs font-bold text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-rose-50/50 border border-rose-200 text-xs font-bold text-slate-800 rounded-full px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-rose-400/20 cursor-pointer"
                >
                  <option value="featured">✨ Featured</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="popular">🔥 Most Popular</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div className="flex items-center gap-2 bg-rose-50/40 px-3.5 py-1.5 rounded-full border border-rose-100">
                <span className="text-[11px] font-bold text-slate-500">Under:</span>
                <span className="text-xs font-black text-rose-600">{formatPrice(localPriceMax)}</span>
                <input
                  type="range"
                  min="300"
                  max="2500"
                  step="100"
                  value={localPriceMax}
                  onChange={(e) => setLocalPriceMax(Number(e.target.value))}
                  className="w-20 sm:w-28 accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Active Items Count */}
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                {filteredCategoryProducts.length} Items
              </span>
            </div>

          </div>
        </div>

        {/* 5. PRODUCT CATALOG GRID */}
        {filteredCategoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCategoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-rose-100 shadow-sm space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              No items match your filter
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Try adjusting your search query or increasing the maximum price slider.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setLocalPriceMax(2500);
                setSortOption('featured');
              }}
              className="py-2.5 px-6 rounded-full bg-rose-600 text-white text-xs font-black hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 6. CATEGORY FAQ / BUYING GUIDE ACCORDION */}
        {categoryMeta.faqs && categoryMeta.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-sm space-y-6 text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-600">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Parent Guide & FAQs</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Frequently Asked Questions: {currentCategoryObj.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryMeta.faqs.map((faq, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-start gap-2">
                    <span className="text-rose-600 font-black">Q.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed pl-4">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. VALUE & TRUST FOOTER BANNER */}
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
                Non-toxic materials, smooth rounded chamfers, and BPA-free certified build quality.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Express Pan-India Shipping
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Orders dispatched within 24 hours. Free delivery on orders over ₹499.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl shadow-xs">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                7-Day Easy Replacements
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Hassle-free exchange policy if anything arrives damaged with 24/7 parent support.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
