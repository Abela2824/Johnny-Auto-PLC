import React, { useState } from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === 'light';

  // Constant, uniform height classes for the official logo (aspect ratio ~2.08:1)
  const imageSizes = {
    sm: 'h-11 sm:h-12 w-auto max-w-[210px]',
    md: 'h-14 sm:h-16 w-auto max-w-[270px]',
    lg: 'h-18 sm:h-22 w-auto max-w-[340px]',
  };

  const emblemSizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-18 sm:h-18',
  };

  // Primary image source: logo.png (user uploaded), or logo-light.png for dark background contrast
  const logoSrc = isLight ? '/logo-light.png' : '/logo.png';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none group ${className}`}
      id="brand-logo-container"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="Johnny Auto - Home"
    >
      {!imgError ? (
        <img
          src={logoSrc}
          alt="Johnny General Auto Car Maintenance & Assembly P.L.C."
          className={`object-contain transition-transform duration-200 group-hover:scale-[1.02] ${imageSizes[size]}`}
          onError={() => {
            // Fallback to /logo.png if logo-light is not reached, or if both fail, trigger svg fallback
            if (isLight) {
              const img = new Image();
              img.src = '/logo.png';
              img.onload = () => {
                // If standard logo is available, we can keep it
              };
              img.onerror = () => setImgError(true);
            } else {
              setImgError(true);
            }
          }}
        />
      ) : (
        /* Graceful Fallback if image fails */
        <div className="flex items-center gap-3">
          <div className={`relative shrink-0 flex items-center justify-center ${emblemSizes[size]}`}>
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M24 2L42 11V26C42 36 24 45 24 45C24 45 6 36 6 26V11L24 2Z"
                fill="#0F2C59"
                stroke={isLight ? '#FFFFFF' : '#0F2C59'}
                strokeWidth="1.5"
              />
              <path d="M13 18L24 13L35 18L24 22L13 18Z" fill="#D9232D" />
              <path d="M24 22L36 32H30L24 27L18 32H12L24 22Z" fill="#FFFFFF" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1.5 font-display font-extrabold tracking-tight">
              <span className={isLight ? 'text-white' : 'text-[#0F2C59]'}>JOHNNY</span>
              <span className="text-[#D9232D]">AUTO</span>
            </div>
            <span className={`text-[10px] uppercase ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>
              Car Maintenance & Assembly
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
