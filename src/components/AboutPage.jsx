import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Truck,
  Award,
  Users,
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  Phone,
  Mail,
  RotateCcw
} from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#FDFCFD] min-h-screen animate-fadeIn">
      
      {/* FULL-SCREEN HERO BANNER */}
      <div className="relative w-full min-h-[72vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden mb-12 sm:mb-16">
        <img
          src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1920&q=85"
          alt="Children Playing With Wooden Toys and Blocks"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-95"
        />
        {/* Multi-Layered Cinematic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-rose-950/85 to-red-950/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/40"></div>

        {/* Ambient Depth Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-16">
          
          {/* Aesthetic Floating Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-2xl">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent">
              The KidzGem Story • Certified Child Safety At Heart
            </span>
          </div>

          {/* Dramatic Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.06] drop-shadow-2xl break-words"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Where Every Playtime <br />
            <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
              Sparkles With Pure Wonder
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-rose-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            KidzGem was born out of a simple belief: that toys should nurture children’s boundless creativity, encourage screen-free connection, and deliver wholesome smiles with certified BIS safety at heart.
          </p>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-center flex-wrap gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore All 48 Toys</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white font-black text-xs rounded-2xl transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95 shadow-lg"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>Meet Family Support</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-16">

        {/* MISSION & VALUES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-2xl shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              100% Certified Safe & Non-Toxic
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every single toy in our collection is rigorously tested for non-toxic materials, BPA-free food-grade ABS, and smooth rounded edges to guarantee safe exploration for curious hands.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-2xl shadow-xs">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              STEM & Creative Imagination
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              From magnetic building tiles and motorized solar projectors to high-speed stunt drift cars, our toys empower spatial reasoning, hand-eye coordination, and joyful learning.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-lg shadow-rose-950/5 text-left space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-black text-2xl shadow-xs">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Zero-Friction Parent Friendly
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No tedious passwords or account sign-ups. Parents can shop with speed, direct Add to Cart to UPI/Card/COD checkout, express door dispatch, and easy 7-day hassle-free replacements.
            </p>
          </div>
        </div>

        {/* NUMBERS BANNER */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-rose-100 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-rose-600 block" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              10,000+
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">Happy Kids & Families</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-rose-600 block" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              4.9 / 5
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">Average Parent Rating</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-rose-600 block" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              24-48 hrs
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">Express Order Dispatch</span>
          </div>

          <div className="space-y-1">
            <span className="text-3xl sm:text-5xl font-black text-rose-600 block" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              100%
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">Child-Safe Materials</span>
          </div>
        </div>

        {/* WHY PARENTS CHOOSE KIDZGEM (DETAILED SECTION WITH PICTURE) */}
        <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-rose-200/80 text-left overflow-hidden relative shadow-lg shadow-rose-950/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Story & Trust Points */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-100/70 px-3.5 py-1.5 rounded-full border border-rose-200">
                The KidzGem Difference
              </span>
              
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-[1.15]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Designed For Little Wonders, <br className="hidden sm:inline" />
                <span className="text-rose-600">Trusted By Loving Parents</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                We understand that choosing toys for your little ones is deeply personal. That’s why we test every product for real durability, non-toxic finishes, and educational value before it reaches your door. Whether it’s our viral multi-hole bubble gun, high-torque drift car, or sensory wooden express train, quality is never compromised.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Dual INR (₹) and USD ($) support</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>UPI, Card, Net Banking &amp; COD options</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Direct helpline support: +91 99996 59104</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Free Express Shipping on orders over ₹499</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore All Toys</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-6 py-3.5 bg-white hover:bg-rose-50 text-slate-800 hover:text-rose-600 font-bold text-xs rounded-2xl border border-rose-200 transition-all shadow-xs cursor-pointer"
                >
                  <span>Have Questions? Contact Us</span>
                </button>
              </div>
            </div>

            {/* Right Column: High-Res Editorial Photography with Floating Badges */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/15 border-2 border-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1000&q=85"
                  alt="Loving Parent and Happy Child Playing with Educational Toys"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-rose-100/80 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-white flex items-center justify-center font-black text-lg shadow-xs flex-shrink-0">
                    💖
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wider text-rose-600">Parent Approved</p>
                    <p className="text-xs font-black text-slate-900 truncate">10,000+ Happy Playtimes Across India</p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Badge on Top-Right */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-200 shadow-md flex items-center gap-1.5 text-[11px] font-black text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>BIS Safety Tested</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
