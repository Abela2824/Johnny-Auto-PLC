import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Wind, Flame, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';

interface NovaVertaSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (service?: string) => void;
}

export const NovaVertaSection: React.FC<NovaVertaSectionProps> = ({
  onNavigate,
  onOpenQuote,
}) => {
  const specs = [
    {
      icon: Wind,
      title: 'Total Control Technology',
      desc: 'Engineered Italian downdraft airflow preventing overspray turbulence and extracting microscopic particulate matter.',
    },
    {
      icon: Flame,
      title: 'Thermostatic Baking Cycle',
      desc: 'Uniform elevated-temperature curing cycles ensuring factory-spec hardness, elasticity, and showroom depth.',
    },
    {
      icon: Sparkles,
      title: 'Computerized Tint Formulation',
      desc: 'Precision color code matching calibrated to original manufacturer formulas and ambient color fade curves.',
    },
    {
      icon: ShieldCheck,
      title: 'Dust-Free Enclosed Environment',
      desc: 'Multi-stage ceiling filtration maintaining positive cabin pressure for flawless, orange-peel-free clear coats.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B132B] text-white overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Technical Narrative & Heading */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
                Specialized Automotive Paint Facility
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white">
                PRECISION IN EVERY FINISH.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Johnny Auto operates an Italian Nova Verta automotive spray booth — an internationally recognized paint technology system designed to eliminate contaminants, accelerate curing, and deliver durable factory-grade vehicle finishes.
            </p>

            {/* Spec Matrix: Clean 2x2 Minimalist Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {specs.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div key={i} className="space-y-2 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#D9232D]" />
                      <h4 className="text-sm font-display font-bold text-white uppercase tracking-wide">
                        {spec.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuote('Automotive Painting')}
                className="bg-[#D9232D] hover:bg-[#b81b24] text-white text-xs sm:text-sm font-semibold px-6 py-3 transition-colors flex items-center gap-2"
              >
                <span>Request Paint Work Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white underline underline-offset-4"
              >
                Learn more about painting services
              </button>
            </div>
          </div>

          {/* Right Column: Photography Showcase */}
          <div className="lg:col-span-6">
            <div className="relative border border-slate-700 bg-slate-900 overflow-hidden group">
              <div className="relative h-[380px] sm:h-[460px] overflow-hidden">
                <img
                  src="/images/Nova-verta-room.jpg"
                  alt="Vehicle receiving precision refinishing inside the Nova Verta paint booth"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>

              {/* Technical Caption Bar */}
              <div className="p-5 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#D9232D] uppercase tracking-wider block">
                    Nova Verta Spray Cabin
                  </span>
                  <span className="text-xs text-slate-300">
                    Continuous positive-pressure downdraft ventilation
                  </span>
                </div>
                <span className="text-[11px] font-mono uppercase text-slate-400 bg-slate-900 px-2.5 py-1 border border-slate-800">
                  Total Control System
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
