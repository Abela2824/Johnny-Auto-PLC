import { useEffect, useMemo, useState } from 'react';
import { Camera, Check, Trash2 } from 'lucide-react';
import { useT } from '../i18n';
import { PageHead } from '../components/PageHead';
import { CarTop, SEVERITY_COLOUR, ZONE_SHORT } from '../components/CarTop';
import { Button, Card, Chip, Field, Notice, Placeholder, Stepper, inputCls, selectCls, textareaCls } from '../components/ui';
import { DAMAGE_ZONES, SERVICE_BY_ID } from '../data/company';
import { submitQuote } from '../api/api';
import type { Channel, Quote as QuoteT, ServiceId, Severity } from '../api/types';
import { classNames as cx } from '../lib/format';

type Sel = Record<string, Severity>;

function departmentsFor(sel: Sel): ServiceId[] {
  const d = new Set<ServiceId>();
  for (const [zone, sev] of Object.entries(sel)) {
    DAMAGE_ZONES.find((z) => z.id === zone)?.depts.forEach((x) => d.add(x));
    if (sev === 'structural') d.add('diagnostics');
  }
  if (d.has('body')) d.add('paint');
  return Array.from(d);
}

const SEVERITIES: Severity[] = ['scratch', 'dent', 'structural'];
const SEV_KEY = { scratch: 'quote.sev.scratch', dent: 'quote.sev.dent', structural: 'quote.sev.structural' } as const;

export default function Quote() {
  const { t, lang } = useT();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Sel>({});
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [vehicle, setVehicle] = useState({ make: '', model: '', year: '', plate: '' });
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });
  const [channel, setChannel] = useState<Channel>('whatsapp');
  const [insurance, setInsurance] = useState(false);
  const [insurer, setInsurer] = useState('');
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<QuoteT | null>(null);
  const [error, setError] = useState('');

  const steps = [t('quote.step.zones'), t('quote.step.photos'), t('quote.step.details'), t('quote.step.done')];
  const depts = useMemo(() => departmentsFor(sel), [sel]);
  const zones = Object.keys(sel);

  // Release object URLs when the page unmounts.
  useEffect(() => () => { files.forEach((f) => URL.revokeObjectURL(f.url)); }, [files]);

  const toggle = (id: string) => setSel((s) => {
    const n = { ...s };
    if (n[id]) delete n[id]; else n[id] = 'dent';
    return n;
  });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list).filter((f) => f.type.startsWith('image/')).slice(0, 6 - files.length).map((file) => ({ file, url: URL.createObjectURL(file) }));
    setFiles((f) => [...f, ...next]);
  };

  const send = async () => {
    setSending(true);
    setError('');
    try {
      const q = await submitQuote({
        zones: Object.entries(sel).map(([zone, severity]) => ({ zone, severity })),
        photos: files.map(({ file, url }) => ({ name: file.name, size: file.size, type: file.type, url })),
        vehicle, customer, channel, description,
        insurance: insurance ? { claim: true, insurer } : undefined,
      });
      setResult(q);
      setStep(3);
    } catch { setError('Could not send. Try again.'); } finally { setSending(false); }
  };

  const canNext = [zones.length > 0, true, Boolean(vehicle.make && vehicle.model && customer.name && /\d{9,}/.test(customer.phone.replace(/\D/g, '')))];

  return (
    <div className="pb-24">
      <PageHead eyebrow="Smart quote" title={t('quote.title')} lead="Mark the damage on the car, add photos from your phone, and an estimator replies before you drive in." />
      <div className="wrap py-8">
        <Stepper steps={steps} current={step} />

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {step === 0 && (
              <div className="grid sm:grid-cols-12 gap-6">
                <div className="sm:col-span-5 max-w-[320px] mx-auto w-full pt-4">
                  <CarTop selected={sel} onToggle={toggle} />
                </div>
                <div className="sm:col-span-7">
                  <p className="text-sm text-mist-2">{t('quote.zones.hint')}</p>
                  <ul className="mt-4 space-y-2" aria-live="polite">
                    {zones.length === 0 && <li className="text-sm text-mist font-mono">No parts selected.</li>}
                    {zones.map((z) => (
                      <li key={z} className="rounded-sm border border-white/10 bg-white/[.03] p-3 flex flex-wrap items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: SEVERITY_COLOUR[sel[z]] }} aria-hidden />
                        <span className="font-semibold flex-1">{ZONE_SHORT[z]}</span>
                        <div className="flex gap-1" role="radiogroup" aria-label={`Severity: ${ZONE_SHORT[z]}`}>
                          {SEVERITIES.map((sv) => (
                            <button key={sv} type="button" role="radio" aria-checked={sel[z] === sv} onClick={() => setSel({ ...sel, [z]: sv })}
                              className={cx('h-8 px-2.5 rounded-sm text-xs font-semibold border', sel[z] === sv ? 'bg-bone text-ink border-bone' : 'border-white/15 text-mist-2 hover:border-white/40')}>
                              {t(SEV_KEY[sv])}
                            </button>
                          ))}
                        </div>
                        <button type="button" onClick={() => toggle(z)} className="w-8 h-8 grid place-items-center text-mist hover:text-red-3" aria-label={`Remove ${ZONE_SHORT[z]}`}><Trash2 className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {DAMAGE_ZONES.map((z) => (
                      <Chip key={z.id} active={Boolean(sel[z.id])} onClick={() => toggle(z.id)} className="!h-8 !px-3 !text-xs">{z.side ? `${z.side} ` : ''}{z.name}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="text-sm text-mist-2">{t('quote.photos.hint')}</p>
                <label className="mt-4 flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-white/25 bg-white/[.02] p-8 cursor-pointer hover:border-white/50">
                  <Camera className="w-6 h-6 text-red-3" aria-hidden />
                  <span className="font-semibold">{t('quote.photos.add')}</span>
                  <span className="text-xs text-mist">{files.length}/6 · JPG, PNG, HEIC</span>
                  <input type="file" accept="image/*" multiple capture="environment" className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
                </label>
                {files.length > 0 && (
                  <ul className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {files.map((f, i) => (
                      <li key={f.url} className="relative aspect-square rounded-sm overflow-hidden bg-ink-3">
                        <img src={f.url} alt={f.file.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-7 h-7 grid place-items-center rounded-sm bg-ink/80 text-bone" aria-label={`Remove ${f.file.name}`}><Trash2 className="w-3.5 h-3.5" /></button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 text-xs text-mist">Photos stay on your device in this prototype. In production they upload to object storage and the estimator sees them in the queue.</p>
              </div>
            )}

            {step === 2 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t('form.make')} required><input className={inputCls} value={vehicle.make} onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })} /></Field>
                <Field label={t('form.model')} required><input className={inputCls} value={vehicle.model} onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })} /></Field>
                <Field label={t('form.year')}><input className={inputCls} inputMode="numeric" value={vehicle.year} onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })} /></Field>
                <Field label={t('form.plate')}><input className={inputCls} value={vehicle.plate} onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })} /></Field>
                <Field label={t('form.name')} required><input className={inputCls} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} autoComplete="name" /></Field>
                <Field label={t('form.phone')} required><input className={inputCls} type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} autoComplete="tel" /></Field>
                <Field label={t('form.channel')}>
                  <select className={selectCls} value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
                    <option value="whatsapp">{t('form.channel.whatsapp')}</option>
                    <option value="telegram">{t('form.channel.telegram')}</option>
                    <option value="sms">{t('form.channel.sms')}</option>
                  </select>
                </Field>
                <Field label={t('form.email')}><input className={inputCls} type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></Field>
                <label className="sm:col-span-2 flex items-start gap-3 rounded-sm border border-white/10 p-4 cursor-pointer">
                  <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} className="mt-1 accent-[#E2342D]" />
                  <span className="flex-1"><span className="font-semibold">{t('quote.insurance')}</span>
                    {insurance && <input className={cx(inputCls, 'mt-2')} placeholder={t('quote.insurer')} value={insurer} onChange={(e) => setInsurer(e.target.value)} />}
                  </span>
                </label>
                <Field label={t('quote.describe')} className="sm:col-span-2"><textarea className={textareaCls} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
                {error && <Notice tone="warn" className="sm:col-span-2">{error}</Notice>}
              </div>
            )}

            {step === 3 && result && (
              <Card className="p-6 lg:p-8">
                <div className="flex items-center gap-3 text-ok"><Check className="w-6 h-6" /><span className="font-display font-extrabold wdth-75 text-3xl text-bone">{t('quote.done.title')}</span></div>
                <p className="mt-3 text-mist-2 max-w-xl">{t('quote.done.lead', { ref: result.ref })}</p>
                <div className="mt-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('quote.departments')}</div>
                  <div className="mt-2 flex flex-wrap gap-2">{result.departments.map((d) => <Chip key={d} as="span" active>{lang === 'am' ? SERVICE_BY_ID[d].nameAm : SERVICE_BY_ID[d].name}</Chip>)}</div>
                </div>
                <div className="mt-4"><Placeholder label="Reply time SLA — to confirm" /></div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to="/book" arrow>{t('nav.book')}</Button>
                  <Button to="/admin" variant="ghost">See it in the estimator queue →</Button>
                </div>
              </Card>
            )}

            {step < 3 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>{t('form.back')}</Button>
                {step < 2 ? <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext[step]} arrow>{t('form.next')}</Button>
                  : <Button onClick={send} disabled={!canNext[2]} loading={sending} arrow>{t('quote.send')}</Button>}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <Card className="p-5 sticky top-24">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-mist">What we can tell so far</h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div><dt className="text-mist">Parts marked</dt><dd className="font-semibold">{zones.length || '—'}</dd></div>
                <div><dt className="text-mist">Photos</dt><dd className="font-semibold">{files.length || '—'}</dd></div>
                <div><dt className="text-mist">{t('quote.departments')}</dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">{depts.length ? depts.map((d) => <Chip key={d} as="span" className="!h-7 !px-2.5 !text-xs">{SERVICE_BY_ID[d].name.split(' ·')[0]}</Chip>) : '—'}</dd></div>
              </dl>
              <p className="mt-5 text-xs text-mist leading-relaxed">No prices are shown: an estimator reviews the photos first. Submission goes to <span className="font-mono">submitQuote()</span>.</p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
