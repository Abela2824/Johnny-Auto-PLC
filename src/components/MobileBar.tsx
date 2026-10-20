import { Phone, CalendarDays, Radio } from 'lucide-react';
import { Link, useRoute } from '../lib/router';
import { useT } from '../i18n';
import { COMPANY } from '../data/company';
import { telHref } from '../lib/format';

/** Thumb-reach actions on phones. Hidden on the wizard pages, which have their own footer buttons. */
export function MobileBar() {
  const { t } = useT();
  const r = useRoute();
  if (['/book', '/quote', '/admin'].includes(r.path)) return null;
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-ink/95 backdrop-blur border-t border-white/10 pb-[env(safe-area-inset-bottom)]" aria-label="Quick actions">
      <div className="grid grid-cols-3">
        <a href={telHref(COMPANY.phones[0].e164)} className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-mist-2">
          <Phone className="w-5 h-5" aria-hidden /> {t('contact.call')}
        </a>
        <Link to="/book" className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-white bg-red">
          <CalendarDays className="w-5 h-5" aria-hidden /> {t('nav.book')}
        </Link>
        <Link to="/track" className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-mist-2">
          <Radio className="w-5 h-5" aria-hidden /> {t('nav.track')}
        </Link>
      </div>
    </nav>
  );
}
