import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Sparkles } from 'lucide-react';

export const Perks = () => {
  const perks = [
    {
      icon: ShieldCheck,
      title: '100% Certified Safe',
      description: 'Tested & certified non-toxic, food-grade ABS, BPA-free & rounded edges.',
      color: 'from-red-500 to-rose-600'
    },
    {
      icon: Truck,
      title: 'Free Express Delivery',
      description: 'Free shipping on orders over ₹499. Pan-India safe dispatch in 24-48 hrs.',
      color: 'from-amber-500 to-rose-500'
    },
    {
      icon: RotateCcw,
      title: '7-Day Free Replacement',
      description: 'Hassle-free replacement guarantee directly handled by KidzGem care.',
      color: 'from-rose-500 to-red-600'
    },
    {
      icon: Headphones,
      title: 'Direct Helpline Care',
      description: 'Call or WhatsApp +91 99996 59104 (Mon–Sat 10am–7pm IST).',
      color: 'from-red-600 to-rose-700'
    }
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-white via-rose-50/30 to-white border-y border-rose-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-600">
            <Sparkles className="w-3.5 h-3.5 fill-rose-500" />
            <span>The KidzGem Promise</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            Why Families Love Shopping With Us
          </h3>
        </div>

        {/* 4 Bento Perks Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <div
                key={index}
                className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-rose-100/90 shadow-sm hover:border-rose-300 hover:shadow-xl hover:shadow-rose-600/10 hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${perk.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-base text-slate-900 mb-1.5" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    {perk.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {perk.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-[10px] font-bold text-rose-600">
                  <span>Verified Guarantee</span>
                  <span>✓</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
