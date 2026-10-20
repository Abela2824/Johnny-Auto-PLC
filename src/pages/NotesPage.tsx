import { Link } from '../lib/router';
import { useT } from '../i18n';
import { PageHead } from '../components/PageHead';
import { Button, Placeholder } from '../components/ui';
import { NOTES } from '../data/notes';

export default function NotesPage({ slug }: { slug?: string }) {
  const { t, lang } = useT();
  const note = slug ? NOTES.find((n) => n.slug === slug) : undefined;

  if (slug && !note) {
    return (
      <div className="pb-24"><PageHead eyebrow={t('notes.eyebrow')} title="Not found" /><div className="wrap py-8"><Button to="/notes" variant="outline">All notes</Button></div></div>
    );
  }

  if (note) {
    return (
      <article className="pb-24">
        <PageHead eyebrow={`${t('notes.eyebrow')} · ${note.season} · ${note.readMinutes} min`} title={lang === 'am' && note.titleAm ? note.titleAm : note.title} lead={note.summary} />
        <div className="wrap py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <Placeholder label={t('notes.draft')} />
              <Placeholder label="Amharic version — to translate" />
            </div>
            {note.body.map((s) => (
              <section key={s.h} className="mt-10">
                <h2 className="font-display font-bold wdth-87 text-2xl lg:text-3xl leading-tight">{s.h}</h2>
                {s.p.map((p, i) => (
                  <p key={i} className="mt-4 text-[1.05rem] leading-[1.75] text-mist-2">{p}</p>
                ))}
              </section>
            ))}
            <div className="mt-12 border-t border-white/10 pt-6 flex flex-wrap items-center gap-3 text-sm text-mist">
              <Placeholder label="Author — workshop manager, to confirm" />
              <Placeholder label="One workshop photo per section — to choose" />
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">More notes</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {NOTES.filter((n) => n.slug !== note.slug).map((n) => <li key={n.slug}><Link className="hover:text-red-3" to={`/notes/${n.slug}`}>{n.title}</Link></li>)}
              </ul>
              <div className="mt-8 rounded-sm border border-white/10 bg-white/[.03] p-5">
                <p className="text-sm text-mist-2">Something on this list you would rather we checked?</p>
                <div className="mt-3"><Button to="/book" arrow>{t('nav.book')}</Button></div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    );
  }

  return (
    <div className="pb-24">
      <PageHead eyebrow={t('notes.eyebrow')} title={t('notes.title')} />
      <div className="wrap py-8">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NOTES.map((n) => (
            <li key={n.slug}><Link to={`/notes/${n.slug}`} className="block h-full rounded-sm border border-white/10 bg-white/[.03] p-6 hover:border-white/30"><span className="font-mono text-[10px] uppercase tracking-widest text-mist">{n.season} · {n.readMinutes} min</span><h2 className="mt-2 font-display font-bold wdth-87 text-xl">{n.title}</h2><p className="mt-2 text-sm text-mist-2">{n.summary}</p></Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
