import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, COMPANY_STATS } from '../data/companyData';
import { ArrowRight, Phone, MapPin } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="bg-white text-slate-900">
      {/* Page Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
              Company Overview
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
              About Johnny Auto
            </h1>
            <p className="text-lg text-slate-300 font-normal">
              Automotive maintenance, collision repair, and precision diagnostics in Megenagna, Addis Ababa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-20 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                Automotive Craftsmanship in Megenagna.
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                <p>
                  Operating from our 2,000 m² facility near the Ethiopian Standards Authority, Johnny Auto unites mechanical technicians, panel beaters, and spray specialists under one roof.
                </p>
                <p>
                  Every vehicle admitted to our facility undergoes systematic diagnostic intake, staged repair execution, and multi-point road-readiness verification.
                </p>
              </div>

              {/* Statistics Strip */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-display font-extrabold text-[#0F2C59]">25+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-[#0F2C59]">100+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Trained Staff</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-extrabold text-[#0F2C59]">2,000 m²</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">Facility Area</div>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="border border-slate-200 bg-slate-100 shadow-sm overflow-hidden">
                <img
                  src="/about_us.jpg"
                  alt="Johnny, Founder and Managing Director of Johnny Auto"
                  className="w-full h-[470px] sm:h-[500px] object-cover object-top"
                />
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div>
                    <span className="font-semibold block text-sm">Johnny</span>
                    <span className="text-slate-400 text-xs">Founder & Managing Director</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-[#0F2C59] text-white uppercase tracking-wider">
                    Leadership
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, and Goal (Editorial 3-Column Layout) */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
              Corporate Direction
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
              Vision, Mission & Strategic Goal
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C59]">
                Our Vision
              </span>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Leadership in Vehicle Care
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To maintain leadership in the Ethiopian automotive sector through modern diagnostics, repair craftsmanship, and assembly.
              </p>
            </div>

            <div className="pt-8 md:pt-0 md:pl-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C59]">
                Our Mission
              </span>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Uncompromising Road Safety
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide dependable vehicle repair and preventative maintenance with honest advice and technical precision.
              </p>
            </div>

            <div className="pt-8 md:pt-0 md:pl-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C59]">
                Strategic Goal
              </span>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Assembly Expansion
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To systematically expand infrastructure and bring our planned EV assembly plant in Gelan to reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Values (Editorial Numbered Rows) */}
      <section className="py-20 sm:py-28 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
              Guiding Principles
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
              Core Operating Values
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {COMPANY_INFO.values.map((val, idx) => (
              <div key={val.title} className="py-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-2 text-xl font-display font-bold text-[#D9232D]">
                  0{idx + 1}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-display font-bold text-slate-900">
                    {val.title}
                  </h3>
                </div>
                <div className="md:col-span-6 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {val.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility & Location Strip */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold">
              Visit Our 2,000 m² Facility in Megenagna
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              {COMPANY_INFO.address.full}. Open Monday to Saturday from 8:00 AM to 6:00 PM.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              Contact Workshop
            </button>
            <button
              onClick={onOpenQuote}
              className="bg-[#D9232D] hover:bg-[#B51B24] text-white px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
