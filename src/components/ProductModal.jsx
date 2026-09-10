import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  CheckCircle2,
  Minus,
  Plus
} from 'lucide-react';

export const ProductModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    buyNow,
    wishlist,
    toggleWishlist,
    formatPrice
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const handleAdd = () => {
    addToCart(product, quantity);
    handleClose();
  };

  const handleBuyNow = () => {
    buyNow({ ...product, quantity });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto my-auto shadow-2xl border border-rose-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex items-center justify-center shadow-md border border-rose-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image */}
          <div className="relative bg-rose-50/50 p-6 flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Age */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  {product.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  Ages: {product.ageGroup}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-rose-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm line-through text-slate-400 font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mt-4 space-y-1.5">
                {product.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Safety Badge */}
              <div className="mt-4 p-2.5 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center gap-2 text-xs font-semibold text-rose-800">
                <ShieldCheck className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>100% Non-Toxic • Child Safe Tested • Hypoallergenic</span>
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="mt-6 pt-4 border-t border-rose-100">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold text-slate-600">Quantity:</span>
                <div className="flex items-center border border-rose-200 rounded-full bg-white shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-l-full transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-r-full transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="ml-auto p-2.5 rounded-full border border-rose-200 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className="w-full py-3 bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs sm:text-sm rounded-2xl border-2 border-rose-200 hover:border-rose-400 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-rose-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white text-white" />
                  <span>Buy Now Directly</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
