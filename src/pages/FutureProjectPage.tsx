import React from 'react';
import { PageId } from '../types';
import { FUTURE_PROJECT_INFO, COMPANY_INFO } from '../data/companyData';
import { ArrowRight, Check } from 'lucide-react';

interface FutureProjectPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const FutureProjectPage: React.FC<FutureProjectPageProps> = ({
  onNavigate,
  onOpenQuote,
}) => {
  return (
    <div className="bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
              Strategic Project
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
              Gelan EV Assembly Plant
            </h1>
            <p className="text-lg text-slate-300 font-normal">
              Planned electric vehicle assembly facility in Gelan Town, expanding from vehicle maintenance into manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Official Status Transparency Note */}
      <div className="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span className="font-bold text-slate-900 uppercase tracking-wider">Status:</span>
          <span>Planned Industrial Project • Gelan Town, Ethiopia</span>
        </div>
      </div>

      {/* Main Narrative & Key Stats */}
      <section className="py-20 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                Manufacturing Roadmap
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Looking Beyond Maintenance.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                <p>
                  Johnny Auto is advancing plans for a dedicated semi-knocked-down (SKD) electric vehicle assembly plant in Gelan.
                </p>
                <p>
                  Leveraging over 25 years of collision repair, chassis geometry, and powertrain expertise, the plant supports Ethiopia's transition toward clean, sustainable transportation.
                </p>
              </div>

              {/* Typography-Based Parameters Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-slate-200">
                <div>
                  <div className="text-2xl font-display font-bold text-[#0F2C59]">5,000 m²</div>
                  <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide mt-1">Site Footprint</div>
                </div>

                <div>
                  <div className="text-2xl font-display font-bold text-[#0F2C59]">1,000 Units</div>
                  <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide mt-1">Annual Capacity</div>
                </div>

                <div>
                  <div className="text-2xl font-display font-bold text-[#0F2C59]">Gelan Town</div>
                  <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide mt-1">Location</div>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="border border-slate-200 bg-slate-100 overflow-hidden">
                <img
                  src="/images/Gelan-Plant-electric.jpg"
                  alt="Johnny Auto EV Assembly Facility in Gelan Town"
                  className="w-full h-[420px] object-cover"
                />
                <div className="p-3.5 bg-slate-900 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold">EV Assembly Facility Planning</span>
                  <span className="text-slate-400">Gelan Town Site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
              National Alignment
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
              Project Objectives & Industrial Impact
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FUTURE_PROJECT_INFO.objectives.map((obj, idx) => (
              <div key={idx} className="py-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-2 text-xl font-display font-bold text-[#D9232D]">
                  0{idx + 1}
                </div>
                <div className="md:col-span-10 text-base text-slate-700 leading-relaxed">
                  {obj}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-200 p-8 sm:p-12">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Inquiries Regarding Corporate Partnerships
            </h3>
            <p className="text-slate-600 text-sm max-w-xl">
              For stakeholder discussions, technical collaborations, or corporate inquiries regarding the Gelan Assembly initiative, contact our executive office.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <span>Contact Executive Office</span>
            <ArrowRight className="w-4 h-4 text-[#D9232D]" />
          </button>
        </div>
      </section>
    </div>
  );
};
