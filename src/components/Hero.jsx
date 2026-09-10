import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Copy,
  Check,
  ShoppingBag
} from 'lucide-react';

export const Hero = () => {
  const { setSelectedCategory, showToast, navigateTo } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  // Live countdown timer for Deal of the Day (Hours : Mins : Secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 5 Distinct Slides featuring Clothes, Toys, Remote Cars, Learning Blocks & Gifts
  const slides = [
    {
      id: 0,
      badge: 'Cozy Apparel & Plush • 100% Organic',
      badgeIcon: '🧸',
      title: 'Adorable Kids Fashion & Cozy Playtime Wear',
      tagline: 'Dress your little explorers in ultra-soft, breathable organic cotton outfits paired with cuddly bunny plushies made for everyday smiles.',
      featureTag: 'Gentle on Sensitive Skin • Hypoallergenic Pure Cotton',
      ctaText: 'Shop Kids Wear & Plush',
      category: 'toys',
      categoryName: 'Clothes & Plush',
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 1,
      badge: 'Official KidzGem • Non-Toxic Toys',
      badgeIcon: '✨',
      title: 'Give The Gift Of Your Children Everyday!',
      tagline: 'Spark endless laughter with viral multi-hole bubble guns, solid beechwood railway express trains, and musical light wands crafted with child safety at heart.',
      featureTag: 'Viral Bubble Gun • Certified Safe & Non-Toxic',
      ctaText: 'Shop Trending Toys',
      category: 'toys',
      categoryName: 'Toys & Bubble Gun',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 2,
      badge: 'Turbo Drift • 25 km/h High Torque',
      badgeIcon: '🏎️',
      title: 'Unleash High-Speed Turbo Drift RC Thrills!',
      tagline: 'Tear across all terrains with heavy-duty shock absorbers, 360° acrobatic stunt flips, and dual rechargeable long-life batteries for unstoppable action.',
      featureTag: '2.4GHz Anti-Interference • Crash-Resistant Shell',
      ctaText: 'Shop Remote Drift Cars',
      category: 'remote-car',
      categoryName: 'Remote Cars',
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 3,
      badge: 'Award-Winning STEM • Safe & Magnetic',
      badgeIcon: '🔬',
      title: 'Build Tall Castles & Explore Wonder Galaxies!',
      tagline: 'Empower curious young minds with 3D translucent MagnaTiles, revolving motorized planetarium projectors, and guided science experiment kits.',
      featureTag: 'Food-Grade BPA-Free ABS • Rare Earth Magnets',
      ctaText: 'Shop Learning & Blocks',
      category: 'learning-sets',
      categoryName: 'STEM & Blocks',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1920&q=85'
    },
    {
      id: 4,
      badge: 'Birthday Specials • Pure Magic & Surprise',
      badgeIcon: '🎁',
      title: 'Unbox Pure Wonder & Celebration Magic!',
      tagline: 'Make every birthday and celebration unforgettable with rotating musical crystal snow globes, 360° astronaut galaxy night projectors, and surprise gift hampers.',
      featureTag: 'Luxury Satin Gift Box • Custom Wish Card',
      ctaText: 'Shop Gift Collections',
      category: 'gift-items',
      categoryName: 'Gifts & Hampers',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=85'
    }
  ];

  // Smooth Auto-Timer Slide Transition (5 seconds) + Progress Bar
  useEffect(() => {
    if (isPaused) return;

    const tickRate = 50; // update every 50ms
    const totalDuration = 5000;
    const increment = (tickRate / totalDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + increment;
      });
    }, tickRate);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleSlideChange = (newIndex) => {
    setCurrentSlide(newIndex);
    setSlideProgress(0);
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (category) => {
    navigateTo('shop', category);
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('KIDZ20');
    setCopiedCoupon(true);
    showToast('Coupon KIDZ20 copied! 20% OFF applied at checkout 🎉');
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-slate-900 select-none min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between"
    >
      {/* 5 BACKGROUND FULL-WIDTH SLIDES WITH MINIMAL FADE ON RIGHT SIDE */}
      {slides.map((slide, index) => {
        const isActive = currentSlide === index;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image: Vivid, High Resolution & Slow Ken Burns Motion */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            />

            {/* LIGHTENED GRADIENT: Only soft tint on the left for text readability, 
                leaving the right side completely clear and vibrant without fading! */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 via-45% to-transparent"></div>
            
            {/* Ambient Red Accent Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        );
      })}

      {/* MIDDLE LEFT NAVIGATION BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/85 hover:bg-white text-slate-800 hover:text-rose-600 shadow-xl border border-white/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        title="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* MIDDLE RIGHT NAVIGATION BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/85 hover:bg-white text-slate-800 hover:text-rose-600 shadow-xl border border-white/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        title="Next Slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* TOP ANNOUNCEMENT TICKER STRIP */}
      <div className="relative z-20 w-full pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-rose-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Deal Countdown from kidzgem.com */}
          <div className="flex items-center gap-2.5 text-xs flex-wrap justify-center">
            <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Deal Of The Day</span>
            </span>

            <span className="text-slate-800 font-bold hidden sm:inline">
              UPTO 35% OFF Ends In:
            </span>

            {/* Countdown timer */}
            <div className="flex items-center gap-1 font-mono text-xs font-black">
              <span className="bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-md shadow-2xs">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span className="text-rose-400 font-bold">:</span>
              <span className="bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-md shadow-2xs">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span className="text-rose-400 font-bold">:</span>
              <span className="bg-rose-600 text-white px-2 py-0.5 rounded-md shadow-xs animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          {/* Quick Copy Coupon Code */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold hidden md:inline">
              Save Flat 20%:
            </span>
            <button
              onClick={copyCouponCode}
              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 px-3 py-1 rounded-xl text-xs font-black tracking-wider transition-all active:scale-95"
              title="Click to copy coupon code"
            >
              <span>CODE: <strong className="text-rose-600">KIDZ20</strong></span>
              {copiedCoupon ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-rose-500" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* FOREGROUND SLIDE CONTENT (Directly on Image Canvas, No Bounding Card Box) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full flex-1 flex flex-col justify-center">
        
        {/* Main Content Area Directly Over Image */}
        <div className="max-w-2xl text-left">
          
          {/* Dynamic Pill Badge Directly on Image */}
          <div
            key={`badge-${currentSlide}`}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-rose-200/90 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black mb-4 shadow-sm animate-fadeIn"
          >
            <span className="text-base">{slides[currentSlide].badgeIcon}</span>
            <span>{slides[currentSlide].badge}</span>
          </div>

          {/* Dynamic Headline directly on Image */}
          <h1
            key={`title-${currentSlide}`}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] drop-shadow-xs animate-fadeIn"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Dynamic Tagline DIRECTLY ON THE IMAGE */}
          <div
            key={`tagline-${currentSlide}`}
            className="mt-4 sm:mt-5 animate-fadeIn"
          >
            <p className="text-base sm:text-lg lg:text-xl text-slate-800 font-semibold leading-relaxed drop-shadow-xs border-l-4 border-red-600 pl-4 py-1 bg-white/40 backdrop-blur-xs rounded-r-2xl max-w-xl">
              {slides[currentSlide].tagline}
            </p>
          </div>

          {/* Feature Tag directly on Image */}
          <div
            key={`feature-${currentSlide}`}
            className="mt-4 inline-flex items-center gap-2 bg-white/85 backdrop-blur-md text-slate-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl border border-rose-200/80 shadow-xs animate-fadeIn"
          >
            <Sparkles className="w-4 h-4 text-rose-600 fill-rose-100" />
            <span>{slides[currentSlide].featureTag}</span>
          </div>

          {/* SHOP BUTTON + Action Buttons Directly on Image */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={() => handleCtaClick(slides[currentSlide].category)}
              className="px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-rose-600/35 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 active:scale-95 group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              <span>{slides[currentSlide].ctaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleCtaClick('all')}
              className="px-6 py-4 bg-white/90 hover:bg-white text-rose-700 font-bold text-sm sm:text-base rounded-2xl border-2 border-rose-200 hover:border-rose-400 shadow-md backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>View Full Catalog</span>
            </button>
          </div>

          {/* Perks Strip directly on image */}
          <div className="mt-7 pt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-left">
            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-100 shadow-xs">
              <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[11px] leading-tight">
                <span className="font-extrabold text-slate-900 block">Free Express Shipping</span>
                <span className="text-slate-500">Orders Over ₹499</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-100 shadow-xs">
              <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[11px] leading-tight">
                <span className="font-extrabold text-slate-900 block">7-Day Free Returns</span>
                <span className="text-slate-500">100% Hassle-Free</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-100 shadow-xs">
              <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] sm:text-[11px] leading-tight">
                <span className="font-extrabold text-slate-900 block">100% Child Safe</span>
                <span className="text-slate-500">Certified Non-Toxic</span>
              </div>
            </div>
          </div>

        </div>

        {/* FLOATING TAGLINE STAMP DIRECTLY ON THE IMAGE (Right Side) */}
        <div className="hidden lg:flex absolute bottom-12 right-12 z-20 max-w-xs items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-2xl shadow-rose-950/15 pointer-events-none select-none animate-fadeIn">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-white flex items-center justify-center font-black text-xl shadow-md flex-shrink-0">
            {slides[currentSlide].badgeIcon}
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 font-black text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 fill-rose-500" />
              <span>KidzGem Signature</span>
            </div>
            <p className="text-xs font-black text-slate-900 leading-snug mt-0.5">
              {slides[currentSlide].featureTag}
            </p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              Dual INR/USD Pricing • Verified Safe
            </p>
          </div>
        </div>

      </div>

      {/* SLIM AUTO-TIMER PROGRESS BAR AT BOTTOM EDGE */}
      <div className="absolute bottom-0 left-0 right-0 z-30 w-full bg-black/10 h-1 overflow-hidden">
        <div
          className="bg-gradient-to-r from-red-600 via-rose-500 to-red-600 h-full transition-all duration-75 ease-linear"
          style={{ width: `${slideProgress}%` }}
        ></div>
      </div>

    </section>
  );
};
