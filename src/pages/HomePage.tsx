import React from 'react';
import { PageId, GalleryItem } from '../types';
import { HeroVideo } from '../components/HeroVideo';
import { StatStrip } from '../components/StatStrip';
import { InteractiveServices } from '../components/InteractiveServices';
import { WorkshopSection } from '../components/WorkshopSection';
import { FutureProjectSection } from '../components/FutureProjectSection';
import { GalleryPreview } from '../components/GalleryPreview';
import { ContactCTA } from '../components/ContactCTA';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (service?: string) => void;
  onOpenLightbox: (item: GalleryItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onOpenLightbox,
}) => {
  return (
    <div className="bg-white text-slate-900">
      {/* 1. HERO VIDEO SECTION */}
      <HeroVideo onNavigate={onNavigate} onOpenQuote={onOpenQuote} />

      {/* 2. ABOUT (EDITORIAL LAYOUT: 1 LARGE REAL IMAGE, MINIMAL COPY, CLEAN LINK) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: 1 Large Real Image */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src="/images/johnny-auto1.jpg"
                  alt="Johnny Auto facility in Megenagna, Addis Ababa"
                  className="w-full h-[380px] sm:h-[460px] object-cover"
                />
              </div>
            </div>

            {/* Right Column: Built on Experience Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                BUILT ON EXPERIENCE.
              </h2>

              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal">
                Over 25 years of automotive repair, factory-grade refinishing, and mechanical maintenance in Megenagna, Addis Ababa.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2.5 text-base font-bold text-[#0F2C59] hover:text-[#D9232D] transition-colors group"
                >
                  <span>ABOUT JOHNNY AUTO</span>
                  <ArrowRight className="w-4 h-4 text-[#D9232D] transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY NUMBERS (EDITORIAL STATISTIC STRIP) */}
      <StatStrip includeVolumeFigure={true} />

      {/* 4. SERVICES (COMPLETE AUTOMOTIVE CARE - EDITORIAL INTERACTION) */}
      <InteractiveServices onNavigate={onNavigate} onOpenQuote={onOpenQuote} />

      {/* 5. WORKSHOP / FACILITY (WHERE THE WORK HAPPENS) */}
      <WorkshopSection onNavigate={onNavigate} />

      {/* 6. FUTURE PROJECT (LOOKING BEYOND MAINTENANCE) */}
      <FutureProjectSection onNavigate={onNavigate} />

      {/* 8. GALLERY PREVIEW (INSIDE JOHNNY AUTO) */}
      <GalleryPreview onNavigate={onNavigate} onOpenLightbox={onOpenLightbox} />

      {/* 9. CONTACT (LET'S GET YOUR VEHICLE BACK ON THE ROAD) */}
      <ContactCTA onOpenQuoteModal={onOpenQuote} />
    </div>
  );
};
