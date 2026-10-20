import React from 'react';
import { classNames as cx } from '../lib/format';

/**
 * Top-down car for the damage picker. Front at the top. Each zone is a
 * keyboard-focusable button; `selected` maps zone id → severity colour.
 */
export type ZoneShape = { id: string; el: React.ReactNode; cx: number; cy: number; short: string };

const Z: ZoneShape[] = [
  { id: 'front-bumper', el: <rect x="40" y="10" width="220" height="48" rx="26" />, cx: 150, cy: 34, short: 'Front bumper' },
  { id: 'headlights', el: <><rect x="50" y="56" width="40" height="10" rx="3" /><rect x="210" y="56" width="40" height="10" rx="3" /></>, cx: 150, cy: 61, short: 'Headlights' },
  { id: 'l-front-wing', el: <rect x="40" y="66" width="40" height="114" />, cx: 60, cy: 123, short: 'L front wing' },
  { id: 'bonnet', el: <rect x="80" y="66" width="140" height="114" />, cx: 150, cy: 123, short: 'Bonnet' },
  { id: 'r-front-wing', el: <rect x="220" y="66" width="40" height="114" />, cx: 240, cy: 123, short: 'R front wing' },
  { id: 'windscreen', el: <polygon points="80,180 220,180 224,222 76,222" />, cx: 150, cy: 201, short: 'Windscreen' },
  { id: 'l-front-door', el: <rect x="40" y="180" width="36" height="100" />, cx: 58, cy: 230, short: 'L front door' },
  { id: 'r-front-door', el: <rect x="224" y="180" width="36" height="100" />, cx: 242, cy: 230, short: 'R front door' },
  { id: 'roof', el: <rect x="76" y="222" width="148" height="150" />, cx: 150, cy: 297, short: 'Roof' },
  { id: 'l-rear-door', el: <rect x="40" y="280" width="36" height="92" />, cx: 58, cy: 326, short: 'L rear door' },
  { id: 'r-rear-door', el: <rect x="224" y="280" width="36" height="92" />, cx: 242, cy: 326, short: 'R rear door' },
  { id: 'rear-window', el: <polygon points="76,372 224,372 220,404 80,404" />, cx: 150, cy: 388, short: 'Rear window' },
  { id: 'l-rear-quarter', el: <rect x="40" y="372" width="40" height="152" />, cx: 60, cy: 448, short: 'L rear quarter' },
  { id: 'boot', el: <rect x="80" y="404" width="140" height="120" />, cx: 150, cy: 464, short: 'Boot' },
  { id: 'r-rear-quarter', el: <rect x="220" y="372" width="40" height="152" />, cx: 240, cy: 448, short: 'R rear quarter' },
  { id: 'taillights', el: <><rect x="50" y="526" width="40" height="10" rx="3" /><rect x="210" y="526" width="40" height="10" rx="3" /></>, cx: 150, cy: 531, short: 'Tail lights' },
  { id: 'rear-bumper', el: <rect x="40" y="540" width="220" height="50" rx="26" />, cx: 150, cy: 565, short: 'Rear bumper' },
  { id: 'underside', el: <><rect x="22" y="86" width="18" height="56" rx="5" /><rect x="260" y="86" width="18" height="56" rx="5" /><rect x="22" y="430" width="18" height="56" rx="5" /><rect x="260" y="430" width="18" height="56" rx="5" /></>, cx: 150, cy: 0, short: 'Wheels / underside' },
];

export const SEVERITY_COLOUR: Record<string, string> = { scratch: '#FFB020', dent: '#E2342D', structural: '#B8231D' };

export function CarTop({ selected, onToggle, className }: { selected: Record<string, string>; onToggle: (id: string) => void; className?: string }) {
  return (
    <svg viewBox="0 0 300 600" className={cx('w-full h-auto', className)} role="group" aria-label="Car diagram, front at the top">
      {/* body outline */}
      <rect x="40" y="10" width="220" height="580" rx="40" fill="#11151C" stroke="#F2EEE6" strokeOpacity=".6" strokeWidth="2" />
      <text x="150" y="-2" fill="#9AA3B2" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono, monospace">FRONT</text>
      {/* mirrors */}
      <rect x="28" y="196" width="12" height="18" rx="3" fill="#2A303A" />
      <rect x="260" y="196" width="12" height="18" rx="3" fill="#2A303A" />
      {Z.map((z) => {
        const sev = selected[z.id];
        const on = Boolean(sev);
        return (
          <g
            key={z.id}
            role="checkbox"
            aria-checked={on}
            aria-label={z.short}
            tabIndex={0}
            className="outline-none cursor-pointer"
            onClick={() => onToggle(z.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(z.id); } }}
            fill={on ? SEVERITY_COLOUR[sev] : '#F2EEE6'}
            fillOpacity={on ? 0.85 : 0.08}
            stroke="#F2EEE6"
            strokeOpacity={on ? 0.9 : 0.35}
            strokeWidth="1.5"
            style={{ transition: 'fill-opacity .25s, fill .25s' }}
          >
            {z.el}
          </g>
        );
      })}
      <text x="150" y="150" fill="#9AA3B2" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" pointerEvents="none">BONNET</text>
      <text x="150" y="300" fill="#9AA3B2" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" pointerEvents="none">ROOF</text>
      <text x="150" y="468" fill="#9AA3B2" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" pointerEvents="none">BOOT</text>
      <text x="14" y="340" fill="#9AA3B2" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace" transform="rotate(-90 14 340)" pointerEvents="none">LEFT</text>
      <text x="288" y="340" fill="#9AA3B2" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace" transform="rotate(90 288 340)" pointerEvents="none">RIGHT</text>
    </svg>
  );
}

export const ZONE_SHORT = Object.fromEntries(Z.map((z) => [z.id, z.short])) as Record<string, string>;
