import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye, Zap, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    buyNow,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    formatPrice
  } = useStore();

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const savings = product.originalPrice - product.price;

  return (
    <div className="group relative bg-white rounded-3xl border border-rose-100/90 hover:border-rose-300 shadow-sm hover:shadow-2xl hover:shadow-rose-600/15 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5">
      
      {/* 1. TOP IMAGE CONTAINER */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-rose-50/20 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => setQuickViewProduct(product)}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Top-Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md shadow-rose-600/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>{product.tag}</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-white/95 backdrop-blur-md text-rose-600 border border-rose-200 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-rose-100 flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-white shadow-md transition-all duration-200 z-10 active:scale-90"
          title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>

        {/* Floating Quick View Pill (Hover reveal) */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute inset-x-4 bottom-3 py-2 bg-white/95 backdrop-blur-md text-slate-900 hover:text-rose-600 font-black text-xs rounded-2xl shadow-lg border border-rose-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5 z-10"
        >
          <Eye className="w-3.5 h-3.5 text-rose-500" />
          <span>Quick View</span>
        </button>

        {/* Age Group Tag on Bottom-Left */}
        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg shadow-2xs">
          {product.ageGroup}
        </span>
      </div>

      {/* 2. CARD CONTENT BODY */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-slate-800 text-xs font-black">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title with Fredoka Display Font */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-black text-sm sm:text-base text-slate-900 line-clamp-2 hover:text-rose-600 cursor-pointer transition-colors leading-snug"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Brief Description */}
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 3. PRICE & DUAL ACTION BUTTONS */}
        <div className="mt-4 pt-3 border-t border-rose-100/70">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-rose-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save {formatPrice(savings)}
              </span>
            )}
          </div>

          {/* Direct Zero-Login Action Buttons: Add to Cart + Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs rounded-2xl border border-rose-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              title="Add to Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => buyNow(product)}
              className="px-3 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-2xl shadow-md shadow-rose-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 group"
              title="Direct to Checkout"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white group-hover:scale-110 transition-transform" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
