import { useT } from '../i18n';
import { Placeholder, Reveal, SectionHead } from '../components/ui';

const FACTS = [
  { k: 'Downdraft airflow', v: 'Filtered air moves top to bottom so dust never settles on wet paint.' },
  { k: 'Baked, not air-dried', v: 'A controlled heat cycle cures a whole car in hours, so the finish lasts.' },
  { k: 'Total Control Technology', v: 'Pressure, temperature and fan speed held by the booth’s own controller.' },
];

export function Workshop() {
  const { t } = useT();
  return (
    <section id="workshop" className="scroll-mt-20 bg-ink" aria-labelledby="workshop-title">
      <div className="wrap py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          <Reveal className="lg:col-span-7">
            <figure className="duo duo-reveal aspect-[4/3] rounded-sm" tabIndex={0}>
              <img src="/images/johnny-auto28.jpg" alt="Nova Verta spray booth on the Megenagna workshop floor" loading="lazy" decoding="async" width={1080} height={720} />
              <figcaption className="absolute left-4 bottom-4 z-10 font-mono text-[11px] uppercase tracking-widest text-bone/80 bg-ink/60 px-2 py-1 rounded-sm">{t('workshop.reveal')}</figcaption>
            </figure>
          </Reveal>
          <div className="lg:col-span-5">
            <SectionHead id="workshop-title" eyebrow={t('workshop.eyebrow')} title={t('workshop.title')} lead={t('workshop.lead')} />
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {FACTS.map((f) => (
                <div key={f.k} className="py-4 grid sm:grid-cols-5 gap-1 sm:gap-4">
                  <dt className="sm:col-span-2 font-semibold text-bone">{f.k}</dt>
                  <dd className="sm:col-span-3 text-sm text-mist-2">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <Reveal delay={0.05}>
            <figure className="duo duo-reveal duo-blue aspect-[4/3] rounded-sm" tabIndex={0}>
              <img src="/images/johnny-auto6.jpg" alt="Johnny Auto team in front of the workshop, May 2020" loading="lazy" decoding="async" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-ink to-transparent">
                <span className="font-display font-extrabold wdth-75 text-3xl leading-none">100+</span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-mist-2 mt-1">technicians and staff · May 2020</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="duo duo-reveal aspect-[4/3] rounded-sm" tabIndex={0}>
              <img src="/images/johnny-auto1.jpg" alt="Johnny Auto tow truck" loading="lazy" decoding="async" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-ink to-transparent">
                <span className="font-display font-extrabold wdth-75 text-3xl leading-none">Recovery</span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-mist-2 mt-1">own tow truck · one ticket from roadside to handover</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="duo duo-reveal duo-steel aspect-[4/3] rounded-sm" tabIndex={0}>
              <img src="/images/fiberglass-repair.jpg" alt="Technician working on a car inside the booth" loading="lazy" decoding="async" />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 p-4 bg-gradient-to-t from-ink to-transparent">
                <span className="font-display font-extrabold wdth-75 text-3xl leading-none">Composites</span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-mist-2 mt-1">fibreglass department · boats too</span>
                <span className="block mt-2"><Placeholder label="Boat photo — to collect" /></span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
