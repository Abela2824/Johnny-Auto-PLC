import React from 'react';
import type { ServiceId } from '../api/types';
import { classNames as cx } from '../lib/format';

/**
 * Side-profile SUV silhouette. Three modes:
 *  - hero: wireframe draws itself, then a paint sweep fills it (CSS in index.css)
 *  - interactive: service zones are focusable buttons that light up
 *  - icon: small plain outline (used on the process line and tickets)
 */

export const BODY = 'M62 232 L62 196 C62 172 72 158 96 152 L292 128 L348 72 C356 62 366 60 384 60 L596 60 C630 60 646 70 664 92 L706 134 L738 142 C748 146 752 158 752 170 L752 212 C752 224 744 232 732 232 L692 232 A54 54 0 0 0 584 232 L262 232 A54 54 0 0 0 154 232 Z';
const WIN_F = '304,128 354,78 470,78 470,128';
const WIN_R = '486,78 596,78 646,128 486,128';

const ZONES: Record<ServiceId, React.ReactNode> = {
  body: (
    <>
      <polygon points="90,152 292,128 300,226 96,226" />
      <polygon points="304,130 478,130 478,226 304,226" />
      <polygon points="478,130 600,130 600,226 478,226" />
      <polygon points="600,130 706,134 738,142 752,170 752,226 600,226" />
    </>
  ),
  paint: (
    <>
      <polygon points="96,150 292,126 298,142 100,166" />
      <polygon points="354,74 384,60 596,60 664,92 652,102 596,74 386,74 362,82" />
      <polygon points="706,134 738,142 752,170 744,174 734,150 702,144" />
    </>
  ),
  diagnostics: (
    <>
      <polygon points="78,158 286,134 286,184 78,196" />
      <polygon points="300,132 470,132 470,152 300,152" />
    </>
  ),
  mechanical: (
    <>
      <rect x="150" y="224" width="590" height="22" />
      <circle cx="208" cy="232" r="50" />
      <circle cx="638" cy="232" r="50" />
    </>
  ),
  fiberglass: (
    <>
      <polygon points="62,176 100,172 100,232 62,232" />
      <polygon points="722,186 752,186 752,232 716,232" />
    </>
  ),
  'end-to-end': (
    <>
      <path d={BODY} />
      <circle cx="54" cy="214" r="7" />
      <path d="M46 214 H -60" strokeDasharray="6 6" />
    </>
  ),
};

export function CarSide({ mode = 'icon', active, onZone, className, title = 'Car silhouette' }: {
  mode?: 'hero' | 'interactive' | 'icon';
  active?: ServiceId | null;
  onZone?: (id: ServiceId) => void;
  className?: string;
  title?: string;
}) {
  const stroke = 'currentColor';
  if (mode === 'icon') {
    return (
      <svg viewBox="40 40 740 240" className={className} aria-hidden="true" fill="none" stroke={stroke} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
        <path d={BODY} />
        <circle cx="208" cy="232" r="40" />
        <circle cx="638" cy="232" r="40" />
      </svg>
    );
  }

  if (mode === 'hero') {
    return (
      <svg viewBox="-20 30 860 270" className={cx('hero-car', className)} role="img" aria-label={title} style={{ ['--spray-x' as string]: '760px' }}>
        <defs>
          <linearGradient id="paintGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E2342D" />
            <stop offset="1" stopColor="#B8231D" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5CE1FF" stopOpacity=".35" />
            <stop offset="1" stopColor="#2F6BFF" stopOpacity=".08" />
          </linearGradient>
        </defs>
        {/* painted layer, revealed by the wipe */}
        <g className="fill">
          <path d={BODY} fill="url(#paintGrad)" />
          <polygon points={WIN_F} fill="url(#glassGrad)" />
          <polygon points={WIN_R} fill="url(#glassGrad)" />
          <circle cx="208" cy="232" r="46" fill="#0A0C10" />
          <circle cx="638" cy="232" r="46" fill="#0A0C10" />
          <circle cx="208" cy="232" r="24" fill="none" stroke="#F2EEE6" strokeOpacity=".6" strokeWidth="2" />
          <circle cx="638" cy="232" r="24" fill="none" stroke="#F2EEE6" strokeOpacity=".6" strokeWidth="2" />
          <polygon points="66,158 100,150 100,174 66,178" fill="#FFF4D6" />
          <polygon points="738,150 752,154 752,186 738,186" fill="#FF6B62" />
        </g>
        {/* wireframe */}
        <g fill="none" stroke="#F2EEE6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path className="stroke" pathLength={1} d={BODY} />
          <circle className="stroke d2" pathLength={1} cx="208" cy="232" r="46" />
          <circle className="stroke d2" pathLength={1} cx="638" cy="232" r="46" />
          <polygon className="stroke d2" pathLength={1} points={WIN_F} />
          <polygon className="stroke d2" pathLength={1} points={WIN_R} />
          <path className="stroke d3" pathLength={1} d="M478 78 V226 M600 130 V226 M96 170 L740 166 M420 160 h30 M540 160 h30" strokeOpacity=".7" />
          <polygon className="stroke d3" pathLength={1} points="296,122 310,116 316,130 300,134" />
        </g>
        {/* spray line */}
        <g className="spray">
          <rect x="60" y="40" width="3" height="220" fill="#5CE1FF" />
          <rect x="40" y="40" width="40" height="220" fill="#5CE1FF" opacity=".12" />
        </g>
        {/* the line continues */}
        <line className="after" x1="752" y1="232" x2="1600" y2="232" stroke="#E2342D" strokeWidth="2" />
      </svg>
    );
  }

  // interactive
  const ids = Object.keys(ZONES) as ServiceId[];
  return (
    <svg viewBox="-70 40 900 240" className={cx('w-full h-auto text-bone', className)} role="group" aria-label={title}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity=".9">
        <path d={BODY} />
        <circle cx="208" cy="232" r="46" />
        <circle cx="638" cy="232" r="46" />
        <circle cx="208" cy="232" r="24" strokeOpacity=".5" />
        <circle cx="638" cy="232" r="24" strokeOpacity=".5" />
        <polygon points={WIN_F} />
        <polygon points={WIN_R} />
        <path d="M478 78 V226 M600 130 V226 M96 170 L740 166 M420 160 h30 M540 160 h30" strokeOpacity=".55" />
        <polygon points="296,122 310,116 316,130 300,134" />
        <polygon points="66,158 100,150 100,174 66,178" strokeOpacity=".7" />
      </g>
      {ids.map((id) => {
        const isActive = active === id;
        return (
          <g
            key={id}
            role="button"
            tabIndex={0}
            aria-label={id}
            aria-pressed={isActive}
            className="outline-none cursor-pointer"
            onPointerEnter={() => onZone?.(id)}
            onFocus={() => onZone?.(id)}
            onClick={() => onZone?.(id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onZone?.(id); } }}
            fill={isActive ? 'var(--accent)' : 'currentColor'}
            fillOpacity={isActive ? 0.38 : 0.04}
            stroke={isActive ? 'var(--accent-2)' : 'transparent'}
            strokeWidth="2"
            style={{ transition: 'fill-opacity .35s, stroke .35s' }}
          >
            {ZONES[id]}
          </g>
        );
      })}
    </svg>
  );
}
