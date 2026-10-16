import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Play, Pause, WifiLow } from 'lucide-react';
import { PageId } from '../types';

interface HeroVideoProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLowData, setIsLowData] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/herosection.mp4');
  const prefersReducedMotion = useReducedMotion();

  // Network & viewport awareness for low data connection optimization
  useEffect(() => {
    const nav = navigator as unknown as {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isSaveData = nav.connection?.saveData === true;
    const isSlowConnection = ['slow-2g', '2g', '3g'].includes(
      nav.connection?.effectiveType || ''
    );

    const lowDataActive = isMobile || isSaveData || isSlowConnection;
    setIsLowData(lowDataActive);

    // Pick lightweight ~997KB stream for mobile/low-bandwidth, or 1.9MB optimized HD for broadband
    setVideoSrc(lowDataActive ? '/herosection-mobile.mp4' : '/herosection.mp4');
  }, []);

  // Safe playback trigger
  useEffect(() => {
    if (prefersReducedMotion || videoError) return;

    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy; poster image remains gracefully visible
            setIsPlaying(false);
            setVideoLoaded(false);
          });
      }
    }
  }, [videoSrc, prefersReducedMotion, videoError]);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-black text-white overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Instant Hero Image Layer: Always visible from 0ms so there is never a blank screen while video loads */}
        <picture className="absolute inset-0 w-full h-full block">
          <source srcSet="/hero-poster.webp" type="image/webp" />
          <img
            src="/hero-poster.jpg"
            alt="Johnny Auto workshop vehicle maintenance and collision repair facility"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* Optimized Video Player: Fades in smoothly once moving frames begin playing */}
        {!prefersReducedMotion && !videoError && (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload={isLowData ? 'metadata' : 'auto'}
            poster="/hero-poster.webp"
            onPlaying={() => {
              setVideoLoaded(true);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              // Gracefully fall back to the high-res poster image
              setVideoError(true);
              setVideoLoaded(false);
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Subtle, neutral dark gradient strictly behind text so video is seen clearly without tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Minimal video control button for low-data control and user accessibility */}
        {!prefersReducedMotion && !videoError && videoLoaded && (
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            {isLowData && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase text-slate-300 bg-black/60 backdrop-blur-md border border-white/10 rounded-none">
                <WifiLow className="w-3 h-3 text-[#D9232D]" />
                Low-Data Mode
              </span>
            )}
            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              title={isPlaying ? 'Pause background video' : 'Play background video'}
              className="p-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all duration-200 hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-white" />
              )}
            </button>
          </div>
        )}
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
