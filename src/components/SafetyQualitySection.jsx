import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';

export const SafetyQualitySection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden border-t border-rose-100">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-100/80 border border-rose-300 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Tested & Certified • Parent Peace of Mind</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Why 50,000+ Parents <span className="text-rose-600">Choose KidzGem</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            We know nothing matters more than your child's safety and happiness. That's why every KidzGem product passes stringent child-safety benchmarks.
          </p>
        </div>

        {/* Bento Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Safety Certification */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                100% BIS Certified & Non-Toxic
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Engineered with BPA-free, food-grade ABS and organic dyes. Smooth rounded corners with zero sharp edges.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-rose-50 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Govt. Lab Tested</span>
            </div>
          </div>

          {/* Card 2: 48h Dispatch */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Pan-India Express Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Shipped directly from our central fulfillment hub in Surat, Gujarat. Free tracked delivery on orders above ₹499.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-rose-50 flex items-center gap-1.5 text-xs font-bold text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Real-Time Tracking SMS</span>
            </div>
          </div>

          {/* Card 3: 7-Day Replacement */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                7-Day Easy Replacement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Damaged box or missing battery? Zero hassle! We dispatch an instant free replacement without complicated returns.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-rose-50 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Zero-Questions Guarantee</span>
            </div>
          </div>

          {/* Card 4: Real Human Support */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Direct Parent Helpline
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Speak directly with our Indian support team. Reach us 7 days a week on phone or WhatsApp at <span className="font-bold text-slate-900">+91 99996 59104</span>.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-rose-50 flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Instant WhatsApp & Call</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
