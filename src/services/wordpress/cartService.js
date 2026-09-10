/**
 * WordPress & WooCommerce Cart Service
 * Syncs cart items and validates coupons via WooCommerce Store API.
 */

import { wpClient } from './apiClient.js';
import { WP_CONFIG } from '../../config/wordpress.js';

export const wpCartService = {
  /**
   * Get current cart from WooCommerce
   */
  async getCart() {
    try {
      return await wpClient.get(WP_CONFIG.endpoints.storeCart);
    } catch (error) {
      console.warn('Could not fetch WooCommerce cart:', error.message);
      return null;
    }
  },

  /**
   * Add item to WooCommerce Store cart
   */
  async addItem(productId, quantity = 1) {
    try {
      const response = await wpClient.post(WP_CONFIG.endpoints.storeCartAddItem, {
        id: productId,
        quantity: quantity
      });
      return { success: true, cart: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Validate & Apply Coupon code in WooCommerce Store API
   */
  async applyCoupon(code) {
    try {
      const response = await wpClient.post(WP_CONFIG.endpoints.storeCartCoupon, {
        code: code.trim()
      });
      return {
        success: true,
        coupon: code,
        cart: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Coupon could not be applied'
      };
    }
  }
};
