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
    <div className="bg-[#FDFCFD] min-h-screen py-8 sm:py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HERO BANNER WITH BACKGROUND IMAGE */}
        <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex items-center p-8 sm:p-14 lg:p-16 shadow-2xl shadow-rose-950/20">
          
          {/* Background Photo of Kids Playing & Learning */}
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1920&q=85"
            alt="Children Playing With Wooden Toys and Blocks"
            className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
          />

          {/* Aesthetic Gradient Scrim (Red & Rose to Translucent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-rose-900/80 via-55% to-rose-900/35"></div>

          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-3xl space-y-4 text-left text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Official KidzGem Story</span>
            </div>
            
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] drop-shadow-md"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              Where Every Moment of Play <br />
              <span className="text-amber-300 underline decoration-wavy decoration-white/40">Sparkles with Joy</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-rose-100 font-semibold leading-relaxed max-w-2xl pt-2 drop-shadow-xs">
              KidzGem was born out of a simple belief: that toys should nurture children’s boundless creativity, encourage screen-free connection, and deliver pure, wholesome smiles with certified child safety at heart.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-8 py-3.5 bg-white text-rose-700 hover:bg-rose-50 font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-rose-600" />
                <span>Explore Our Toys</span>
                <ArrowRight className="w-4 h-4 text-rose-600" />
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="px-6 py-3.5 bg-rose-950/40 hover:bg-rose-950/60 border border-white/40 backdrop-blur-sm text-white font-bold text-sm rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                <span>Talk to Our Family Care</span>
              </button>
            </div>
          </div>

          {/* Floating Aesthetic Badge on Right Side of Banner Image */}
          <div className="hidden lg:flex absolute bottom-8 right-8 z-10 items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/80 shadow-xl pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-white flex items-center justify-center font-black text-lg shadow-xs">
              🧸
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-wider text-rose-600">KidzGem Heritage</p>
              <p className="text-xs font-black text-slate-800">100% Non-Toxic & Child-Safe</p>
            </div>
          </div>

        </div>

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

        {/* WHY PARENTS CHOOSE KIDZGEM (DETAILED SECTION) */}
        <div className="bg-rose-50/50 rounded-3xl p-8 sm:p-12 border border-rose-200/80 text-left">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-black uppercase tracking-wider text-rose-600">The KidzGem Difference</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Designed For Little Wonders, Trusted By Loving Parents
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We understand that choosing toys for your little ones is deeply personal. That’s why we test every product for real durability, non-toxic finishes, and educational value before it reaches your door. Whether it’s our viral multi-hole bubble gun, high-torque drift car, or sensory wooden express train, quality is never compromised.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Dual INR (₹) and USD ($) support</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>UPI, Card, Net Banking & COD options</span>
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

            <div className="pt-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>Browse All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
