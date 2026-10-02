import React, { useEffect, useCallback } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else {
      onSelect(items[items.length - 1]);
    }
  }, [currentIndex, items, onSelect]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else {
      onSelect(items[0]);
    }
  }, [currentIndex, items, onSelect]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-slate-800 text-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#D9232D] font-bold">
              {item.category}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-400">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[340px] max-h-[68vh]">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[68vh] w-auto max-w-full object-contain mx-auto select-none"
            loading="eager"
          />

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 text-left space-y-1">
          <h3 className="text-white font-display font-bold text-lg">
            {item.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#D9232D]" />
            <span>Johnny Auto Central Facility • Megenagna, Addis Ababa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
