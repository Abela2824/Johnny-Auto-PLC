import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface FutureProjectSectionProps {
  onNavigate: (page: PageId) => void;
}

export const FutureProjectSection: React.FC<FutureProjectSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#0A192F] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: One Strong Project Image */}
          <div className="lg:col-span-6">
            <div className="relative h-[380px] sm:h-[480px] bg-slate-900 overflow-hidden">
              <img
                src="/images/Gelan-Plant-electric.jpg"
                alt="Johnny Auto future electric vehicle assembly project in Gelan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Strategic Narrative & Generous Typography (No Cards) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                FUTURE PROJECT
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                LOOKING BEYOND MAINTENANCE.
              </h2>

              <p className="text-base sm:text-lg text-slate-300 font-normal">
                Planned electric vehicle assembly facility in Gelan, expanding our operations into vehicle manufacturing.
              </p>
            </div>

            {/* Clean Typography with Generous Spacing (No Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 border-t border-slate-800">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  5,000 m²
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Facility Area
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  1,000
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Annual Units
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  GELAN
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Location
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('future-project')}
                className="inline-flex items-center gap-2.5 text-base font-bold text-white hover:text-[#D9232D] transition-colors group"
              >
                <span>PROJECT DETAILS</span>
                <ArrowRight className="w-4 h-4 text-[#D9232D] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
