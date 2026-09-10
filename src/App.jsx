import React from 'react';
import { useStore, StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCategorySlider } from './components/ProductCategorySlider';
import { HeroSpotlight } from './components/HeroSpotlight';
import { ProductGrid } from './components/ProductGrid';
import { GiftFinderWizard } from './components/GiftFinderWizard';
import { SafetyQualitySection } from './components/SafetyQualitySection';
import { Perks } from './components/Perks';
import { ReviewsSection } from './components/ReviewsSection';
import { CommunityGallery } from './components/CommunityGallery';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CategoriesPage } from './components/CategoriesPage';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ContactModal } from './components/ContactModal';
import { BackendDataPage } from './components/BackendDataPage';
import { LegalPage } from './components/LegalPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SEO } from './components/SEO';
import { LEGAL_PAGES } from './utils/routes';
import { Toast } from './components/Toast';
import './App.css';

function MainApp() {
  const { currentPage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFD] text-slate-900 font-sans selection:bg-rose-500 selection:text-white pb-mobile-nav md:pb-0 w-full overflow-x-hidden">
      <SEO />

      {/* Navbar with official kidzgem.com phone, email, currency switcher, clean Home/Shop/About/Contact links, and NO login/logout */}
      <Navbar />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* HERO BANNER: 100% Preserved Banner Design as Strictly Requested */}
            <Hero />

            {/* NEW: PRODUCT & CATEGORY AUTO-SCROLL SLIDER (LOW SPEED) */}
            <ProductCategorySlider />

            {/* VIRAL PRODUCT SPOTLIGHT: KidzGem Multi-Hole Bubble Cannon Showcase (Moved Below) */}
            <HeroSpotlight />

            {/* UNIFIED MERGED SECTION: Shop by Category & Explore KidzGem Catalog */}
            <ProductGrid />

            {/* INTERACTIVE 10-SECOND GIFT FINDER ASSISTANT */}
            <GiftFinderWizard />

            {/* TRUST & CERTIFIED SAFETY ASSURANCE */}
            <SafetyQualitySection />

            {/* VALUE PERKS */}
            <Perks />

            {/* VERIFIED PARENT REVIEWS */}
            <ReviewsSection />

            {/* SOCIAL PROOF & COMMUNITY MOMENTS OF JOY */}
            <CommunityGallery />
          </div>
        )}

        {/* DEDICATED CATEGORIES HUB PAGE */}
        {currentPage === 'categories' && (
          <div className="animate-fadeIn">
            <CategoriesPage />
          </div>
        )}

        {/* DEDICATED CATEGORY DETAIL PAGE (With tabs, filters, and all category items) */}
        {currentPage === 'category-detail' && (
          <div className="animate-fadeIn">
            <CategoryDetailPage />
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="animate-fadeIn">
            {/* Full-Screen Shop Page Hero Banner with High-Aesthetic Typography */}
            <div className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center text-white py-16 px-4 text-center overflow-hidden mb-12 sm:mb-16">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1920&q=85"
                alt="KidzGem Toys & Essentials Catalog"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/95 via-rose-950/85 to-red-950/90"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/40"></div>
              
              {/* Ambient Glows */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-5xl mx-auto space-y-6">
                
                {/* Super-Aesthetic Floating Pill Badge */}
                <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase text-white shadow-2xl">
                  <span className="text-amber-300">✨</span>
                  <span className="bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent">
                    Official KidzGem Vault • 48 Certified Gems
                  </span>
                </div>

                {/* Dramatic Display Headline */}
                <h1
                  className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.06] drop-shadow-2xl text-white break-words"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  Explore All <br />
                  <span className="bg-gradient-to-r from-amber-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
                    Toys &amp; Kids Essentials
                  </span>
                </h1>

                {/* Editorial Subtitle */}
                <p className="text-sm sm:text-lg md:text-xl text-rose-100/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                  Browse by category widgets below or filter by price &amp; parent rating. Direct zero-login guest Add to Cart to instant payment!
                </p>

                {/* Micro Guarantee Badges Strip */}
                <div className="pt-2 flex items-center justify-center flex-wrap gap-3 sm:gap-4 text-xs font-black">
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white shadow-lg">
                    <span className="text-emerald-300">🛡️</span>
                    <span>100% Non-Toxic &amp; BIS Tested</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white shadow-lg">
                    <span className="text-amber-300">⚡</span>
                    <span>Direct Zero-Login Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white shadow-lg">
                    <span className="text-rose-300">🚚</span>
                    <span>Free Shipping Over ₹499</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Auto-scrolling Trending Carousel */}
            <ProductCategorySlider />

            {/* Unified Merged Category & Catalog */}
            <ProductGrid />

            {/* Trust & Safety Guarantees */}
            <SafetyQualitySection />

            <Perks />
          </div>
        )}

        {currentPage === 'about' && (
          <div className="animate-fadeIn">
            <AboutPage />
            <SafetyQualitySection />
            <Perks />
            <CommunityGallery />
            <ReviewsSection />
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="animate-fadeIn">
            <ContactPage />
            <SafetyQualitySection />
            <Perks />
          </div>
        )}

        {currentPage === 'backend' && import.meta.env.DEV && (
          <div className="animate-fadeIn">
            <BackendDataPage />
          </div>
        )}

        {LEGAL_PAGES.includes(currentPage) && (
          <div className="animate-fadeIn">
            <LegalPage docKey={currentPage} />
          </div>
        )}

        {currentPage === 'not-found' && (
          <div className="animate-fadeIn">
            <NotFoundPage />
          </div>
        )}
      </main>

      {/* Footer with official store info, payment badges, and contact */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation App Bar (md:hidden) */}
      <MobileBottomBar />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Quick View Product Modal */}
      <ProductModal />

      {/* Direct Checkout & Payment Modal (Zero login needed) */}
      <CheckoutModal />

      {/* Send Us a Message Contact Modal (From kidzgem.com) */}
      <ContactModal />

      {/* Floating Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
