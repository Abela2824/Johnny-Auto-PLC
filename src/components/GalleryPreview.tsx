import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/companyData';
import { GalleryItem, PageId } from '../types';

interface GalleryPreviewProps {
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  onNavigate,
  onOpenLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Workshop',
    'Vehicles',
    'Body Repair',
    'Painting',
    'Diagnostics',
    'Facility',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              INSIDE JOHNNY AUTO.
            </h2>
            <p className="text-base sm:text-lg text-slate-500 font-normal">
              Workshop, equipment, and facility documentation.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="self-start md:self-end inline-flex items-center gap-2 text-sm font-bold text-[#0F2C59] hover:text-[#D9232D] transition-colors group"
          >
            <span>FULL GALLERY</span>
            <ArrowRight className="w-4 h-4 text-[#D9232D] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Simple Category Labels */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 transition-colors ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Varied Image Sizes & Editorial Composition (No Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredItems.slice(0, 6).map((item, idx) => {
            // Varied editorial proportions
            const spanClass =
              idx === 0
                ? 'lg:col-span-8 h-80 sm:h-[420px]'
                : idx === 1
                ? 'lg:col-span-4 h-80 sm:h-[420px]'
                : idx === 2
                ? 'lg:col-span-4 h-72 sm:h-[340px]'
                : idx === 3
                ? 'lg:col-span-4 h-72 sm:h-[340px]'
                : idx === 4
                ? 'lg:col-span-4 h-72 sm:h-[340px]'
                : 'lg:col-span-12 h-80 sm:h-[400px]';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => onOpenLightbox(item)}
                className={`relative group cursor-pointer overflow-hidden bg-slate-100 ${spanClass}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
