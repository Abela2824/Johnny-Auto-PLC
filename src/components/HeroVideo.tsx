import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface HeroVideoProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback, fall back gracefully to poster
        setVideoLoaded(false);
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-black text-white overflow-hidden">
      {/* Background Media Container - Crystal clear video playback with NO blue tint */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback & Poster Image (Extracted directly from user's herosection.mp4) */}
        <img
          src="/hero-poster.jpg"
          alt="Johnny Auto workshop vehicle maintenance and collision repair facility"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
        />

        {/* Video Player using uploaded herosection.mp4 at full 100% opacity */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/herosection.mp4" type="video/mp4" />
          </video>
        )}

        {/* Subtle, neutral dark gradient strictly behind text so video is seen perfectly without any blue tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-32 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          {/* Subtle Drawing Red Accent Line */}
          <motion.div
            initial={prefersReducedMotion ? { width: 56 } : { width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-[#D9232D]"
          />

          {/* Subheading / Company Identification */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.25em] text-[#D9232D] font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            Johnny Auto • Addis Ababa
          </motion.p>

          {/* Master Headline: Large, Strong, Confident, Refined */}
          <motion.h1
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            KEEPING YOUR VEHICLE <br />
            <span className="text-white">READY FOR THE ROAD.</span>
          </motion.h1>

          {/* Supporting Copy - Short and minimal */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
          >
            Complete vehicle maintenance, collision repair, and precision diagnostics.
          </motion.p>

          {/* Exactly Two Buttons */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <button
              id="hero-our-services-btn"
              onClick={() => onNavigate('services')}
              className="group bg-[#D9232D] hover:bg-[#b51c24] text-white text-sm sm:text-base font-semibold px-8 py-4 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
            >
              <span>OUR SERVICES</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              id="hero-contact-us-btn"
              onClick={() => onNavigate('contact')}
              className="bg-black/50 hover:bg-black/75 backdrop-blur-sm border border-white/40 hover:border-white text-white text-sm sm:text-base font-semibold px-8 py-4 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>CONTACT</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
