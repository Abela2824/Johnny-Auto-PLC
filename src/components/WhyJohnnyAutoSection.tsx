import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface WhyItem {
  num: string;
  title: string;
  shortDesc: string;
  image: string;
}

const WHY_ITEMS: WhyItem[] = [
  {
    num: '01',
    title: 'COMPLETE AUTOMOTIVE SERVICE',
    shortDesc: 'Mechanical, body repair, electronic diagnostics, and painting under one roof.',
    image: '/images/johnny-auto2.jpg',
  },
  {
    num: '02',
    title: 'MODERN DIAGNOSTICS',
    shortDesc: 'Computerized diagnostic systems isolating vehicle electronic and mechanical faults.',
    image: '/images/Latest-technology.jpg',
  },
  {
    num: '03',
    title: 'BODY REPAIR & PAINTING',
    shortDesc: 'Hydraulic chassis realignment and dust-free Italian Nova Verta spray booth.',
    image: '/images/Nova-verta-room.jpg',
  },
  {
    num: '04',
    title: 'EXPERIENCED TECHNICAL TEAM',
    shortDesc: 'Over 100 mechanics, panel beaters, spray painters, and electrical diagnosticians.',
    image: '/images/johnny-auto5.jpg',
  },
  {
    num: '05',
    title: 'FIBERGLASS CAPABILITY',
    shortDesc: 'Specialized composite repairs, commercial body paneling, and custom fabrication.',
    image: '/images/johnny-auto20.jpg',
  },
];

interface WhyJohnnyAutoSectionProps {
  onNavigate: (page: PageId) => void;
}

export const WhyJohnnyAutoSection: React.FC<WhyJohnnyAutoSectionProps> = ({ onNavigate }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeItem = WHY_ITEMS[activeIdx];

  return (
    <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            WHY JOHNNY AUTO.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real workshop capabilities, specialized equipment, and decades of hands-on experience.
          </p>
        </div>

        {/* Editorial Layout: Numbered List & Subtle Image Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Numbered Editorial List */}
          <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
            {WHY_ITEMS.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => onNavigate('why-us')}
                  className="group py-6 px-3 cursor-pointer transition-colors duration-200 flex items-start gap-6 hover:bg-white"
                >
                  <span
                    className={`font-mono text-base pt-0.5 transition-colors duration-200 ${
                      isActive ? 'text-[#D9232D] font-bold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {item.num}
                  </span>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xl sm:text-2xl font-display font-extrabold tracking-tight transition-all duration-200 ${
                          isActive
                            ? 'text-[#0F2C59] translate-x-2'
                            : 'text-slate-900 group-hover:text-[#0F2C59] group-hover:translate-x-1'
                        }`}
                      >
                        {item.title}
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
                      className={`text-sm leading-relaxed transition-colors duration-200 ${
                        isActive ? 'text-slate-700' : 'text-slate-500'
                      }`}
                    >
                      {item.shortDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Subtle Image Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative h-[440px] bg-slate-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem.num}
                  src={activeItem.image}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
