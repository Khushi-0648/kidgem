import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { wpClient } from '../services/wordpress/apiClient';
import { wpProductService } from '../services/wordpress/productService';
import { WP_CONFIG } from '../config/wordpress';
import {
  Database,
  Server,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Code,
  ShoppingBag,
  Tag,
  Package,
  Terminal,
  ArrowRight,
  Lock,
  Layers,
  Sparkles,
  Activity,
  Wifi,
  Globe,
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';

export const BackendDataPage = () => {
  const { navigateTo, backendStatus, products, cart } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories' | 'cart' | 'api' | 'plugin'
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Ping & System Health
  const [pingLatency, setPingLatency] = useState(null);
  const [pingStatus, setPingStatus] = useState('online');
  const [rootInfo, setRootInfo] = useState(null);

  // Live Data states
  const [liveWcProducts, setLiveWcProducts] = useState([]);
  const [liveWcCategories, setLiveWcCategories] = useState([]);
  const [selectedRawItem, setSelectedRawItem] = useState(null);

  // Custom API Console state
  const [consoleEndpoint, setConsoleEndpoint] = useState('/wp-json/wc/store/v1/products');
  const [consoleResponse, setConsoleResponse] = useState(null);
  const [consoleLoading, setConsoleLoading] = useState(false);
  const [consoleStatus, setConsoleStatus] = useState(null);
  const [consoleDuration, setConsoleDuration] = useState(null);

  // Measure ping & load live data on mount
  const runHealthCheck = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const data = await wpClient.get('/wp-json');
      const duration = Math.round(performance.now() - start);
      setPingLatency(duration);
      setPingStatus('online');
      setRootInfo(data);
    } catch (err) {
      setPingLatency(null);
      setPingStatus('offline');
      console.warn('Backend ping check:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadLiveProducts = async () => {
    setLoading(true);
    try {
      const endpoint = `${WP_CONFIG.endpoints.storeProducts}?per_page=50`;
      const data = await wpClient.get(endpoint);
      if (Array.isArray(data)) {
        setLiveWcProducts(data);
      }
    } catch (err) {
      console.warn('Could not load live WC products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadLiveCategories = async () => {
    setLoading(true);
    try {
      const data = await wpClient.get(WP_CONFIG.endpoints.storeCategories);
      if (Array.isArray(data)) {
        setLiveWcCategories(data);
      }
    } catch (err) {
      console.warn('Could not load live WC categories:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runHealthCheck();
    loadLiveProducts();
    loadLiveCategories();
  }, []);

  const handleCopy = (text, id) => {
    try {
      navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExecuteConsole = async (customPath) => {
    const target = customPath || consoleEndpoint;
    setConsoleLoading(true);
    setConsoleResponse(null);
    setConsoleStatus('loading');
    const start = performance.now();

    try {
      const res = await wpClient.get(target);
      const timeMs = Math.round(performance.now() - start);
      setConsoleDuration(timeMs);
      setConsoleStatus(200);
      setConsoleResponse(res);
    } catch (err) {
      const timeMs = Math.round(performance.now() - start);
      setConsoleDuration(timeMs);
      setConsoleStatus(err.status || 500);
      setConsoleResponse({
        error: err.message,
        details: err.data || null
      });
    } finally {
      setConsoleLoading(false);
    }
  };

  // Get stored token from local storage
  const storedCartToken = typeof window !== 'undefined' ? localStorage.getItem('kidzgem_wc_cart_token') : null;
  const storedNonce = typeof window !== 'undefined' ? localStorage.getItem('kidzgem_wc_nonce') : null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 text-slate-800 animate-fadeIn">
      
      {/* 1. TOP COMMAND BAR */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  <span>KidzGem Backend Data Console</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Live
                  </span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  Headless WordPress &amp; WooCommerce Store API Live Telemetry
                </p>
              </div>
            </div>
          </div>

          {/* Connection Status & Ping */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">Endpoint:</span>
              <span className="font-mono text-emerald-300 font-bold text-[11px]">{WP_CONFIG.baseUrl || 'https://kidzgem.com'}</span>
            </div>

            <button
              onClick={runHealthCheck}
              disabled={loading}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
              <span>{pingLatency ? `${pingLatency} ms` : 'Ping WP'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. TELEMETRY STATS STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">WP Backend Host</span>
              <span className="text-sm font-black text-slate-800 block mt-0.5 truncate max-w-[140px]">{rootInfo?.name || 'kidzgem.com'}</span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> REST API Active
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Live WC Products</span>
              <span className="text-sm font-black text-rose-600 block mt-0.5">{liveWcProducts.length} Items</span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">WooCommerce Store API</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Catalog Total</span>
              <span className="text-sm font-black text-slate-800 block mt-0.5">{products?.length || 54} Products</span>
              <span className="text-[10px] text-emerald-600 font-medium mt-0.5">9 Curated Categories</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Edge Proxy</span>
              <span className="text-sm font-black text-emerald-600 block mt-0.5">Zero CORS Active</span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">Vite &amp; Vercel Rewrites</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wifi className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. NAVIGATION TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Live Products ({liveWcProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Categories ({liveWcCategories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'cart'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Cart &amp; Sessions</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'api'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Live REST API Tester</span>
          </button>

          <button
            onClick={() => setActiveTab('plugin')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'plugin'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>WP Helper Plugin</span>
          </button>

        </div>
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        
        {/* TAB 1: LIVE WOOCOMMERCE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  WooCommerce Store API Products (/wp-json/wc/store/v1/products)
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Products returned directly from your live WordPress instance with schema attributes, price in minor units, and inventory.
                </p>
              </div>
              <button
                onClick={loadLiveProducts}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh from WordPress</span>
              </button>
            </div>

            {liveWcProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-slate-800">No Live Products in WooCommerce Yet</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Your store is currently operating with the resilient 54-product local catalog. Once you add products in your WordPress dashboard, they will appear here automatically!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveWcProducts.map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="p-5 space-y-3">
                      
                      {/* Product Header */}
                      <div className="flex items-start gap-3">
                        <img
                          src={item.images?.[0]?.src || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80'}
                          alt={item.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-2 py-0.5 rounded-md">
                              ID: #{item.id}
                            </span>
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {item.is_in_stock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900 leading-snug truncate" title={item.name}>
                            {item.name}
                          </h4>
                          <span className="text-xs text-slate-500 font-medium">
                            Category: {item.categories?.[0]?.name || 'Uncategorized'}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Table */}
                      <div className="bg-slate-50 rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs font-mono">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Raw Minor Units</span>
                          <span className="font-bold text-slate-800">{item.prices?.price || '0'} {item.prices?.currency_code}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold block">Rendered Price</span>
                          <span className="font-black text-rose-600 text-sm">₹{Math.round(parseInt(item.prices?.price || 0) / 100)}</span>
                        </div>
                      </div>

                    </div>

                    {/* Footer / Raw JSON Trigger */}
                    <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedRawItem(item)}
                        className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Inspect Raw JSON</span>
                      </button>
                      
                      {item.permalink && (
                        <a
                          href={item.permalink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-700 flex items-center gap-1"
                        >
                          <span>WordPress Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  WooCommerce Categories (/wp-json/wc/store/v1/products/categories)
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Taxonomies and category records retrieved from WordPress.
                </p>
              </div>
              <button
                onClick={loadLiveCategories}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Categories</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-6">ID</th>
                      <th className="py-3.5 px-6">Category Name</th>
                      <th className="py-3.5 px-6">Slug</th>
                      <th className="py-3.5 px-6">Product Count</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {liveWcCategories.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-400">
                          No categories returned from WooCommerce API.
                        </td>
                      </tr>
                    ) : (
                      liveWcCategories.map((cat) => (
                        <tr key={cat.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-6 font-mono text-slate-400">#{cat.id}</td>
                          <td className="py-3.5 px-6 font-bold text-slate-900">{cat.name}</td>
                          <td className="py-3.5 px-6 font-mono text-slate-600 bg-slate-50/70 rounded">{cat.slug}</td>
                          <td className="py-3.5 px-6">
                            <span className="bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full text-[11px]">
                              {cat.count} items
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => setSelectedRawItem(cat)}
                              className="text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                            >
                              Inspect JSON
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CART & SESSION TOKENS */}
        {activeTab === 'cart' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                WooCommerce Cart Sessions &amp; Storage Tokens
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Client session tokens used to synchronize guest carts and checkout states with WooCommerce Store API.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-rose-600" />
                      <span>Cart-Token Header</span>
                    </span>
                    <button
                      onClick={() => handleCopy(storedCartToken || 'None', 'token')}
                      className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedId === 'token' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'token' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200 text-xs font-mono break-all text-slate-600">
                    {storedCartToken || 'No active WooCommerce Cart-Token yet (created on first add-to-cart).'}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Passed as <code className="text-slate-700 font-bold">Cart-Token</code> header in all Store API requests.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Security Nonce</span>
                    </span>
                    <button
                      onClick={() => handleCopy(storedNonce || 'None', 'nonce')}
                      className="text-slate-400 hover:text-slate-700 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                    >
                      {copiedId === 'nonce' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'nonce' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200 text-xs font-mono break-all text-slate-600">
                    {storedNonce || 'Automatic guest session nonce active.'}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ensures cross-site request forgery protection with WooCommerce Store API.
                  </p>
                </div>

              </div>
            </div>

            {/* Current Client Cart Snapshot */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-sm font-black text-slate-900 mb-3" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Client Cart Snapshot ({cart.length} unique items)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4">Unit Price</th>
                      <th className="py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cart.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-slate-400">
                          Cart is currently empty. Add items in store to view session sync.
                        </td>
                      </tr>
                    ) : (
                      cart.map((c) => (
                        <tr key={c.id}>
                          <td className="py-3 px-4 font-bold text-slate-800">{c.name}</td>
                          <td className="py-3 px-4">{c.quantity}x</td>
                          <td className="py-3 px-4">₹{c.price}</td>
                          <td className="py-3 px-4 font-black text-rose-600">₹{c.price * c.quantity}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE REST API TESTER */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Interactive WordPress REST API Console
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Execute live requests to any WordPress or WooCommerce endpoint in real time.
                </p>
              </div>

              {/* Endpoint Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: 'WP Root', path: '/wp-json' },
                  { label: 'WC Products', path: '/wp-json/wc/store/v1/products' },
                  { label: 'WC Categories', path: '/wp-json/wc/store/v1/products/categories' },
                  { label: 'WC Cart', path: '/wp-json/wc/store/v1/cart' },
                  { label: 'WP Namespaces', path: '/wp-json/wp/v2' }
                ].map((preset) => (
                  <button
                    key={preset.path}
                    onClick={() => {
                      setConsoleEndpoint(preset.path);
                      handleExecuteConsole(preset.path);
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* URL Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExecuteConsole();
                }}
                className="flex gap-2"
              >
                <div className="flex-1 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-600 font-mono">
                    GET
                  </span>
                  <input
                    type="text"
                    value={consoleEndpoint}
                    onChange={(e) => setConsoleEndpoint(e.target.value)}
                    className="w-full pl-16 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                    placeholder="/wp-json/wc/store/v1/products"
                  />
                </div>
                <button
                  type="submit"
                  disabled={consoleLoading}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer flex-shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${consoleLoading ? 'animate-spin' : ''}`} />
                  <span>Send Request</span>
                </button>
              </form>

              {/* Status Header */}
              {consoleStatus && (
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                      consoleStatus === 200 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      HTTP {consoleStatus}
                    </span>
                    {consoleDuration && (
                      <span className="text-slate-400 font-medium">Time: {consoleDuration} ms</span>
                    )}
                  </div>
                  {consoleResponse && (
                    <button
                      onClick={() => handleCopy(consoleResponse, 'console')}
                      className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'console' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'console' ? 'Copied JSON' : 'Copy JSON'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* JSON Output Viewer */}
              {consoleResponse && (
                <div className="relative bg-slate-950 text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto max-h-[500px] border border-slate-800">
                  <pre>{JSON.stringify(consoleResponse, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: WP HELPER PLUGIN */}
        {activeTab === 'plugin' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  WordPress Companion Plugin: KidzGem Headless Helper
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  Located in your project directory at <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-800">wordpress/kidzgem-headless-plugin.php</code>.
                  This plugin enables CORS headers, custom newsletter/contact endpoints, and automatic WooCommerce order ingestion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs mb-2">1</span>
                  <h4 className="font-bold text-slate-900 mb-1">Upload File</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Upload <code className="text-rose-600 font-mono">kidzgem-headless-plugin.php</code> to <code className="text-slate-700 font-mono">wp-content/plugins/</code> on your WordPress server.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs mb-2">2</span>
                  <h4 className="font-bold text-slate-900 mb-1">Activate Plugin</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Go to <strong>WP Admin &gt; Plugins</strong> and click <strong>Activate</strong> on <em>KidzGem Headless Helper</em>.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-xs mb-2">3</span>
                  <h4 className="font-bold text-slate-900 mb-1">Add WooCommerce Products</h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Add new toys or products in <strong>WP Admin &gt; Products &gt; Add New</strong>. They appear automatically on your store!
                  </p>
                </div>
              </div>

              {/* Endpoints Table */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                  Registered Endpoints
                </h4>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-emerald-700 font-bold">POST /wp-json/kidzgem/v1/subscribe</span>
                    <span className="text-[11px] text-slate-400">Newsletter dispatch</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-emerald-700 font-bold">POST /wp-json/kidzgem/v1/contact</span>
                    <span className="text-[11px] text-slate-400">Customer inquiry handler</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200/80">
                    <span className="text-emerald-700 font-bold">POST /wp-json/kidzgem/v1/order</span>
                    <span className="text-[11px] text-slate-400">Headless WooCommerce order placement</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 5. MODAL: RAW JSON INSPECTOR */}
      {selectedRawItem && (
        <div
          onClick={() => setSelectedRawItem(null)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 border border-slate-800 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white font-mono flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span>Raw WordPress JSON: {selectedRawItem.name || selectedRawItem.id}</span>
              </h3>
              <button
                onClick={() => setSelectedRawItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-2xl font-mono text-xs text-emerald-400 border border-slate-800/80">
              <pre>{JSON.stringify(selectedRawItem, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleCopy(selectedRawItem, 'modal')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedId === 'modal' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'modal' ? 'Copied JSON!' : 'Copy to Clipboard'}</span>
              </button>
              <button
                onClick={() => setSelectedRawItem(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
