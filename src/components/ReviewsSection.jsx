import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles, Heart } from 'lucide-react';

export const ReviewsSection = () => {
  const reviews = [
    {
      name: 'Priya Sharma',
      role: 'Mother of 2 (Ages 4 & 7)',
      rating: 5,
      product: 'KidzGem Multi-Hole Bubble Gun',
      comment: 'The bubble gun was the star of our weekend garden party! Thousands of colorful bubbles every minute, no leaks, and rechargeable battery lasts long.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      badge: 'Verified Indian Buyer'
    },
    {
      name: 'Rohan Mehta',
      role: 'Father of 8-year-old',
      rating: 5,
      product: 'TurboDrift 4WD High-Speed Stunt Car',
      comment: 'This RC drift car is virtually indestructible! My son drove it over lawns, gravel, and doorsteps. 360° spins are super smooth.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      badge: 'Verified Indian Buyer'
    },
    {
      name: 'Dr. Ananya Sen',
      role: 'Child Psychologist & Educator',
      rating: 5,
      product: '3D Magnetic Castle Building Tiles (100 Pcs)',
      comment: 'The STEM magnetic tiles are top tier. Zero chemical odor, certified non-toxic food-grade ABS, and high magnetic strength. Screen-free bliss!',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      badge: 'Verified Educator'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-rose-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>10,000+ Happy Families Across India</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Loved by <span className="text-rose-600">Kids</span>, Trusted by <span className="text-rose-600">Parents</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Real experiences from families who believe in safe, certified, and imaginative screen-free play.
          </p>
        </div>

        {/* 3 Luxury Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-rose-100/90 shadow-sm hover:shadow-2xl hover:shadow-rose-600/10 hover:border-rose-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-rose-200 group-hover:text-rose-400 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-rose-50 flex items-center gap-3.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-rose-200 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs sm:text-sm text-slate-900 truncate" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      {rev.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  </div>
                  <span className="text-[11px] text-slate-400 block truncate">{rev.role}</span>
                  <span className="text-[10px] font-bold text-rose-600 block truncate mt-0.5">
                    {rev.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-12 pt-8 border-t border-rose-100 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-rose-600 font-black text-lg">4.9 / 5</span>
            <span>Average Parent Rating</span>
          </div>
          <span className="hidden sm:inline opacity-30">•</span>
          <div className="flex items-center gap-2">
            <span className="text-emerald-600 font-black text-lg">100%</span>
            <span>Certified Non-Toxic</span>
          </div>
          <span className="hidden sm:inline opacity-30">•</span>
          <div className="flex items-center gap-2">
            <span className="text-rose-600 font-black text-lg">7-Day</span>
            <span>Hassle-Free Replacement</span>
          </div>
        </div>

      </div>
    </section>
  );
};
