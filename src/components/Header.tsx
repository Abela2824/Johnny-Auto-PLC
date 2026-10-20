import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useRoute } from '../lib/router';
import { useT } from '../i18n';
import { useScrollY } from '../lib/hooks';
import { Button } from './ui';
import { LangToggle } from './LangToggle';
import { COMPANY } from '../data/company';
import { classNames as cx, telHref } from '../lib/format';

const NAV: { key: 'nav.services' | 'nav.process' | 'nav.workshop' | 'nav.future' | 'nav.fleet' | 'nav.notes' | 'nav.contact'; to: string }[] = [
  { key: 'nav.services', to: '/#services' },
  { key: 'nav.process', to: '/#process' },
  { key: 'nav.workshop', to: '/#workshop' },
  { key: 'nav.future', to: '/#future' },
  { key: 'nav.fleet', to: '/#fleet' },
  { key: 'nav.notes', to: '/#notes' },
  { key: 'nav.contact', to: '/#contact' },
];

export function Header({ transparent }: { transparent: boolean }) {
  const { t } = useT();
  const scrolled = useScrollY(24);
  const [open, setOpen] = useState(false);
  const route = useRoute();

  useEffect(() => { setOpen(false); }, [route.path, route.hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const solid = !transparent || scrolled || open;

  return (
    <header className={cx('fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b', solid ? 'bg-ink/85 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent')}>
      <div className="wrap flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${t('brand.short')} — home`}>
          <img src="/logo-light.png" alt="" width={622} height={299} className="h-9 lg:h-11 w-auto" />
          <span className="sr-only">{t('brand.short')}</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.key} to={n.to} className="text-[13px] font-semibold tracking-wide uppercase text-mist-2 hover:text-bone transition-colors">
              {t(n.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangToggle />
          <Link to="/track" className="text-sm font-semibold text-mist-2 hover:text-bone px-2">{t('nav.track')}</Link>
          <Button to="/book" size="sm" arrow>{t('nav.book')}</Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <a href={telHref(COMPANY.phones[0].e164)} className="w-10 h-10 grid place-items-center rounded-sm border border-white/15" aria-label={t('hero.cta.call')}>
            <Phone className="w-4 h-4" />
          </a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" className="w-10 h-10 grid place-items-center rounded-sm border border-white/15">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="sr-only">{open ? t('nav.close') : t('nav.menu')}</span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-ink border-t border-white/10 overflow-y-auto">
          <nav className="wrap py-6 flex flex-col" aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.key} to={n.to} className="py-3.5 border-b border-white/10 font-display font-bold wdth-87 text-2xl text-bone">
                {t(n.key)}
              </Link>
            ))}
            <div className="mt-6 grid gap-3">
              <Button to="/book" size="lg" arrow>{t('nav.book')}</Button>
              <Button to="/track" size="lg" variant="outline">{t('nav.track')}</Button>
              <Button to="/quote" size="lg" variant="outline">{t('nav.quote')}</Button>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <LangToggle />
              <Link to="/admin" className="text-xs font-mono text-mist underline">{t('nav.admin')}</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
