import { useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { BatteryCharging, Check } from 'lucide-react';
import { useT } from '../i18n';
import { FUTURE } from '../data/company';
import { Button, Chip, Field, Notice, Placeholder, Reveal, inputCls, textareaCls } from '../components/ui';
import { registerEvInterest } from '../api/api';
import type { EvInterestInput } from '../api/types';
import { classNames as cx } from '../lib/format';

function Platform() {
  const ref = useRef<SVGSVGElement>(null);
  const on = useInView(ref, { once: true, amount: 0.5 });
  const cells = Array.from({ length: 24 });
  return (
    <svg ref={ref} viewBox="0 0 420 220" className={cx('ev-cells w-full h-auto', on && 'is-on')} role="img" aria-label="Electric vehicle platform with battery cells lighting up">
      <defs>
        <linearGradient id="cellGrad" x1="0" x2="1"><stop offset="0" stopColor="#5CE1FF" /><stop offset="1" stopColor="#2F6BFF" /></linearGradient>
      </defs>
      <rect x="30" y="40" width="360" height="140" rx="26" fill="none" stroke="#F2EEE6" strokeOpacity=".5" strokeWidth="2" />
      {[[52, 32], [368, 32], [52, 188], [368, 188]].map(([x, y], i) => (
        <rect key={i} x={x - 16} y={y - 10} width="32" height="20" rx="5" fill="#181D26" stroke="#F2EEE6" strokeOpacity=".6" />
      ))}
      <circle cx="70" cy="110" r="14" fill="none" stroke="#5CE1FF" strokeWidth="2" />
      <circle cx="350" cy="110" r="14" fill="none" stroke="#5CE1FF" strokeWidth="2" />
      <rect x="96" y="62" width="228" height="96" rx="6" fill="none" stroke="#5CE1FF" strokeOpacity=".5" />
      {cells.map((_, i) => {
        const col = i % 8;
        const row = Math.floor(i / 8);
        return <rect key={i} className="cell" x={102 + col * 28} y={68 + row * 30} width="22" height="24" rx="2" fill="url(#cellGrad)" opacity="0" style={{ animationDelay: `${i * 70}ms` }} />;
      })}
      <text x="210" y="205" textAnchor="middle" fill="#9AA3B2" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2">SKD PLATFORM · ILLUSTRATIVE</text>
    </svg>
  );
}

const SEGMENTS: { id: EvInterestInput['segment']; key: 'future.segment.buyer' | 'future.segment.fleet' | 'future.segment.investor' | 'future.segment.supplier' | 'future.segment.careers' }[] = [
  { id: 'buyer', key: 'future.segment.buyer' },
  { id: 'fleet', key: 'future.segment.fleet' },
  { id: 'investor', key: 'future.segment.investor' },
  { id: 'supplier', key: 'future.segment.supplier' },
  { id: 'careers', key: 'future.segment.careers' },
];

export function Future() {
  const { t } = useT();
  const [segment, setSegment] = useState<EvInterestInput['segment']>('fleet');
  const [form, setForm] = useState({ name: '', phone: '', email: '', org: '', note: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [ref, setRef] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setState('sending');
    try {
      const r = await registerEvInterest({ segment, ...form });
      setRef(r.ref);
      setState('done');
    } catch { setState('error'); }
  };

  return (
    <section id="future" className="scroll-mt-20 bg-[#06091A] text-bone border-y border-volt/20" style={{ ['--accent' as string]: 'var(--color-volt-2)', ['--accent-2' as string]: 'var(--color-volt-2)' }} aria-labelledby="future-title">
      <div className="wrap py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="eyebrow">{t('future.eyebrow')} · <span className="text-volt-2">{t('future.status')}</span></span>
            <h2 id="future-title" className="mt-5 font-display font-black wdth-62 text-[clamp(3.5rem,14vw,6rem)] lg:text-[7.5rem] leading-[0.85] tracking-tight">
              <span className="text-outline block">GELAN</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-volt-2 to-volt">EV PLANT</span>
            </h2>
            <h3 className="mt-6 font-display font-bold wdth-87 text-2xl lg:text-3xl">{t('future.title')}</h3>
            <p className="mt-4 text-mist-2 leading-relaxed max-w-xl">{t('future.lead')}</p>
            <dl className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-volt/20 pt-6">
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('future.site')}</dt><dd className="mt-1 font-semibold">{FUTURE.location}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('future.area')}</dt><dd className="mt-1 font-display font-extrabold wdth-75 text-3xl">{FUTURE.area}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('future.capacity')}</dt><dd className="mt-1 font-display font-extrabold wdth-75 text-3xl">{FUTURE.capacity}</dd></div>
              <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('future.kits')}</dt><dd className="mt-1 font-semibold">{FUTURE.method}</dd></div>
            </dl>
            <details className="mt-6 group">
              <summary className="cursor-pointer text-sm text-volt-2 font-semibold list-none inline-flex items-center gap-2"><BatteryCharging className="w-4 h-4" /> What is SKD assembly?</summary>
              <p className="mt-2 text-sm text-mist-2 max-w-xl">Semi-knocked-down kits arrive as major sub-assemblies (body, drivetrain, battery pack) and are joined, trimmed, tested and finished locally. It is the step between importing finished cars and full local manufacturing, and it uses exactly the body, electrical and finishing skills a collision shop already has.</p>
            </details>
            <div className="mt-4 flex flex-wrap gap-2">
              <Placeholder label="Timeline — to confirm" />
              <Placeholder label="EV service readiness today — to confirm" />
            </div>
          </div>
          <div className="lg:col-span-6 grid gap-4">
            <Reveal><div className="rounded-sm border border-volt/20 bg-volt/5 p-6"><Platform /></div></Reveal>
            <Reveal delay={0.1}>
              <figure className="duo duo-blue duo-reveal aspect-[16/7] rounded-sm" tabIndex={0}>
                <img src={FUTURE.image} alt="Green industrial building on the planned Gelan site" loading="lazy" decoding="async" />
                <figcaption className="absolute left-4 bottom-3 z-10 font-mono text-[11px] uppercase tracking-widest text-bone/80 bg-ink/60 px-2 py-1 rounded-sm">Gelan site · photo from current website</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* interest list */}
        <div className="mt-20 rounded-sm border border-volt/25 bg-gradient-to-br from-volt/10 to-transparent p-6 lg:p-10 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <h3 className="font-display font-extrabold wdth-75 text-3xl lg:text-4xl">{t('future.form.title')}</h3>
            <p className="mt-3 text-mist-2">{t('future.form.lead')}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SEGMENTS.map((s) => <Chip key={s.id} active={segment === s.id} onClick={() => setSegment(s.id)}>{t(s.key)}</Chip>)}
            </div>
          </div>
          <form onSubmit={submit} className="lg:col-span-7 grid sm:grid-cols-2 gap-4" aria-label="EV interest form">
            {state === 'done' ? (
              <Notice tone="ok" className="sm:col-span-2 flex items-center gap-3"><Check className="w-5 h-5 text-ok" /> {t('future.form.done')} <span className="font-mono text-xs ml-auto">{ref}</span></Notice>
            ) : (
              <>
                <Field label={t('form.name')} required><input className={inputCls} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></Field>
                <Field label={t('form.phone')} required><input className={inputCls} required type="tel" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" placeholder="09…" /></Field>
                <Field label={t('form.email')}><input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></Field>
                <Field label={t('form.org')}><input className={inputCls} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} autoComplete="organization" /></Field>
                <Field label={t('form.notes')} className="sm:col-span-2"><textarea className={textareaCls} rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
                <div className="sm:col-span-2 flex items-center gap-4">
                  <Button type="submit" variant="volt" size="lg" loading={state === 'sending'} arrow>{t('future.cta')}</Button>
                  {state === 'error' && <span className="text-sm text-red-3">Something went wrong. Try again.</span>}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
