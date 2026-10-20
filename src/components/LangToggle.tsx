import { useT } from '../i18n';
import { classNames as cx } from '../lib/format';

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useT();
  return (
    <div className={cx('inline-flex items-center rounded-full border border-white/15 p-0.5', className)} role="group" aria-label={t('lang.label')}>
      {(['en', 'am'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l}
          className={cx('h-7 px-2.5 rounded-full text-xs font-semibold transition-colors', lang === l ? 'bg-bone text-ink' : 'text-mist-2 hover:text-bone')}
        >
          {l === 'en' ? 'EN' : 'አማ'}
        </button>
      ))}
    </div>
  );
}
