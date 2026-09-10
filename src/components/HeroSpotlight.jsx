import React from 'react';
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
  Flame
} from 'lucide-react';

export const HeroSpotlight = () => {
  const { addToCart, buyNow, formatPrice } = useStore();

  // Find the authentic KidzGem Bubble Gun product
  const bubbleGun = PRODUCTS.find((p) => p.id === 'toy-1') || PRODUCTS[0];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF5F6] via-white to-[#FFF5F6] relative overflow-hidden border-y border-rose-100/70">
      
      {/* Ambient background blur circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-2 bg-rose-100/80 border border-rose-300/80 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>Trending Viral Sensation</span>
          </div>
          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Meet The Famous <span className="text-rose-600">KidzGem Bubble Gun</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-medium">
            Over 5,000+ sold across India! Unleash thousands of rainbow bubbles per minute with built-in LED starlight.
          </p>
        </div>

        {/* Bento Product Spotlight Card */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-rose-100/90 shadow-2xl shadow-rose-950/5 overflow-hidden p-6 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Product Visual Frame with Floating Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Decorative Circular Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/50 to-red-100/30 rounded-full blur-2xl transform scale-90"></div>

              {/* Product Image Frame */}
              <div className="relative z-10 w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-rose-50/60 to-white p-6 sm:p-8 border border-rose-100 shadow-xl flex items-center justify-center group">
                <img
                  src={bubbleGun.image}
                  alt="KidzGem Multi-Hole Bubble Gun"
                  className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 ease-out"
                />

                {/* Floating Real-Time Discount Ribbon */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-rose-600/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>37% OFF • FLASH DEAL</span>
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
                  <span className="text-xs font-black text-slate-900">4.9 / 5.0</span>
                  <span className="text-xs font-semibold text-slate-400">(184 Parent Reviews)</span>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  69-Hole Starlight Bubble Cannon
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Engineered with 69 precision airflow nozzles, this viral bubble gun launches an immersive cloud of over 10,000 bubbles every minute. Equipped with bright LED night lights for unforgettable evening playtime in gardens and parks.
                </p>
              </div>

              {/* 4 Feature Badges Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 bg-rose-50/60 border border-rose-100 p-3 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black text-sm shadow-2xs flex-shrink-0">
                    🫧
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">69 Airflow Ports</h5>
                    <p className="text-[10px] text-slate-500 font-medium">10,000+ bubbles/min</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-rose-50/60 border border-rose-100 p-3 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black text-sm shadow-2xs flex-shrink-0">
                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">USB Rechargeable</h5>
                    <p className="text-[10px] text-slate-500 font-medium">45+ mins play battery</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-rose-50/60 border border-rose-100 p-3 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black text-sm shadow-2xs flex-shrink-0">
                    🌟
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">LED Starlight</h5>
                    <p className="text-[10px] text-slate-500 font-medium">Glows in the dark</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-rose-50/60 border border-rose-100 p-3 rounded-2xl">
                  <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center font-black text-sm shadow-2xs flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">100% Non-Toxic</h5>
                    <p className="text-[10px] text-slate-500 font-medium">BPA-Free Safe ABS</p>
                  </div>
                </div>
              </div>

              {/* Pricing & Direct Checkout Actions */}
              <div className="pt-4 border-t border-rose-100">
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="text-3xl sm:text-4xl font-black text-rose-600"
                    style={{ fontFamily: 'Fredoka, sans-serif' }}
                  >
                    {formatPrice(bubbleGun.price)}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    {formatPrice(bubbleGun.originalPrice)}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Save {formatPrice(bubbleGun.originalPrice - bubbleGun.price)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => buyNow(bubbleGun)}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95 group"
                  >
                    <Zap className="w-4 h-4 fill-amber-300 text-amber-300 group-hover:scale-125 transition-transform" />
                    <span>Instant Checkout • {formatPrice(bubbleGun.price)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => addToCart(bubbleGun, 1)}
                    className="py-4 px-6 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-sm rounded-2xl border border-rose-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Free Delivery Promise */}
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Eligible for Free Shipping Over ₹499 • Dispatched in 24 hrs from Delhi</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
