import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  Sparkles,
  Zap,
  ShoppingBag,
  Star,
  ShieldCheck,
  BatteryCharging,
  CheckCircle2,
  ArrowRight,
  Flame,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SPOTLIGHT_PRODUCTS = [
  {
    id: 'toy-1',
    navLabel: 'Bubble Cannon',
    navEmoji: '🫧',
    badge: '37% OFF • FLASH DEAL',
    tag: 'Viral Sensation',
    headline: '69-Hole Starlight Bubble Cannon',
    story: 'Engineered with 69 precision airflow nozzles, this viral bubble gun launches an immersive cloud of over 10,000 rainbow bubbles every minute. Equipped with bright LED night lights for magical evening garden playtime.',
    specs: [
      { icon: '🫧', title: '69 Airflow Ports', desc: '10,000+ bubbles/min' },
      { icon: '⚡', title: 'USB Rechargeable', desc: '45+ mins play battery' },
      { icon: '🌟', title: 'LED Starlight', desc: 'Glows in dark gardens' },
      { icon: '🛡️', title: '100% Non-Toxic', desc: 'BPA-Free safe fluid' }
    ]
  },
  {
    id: 'rc-1',
    navLabel: 'TurboDrift Buggy',
    navEmoji: '🏎️',
    badge: '24% OFF • TOP SPEED',
    tag: '25 km/h Monster 4WD',
    headline: 'TurboDrift 4WD All-Terrain Monster Buggy',
    story: 'Tear through gravel, grass, and mud at blistering 25 km/h speeds. Features 4-wheel independent spring shocks, anti-collision rubber bumpers, and 2.4GHz long-range zero-lag remote control.',
    specs: [
      { icon: '🏎️', title: '25 km/h High Speed', desc: 'Dual high-torque motors' },
      { icon: '📡', title: '2.4GHz Anti-Lag', desc: '50m control radius' },
      { icon: '🛞', title: 'Heavy Shock Absorbers', desc: 'Conquers all terrains' },
      { icon: '🔋', title: 'Dual Batteries', desc: '2 rechargeable packs' }
    ]
  },
  {
    id: 'block-1',
    navLabel: 'MagnaTiles Castle',
    navEmoji: '🧱',
    badge: '25% OFF • BEST CREATIVE',
    tag: '3D Magna Architecture',
    headline: '100-Piece 3D MagnaTiles Architecture Castle',
    story: 'Build towering fairy castles, geometric pyramids, and futuristic rocket ships. Features ultra-strong neodymium rare-earth magnets with ultrasonic welded seams that withstand active play.',
    specs: [
      { icon: '🧱', title: '100 Magna Tiles', desc: 'Prisms, squares & gates' },
      { icon: '🧲', title: 'Rare-Earth Magnets', desc: 'Ultrasonic secure weld' },
      { icon: '🔬', title: 'STEM Certified', desc: 'Spatial & logic growth' },
      { icon: '✨', title: 'Food-Grade ABS', desc: 'Smooth rounded bevels' }
    ]
  },
  {
    id: 'stem-1',
    navLabel: 'Solar Planetarium',
    navEmoji: '🌌',
    badge: '29% OFF • STEM HERO',
    tag: 'Space & Astronomy',
    headline: 'Revolving Solar Planetarium Night Projector',
    story: 'Turn any child room into an awe-inspiring starry planetarium. Features motorized 360-degree orbital rotation for all 8 planets, optical glass clarity, and soothing starry night projections.',
    specs: [
      { icon: '🌌', title: '360° Orbital Rotation', desc: 'Motorized planetary gears' },
      { icon: '🪐', title: '8 Celestial Planets', desc: 'Accurate relative orbits' },
      { icon: '🔭', title: 'Optical Glass Lens', desc: 'Crisp ceiling projection' },
      { icon: '🎙️', title: 'Audio Guide Audio', desc: 'Interactive space facts' }
    ]
  }
];

export const HeroSpotlight = () => {
  const { addToCart, buyNow, formatPrice } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSpotlight = SPOTLIGHT_PRODUCTS[activeIndex];
  const activeProduct = PRODUCTS.find((p) => p.id === activeSpotlight.id) || PRODUCTS[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_PRODUCTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_PRODUCTS.length) % SPOTLIGHT_PRODUCTS.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F6] via-white to-[#FFF5F6] relative overflow-hidden border-y border-rose-100/70">
      
      {/* Ambient background blur circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-100/80 border border-rose-300/80 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>KidzGem Flagship Showcases</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Meet Our Famous <span className="text-rose-600">KidzGem Stars</span>
          </h2>

          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Explore our 4 most celebrated creations across India. Certified safe, non-toxic, and engineered for endless smiles.
          </p>
        </div>

        {/* Bento Product Spotlight Card */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-rose-100/90 shadow-2xl shadow-rose-950/5 overflow-hidden p-6 sm:p-12 lg:p-16 relative">
          
          {/* Quick Chevrons on Sides */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            title="Previous Star Product"
            aria-label="Previous Star Product"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 shadow-xl flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
            title="Next Star Product"
            aria-label="Next Star Product"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Product Visual Frame with Floating Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Decorative Circular Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/50 to-red-100/30 rounded-full blur-2xl transform scale-90"></div>

              {/* Product Image Frame */}
              <div className="relative z-10 w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-rose-50/60 to-white p-6 sm:p-8 border border-rose-100 shadow-xl flex items-center justify-center group">
                <img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 ease-out animate-fadeIn"
                />

                {/* Floating Real-Time Discount Ribbon */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-rose-600/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{activeSpotlight.badge}</span>
                </div>

                {/* Verified Safety Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-rose-200 shadow-md flex items-center gap-1.5 text-xs font-black text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>BIS Certified Safe</span>
                </div>
              </div>

            </div>

            {/* Right: Rich Product Story, Specs & 1-Click Buy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-black text-slate-900">{activeProduct.rating} / 5.0</span>
                  <span className="text-xs font-semibold text-slate-400">({activeProduct.reviewsCount} Parent Reviews)</span>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  {activeSpotlight.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {activeSpotlight.story}
                </p>
              </div>

              {/* 4 Feature Badges Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {activeSpotlight.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-rose-50/60 border border-rose-100 p-3 rounded-2xl">
                    <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black text-sm shadow-2xs flex-shrink-0">
                      {spec.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">{spec.title}</h5>
                      <p className="text-[10px] text-slate-500 font-medium">{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing & Direct Checkout Actions */}
              <div className="pt-4 border-t border-rose-100">
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="text-3xl sm:text-4xl font-black text-rose-600"
                    style={{ fontFamily: 'Fredoka, sans-serif' }}
                  >
                    {formatPrice(activeProduct.price)}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    {formatPrice(activeProduct.originalPrice)}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Save {formatPrice(activeProduct.originalPrice - activeProduct.price)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => buyNow(activeProduct)}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95 group cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300 group-hover:scale-125 transition-transform" />
                    <span>Instant Checkout • {formatPrice(activeProduct.price)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => addToCart(activeProduct, 1)}
                    className="py-4 px-6 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-sm rounded-2xl border border-rose-200 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Free Delivery Promise */}
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Eligible for Free Shipping Over ₹499 • 100% Certified Safe Delivery</span>
                </div>
              </div>

            </div>

          </div>

          {/* Subtle Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-6 mt-4 border-t border-rose-100/60">
            {SPOTLIGHT_PRODUCTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? 'w-8 h-2 bg-gradient-to-r from-red-600 to-rose-600'
                    : 'w-2 h-2 bg-rose-200 hover:bg-rose-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
