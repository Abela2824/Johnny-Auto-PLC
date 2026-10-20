import { ArrowUpRight } from 'lucide-react';
import { Link } from '../lib/router';
import { useT } from '../i18n';
import { NOTES } from '../data/notes';
import { Placeholder, SectionHead } from '../components/ui';

export function Notes() {
  const { t, lang } = useT();
  return (
    <section id="notes" className="scroll-mt-20 bg-ink" aria-labelledby="notes-title">
      <div className="wrap py-20 lg:py-28">
        <SectionHead id="notes-title" eyebrow={t('notes.eyebrow')} title={t('notes.title')} lead="Short, practical notes written for the roads and seasons of Addis Ababa. Replaces the borrowed blog on the current site." />
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NOTES.map((n) => (
            <li key={n.slug}>
              <Link to={`/notes/${n.slug}`} className="group block h-full rounded-sm border border-white/10 bg-white/[.03] p-6 hover:border-white/30 transition-colors">
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{n.season}</span>
                <h3 className="mt-3 font-display font-bold wdth-87 text-xl leading-snug group-hover:text-red-3 transition-colors">
                  {lang === 'am' && n.titleAm ? n.titleAm : n.title}
                </h3>
                <p className="mt-2 text-sm text-mist-2">{n.summary}</p>
                <span className="mt-5 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{n.readMinutes} min</span>
                    <Placeholder label={t('notes.draft')} />
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-mist group-hover:text-bone" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
