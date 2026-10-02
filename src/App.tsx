/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, GalleryItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Lightbox } from './components/Lightbox';
import { QuoteModal } from './components/QuoteModal';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { GalleryPage } from './pages/GalleryPage';
import { FutureProjectPage } from './pages/FutureProjectPage';
import { ContactPage } from './pages/ContactPage';
import { GALLERY_ITEMS } from './data/companyData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [legalDocType, setLegalDocType] = useState<LegalDocType | null>(null);

  // Synchronize with URL hash for easy bookmarking and browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'about',
        'services',
        'why-us',
        'gallery',
        'future-project',
        'contact',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceTitle?: string) => {
    setPreselectedService(serviceTitle);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#0F2C59] selection:text-white">
      {/* Primary Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full" id="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
            onOpenLightbox={(item) => setSelectedGalleryItem(item)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenQuote={(service) => handleOpenQuote(service)}
          />
        )}

        {currentPage === 'why-us' && (
          <WhyUsPage
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenLightbox={(item) => setSelectedGalleryItem(item)}
          />
        )}

        {currentPage === 'future-project' && (
          <FutureProjectPage
            onNavigate={handleNavigate}
            onOpenQuote={() => handleOpenQuote()}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Corporate Compact Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
        onOpenLegal={(type) => setLegalDocType(type)}
      />

      {/* Interactive Lightbox Viewer */}
      <Lightbox
        item={selectedGalleryItem}
        items={GALLERY_ITEMS}
        onClose={() => setSelectedGalleryItem(null)}
        onSelect={(item) => setSelectedGalleryItem(item)}
      />

      {/* Interactive Quote / Appointment Dialog */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Legal Documents Modal (Privacy Policy & Terms of Service) */}
      <LegalModal
        isOpen={legalDocType !== null}
        type={legalDocType}
        onClose={() => setLegalDocType(null)}
        onSwitchType={(type) => setLegalDocType(type)}
      />
    </div>
  );
}
