import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en, type MessageKey } from './en';
import { am } from './am';

export type Lang = 'en' | 'am';

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  /** True when the Amharic dictionary has this key (useful to show a "to translate" marker in dev). */
  has: (key: MessageKey) => boolean;
}

const Ctx = createContext<I18n | null>(null);
const STORAGE = 'ja.lang';

function interpolate(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE);
      if (saved === 'am' || saved === 'en') return saved;
    } catch { /* private mode */ }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE, l); } catch { /* ignore */ }
  }, []);

  const value = useMemo<I18n>(() => ({
    lang,
    setLang,
    t: (key, vars) => interpolate((lang === 'am' && am[key]) || en[key] || key, vars),
    has: (key) => lang === 'en' || Boolean(am[key]),
  }), [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used inside I18nProvider');
  return ctx;
}

export type { MessageKey };
