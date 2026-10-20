import { useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useT } from '../i18n';
import { STAGES } from '../data/company';
import { CarSide } from '../components/CarSide';
import { Placeholder, SectionHead } from '../components/ui';
import { useMediaQuery, usePrefersReducedMotion } from '../lib/hooks';
import { classNames as cx } from '../lib/format';

function StageCard({ i, big }: { i: number; big?: boolean }) {
  const { t, lang } = useT();
  const s = STAGES[i];
  return (
    <div className={cx('rounded-sm border border-white/10 bg-white/[.03]', big ? 'p-7 lg:p-9' : 'p-5')}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-red-3">0{s.n}</span>
        <h3 className={cx('font-display font-extrabold wdth-87 leading-tight', big ? 'text-3xl lg:text-4xl' : 'text-xl')}>
          {lang === 'am' ? s.nameAm : s.name}
          {lang === 'am' && <span className="ml-2 text-sm font-normal text-mist">{s.name}</span>}
        </h3>
      </div>
      <p className="mt-3 text-mist-2 leading-relaxed">{s.what}</p>
      <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('process.customer')}</div>
          <div className="mt-1 text-bone">{s.get}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('process.time')}</div>
          <div className="mt-1"><Placeholder label={t('process.time.tbc')} /></div>
        </div>
      </div>
    </div>
  );
}

function ProcessHead() {
  const { t } = useT();
  return <SectionHead id="process-title" eyebrow={t('process.eyebrow')} title={t('process.title')} lead={t('process.lead')} />;
}

function Desktop() {
  const { lang } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const left = useTransform(scrollYProgress, [0.04, 0.96], ['0%', '100%']);
  const fill = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(STAGES.length - 1, Math.max(0, Math.round(((v - 0.04) / 0.92) * (STAGES.length - 1))));
    setActive(i);
  });
  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * (0.04 + (i / (STAGES.length - 1)) * 0.92);
    window.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <div ref={ref} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <ProcessHead />
        <div className="relative mt-20 mx-6">
          <div className="h-px bg-white/15" />
          <m.div className="absolute top-0 left-0 h-px w-full origin-left bg-red" style={{ scaleX: fill }} />
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => jump(i)}
              className="absolute -top-[5px] group"
              style={{ left: `${(i / (STAGES.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
              aria-label={s.name}
            >
              <span className={cx('block w-[11px] h-[11px] rounded-full border transition-colors', i <= active ? 'bg-red border-red' : 'bg-ink border-white/30')} />
              <span className={cx('absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest transition-colors', i === active ? 'text-bone' : 'text-mist')}>
                0{s.n} {lang === 'am' ? s.nameAm : s.name}
              </span>
            </button>
          ))}
          <m.div className="absolute -top-9 text-red-3" style={{ left, x: '-50%' }} aria-hidden>
            <CarSide mode="icon" className="w-16 h-auto" />
          </m.div>
        </div>
        <div className="mt-24 max-w-3xl">
          <AnimatePresence mode="wait">
            <m.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
              <StageCard i={active} big />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Stacked() {
  return (
    <div className="py-20">
      <ProcessHead />
      <ol className="mt-12 relative pl-8">
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-red to-volt" aria-hidden />
        {STAGES.map((s, i) => (
          <li key={s.id} className="relative mb-6">
            <span className="absolute -left-8 top-6 w-[11px] h-[11px] rounded-full bg-red border border-red" aria-hidden />
            <StageCard i={i} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Process() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const reduced = usePrefersReducedMotion();
  return (
    <section id="process" className="scroll-mt-20 bg-ink-2 border-y border-white/10" aria-labelledby="process-title">
      <div className="wrap">{desktop && !reduced ? <Desktop /> : <Stacked />}</div>
    </section>
  );
}
