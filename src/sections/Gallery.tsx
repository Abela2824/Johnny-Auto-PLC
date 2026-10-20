import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useT } from '../i18n';
import { COMPARE_PAIRS, GALLERY } from '../data/company';
import { Chip, Placeholder, Reveal, SectionHead } from '../components/ui';
import { classNames as cx } from '../lib/format';

function Compare({ pair }: { pair: (typeof COMPARE_PAIRS)[number] }) {
  const { t } = useT();
  const [pos, setPos] = useState(50);
  return (
    <figure className="compare relative aspect-[3/2] overflow-hidden rounded-sm bg-ink-3 select-none">
      <img src={pair.after.src} alt={`${pair.title} — ${pair.after.label}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={pair.before.src} alt={`${pair.title} — ${pair.before.label}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
      <div className="absolute top-0 bottom-0 w-px bg-bone pointer-events-none" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bone text-ink grid place-items-center shadow-lg">
          <ChevronLeft className="w-4 h-4 -mr-1" /><ChevronRight className="w-4 h-4 -ml-1" />
        </span>
      </div>
      <span className="absolute left-3 top-3 font-mono text-[11px] uppercase tracking-widest bg-ink/70 text-bone px-2 py-1 rounded-sm pointer-events-none">{pair.before.label}</span>
      <span className="absolute right-3 top-3 font-mono text-[11px] uppercase tracking-widest bg-ink/70 text-bone px-2 py-1 rounded-sm pointer-events-none">{pair.after.label}</span>
      <input
        type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${t('gallery.drag')}: ${pair.title}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink/90 to-transparent text-sm pointer-events-none">
        <span className="font-semibold">{pair.title}</span>
        <span className="block text-xs text-mist-2 mt-0.5">{pair.note}</span>
      </figcaption>
    </figure>
  );
}

const CATS = ['All', 'Paint', 'Body', 'Facility', 'Team', 'Handover', 'Commercial', 'Mechanical'] as const;

export function Gallery() {
  const { t } = useT();
  const [cat, setCat] = useState<(typeof CATS)[number]>('All');
  const [open, setOpen] = useState<number | null>(null);
  const items = cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, items.length]);

  return (
    <section id="gallery" className="scroll-mt-20 bg-ink-2 border-y border-white/10" aria-labelledby="gallery-title">
      <div className="wrap py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <SectionHead id="gallery-title" eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} />
            <p className="mt-5 text-mist-2 max-w-md">Every job gets photos at intake, after metalwork, out of the booth, and at handover. In production the technicians’ photos feed this page directly.</p>
            <div className="mt-6"><Placeholder label="True before/after sets — to collect" /></div>
          </div>
          <Reveal className="lg:col-span-7">
            <Compare pair={COMPARE_PAIRS[0]} />
          </Reveal>
        </div>

        <div className="mt-14 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATS.map((c) => <Chip key={c} active={c === cat} onClick={() => setCat(c)}>{c === 'All' ? t('gallery.all') : c}</Chip>)}
        </div>

        <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((g, i) => (
            <li key={g.id} className={cx(g.tall && 'row-span-2')}>
              <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left">
                <span className={cx('duo duo-reveal block rounded-sm', g.tall ? 'aspect-[3/4] sm:aspect-[2/3]' : 'aspect-[4/3]')}>
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                </span>
                <span className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-mist-2 group-hover:text-bone">{g.caption}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{g.cat}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && items[open] && (
        <div role="dialog" aria-modal="true" aria-label={items[open].caption} className="fixed inset-0 z-[70] bg-ink/95 flex flex-col" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-mist-2">{items[open].caption} <span className="font-mono text-xs text-mist ml-2">{open + 1}/{items.length}</span></span>
            <button type="button" className="w-10 h-10 grid place-items-center rounded-sm border border-white/15" onClick={() => setOpen(null)} aria-label="Close"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 grid place-items-center px-4 pb-6 min-h-0" onClick={(e) => e.stopPropagation()}>
            <img src={items[open].src} alt={items[open].alt} className="max-h-full max-w-full object-contain rounded-sm" />
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-ink/70 border border-white/15" aria-label="Previous"><ChevronLeft /></button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % items.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center rounded-full bg-ink/70 border border-white/15" aria-label="Next"><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}
