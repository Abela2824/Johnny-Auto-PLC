import { useRef } from 'react';
import { useInView } from 'motion/react';
import { useT } from '../i18n';
import { STATS } from '../data/company';
import { useCountUp, usePrefersReducedMotion } from '../lib/hooks';
import { Placeholder } from '../components/ui';

function Ticks({ n, total }: { n: number; total: number }) {
  return (
    <svg viewBox={`0 0 ${total * 10} 24`} className="w-full h-6" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <rect key={i} x={i * 10 + 2} y={i % 5 === 4 ? 0 : 8} width="3" height={i % 5 === 4 ? 24 : 16} fill={i < n ? 'var(--color-red)' : 'rgba(10,12,16,.18)'} />
      ))}
    </svg>
  );
}

function Dots({ n, total, cols }: { n: number; total: number; cols: number }) {
  return (
    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }} aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className="aspect-square rounded-[1px]" style={{ background: i < n ? 'var(--color-red)' : 'rgba(10,12,16,.12)' }} />
      ))}
    </div>
  );
}

function Odometer({ value }: { value: string }) {
  return (
    <div className="flex gap-[2px]" aria-hidden>
      {value.split('').map((c, i) => (
        <span key={i} className="w-5 h-7 grid place-items-center bg-ink text-bone font-mono text-sm rounded-[2px]">{c}</span>
      ))}
    </div>
  );
}

export function Stats() {
  const { t } = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = usePrefersReducedMotion();

  const years = useCountUp(25, inView, 1400, reduced);
  const staff = useCountUp(100, inView, 1600, reduced);
  const area = useCountUp(2000, inView, 1800, reduced);
  const cust = useCountUp(500, inView, 2000, reduced);
  const values = { years, staff, area, customers: cust } as const;

  return (
    <section className="bg-bone text-ink" aria-labelledby="stats-title">
      <div className="wrap py-16 lg:py-24">
        <span className="eyebrow !text-steel">{t('stats.eyebrow')}</span>
        <h2 id="stats-title" className="sr-only">Johnny Auto in numbers</h2>
        <div ref={ref} className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
          {STATS.map((s) => {
            const v = values[s.id];
            return (
              <div key={s.id} className="bg-bone p-6 lg:p-8 flex flex-col gap-5 min-h-56">
                <div>
                  <div className="font-display font-black wdth-75 text-5xl lg:text-6xl leading-none tabular-nums">
                    {s.id === 'area' ? v.toLocaleString('en-US') : v}{s.suffix}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-steel">{t(s.labelKey)}</div>
                </div>
                <div className="mt-auto">
                  {s.id === 'years' && <Ticks n={v} total={25} />}
                  {s.id === 'staff' && <Dots n={v} total={100} cols={20} />}
                  {s.id === 'area' && <Dots n={Math.round(v / 10)} total={200} cols={40} />}
                  {s.id === 'customers' && <Odometer value={`${v.toString().padStart(3, '0')}000`} />}
                </div>
                {s.tbc && 'noteKey' in s && <Placeholder label={t(s.noteKey)} className="self-start" />}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-steel/80 max-w-2xl">† {t('stats.footnote')}</p>
      </div>
    </section>
  );
}
