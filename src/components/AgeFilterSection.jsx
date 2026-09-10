import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Baby, Palette, Rocket, Zap, ShieldCheck } from 'lucide-react';

const AGE_BRACKETS = [
  {
    id: 'age-1-3',
    range: 'Ages 1 — 3',
    title: 'Toddlers & Sensory Discovery',
    subtitle: 'Nurturing curiosity with soft textures, tactile grasping, and safe organic materials.',
    category: 'toys',
    stage: 'Stage 1 • Early Motor Skills',
    icon: Baby,
    popularItem: 'Wooden Express & Fluffy Bunny Plush',
    colorClasses: {
      bg: 'bg-gradient-to-br from-rose-50 via-white to-rose-100/40',
      border: 'border-rose-200/80 hover:border-rose-400',
      badge: 'bg-rose-100 text-rose-700 border-rose-200',
      accent: 'text-rose-600',
      ring: 'group-hover:ring-rose-200/50'
    },
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'age-4-6',
    range: 'Ages 4 — 6',
    title: 'Little Creators & Playful Spark',
    subtitle: 'Unleash laughter and creative imagination with collectible wind-up toys and washable art.',
    category: 'toys',
    stage: 'Stage 2 • Creative Expression',
    icon: Palette,
    popularItem: 'Vintage Clockwork Marching Tin Robot',
    colorClasses: {
      bg: 'bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40',
      border: 'border-amber-200/80 hover:border-amber-400',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      accent: 'text-amber-600',
      ring: 'group-hover:ring-amber-200/50'
    },
    image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'age-7-10',
    range: 'Ages 7 — 10',
    title: 'STEM Innovators & Problem Solvers',
    subtitle: 'Inspire scientific thinking with revolving planetariums, 3D magnetic tiles, and logic sets.',
    category: 'learning-sets',
    stage: 'Stage 3 • Hands-on STEM',
    icon: Rocket,
    popularItem: 'Revolving Solar Planetarium Projector',
    colorClasses: {
      bg: 'bg-gradient-to-br from-emerald-50/80 via-white to-emerald-100/40',
      border: 'border-emerald-200/80 hover:border-emerald-400',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      accent: 'text-emerald-600',
      ring: 'group-hover:ring-emerald-200/50'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'age-10-plus',
    range: 'Ages 10+',
    title: 'High-Speed Racers & Tabletop Pros',
    subtitle: 'Thrilling 25 km/h all-terrain drift buggies, 360° stunt flippers, and family game nights.',
    category: 'remote-car',
    stage: 'Stage 4 • Reflexes & Strategy',
    icon: Zap,
    popularItem: 'TurboDrift 4WD High-Speed Monster Buggy',
    colorClasses: {
      bg: 'bg-gradient-to-br from-blue-50/80 via-white to-indigo-100/40',
      border: 'border-blue-200/80 hover:border-blue-400',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      accent: 'text-blue-600',
      ring: 'group-hover:ring-blue-200/50'
    },
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80'
  }
];

export const AgeFilterSection = () => {
  const { setSelectedCategory } = useStore();

  const handleAgeClick = (category) => {
    setSelectedCategory(category);
    const catalogEl = document.getElementById('product-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-rose-100/80">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/80 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 fill-rose-500 animate-pulse" />
            <span>Developmental Milestones • Tailored Play</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Shop By Age & <span className="text-rose-600">Growing Milestones</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Every age is a new adventure. Find the perfect certified toy matched to your child's developmental stage, cognitive skills, and motor reflexes.
          </p>
        </div>

        {/* 4 Bento Age Milestone Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGE_BRACKETS.map((bracket) => {
            const IconComponent = bracket.icon;
            return (
              <div
                key={bracket.id}
                onClick={() => handleAgeClick(bracket.category)}
                className={`group relative rounded-3xl p-6 sm:p-7 border ${bracket.colorClasses.border} ${bracket.colorClasses.bg} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-2 hover:ring-4 ${bracket.colorClasses.ring}`}
              >
                {/* Top Badge & Age Range */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border ${bracket.colorClasses.badge}`}
                    >
                      {bracket.stage}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                      <IconComponent className={`w-5 h-5 ${bracket.colorClasses.accent}`} />
                    </div>
                  </div>

                  {/* High-Resolution Visual Thumbnail */}
                  <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white shadow-inner border border-white/80">
                    <img
                      src={bracket.image}
                      alt={bracket.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2.5 left-3 text-white text-lg sm:text-xl font-black drop-shadow-md" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      {bracket.range}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 pt-1 text-left">
                    <h3
                      className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors leading-snug"
                      style={{ fontFamily: 'Fredoka, sans-serif' }}
                    >
                      {bracket.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {bracket.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Milestone Highlight & CTA Button */}
                <div className="pt-6 mt-6 border-t border-slate-200/50 space-y-3 text-left">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">Top: {bracket.popularItem}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-black text-slate-900 group-hover:text-rose-600 pt-1">
                    <span>Explore Collection</span>
                    <div className="w-7 h-7 rounded-full bg-white group-hover:bg-rose-600 text-slate-700 group-hover:text-white shadow-xs flex items-center justify-center transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
