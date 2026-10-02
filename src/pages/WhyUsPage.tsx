import React from 'react';
import { PageId } from '../types';
import { WHY_US_FEATURES, COMPANY_INFO } from '../data/companyData';
import { ArrowRight, Check } from 'lucide-react';

interface WhyUsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
              Engineering Standards
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
              Why Johnny Auto
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed pt-1">
              Built on 25+ years of verified industry experience, European spray booth technology, electronic vehicle diagnostics, and continuous technician training.
            </p>
          </div>
        </div>
      </section>

      {/* Operating Philosophy */}
      <section className="py-20 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
              Operating Philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Built Around Experience, Equipment and People.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              In automotive repair, trust is earned through repeatable precision. Johnny Auto does not rely on vague claims. Our advantage is rooted in tangible workshop assets: Italian spray booth infrastructure, multi-protocol computerized diagnostics, dedicated composite fabrication, and a 100+ strong technical workforce.
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 1: Nova Verta Paint Booth */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                Pillar 01 • Refinishing Technology
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                Nova Verta Paint Booth with Total Control Technology
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Conventional vehicle painting in open or semi-enclosed workshops frequently suffers from airborne dust speckling, orange-peel texture, and premature peeling. Johnny Auto invested in an authentic Italian Nova Verta Automotive spray booth featuring Total Control Technology.
              </p>
              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Micro-Climate Regulation:</strong> Precise temperature and humidity management prevents solvent trapping and uneven drying.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Positive-Pressure Downdraft:</strong> Filtered vertical laminar airflow sweeps overspray downward through floor grates, eliminating airborne dust.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Automated High-Temperature Baking:</strong> Cures the clear coat to factory hardness, delivering durable gloss and stone-chip resistance.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-slate-200 bg-slate-100 overflow-hidden">
                <img
                  src="/images/Nova-verta-room.jpg"
                  alt="Italian Nova Verta spray booth in operation"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-3.5 bg-slate-900 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold">Italian Nova Verta Spray & Baking Booth</span>
                  <span className="text-slate-400">Total Control Technology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Modern Diagnostics */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                Pillar 02 • Electronic Troubleshooting
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                Modern Computerized Electronic Diagnostics
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Modern automobiles function as rolling networks of interconnected electronic control modules. Rather than relying on guesswork or unnecessary component replacement, Johnny Auto uses computerized multi-system diagnostic scanners.
              </p>
              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Powertrain & Engine Management:</strong> Real-time sensor streaming, timing verification, and misfire detection.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Safety & Braking Electronics:</strong> Complete interrogations of ABS, ESP, electronic parking brakes, and SRS airbag systems.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Multi-Brand Architecture:</strong> Protocols supporting Japanese, European, American, and emerging electric vehicle platforms.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <div className="border border-slate-200 bg-white overflow-hidden">
                <img
                  src="/images/Latest-technology.jpg"
                  alt="Electronic diagnostic scanning on vehicle engine bay"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-3.5 bg-slate-900 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold">Electronic Diagnostic Scanning Bay</span>
                  <span className="text-slate-400">ECU Fault Isolation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Professional Team & Staff Training */}
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
                Pillar 03 • Human Capital
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                100+ Trained Staff & Continuous Development
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Advanced machinery is only as capable as the technicians who operate it. Johnny Auto employs over 100 dedicated personnel, including master mechanics, sheet-metal fabricators, spray painters, and electrical diagnostic specialists.
              </p>
              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Vocational & Technical Training:</strong> Regular internal and supplier workshops keeping staff current with evolving vehicle mechanics.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Workplace Safety & Protocol:</strong> Strict adherence to protective equipment, clean air systems, and safe mechanical lifting standards.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" />
                  <span><strong>Accountable Service Guidance:</strong> Direct, honest communication explaining required repairs clearly before commencing work.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-slate-200 bg-slate-100 overflow-hidden">
                <img
                  src="/images/johnny-auto2.jpg"
                  alt="Johnny Auto technical team in the workshop"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-3.5 bg-slate-900 text-white text-xs flex items-center justify-between">
                  <span className="font-semibold">Experienced Technical Workforce</span>
                  <span className="text-slate-400">100+ Staff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Capabilities Rows */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D9232D]">
              Overview
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
              Capabilities at a Glance
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {WHY_US_FEATURES.map((feat, idx) => (
              <div key={feat.id} className="py-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-2 text-xl font-display font-bold text-[#D9232D]">
                  0{idx + 1}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-lg font-display font-bold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{feat.badge}</p>
                </div>
                <div className="md:col-span-6 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {feat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            Experience Johnny Auto’s Technical Standards Firsthand
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Visit our 2,000 m² facility near the Ethiopian Standards Authority in Megenagna or consult with our advisors.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="border border-slate-300 hover:border-slate-400 text-slate-800 px-6 py-3 text-sm font-semibold transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={onOpenQuote}
              className="bg-[#0F2C59] hover:bg-[#0A1E3D] text-white px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-[#D9232D]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
