import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';

interface WorkshopSectionProps {
  onNavigate: (page: PageId) => void;
}

export const WorkshopSection: React.FC<WorkshopSectionProps> = () => {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading & Supporting Statement */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            WHERE THE WORK HAPPENS.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            2,000 m² facility equipped for mechanical repair, chassis alignment, and refinishing.
          </p>
        </div>

        {/* Image-Led Asymmetric Photographic Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Main Large Feature Image: Central Service Bay (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative overflow-hidden group bg-slate-900"
          >
            <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] overflow-hidden">
              <img
                src="/images/johnny-auto2.jpg"
                alt="Johnny Auto central workshop bay in Megenagna"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#D9232D] font-bold block mb-1">
                  Megenagna Central Facility
                </span>
                <p className="text-base sm:text-lg font-bold text-white">
                  2,000 m² Central Workshop Floor
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Two Supporting Images (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* Supporting Image 1: Structural Realignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative overflow-hidden group bg-slate-900 flex-1"
            >
              <div className="relative h-56 sm:h-64 lg:h-[264px] overflow-hidden">
                <img
                  src="/images/johnny-auto6.jpg"
                  alt="Chassis realignment bench and body repair at Johnny Auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-xs uppercase tracking-widest text-[#D9232D] font-bold block mb-0.5">
                    Structural Bay
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white">
                    Chassis Realignment Bench
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Supporting Image 2: Nova Verta Paint Booth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative overflow-hidden group bg-slate-900 flex-1"
            >
              <div className="relative h-56 sm:h-64 lg:h-[264px] overflow-hidden">
                <img
                  src="/images/Nova-verta-room.jpg"
                  alt="Nova Verta automotive spray booth at Johnny Auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-xs uppercase tracking-widest text-[#D9232D] font-bold block mb-0.5">
                    Finishing Bay
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white">
                    Nova Verta Paint Booth
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
