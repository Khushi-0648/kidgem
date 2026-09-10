import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Building,
  Printer,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  User,
  Clock,
  Package
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    directCheckoutItem,
    setDirectCheckoutItem,
    cart,
    clearCart,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    couponCode,
    currency,
    formatPrice,
    freeShippingThreshold
  } = useStore();

  // Active items being purchased: either the single "Buy Now" item or all cart items
  const items = directCheckoutItem ? [directCheckoutItem] : cart;

  // Recalculate if direct item
  const itemSubtotal = directCheckoutItem
    ? directCheckoutItem.price * directCheckoutItem.quantity
    : subtotal;
  const itemDiscount = directCheckoutItem
    ? (itemSubtotal * (couponCode ? 20 : 0)) / 100
    : discountAmount;
  const itemShipping = itemSubtotal >= freeShippingThreshold || couponCode === 'FREESHIP' ? 0 : (currency === 'USD' ? 4.99 * 80 : 99);
  const finalTotal = Math.max(0, itemSubtotal - itemDiscount + itemShipping);

  // Form states matching Indian & Global address formats
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 99996 59104',
    address: 'Flat 402, Lotus Residency, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001'
  });

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8892',
    name: 'AARAV SHARMA',
    expiry: '08/28',
    cvv: '849'
  });

  // Processing & Success states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#FF4D6D', '#FFB703', '#FFFFFF', '#06D6A0']
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E11D48', '#FF4D6D', '#FFFFFF']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E11D48', '#FF4D6D', '#FFFFFF']
        });
      }, 300);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStage('Connecting to KidzGem Secure Gateway (256-bit SSL)...');

    setTimeout(() => {
      setProcessingStage('Verifying UPI / Card credentials with bank...');
    }, 900);

    setTimeout(() => {
      setProcessingStage('Authorizing payment transaction...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = 'KG-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomOrderId);
      setOrderConfirmed(true);
      triggerConfetti();
      clearCart();
    }, 2600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setDirectCheckoutItem(null);
    setOrderConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-rose-100 my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl tracking-tight leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {orderConfirmed ? 'Order Confirmed! 🎉' : 'KidzGem Express Direct Payment'}
              </h3>
              <p className="text-xs text-rose-100 font-medium">
                {orderConfirmed ? `Thank you for shopping at KidzGem! Order #${orderId}` : 'Instant guest checkout • Zero login or registration needed'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* PROCESSING SCREEN */}
        {isProcessing && (
          <div className="py-24 px-6 text-center bg-white flex flex-col items-center justify-center space-y-6 animate-fadeIn">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-rose-100 border-t-rose-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-rose-600 font-bold">
                <Lock className="w-7 h-7 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 max-w-sm">
              <h4 className="text-xl font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Securing Your Transaction
              </h4>
              <p className="text-sm font-semibold text-rose-600 animate-pulse">
                {processingStage}
              </p>
              <p className="text-xs text-slate-400">
                Please do not refresh or close the browser.
              </p>
            </div>
          </div>
        )}

        {/* ORDER SUCCESS SCREEN */}
        {orderConfirmed && !isProcessing && (
          <div className="p-6 sm:p-10 space-y-8 animate-fadeIn">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-emerald-100 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs uppercase tracking-widest font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                Payment Successful
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Woohoo! Your Toys & Gems Are On The Way! 🚀
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Order confirmation and tracking invoice sent to <strong className="text-slate-900">{formData.email}</strong>
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-rose-50/40 rounded-3xl p-6 border border-rose-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Order ID</span>
                <span className="text-sm font-black text-rose-600 block">{orderId}</span>
                <span className="text-[11px] text-slate-500">Paid via {paymentMethod.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Delivering To</span>
                <span className="font-bold text-slate-800 block">{formData.name}</span>
                <span className="text-slate-500 block">{formData.address}, {formData.city}, {formData.state} - {formData.zip}</span>
                <span className="text-slate-500 block">{formData.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase block mb-1">Estimated Arrival</span>
                <span className="text-sm font-black text-slate-900 block">Within 2-3 Business Days</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <Truck className="w-3.5 h-3.5" /> Express Safe Delivery
                </span>
              </div>
            </div>

            {/* Shipment Tracker */}
            <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-2xs">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                KidzGem Shipment Status
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold mb-1 shadow-xs">
                    ✓
                  </div>
                  <span className="font-bold text-slate-900">Placed</span>
                  <span className="text-[10px] text-slate-400">Today</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 border-2 border-rose-600 flex items-center justify-center font-bold mb-1 animate-pulse">
                    <Package className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-rose-600">Packing</span>
                  <span className="text-[10px] text-slate-400">In Progress</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold mb-1">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-600">Dispatched</span>
                  <span className="text-[10px] text-slate-400">Tomorrow</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold mb-1">
                    🎁
                  </div>
                  <span className="font-medium text-slate-600">Delivered</span>
                  <span className="text-[10px] text-slate-400">Doorstep</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-rose-50 text-slate-700 font-bold text-xs rounded-xl border border-rose-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice Receipt</span>
              </button>

              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/25 transition-all"
              >
                Continue Shopping More Gems
              </button>
            </div>
          </div>
        )}

        {/* CHECKOUT & PAYMENT FORM */}
        {!isProcessing && !orderConfirmed && (
          <form onSubmit={handlePayNow} className="p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Customer & Shipping Details */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Guest Delivery Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">
                      1
                    </span>
                    <h4 className="font-black text-base text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      Delivery & Contact Details
                    </h4>
                    <span className="ml-auto text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Guest Checkout
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                          placeholder="Parent / Guardian Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1">Phone (for Delivery SMS)</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                          placeholder="+91 99996 59104"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-bold mb-1">Email (for Order Invoice)</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-600 font-bold mb-1">Shipping Street Address</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                          placeholder="House/Flat No., Building, Street Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1">City</label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-bold mb-1">PIN / Postal Code</label>
                      <input
                        type="text"
                        required
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-400 focus:outline-hidden font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="pt-4 border-t border-rose-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h4 className="font-black text-base text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      Choose Payment Option
                    </h4>
                  </div>

                  {/* Options Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'upi'
                          ? 'border-rose-600 bg-rose-50/80 text-rose-700 font-bold shadow-xs'
                          : 'border-rose-100 hover:border-rose-300 text-slate-600'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-rose-600" />
                      <span className="text-xs">UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'card'
                          ? 'border-rose-600 bg-rose-50/80 text-rose-700 font-bold shadow-xs'
                          : 'border-rose-100 hover:border-rose-300 text-slate-600'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-rose-600" />
                      <span className="text-xs">Cards</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'netbanking'
                          ? 'border-rose-600 bg-rose-50/80 text-rose-700 font-bold shadow-xs'
                          : 'border-rose-100 hover:border-rose-300 text-slate-600'
                      }`}
                    >
                      <Building className="w-5 h-5 text-rose-600" />
                      <span className="text-xs">Net Banking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                        paymentMethod === 'cod'
                          ? 'border-rose-600 bg-rose-50/80 text-rose-700 font-bold shadow-xs'
                          : 'border-rose-100 hover:border-rose-300 text-slate-600'
                      }`}
                    >
                      <Truck className="w-5 h-5 text-rose-600" />
                      <span className="text-xs">Cash on Deliv</span>
                    </button>
                  </div>

                  {/* Payment Details */}
                  {paymentMethod === 'upi' && (
                    <div className="bg-rose-50/70 rounded-2xl p-5 border border-rose-200 text-center space-y-3">
                      <div className="inline-block bg-white p-3 rounded-2xl border border-rose-200 shadow-md">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=kidzgem@upi&pn=KidzGem&am=379"
                          alt="UPI Payment QR Code"
                          className="w-32 h-32 mx-auto rounded-lg"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 block">UPI ID: kidzgem@upi</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Scan with Google Pay • PhonePe • Paytm • BHIM • Cred</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="bg-gradient-to-br from-rose-900 via-red-800 to-rose-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold tracking-wider text-sm" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            KidzGem Secure
                          </span>
                          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-sm">256-bit</span>
                        </div>
                        <span className="text-xs font-black tracking-widest text-amber-300">RuPay / VISA / MC</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="text-[10px] text-rose-200 block uppercase">Card Number</span>
                          <input
                            type="text"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 w-full text-white font-mono tracking-widest text-sm focus:outline-hidden focus:bg-white/20"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] text-rose-200 block uppercase">Expiry MM/YY</span>
                            <input
                              type="text"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 w-full text-white font-mono text-xs focus:outline-hidden"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-rose-200 block uppercase">CVV</span>
                            <input
                              type="password"
                              maxLength="4"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 w-full text-white font-mono text-xs focus:outline-hidden"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-200 text-xs space-y-2">
                      <label className="font-bold text-slate-700 block">Choose Bank:</label>
                      <select className="w-full p-2.5 bg-white border border-rose-200 rounded-xl font-medium focus:ring-2 focus:ring-rose-400">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Punjab National Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
                      <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Cash on Delivery Available</span>
                        <span>Pay in cash or UPI QR scan when our delivery executive arrives at your doorstep.</span>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Order Items Summary & Pay Button */}
              <div className="lg:col-span-5 bg-rose-50/50 rounded-3xl p-5 sm:p-6 border border-rose-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider mb-4 pb-2 border-b border-rose-100">
                    Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </h4>

                  {/* List of items */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {items.map((it) => (
                      <div key={it.id} className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-rose-100">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <span className="font-bold text-slate-900 truncate block">
                            {it.name}
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            Qty: {it.quantity} × {formatPrice(it.price)}
                          </span>
                        </div>
                        <span className="text-xs font-black text-rose-600">
                          {formatPrice(it.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cost breakdown */}
                  <div className="mt-5 space-y-2 text-xs text-slate-600 pt-4 border-t border-rose-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-900">{formatPrice(itemSubtotal)}</span>
                    </div>

                    {itemDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Discount ({couponCode || 'PROMO'})</span>
                        <span>-{formatPrice(itemDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-bold text-slate-900">
                        {itemShipping === 0 ? (
                          <span className="text-emerald-600 font-black">FREE</span>
                        ) : (
                          formatPrice(itemShipping)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-rose-200">
                      <span>Total Payable</span>
                      <span className="text-rose-600 text-xl font-black">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Pay Now Button */}
                <div className="mt-6 pt-4 border-t border-rose-200">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-base rounded-2xl shadow-xl shadow-rose-600/30 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShieldCheck className="w-5 h-5 text-rose-200" />
                    <span>Pay {formatPrice(finalTotal)} & Confirm Order</span>
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-400 font-medium">
                    <span>🔒 SSL 256-Bit</span>
                    <span>•</span>
                    <span>100% Non-Toxic Guarantee</span>
                    <span>•</span>
                    <span>Free Returns</span>
                  </div>
                </div>

              </div>

            </div>
          </form>
        )}

      </div>
    </div>
  );
};
