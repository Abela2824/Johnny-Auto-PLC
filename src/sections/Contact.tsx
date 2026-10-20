import { useState } from 'react';
import { Check, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useT } from '../i18n';
import { COMPANY } from '../data/company';
import { Button, Field, Notice, Placeholder, SectionHead, inputCls, selectCls, textareaCls } from '../components/ui';
import { sendMessage } from '../api/api';
import type { Channel } from '../api/types';
import { telHref, waHref } from '../lib/format';

function MapPlaceholder() {
  const { t } = useT();
  const [loaded, setLoaded] = useState(false);
  const { lat, lng } = COMPANY.address;
  const bbox = `${lng - 0.008},${lat - 0.005},${lng + 0.008},${lat + 0.005}`;
  return (
    <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 bg-ink-3">
      {loaded ? (
        <iframe title="Map of the Johnny Auto workshop" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`} className="absolute inset-0 w-full h-full border-0" loading="lazy" />
      ) : (
        <>
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(242,238,230,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,238,230,.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden />
          <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden>
            <path d="M0 62 C 30 58, 50 70, 80 60 S 130 48, 160 55" stroke="#9AA3B2" strokeWidth=".8" fill="none" />
            <path d="M70 0 C 72 30, 78 50, 84 100" stroke="#9AA3B2" strokeWidth=".8" fill="none" />
            <path d="M0 30 L 160 22" stroke="#9AA3B2" strokeWidth=".5" fill="none" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
            <MapPin className="w-8 h-8 text-red" aria-hidden />
            <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-bone">Megenagna</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 flex flex-wrap gap-2 items-center justify-between bg-gradient-to-t from-ink to-transparent">
            <Button size="sm" variant="bone" onClick={() => setLoaded(true)}>{t('contact.map.load')}</Button>
            <a className="text-xs text-mist-2 underline" href={COMPANY.mapsSearch} target="_blank" rel="noreferrer">{t('contact.map.open')}</a>
          </div>
        </>
      )}
    </div>
  );
}

export function Contact() {
  const { t, lang } = useT();
  const [form, setForm] = useState({ name: '', phone: '', channel: 'whatsapp' as Channel, message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    try { await sendMessage(form); setState('done'); } catch { setState('idle'); }
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-ink-2 border-t border-white/10" aria-labelledby="contact-title">
      <div className="wrap py-20 lg:py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead id="contact-title" eyebrow={t('contact.eyebrow')} title={t('contact.title')} />

          <h3 className="mt-10 font-mono text-[10px] uppercase tracking-widest text-mist">{t('contact.phones')}</h3>
          <ul className="mt-2 divide-y divide-white/10 border-y border-white/10">
            {COMPANY.phones.map((p) => (
              <li key={p.e164}>
                <a href={telHref(p.e164)} className="flex items-center justify-between py-3.5 group">
                  <span className="font-display font-bold wdth-87 text-2xl tabular-nums group-hover:text-red-3 transition-colors">{p.display}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mist-2"><Phone className="w-3.5 h-3.5" /> {t('contact.call')}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('contact.email')}</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {COMPANY.emails.map((e) => <li key={e}><a className="hover:text-red-3 break-all" href={`mailto:${e}`}>{e}</a></li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('contact.address')}</h3>
              <p className="mt-2 text-sm">{COMPANY.address.line1}<br />{COMPANY.address.district}, {COMPANY.address.city}</p>
              <p className="text-sm text-mist" lang="am">{COMPANY.address.amharic}</p>
            </div>
            <div className="sm:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('contact.hours')}</h3>
              <div className="mt-2"><Placeholder label={t('contact.hours.tbc')} /></div>
            </div>
          </div>

          {/* the one WhatsApp entry point on the site, with Telegram beside it */}
          <h3 className="mt-10 font-mono text-[10px] uppercase tracking-widest text-mist">{t('contact.message')}</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button href={waHref(COMPANY.whatsapp.e164, lang === 'am' ? 'ሰላም ጆኒ አውቶ' : 'Hello Johnny Auto')} target="_blank" rel="noreferrer" variant="bone" icon={<MessageCircle className="w-4 h-4" />}>
              {t('contact.whatsapp')} <span className="font-mono text-xs ml-1 opacity-70">{COMPANY.whatsapp.display}</span>
            </Button>
            <Button href={COMPANY.telegram.href} target="_blank" rel="noreferrer" variant="outline" icon={<Send className="w-4 h-4" />}>{t('contact.telegram')}</Button>
          </div>
          {COMPANY.telegram.tbc && <div className="mt-2"><Placeholder label="Telegram handle — to confirm" /></div>}
        </div>

        <div className="lg:col-span-7 grid gap-8">
          <MapPlaceholder />
          <form onSubmit={submit} className="rounded-sm border border-white/10 bg-white/[.03] p-6 grid sm:grid-cols-2 gap-4" aria-label={t('contact.form.title')}>
            <h3 className="sm:col-span-2 font-display font-bold wdth-87 text-xl">{t('contact.form.title')}</h3>
            {state === 'done' ? (
              <Notice tone="ok" className="sm:col-span-2 flex items-center gap-3"><Check className="w-5 h-5 text-ok" />{t('contact.form.done')}</Notice>
            ) : (
              <>
                <Field label={t('form.name')} required><input className={inputCls} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></Field>
                <Field label={t('form.phone')} required><input className={inputCls} required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" placeholder="09…" /></Field>
                <Field label={t('form.channel')}>
                  <select className={selectCls} value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value as Channel })}>
                    <option value="whatsapp">{t('form.channel.whatsapp')}</option>
                    <option value="telegram">{t('form.channel.telegram')}</option>
                    <option value="sms">{t('form.channel.sms')}</option>
                  </select>
                </Field>
                <Field label={t('form.notes')} className="sm:col-span-2"><textarea className={textareaCls} required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Field>
                <div className="sm:col-span-2"><Button type="submit" loading={state === 'sending'} arrow>{t('contact.form.send')}</Button></div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
