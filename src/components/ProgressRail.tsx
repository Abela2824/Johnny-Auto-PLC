import { m, useScroll, useSpring } from 'motion/react';
import { useT } from '../i18n';

const MARKS = [
  { id: 'top', key: 'brand.short' },
  { id: 'services', key: 'nav.services' },
  { id: 'process', key: 'nav.process' },
  { id: 'workshop', key: 'nav.workshop' },
  { id: 'future', key: 'nav.future' },
  { id: 'contact', key: 'nav.contact' },
] as const;

/** "The line": a red→blue progress rail that runs the length of the home page. */
export function ProgressRail() {
  const { t } = useT();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <>
      {/* mobile: thin bar under the header */}
      <m.div className="fixed top-16 left-0 right-0 h-0.5 z-40 origin-left lg:hidden" style={{ scaleX: p, background: 'linear-gradient(90deg,#E2342D,#2F6BFF)' }} aria-hidden />
      {/* desktop: vertical rail */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center" aria-hidden>
        <div className="relative w-px h-[46vh] bg-white/10">
          <m.div className="absolute inset-x-0 top-0 origin-top w-px" style={{ scaleY: p, height: '100%', background: 'linear-gradient(180deg,#E2342D 0%,#E2342D 55%,#2F6BFF 100%)' }} />
          {MARKS.map((mk, i) => (
            <a
              key={mk.id}
              href={`#${mk.id}`}
              className="group absolute -left-[5px] w-[11px] h-[11px] rounded-full border border-white/40 bg-ink hover:border-bone"
              style={{ top: `${(i / (MARKS.length - 1)) * 100}%`, transform: 'translateY(-50%)' }}
              aria-label={t(mk.key)}
              tabIndex={-1}
            >
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-mist opacity-0 group-hover:opacity-100 transition-opacity">{t(mk.key)}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
