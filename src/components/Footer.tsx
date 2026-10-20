import { Link } from '../lib/router';
import { useT } from '../i18n';
import { COMPANY } from '../data/company';
import { LangToggle } from './LangToggle';
import { telHref } from '../lib/format';

export function Footer() {
  const { t, lang } = useT();
  return (
    <footer className="border-t border-white/10 bg-ink-2 mt-24 pb-24 md:pb-0">
      <div className="wrap py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src="/logo-light.png" alt="" className="h-10 w-auto" />
          <p className="mt-4 font-semibold text-bone">{lang === 'am' ? COMPANY.amharicLegal : COMPANY.legal}</p>
          <p className="mt-1 text-sm text-mist" lang={lang === 'am' ? 'en' : 'am'}>{lang === 'am' ? COMPANY.legal : COMPANY.amharicLegal}</p>
          <p className="mt-4 text-sm text-mist-2">{COMPANY.address.line1}, {COMPANY.address.district}, {COMPANY.address.city}</p>
          <ul className="mt-3 space-y-1">
            {COMPANY.phones.map((p) => (
              <li key={p.e164}><a className="font-mono text-sm text-bone hover:text-red-3" href={telHref(p.e164)}>{p.display}</a></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-mist">{t('brand.short')}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-red-3" to="/#services">{t('nav.services')}</Link></li>
            <li><Link className="hover:text-red-3" to="/#process">{t('nav.process')}</Link></li>
            <li><Link className="hover:text-red-3" to="/#workshop">{t('nav.workshop')}</Link></li>
            <li><Link className="hover:text-red-3" to="/#future">{t('nav.future')}</Link></li>
            <li><Link className="hover:text-red-3" to="/#notes">{t('nav.notes')}</Link></li>
            <li><Link className="hover:text-red-3" to="/#contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-mist">Tools</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-red-3" to="/book">{t('nav.book')}</Link></li>
            <li><Link className="hover:text-red-3" to="/quote">{t('nav.quote')}</Link></li>
            <li><Link className="hover:text-red-3" to="/track">{t('nav.track')}</Link></li>
            <li><Link className="hover:text-red-3" to="/fleet">{t('nav.fleet')} portal</Link></li>
            <li><Link className="hover:text-red-3" to="/admin">{t('nav.admin')}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-mist">{t('lang.label')}</h3>
          <div className="mt-3"><LangToggle /></div>
          <p className="mt-6 text-xs text-mist leading-relaxed">{t('footer.proto')}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap py-5 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs text-mist">
          <span>© {new Date().getFullYear()} {COMPANY.legal} {t('footer.rights')}</span>
          <span className="font-mono">Megenagna · Addis Ababa · Gelan</span>
        </div>
      </div>
    </footer>
  );
}
