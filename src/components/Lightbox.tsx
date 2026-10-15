import React, { useEffect, useCallback } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-6xl w-full bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950 border-b border-slate-800 text-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors rounded-sm"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Clean Image Viewer */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[360px] max-h-[82vh]">
          <img
            src={item.image}
            alt="Johnny Auto Gallery"
            className="max-h-[82vh] w-auto max-w-full object-contain mx-auto select-none"
            loading="eager"
          />

          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-colors shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-colors shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
