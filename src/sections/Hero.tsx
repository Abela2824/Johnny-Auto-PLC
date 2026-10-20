import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Phone } from 'lucide-react';
import { useT } from '../i18n';
import { Button } from '../components/ui';
import { CarSide } from '../components/CarSide';
import { COMPANY } from '../data/company';
import { getWorkshopStatus } from '../api/api';
import type { WorkshopStatus } from '../api/types';
import { telHref } from '../lib/format';
import { usePrefersReducedMotion } from '../lib/hooks';

export function Hero() {
  const { t, lang } = useT();
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const carX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 220]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [status, setStatus] = useState<WorkshopStatus | null>(null);

  useEffect(() => {
    let alive = true;
    getWorkshopStatus().then((s) => { if (alive) setStatus(s); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* background: duotone workshop photo */}
      <m.div className="absolute inset-0 duo" style={{ y: bgY }} aria-hidden>
        <img src="/hero-poster.webp" alt="" width={1280} height={720} fetchPriority="high" decoding="async" className="scale-[1.12]" />
      </m.div>
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_30%,rgba(10,12,16,.25),rgba(10,12,16,.92)_70%)]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/80 to-transparent" aria-hidden />

      <div className="wrap relative flex-1 flex flex-col justify-end pt-28 pb-10 lg:pt-36 lg:pb-16">
        <m.div style={{ opacity: fade }} className="lg:max-w-[46rem] relative z-10">
          <span className="eyebrow">
            <span>{t('hero.eyebrow')}</span>
            {lang === 'en' && <span lang="am" className="whitespace-nowrap opacity-80">{COMPANY.address.amharic}</span>}
          </span>
          <h1 className={`mt-5 font-display font-black wdth-75 tracking-tight ${lang === 'am' ? 'text-[clamp(2rem,8vw,3.2rem)] lg:text-[4rem] leading-[1.2]' : 'text-[clamp(2.6rem,10.5vw,4.25rem)] lg:text-[5.4rem] leading-[0.94]'}`}>
            <span className="block text-bone">{t('hero.title1')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-volt-2 to-volt">{t('hero.title2')}</span>
          </h1>
          <p className="mt-6 max-w-xl lg:max-w-md text-base sm:text-lg text-mist-2 leading-relaxed">{t('hero.lead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/book" size="lg" arrow>{t('hero.cta.book')}</Button>
            <Button to="/track" size="lg" variant="outline">{t('hero.cta.track')}</Button>
            <Button href={telHref(COMPANY.phones[0].e164)} size="lg" variant="ghost" icon={<Phone className="w-4 h-4" />} className="hidden sm:inline-flex">{t('hero.cta.call')}</Button>
          </div>
        </m.div>

        {/* the car: draws itself, gets painted, then rolls along the line as you scroll */}
        <m.div style={{ x: carX }} className="relative mt-8 -mx-4 sm:-mx-6 lg:mx-0 lg:absolute lg:right-[-6vw] lg:bottom-24 lg:w-[64vw] lg:max-w-[1040px] pointer-events-none">
          <CarSide mode="hero" className="w-full h-auto" title="A car being drawn and painted" />
        </m.div>
      </div>

      {/* workshop status strip (mock data) */}
      <div className="relative border-t border-white/10 bg-ink/70 backdrop-blur-sm">
        <div className="wrap flex items-center gap-6 h-12 overflow-x-auto no-scrollbar font-mono text-[11px] sm:text-xs uppercase tracking-wider text-mist-2 whitespace-nowrap">
          <span className="flex items-center gap-2 text-bone">
            <span className={`w-2 h-2 rounded-full ${status?.open ? 'bg-ok blink' : 'bg-warn'}`} aria-hidden />
            {t('hero.status.title')}
          </span>
          {status ? (
            <>
              <span>{status.open ? t('hero.status.open', { time: status.closesAt }) : t('hero.status.closed', { time: status.opensAt })}</span>
              <span>{t('hero.status.bays', { used: status.baysInUse, total: status.baysTotal })}</span>
              <span>{t('hero.status.booth', { n: status.boothQueue })}</span>
              <span>{t('hero.status.tow', { state: status.towAvailable ? t('hero.status.tow.available') : t('hero.status.tow.out') })}</span>
            </>
          ) : (
            <span className="text-mist">…</span>
          )}
          <span className="ml-auto flex items-center gap-2 text-mist">
            <span className="rounded-sm border border-dashed border-warn/60 px-1.5 text-warn">{t('hero.status.demo')}</span>
            <a href="#services" className="hidden sm:inline-flex items-center gap-1 text-mist-2 hover:text-bone normal-case tracking-normal">{t('hero.scroll')} <ArrowDown className="w-3.5 h-3.5" /></a>
          </span>
        </div>
      </div>
    </section>
  );
}
