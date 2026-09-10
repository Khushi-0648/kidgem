/**
 * WordPress & WooCommerce Backend Configuration for KidzGem
 */

const DEFAULT_WP_URL = 'https://kidzgem.com';

export const WP_CONFIG = {
  baseUrl: (import.meta.env?.VITE_WP_API_URL || DEFAULT_WP_URL).replace(/\/+$/, ''),
  enabled: import.meta.env?.VITE_ENABLE_WP_BACKEND !== 'false',
  timeoutMs: 8000,
  endpoints: {
    root: '/wp-json',
    storeProducts: '/wp-json/wc/store/v1/products',
    storeCategories: '/wp-json/wc/store/v1/products/categories',
    storeCart: '/wp-json/wc/store/v1/cart',
    storeCartAddItem: '/wp-json/wc/store/v1/cart/add-item',
    storeCartCoupon: '/wp-json/wc/store/v1/cart/apply-coupon',
    storeCheckout: '/wp-json/wc/store/v1/checkout',
    wcV3Orders: '/wp-json/wc/v3/orders',
    kidzgemSubscribe: '/wp-json/kidzgem/v1/subscribe',
    kidzgemContact: '/wp-json/kidzgem/v1/contact',
  },
  credentials: {
    consumerKey: import.meta.env?.VITE_WC_CONSUMER_KEY || '',
    consumerSecret: import.meta.env?.VITE_WC_CONSUMER_SECRET || '',
  }
};
