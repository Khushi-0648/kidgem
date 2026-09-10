/**
 * WordPress & WooCommerce Product Service
 * Fetches products & categories from WooCommerce Store API and merges with catalog.
 */

import { wpClient } from './apiClient.js';
import { WP_CONFIG } from '../../config/wordpress.js';

// Helper to sanitize HTML tags from WordPress content
function stripHtml(html = '') {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Transforms a WooCommerce Store API product into KidzGem product format
 */
export function transformWcProduct(wcItem) {
  const prices = wcItem.prices || {};
  const priceMinor = parseInt(prices.price || '0', 10);
  const regPriceMinor = parseInt(prices.regular_price || prices.price || '0', 10);
  const currencySymbol = prices.currency_prefix || '₹';

  // Primary image
  const primaryImg = wcItem.images && wcItem.images.length > 0
    ? wcItem.images[0].src
    : 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80';

  const gallery = wcItem.images ? wcItem.images.map((img) => img.src) : [primaryImg];

  // Map first category slug or default to 'toys'
  const firstCatSlug = wcItem.categories && wcItem.categories.length > 0
    ? wcItem.categories[0].slug
    : 'toys';

  return {
    id: String(wcItem.id),
    wpId: wcItem.id,
    name: stripHtml(wcItem.name) || 'KidzGem Treasure',
    category: firstCatSlug,
    categoryLabel: wcItem.categories?.[0]?.name || 'Toys',
    price: priceMinor > 0 ? Math.round(priceMinor / 100) : 499,
    originalPrice: regPriceMinor > 0 ? Math.round(regPriceMinor / 100) : 699,
    currencySymbol: currencySymbol,
    rating: parseFloat(wcItem.average_rating) || 4.9,
    reviewsCount: parseInt(wcItem.review_count, 10) || 120,
    tag: wcItem.on_sale ? 'On Sale' : 'Official KidzGem',
    ageGroup: 'All Ages',
    image: primaryImg,
    gallery: gallery,
    description: stripHtml(wcItem.description || wcItem.short_description) || 'Official premium certified safe play treasure from KidzGem.',
    features: [
      'Official KidzGem WordPress Product',
      '100% Non-Toxic Child Safe Certified',
      'Express Pan-India Shipping',
      'Easy 7-Day Hassle-Free Returns'
    ],
    inStock: wcItem.is_in_stock ?? true,
    isWpSynced: true,
    permalink: wcItem.permalink || ''
  };
}

export const wpProductService = {
  /**
   * Check connection to WordPress REST API
   */
  async checkConnection() {
    try {
      const data = await wpClient.get(WP_CONFIG.endpoints.root);
      return {
        connected: true,
        siteName: data.name || 'KidzGem',
        namespaces: data.namespaces || []
      };
    } catch (error) {
      return {
        connected: false,
        error: error.message
      };
    }
  },

  /**
   * Fetch live products from WooCommerce Store API
   */
  async fetchLiveProducts(perPage = 50) {
    try {
      const endpoint = `${WP_CONFIG.endpoints.storeProducts}?per_page=${perPage}`;
      const data = await wpClient.get(endpoint);
      if (Array.isArray(data)) {
        return data.map(transformWcProduct);
      }
      return [];
    } catch (error) {
      console.warn('WooCommerce Store API fetch error, using local fallback:', error.message);
      return [];
    }
  },

  /**
   * Fetch live categories from WooCommerce Store API
   */
  async fetchLiveCategories() {
    try {
      const data = await wpClient.get(WP_CONFIG.endpoints.storeCategories);
      if (Array.isArray(data)) {
        return data.map((cat) => ({
          id: cat.slug,
          wpId: cat.id,
          name: cat.name,
          count: cat.count || 0
        }));
      }
      return [];
    } catch (error) {
      console.warn('WooCommerce categories fetch error:', error.message);
      return [];
    }
  },

  /**
   * Merges live WooCommerce items with local catalog.
   * Ensures the store is resilient and fully populated even if the WP database is brand new.
   */
  mergeCatalog(localProducts, liveWcProducts) {
    if (!liveWcProducts || liveWcProducts.length === 0) {
      return localProducts;
    }

    // Index live products by normalized name and ID
    const merged = [...localProducts];

    liveWcProducts.forEach((liveItem) => {
      const liveNameLower = liveItem.name.toLowerCase().trim();
      const existingIdx = merged.findIndex(
        (p) => p.name.toLowerCase().trim() === liveNameLower || String(p.id) === String(liveItem.id)
      );

      if (existingIdx !== -1) {
        // Upgrade local item with live WordPress prices, inventory & images
        merged[existingIdx] = {
          ...merged[existingIdx],
          ...liveItem,
          // Preserve rich local features & age groups if WP doesn't provide them
          features: liveItem.features?.length > 2 ? liveItem.features : merged[existingIdx].features,
          ageGroup: merged[existingIdx].ageGroup || liveItem.ageGroup,
          isWpSynced: true
        };
      } else {
        // Add new live product from WooCommerce store
        merged.unshift(liveItem);
      }
    });

    return merged;
  }
};
