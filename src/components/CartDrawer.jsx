import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  Lock,
  Truck
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    isFreeShipping,
    freeShippingThreshold,
    totalAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    couponMessage,
    setIsCheckoutOpen,
    setDirectCheckoutItem,
    formatPrice
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    applyCoupon(inputCode);
  };

  const handleProceedToCheckout = () => {
    setDirectCheckoutItem(null); // use full cart
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-rose-100 animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Shopping Bag
                </h3>
                <span className="text-xs text-rose-600 font-bold">
                  {cart.reduce((a, b) => a + b.quantity, 0)} {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-rose-50/70 p-4 border-b border-rose-100">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <div className="flex items-center gap-1.5 text-rose-700">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>
                  {isFreeShipping
                    ? '🎉 You have unlocked FREE Express Shipping!'
                    : `Add ${formatPrice(remainingForFreeShipping)} more for FREE Shipping!`}
                </span>
              </div>
              <span className="text-rose-600 font-black text-[11px]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-rose-200/80 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-rose-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-rose-50">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Your bag is empty!
                </h4>
                <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                  Looks like you haven't added any Bubble Guns, toys, or learning sets yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full shadow-md shadow-rose-600/20 transition-all"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-center">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-2xl object-cover bg-rose-50 border border-rose-100 flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                      {item.categoryLabel}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 truncate" title={item.name}>
                      {item.name}
                    </h5>
                    <div className="text-xs font-black text-rose-600 mt-1">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-rose-200 rounded-lg bg-white shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded-l-lg text-slate-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-black text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded-r-lg text-slate-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors ml-auto"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-rose-100 bg-white space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold">
                      <Tag className="w-3.5 h-3.5 text-rose-600" />
                      <span>{couponCode} applied</span>
                      <span className="text-emerald-700 font-black">(-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 hover:text-rose-800 text-xs font-bold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rose-400" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Coupon: KIDZ20"
                        className="w-full pl-8 pr-2 py-2 bg-rose-50/50 border border-rose-200 rounded-xl text-xs placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400 uppercase font-bold"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMessage && !couponCode && (
                  <span className={`text-[11px] block mt-1 font-semibold ${couponMessage.valid ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {couponMessage.text}
                  </span>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-rose-50">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 uppercase font-black text-[11px]">FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-rose-100">
                  <span>Total Amount</span>
                  <span className="text-rose-600 font-black text-xl">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Direct Checkout Button (No Login / Direct to Payment) */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-sm rounded-2xl shadow-lg shadow-rose-600/30 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 group"
              >
                <Lock className="w-4 h-4 text-rose-200" />
                <span>Direct Checkout — {formatPrice(totalAmount)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-slate-400 font-medium">
                🔒 Direct Guest Checkout • No Login Needed • Instant Confirmation
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
