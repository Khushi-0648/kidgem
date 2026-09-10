import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseUrlRoute, getPathForRoute } from '../utils/routes';
import { PRODUCTS as initialProducts, CATEGORIES as initialCategories } from '../data/products';
import { wpProductService } from '../services/wordpress/productService';
import { wpOrderService } from '../services/wordpress/orderService';
import { wpFormService } from '../services/wordpress/formService';
import { wpCartService } from '../services/wordpress/cartService';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  // Live Products & Categories hydrated from WordPress backend
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [backendStatus, setBackendStatus] = useState({
    connected: false,
    loading: true,
    siteName: 'KidzGem',
    liveProductCount: 0,
    source: 'local'
  });

  // Hydrate from WordPress WooCommerce backend on mount
  useEffect(() => {
    let isMounted = true;
    async function initWordPressBackend() {
      try {
        const conn = await wpProductService.checkConnection();
        if (conn.connected && isMounted) {
          const liveWcProducts = await wpProductService.fetchLiveProducts(50);
          if (isMounted) {
            const merged = wpProductService.mergeCatalog(initialProducts, liveWcProducts);
            setProducts(merged);
            setBackendStatus({
              connected: true,
              loading: false,
              siteName: conn.siteName || 'KidzGem',
              liveProductCount: liveWcProducts.length,
              source: 'wordpress_woocommerce'
            });
            console.log('Connected to WordPress Backend (' + (conn.siteName || 'kidzgem.com') + ') with ' + liveWcProducts.length + ' live products.');
          }
        } else if (isMounted) {
          setBackendStatus({
            connected: false,
            loading: false,
            siteName: 'KidzGem',
            liveProductCount: 0,
            source: 'local_resilient'
          });
        }
      } catch (err) {
        console.warn('WordPress backend offline or unreachable, running in resilient mode:', err.message);
        if (isMounted) {
          setBackendStatus({
            connected: false,
            loading: false,
            siteName: 'KidzGem',
            liveProductCount: 0,
            source: 'local_resilient'
          });
        }
      }
    }

    initWordPressBackend();
    return () => { isMounted = false; };
  }, []);
  // Currency state: 'INR' (default as per kidzgem.com) or 'USD'
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('kidzgem_currency') || 'INR';
    } catch {
      return 'INR';
    }
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kidzgem_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kidzgem_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active page & navigation initialized from browser URL
  const initialRoute = parseUrlRoute();
  const [currentPage, setCurrentPage] = useState(initialRoute.page);
  const [selectedCategory, setSelectedCategory] = useState(initialRoute.category);

  // Sync browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { page, category } = parseUrlRoute();
      setCurrentPage(page);
      if (category) {
        setSelectedCategory(category);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page, category = null, replace = false) => {
    const targetCat = category || (page === 'category-detail' ? selectedCategory : 'all');
    setCurrentPage(page);
    if (page === 'shop' && !category) {
      setSelectedCategory('all');
    } else if (category) {
      setSelectedCategory(category);
    }
    const targetPath = getPathForRoute(page, targetCat);
    if (typeof window !== 'undefined' && (window.location.pathname + window.location.search) !== targetPath) {
      if (replace) {
        window.history.replaceState(null, '', targetPath);
      } else {
        window.history.pushState(null, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active navigation & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(2500);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Promo code & discount
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kidzgem_currency', currency);
    } catch (e) {
      console.error(e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('kidzgem_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kidzgem_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Currency Formatter
  const formatPrice = (inrAmount) => {
    if (currency === 'USD') {
      const usdVal = inrAmount / 80;
      return `$${usdVal.toFixed(2)}`;
    }
    return `₹${Math.round(inrAmount).toLocaleString('en-IN')}`;
  };

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name.slice(0, 24)}..." to cart!`);
  };

  // Direct "Buy Now" flow (skips straight to checkout!)
  const buyNow = (product) => {
    setDirectCheckoutItem({ ...product, quantity: 1 });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setDirectCheckoutItem(null);
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist! ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'KIDZ20') {
      setCouponCode('KIDZ20');
      setDiscountPercent(20);
      setCouponMessage({ valid: true, text: 'Awesome! 20% discount applied! 🎉' });
      showToast('20% coupon KIDZ20 applied!');
    } else if (clean === 'FREESHIP') {
      setCouponCode('FREESHIP');
      setDiscountPercent(10);
      setCouponMessage({ valid: true, text: 'Free Shipping + 10% applied! 🚀' });
      showToast('Coupon FREESHIP applied!');
    } else if (clean === 'GEM10') {
      setCouponCode('GEM10');
      setDiscountPercent(10);
      setCouponMessage({ valid: true, text: '10% discount applied!' });
      showToast('10% discount applied!');
    } else {
      setCouponMessage({ valid: false, text: 'Invalid coupon code. Try KIDZ20' });
      showToast('Invalid coupon code', 'error');
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    setCouponMessage(null);
    showToast('Coupon removed', 'info');
  };

  // Active items for calculation (either directCheckoutItem or cart items)
  const activeItems = directCheckoutItem ? [directCheckoutItem] : cart;

  const subtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  
  // Free shipping over ₹499 in INR (or if FREESHIP coupon is used)
  const freeShippingThreshold = currency === 'USD' ? 35 * 80 : 499;
  const isFreeShipping = subtotal >= freeShippingThreshold || couponCode === 'FREESHIP' || subtotal === 0;
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : (currency === 'USD' ? 4.99 * 80 : 99);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Backend Action: Place Order directly to WooCommerce
  const placeOrder = async (orderData) => {
    const activeOrderItems = orderData.items || (directCheckoutItem ? [directCheckoutItem] : cart);
    const result = await wpOrderService.placeOrder({
      ...orderData,
      items: activeOrderItems,
      total: orderData.total || totalAmount
    });
    return result;
  };

  // Backend Action: Subscribe Newsletter via Resend
  const subscribeNewsletter = async (email, honeypot = '') => {
    return await wpFormService.subscribeNewsletter(email, honeypot);
  };

  // Backend Action: Submit Contact Form via Resend
  const submitContact = async (formData, honeypot = '') => {
    return await wpFormService.submitContact(formData, honeypot);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        categories,
        backendStatus,
        placeOrder,
        subscribeNewsletter,
        submitContact,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        buyNow,
        wishlist,
        currentPage,
        setCurrentPage,
        navigateTo,
        getPathForRoute,
        toggleWishlist,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isContactOpen,
        setIsContactOpen,
        directCheckoutItem,
        setDirectCheckoutItem,
        quickViewProduct,
        setQuickViewProduct,
        couponCode,
        discountPercent,
        couponMessage,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingCost,
        isFreeShipping,
        freeShippingThreshold,
        totalAmount,
        totalCartCount,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
