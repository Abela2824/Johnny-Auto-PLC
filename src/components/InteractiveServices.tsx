import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'body-repair',
    num: '01',
    title: 'BODY REPAIR',
    shortDesc: 'Chassis realignment and panel rebuilding.',
    image: '/images/johnny-auto3.jpg',
  },
  {
    id: 'mechanical-service',
    num: '02',
    title: 'MECHANICAL SERVICE',
    shortDesc: 'Engine overhauls and mechanical servicing.',
    image: '/images/johnny-auto8.jpg',
  },
  {
    id: 'diagnostics',
    num: '03',
    title: 'VEHICLE DIAGNOSTICS',
    shortDesc: 'Computerized scans and system troubleshooting.',
    image: '/images/Latest-technology.jpg',
  },
  {
    id: 'painting',
    num: '04',
    title: 'AUTOMOTIVE PAINTING',
    shortDesc: 'Italian Nova Verta spray booth finishes.',
    image: '/images/Nova-verta-room.jpg',
  },
  {
    id: 'fiberglass',
    num: '05',
    title: 'FIBERGLASS',
    shortDesc: 'Commercial composite and panel fabrication.',
    image: '/images/johnny-auto20.jpg',
  },
  {
    id: 'complete-vehicle-care',
    num: '06',
    title: 'COMPLETE VEHICLE CARE',
    shortDesc: 'Multi-point inspection and scheduled care.',
    image: '/images/johnny-auto2.jpg',
  },
];

interface InteractiveServicesProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote?: (serviceTitle?: string) => void;
}

export const InteractiveServices: React.FC<InteractiveServicesProps> = ({
  onNavigate,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES[activeIndex];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              COMPLETE AUTOMOTIVE CARE.
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-normal">
              Precision mechanical, collision, and diagnostic services.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="self-start md:self-end inline-flex items-center gap-2 text-sm font-bold text-[#0F2C59] hover:text-[#D9232D] transition-colors group"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="w-4 h-4 text-[#D9232D] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Desktop Large Numbered Editorial List & Responsive Image Reveal */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Numbered List */}
          <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
            {SERVICES.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => onNavigate('services')}
                  className="group cursor-pointer py-6 px-3 transition-colors duration-200 flex items-start gap-6 hover:bg-slate-50/60"
                >
                  <span
                    className={`font-mono text-base pt-0.5 transition-colors duration-200 ${
                      isActive ? 'text-[#D9232D] font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {service.num}
                  </span>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-2xl font-display font-extrabold tracking-tight transition-all duration-200 ${
                          isActive
                            ? 'text-[#0F2C59] translate-x-2'
                            : 'text-slate-900 group-hover:text-[#0F2C59] group-hover:translate-x-1'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <ArrowRight
                        className={`w-5 h-5 text-[#D9232D] transition-all duration-200 ${
                          isActive
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                      />
                    </div>

                    <p
                      className={`text-sm leading-relaxed transition-colors duration-200 max-w-xl ${
                        isActive ? 'text-slate-700' : 'text-slate-500'
                      }`}
                    >
                      {service.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Clean Photographic Reveal (No Cards or Overlays) */}
          <div className="lg:col-span-5">
            <div className="relative h-[480px] bg-slate-950 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.id}
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Clean Stacked List with Small Supporting Images */}
        <div className="lg:hidden divide-y divide-slate-200 border-y border-slate-200">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigate('services')}
              className="py-5 flex items-center gap-4 cursor-pointer"
            >
              <div className="w-20 h-20 shrink-0 bg-slate-100 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#D9232D] font-bold">
                      {service.num}
                    </span>
                    <h3 className="text-base font-display font-bold text-slate-900 truncate">
                      {service.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D9232D] shrink-0" />
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
