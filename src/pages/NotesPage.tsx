import { Link } from '../lib/router';
import { useT } from '../i18n';
import { PageHead } from '../components/PageHead';
import { Button, Placeholder } from '../components/ui';
import { NOTES } from '../data/company';

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
        <PageHead eyebrow={`${t('notes.eyebrow')} · ${note.season}`} title={lang === 'am' && note.titleAm ? note.titleAm : note.title} lead={note.summary} />
        <div className="wrap py-10 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 max-w-2xl">
            <Placeholder label={t('notes.draft')} />
            <h2 className="mt-6 font-display font-bold wdth-87 text-2xl">Outline</h2>
            <ol className="mt-4 space-y-3 list-decimal pl-5 text-mist-2">
              {note.outline.map((o) => <li key={o}><span className="text-bone font-semibold">{o}</span><span className="block text-sm text-mist">[Paragraph — to write. 80–120 words, plain language, one photo from the workshop.]</span></li>)}
            </ol>
            <div className="mt-8 flex flex-wrap gap-2"><Placeholder label="Amharic version — to translate" /><Placeholder label="Author — workshop manager, to confirm" /></div>
          </div>
          <aside className="lg:col-span-4">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">More notes</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {NOTES.filter((n) => n.slug !== note.slug).map((n) => <li key={n.slug}><Link className="hover:text-red-3" to={`/notes/${n.slug}`}>{n.title}</Link></li>)}
            </ul>
            <div className="mt-8"><Button to="/book" arrow>{t('nav.book')}</Button></div>
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
            <li key={n.slug}><Link to={`/notes/${n.slug}`} className="block h-full rounded-sm border border-white/10 bg-white/[.03] p-6 hover:border-white/30"><span className="font-mono text-[10px] uppercase tracking-widest text-mist">{n.season}</span><h2 className="mt-2 font-display font-bold wdth-87 text-xl">{n.title}</h2><p className="mt-2 text-sm text-mist-2">{n.summary}</p></Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
