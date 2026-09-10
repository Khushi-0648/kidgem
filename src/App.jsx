import React from 'react';
import { useStore, StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSpotlight } from './components/HeroSpotlight';
import { AgeFilterSection } from './components/AgeFilterSection';
import { ProductGrid } from './components/ProductGrid';
import { GiftFinderWizard } from './components/GiftFinderWizard';
import { SafetyQualitySection } from './components/SafetyQualitySection';
import { Perks } from './components/Perks';
import { ReviewsSection } from './components/ReviewsSection';
import { CommunityGallery } from './components/CommunityGallery';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import './App.css';

function MainApp() {
  const { currentPage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFD] text-slate-900 font-sans selection:bg-rose-500 selection:text-white pb-16 md:pb-0">
      {/* Navbar with official kidzgem.com phone, email, currency switcher, clean Home/Shop/About/Contact links, and NO login/logout */}
      <Navbar />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* HERO BANNER: 100% Preserved Banner Design as Strictly Requested */}
            <Hero />

            {/* VIRAL PRODUCT SPOTLIGHT: KidzGem Multi-Hole Bubble Cannon Showcase */}
            <HeroSpotlight />

            {/* SHOP BY AGE & DEVELOPMENTAL MILESTONES */}
            <AgeFilterSection />

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

        {currentPage === 'shop' && (
          <div className="animate-fadeIn">
            {/* Shop Page Banner With Background Image */}
            <div className="relative overflow-hidden min-h-[220px] sm:min-h-[260px] flex items-center justify-center text-white py-10 px-4 text-center shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1920&q=85"
                alt="KidzGem Toys & Essentials Catalog"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-rose-900/85 to-red-950/90"></div>
              
              <div className="relative z-10 max-w-7xl mx-auto space-y-2.5">
                <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300">
                  <span>✨ Official KidzGem Catalog</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black drop-shadow-md" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                  Explore All Toys & Kids Essentials
                </h1>
                <p className="text-xs sm:text-sm text-rose-100 max-w-xl mx-auto font-medium drop-shadow-xs">
                  Browse by category widgets below or filter by price & rating. Direct zero-login Add to Cart to Payment!
                </p>
              </div>
            </div>

            {/* Developmental Age Selector */}
            <AgeFilterSection />

            {/* Unified Merged Category & Catalog */}
            <ProductGrid />

            {/* Smart Gift Finder */}
            <GiftFinderWizard />

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
