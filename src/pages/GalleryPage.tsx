import React, { useState } from 'react';
import { PageId, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/companyData';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (item: GalleryItem) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Workshop',
    'Body Repair',
    'Painting',
    'Diagnostics',
    'Vehicles',
    'Facility',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-white text-slate-900">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#D9232D] font-bold">
              Facility Documentation
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight">
              Workshop Gallery
            </h1>
            <p className="text-lg text-slate-300 font-normal">
              Workshop, equipment, and facility documentation in Megenagna.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0F2C59] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {filteredItems.length} photos
            </div>
          </div>

          {/* Grid - Pure Photographic Gallery without text under images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="group cursor-pointer overflow-hidden bg-slate-100 h-72 sm:h-80 relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
