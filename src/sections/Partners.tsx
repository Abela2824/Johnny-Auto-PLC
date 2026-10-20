import { useT } from '../i18n';
import { PARTNERS } from '../data/company';

export function Partners() {
  const { t } = useT();
  return (
    <section className="bg-ink-2 border-y border-white/10" aria-label="Equipment and materials">
      <div className="wrap py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <span className="eyebrow shrink-0">{t('partners.eyebrow')}</span>
          <ul className="flex-1 grid grid-cols-3 sm:grid-cols-5 gap-4 items-center">
            {PARTNERS.map((p) => (
              <li key={p.id} className="flex flex-col items-center gap-2 text-center">
                <span className="h-12 flex items-center">
                  <img src={p.logo} alt={p.name} loading="lazy" decoding="async" className="max-h-10 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{p.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-[11px] text-mist">{t('partners.note')}</p>
      </div>
    </section>
  );
}
