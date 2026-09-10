import React from 'react';
import { Sparkles, Heart, Camera, Star, CheckCircle2 } from 'lucide-react';

const MOMENTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
    title: 'Ayaan with his Bubble Gun',
    parent: 'Pooja Sharma',
    city: 'Mumbai',
    quote: 'Never seen him laugh this much in our garden! The lights and bubbles are pure magic.',
    likes: 342,
    tag: '#KidzGemBubbleFun'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    title: 'Ananya & Her Wooden Express',
    parent: 'Kavita Iyer',
    city: 'Bangalore',
    quote: 'Smooth solid beechwood, no sharp edges. Beautiful screen-free quality.',
    likes: 289,
    tag: '#ScreenFreeJoy'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80',
    title: 'Rohan Racing The TurboDrift Buggy',
    parent: 'Vikram Joshi',
    city: 'Pune',
    quote: '25 km/h is no joke! It tackles grass and gravel like a beast.',
    likes: 415,
    tag: '#TurboRacers'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    title: 'Siya Building Her Magna Castle',
    parent: 'Neha Patel',
    city: 'Surat',
    quote: 'Delivered in 2 days from Surat! MagnaTiles keep her focused for hours.',
    likes: 512,
    tag: '#LittleArchitect'
  }
];

export const CommunityGallery = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span>Community Love • #KidzGemMoments</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Spreading Smiles Across <span className="text-rose-600">50,000+ Indian Homes</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Tag us <strong className="text-rose-600">@kidzgem.india</strong> on Instagram to be featured on our wall of joy!
          </p>
        </div>

        {/* Bento Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOMENTS.map((moment) => (
            <div
              key={moment.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col aspect-4/5 cursor-pointer hover:-translate-y-2"
            >
              <img
                src={moment.image}
                alt={moment.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Top Tag & Like Count */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                  {moment.tag}
                </span>
                <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>{moment.likes}</span>
                </div>
              </div>

              {/* Bottom Quote & Details */}
              <div className="relative z-10 mt-auto p-5 text-left text-white space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-rose-100 italic font-medium line-clamp-2">
                  "{moment.quote}"
                </p>

                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-white">{moment.parent}</span>
                    <span className="text-rose-200 text-[10px] ml-1.5">• {moment.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
