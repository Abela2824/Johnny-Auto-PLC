import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useT } from '../i18n';
import { SERVICES, SERVICE_BY_ID } from '../data/company';
import type { ServiceId } from '../api/types';
import { CarSide } from '../components/CarSide';
import { Button, Chip, SectionHead } from '../components/ui';

export function Services() {
  const { t, lang } = useT();
  const [active, setActive] = useState<ServiceId>('body');
  const s = SERVICE_BY_ID[active];

  return (
    <section id="services" className="scroll-mt-20 bg-ink" aria-labelledby="services-title">
      <div className="wrap py-20 lg:py-28">
        <SectionHead id="services-title" eyebrow={t('services.eyebrow')} title={t('services.title')} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-mist mb-4">{t('services.hint')}</p>
            <div className="relative">
              <CarSide mode="interactive" active={active} onZone={setActive} title="Car with service zones" />
              <div className="absolute left-0 bottom-0 font-mono text-[11px] uppercase tracking-widest text-mist-2 bg-ink/70 px-2 py-1 rounded-sm">
                <span className="text-red-3">●</span> {s.zone}
              </div>
            </div>
            <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="tablist" aria-label="Services">
              {SERVICES.map((sv) => (
                <Chip key={sv.id} active={sv.id === active} onClick={() => setActive(sv.id)}>
                  {lang === 'am' ? sv.nameAm : sv.name}
                </Chip>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              <m.article
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-sm border border-white/10 bg-white/[.03] overflow-hidden"
              >
                <div className="duo duo-reveal aspect-[16/9]">
                  <img src={s.image} alt={s.name} loading="lazy" decoding="async" />
                </div>
                <div className="p-6 lg:p-7">
                  <h3 className="font-display font-extrabold wdth-87 text-2xl lg:text-3xl leading-tight">{lang === 'am' ? s.nameAm : s.name}</h3>
                  {lang === 'am' && <p className="mt-1 text-sm text-mist">{s.name}</p>}
                  <p className="mt-3 text-mist-2 leading-relaxed">{s.long}</p>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-red mt-[2px]">—</span><span>{p}</span></li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button to={`/book?service=${s.id}`} arrow>{t('services.book')}</Button>
                    {(s.id === 'body' || s.id === 'paint' || s.id === 'fiberglass') && (
                      <Button to="/quote" variant="outline">{t('services.quote')}</Button>
                    )}
                  </div>
                </div>
              </m.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
