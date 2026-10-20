import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Download, Truck } from 'lucide-react';
import { useT } from '../i18n';
import { useQueryParam } from '../lib/router';
import { PageHead } from '../components/PageHead';
import { Button, Card, Field, Notice, Placeholder, Stepper, inputCls, selectCls, textareaCls } from '../components/ui';
import { SERVICES, SERVICE_BY_ID, COMPANY } from '../data/company';
import { createBooking, getAvailableSlots } from '../api/api';
import type { Booking, Channel, ServiceId, Slot } from '../api/types';
import { classNames as cx, fmtDate, isoDate } from '../lib/format';

type Svc = ServiceId | 'unsure';

function nextDays(n: number) {
  const out: { iso: string; d: Date }[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    out.push({ iso: isoDate(x), d: x });
  }
  return out;
}

function icsFor(b: Booking, serviceName: string) {
  const [y, mo, da] = b.date.split('-');
  const [h, mi] = b.slot.split(':');
  const start = `${y}${mo}${da}T${h}${mi}00`;
  const endH = String(Number(h) + 1).padStart(2, '0');
  const end = `${y}${mo}${da}T${endH}${mi}00`;
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Johnny Auto//Booking//EN', 'BEGIN:VEVENT', `UID:${b.ref}@johnnyautoplc.com`,
    `DTSTAMP:${start}`, `DTSTART:${start}`, `DTEND:${end}`, `SUMMARY:Johnny Auto — ${serviceName} (${b.ref})`,
    `LOCATION:Johnny Auto, ${COMPANY.address.line1}, ${COMPANY.address.district}, ${COMPANY.address.city}`,
    `DESCRIPTION:${b.vehicle.make} ${b.vehicle.model}. Reference ${b.ref}.`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
}

export default function Book() {
  const { t, lang } = useT();
  const qsService = useQueryParam('service') as Svc | null;
  const qsFleet = useQueryParam('fleet');
  const qsPlate = useQueryParam('plate');

  const [step, setStep] = useState(0);
  const [service, setService] = useState<Svc>(qsService && (qsService === 'unsure' || qsService in SERVICE_BY_ID) ? qsService : 'body');
  const [vehicle, setVehicle] = useState({ make: '', model: '', year: '', plate: qsPlate ?? '' });
  const [pickup, setPickup] = useState(false);
  const [fleet, setFleet] = useState(Boolean(qsFleet));
  const [date, setDate] = useState<string>('');
  const [slot, setSlot] = useState<string>('');
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });
  const [channel, setChannel] = useState<Channel>('sms');
  const [notes, setNotes] = useState('');
  const [sending, setSending] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  const days = useMemo(() => nextDays(14), []);
  const steps = [t('book.step.service'), t('book.step.vehicle'), t('book.step.slot'), t('book.step.contact'), t('book.step.done')];
  const serviceName = service === 'unsure' ? t('book.notsure') : (lang === 'am' ? SERVICE_BY_ID[service].nameAm : SERVICE_BY_ID[service].name);

  useEffect(() => {
    if (!date) return;
    let alive = true;
    setLoadingSlots(true);
    setSlot('');
    getAvailableSlots(date, service).then((s) => { if (alive) { setSlots(s); setLoadingSlots(false); } });
    return () => { alive = false; };
  }, [date, service]);

  const canNext = [
    true,
    vehicle.make.trim() && vehicle.model.trim(),
    date && slot,
    customer.name.trim() && /\d{9,}/.test(customer.phone.replace(/\D/g, '')),
  ];

  const confirm = async () => {
    setSending(true);
    setError('');
    try {
      const b = await createBooking({
        serviceId: service, vehicle, date, slot, customer, channel, pickup, notes,
        fleetAccountId: fleet ? 'FL-DEMO' : undefined,
      });
      setBooking(b);
      setStep(4);
    } catch {
      setError('Could not save the booking. Try again.');
    } finally {
      setSending(false);
    }
  };

  const downloadIcs = () => {
    if (!booking) return;
    const blob = new Blob([icsFor(booking, serviceName)], { type: 'text/calendar' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${booking.ref}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="pb-24">
      <PageHead eyebrow="Online booking" title={t('book.title')} lead="Pick a service, tell us about the car, choose a slot. Confirmation by SMS, Telegram or WhatsApp." />
      <div className="wrap py-8">
        <Stepper steps={steps} current={step} />

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label={t('book.step.service')}>
                {SERVICES.map((s) => (
                  <button key={s.id} type="button" role="radio" aria-checked={service === s.id} onClick={() => setService(s.id)}
                    className={cx('text-left rounded-sm border p-5 transition-colors', service === s.id ? 'border-red bg-red/10' : 'border-white/10 bg-white/[.03] hover:border-white/30')}>
                    <span className="font-display font-bold wdth-87 text-lg">{lang === 'am' ? s.nameAm : s.name}</span>
                    <span className="block mt-1 text-sm text-mist-2">{s.short}</span>
                  </button>
                ))}
                <button type="button" role="radio" aria-checked={service === 'unsure'} onClick={() => setService('unsure')}
                  className={cx('text-left rounded-sm border p-5 transition-colors sm:col-span-2', service === 'unsure' ? 'border-red bg-red/10' : 'border-dashed border-white/20 hover:border-white/40')}>
                  <span className="font-display font-bold wdth-87 text-lg">{t('book.notsure')}</span>
                  <span className="block mt-1 text-sm text-mist-2">We start with an electronic scan and a walk-around, then tell you what it needs.</span>
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t('form.make')} required><input className={inputCls} value={vehicle.make} onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })} placeholder="Toyota" list="makes" /></Field>
                <datalist id="makes">{['Toyota', 'Nissan', 'Hyundai', 'Suzuki', 'Isuzu', 'Mitsubishi', 'Ford', 'Land Rover', 'Mercedes-Benz', 'BYD', 'Lifan', 'Kia', 'Volkswagen'].map((m) => <option key={m} value={m} />)}</datalist>
                <Field label={t('form.model')} required><input className={inputCls} value={vehicle.model} onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })} placeholder="Hilux" /></Field>
                <Field label={t('form.year')}><input className={inputCls} inputMode="numeric" value={vehicle.year} onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })} placeholder="2018" /></Field>
                <Field label={t('form.plate')}><input className={inputCls} value={vehicle.plate} onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })} placeholder="3-A12345 AA" /></Field>
                <label className="sm:col-span-2 flex items-start gap-3 rounded-sm border border-white/10 p-4 cursor-pointer">
                  <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} className="mt-1 accent-[#E2342D]" />
                  <span><span className="font-semibold flex items-center gap-2"><Truck className="w-4 h-4 text-red-3" /> {t('book.pickup')}</span><span className="block text-sm text-mist-2">Our tow truck or a driver collects the vehicle. We confirm the time by phone.</span></span>
                </label>
                <label className="sm:col-span-2 flex items-start gap-3 rounded-sm border border-white/10 p-4 cursor-pointer">
                  <input type="checkbox" checked={fleet} onChange={(e) => setFleet(e.target.checked)} className="mt-1 accent-[#E2342D]" />
                  <span><span className="font-semibold">{t('book.fleet')}</span><span className="block text-sm text-mist-2">Links the job to your organisation’s account and monthly statement. <span className="font-mono text-xs">FL-DEMO</span> in this prototype.</span></span>
                </label>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2" role="radiogroup" aria-label={t('form.date')}>
                  {days.map(({ iso, d }) => {
                    const closed = !COMPANY.hours.demo.days.includes(d.getDay());
                    return (
                      <button key={iso} type="button" role="radio" aria-checked={date === iso} disabled={closed} onClick={() => setDate(iso)}
                        className={cx('shrink-0 w-[4.6rem] rounded-sm border py-2.5 text-center transition-colors disabled:opacity-35', date === iso ? 'border-red bg-red/10' : 'border-white/10 bg-white/[.03] hover:border-white/30')}>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-mist">{d.toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-GB', { weekday: 'short' })}</span>
                        <span className="block font-display font-bold text-xl leading-none mt-1">{d.getDate()}</span>
                        <span className="block text-[10px] text-mist mt-0.5">{closed ? t('book.slots.closed') : d.toLocaleDateString('en-GB', { month: 'short' })}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 min-h-32">
                  {!date && <p className="text-sm text-mist">Choose a day.</p>}
                  {date && loadingSlots && <p className="text-sm text-mist font-mono">{t('form.sending').replace('…', '')} slots…</p>}
                  {date && !loadingSlots && slots && (
                    slots.length === 0 ? <p className="text-sm text-mist">{t('book.slots.none')}</p> : (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2" role="radiogroup" aria-label={t('form.time')}>
                        {slots.map((s) => (
                          <button key={s.time} type="button" role="radio" aria-checked={slot === s.time} disabled={!s.available} onClick={() => setSlot(s.time)}
                            className={cx('rounded-sm border py-3 font-mono text-sm transition-colors disabled:opacity-30 disabled:line-through', slot === s.time ? 'border-red bg-red/10' : 'border-white/10 bg-white/[.03] hover:border-white/30')}>
                            {s.time}
                            <span className="block text-[10px] text-mist tracking-wide">{s.available ? `${s.capacityLeft} free` : 'full'}</span>
                          </button>
                        ))}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4"><Placeholder label="Working hours — demo schedule 08:00–17:00 Mon–Sat" /></div>
              </div>
            )}

            {step === 3 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t('form.name')} required><input className={inputCls} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} autoComplete="name" /></Field>
                <Field label={t('form.phone')} required hint="09… or +251"><input className={inputCls} type="tel" inputMode="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} autoComplete="tel" /></Field>
                <Field label={t('form.email')}><input className={inputCls} type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} autoComplete="email" /></Field>
                <Field label={t('form.channel')}>
                  <select className={selectCls} value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
                    <option value="sms">{t('form.channel.sms')}</option>
                    <option value="telegram">{t('form.channel.telegram')}</option>
                    <option value="whatsapp">{t('form.channel.whatsapp')}</option>
                  </select>
                </Field>
                <Field label={t('form.notes')} className="sm:col-span-2"><textarea className={textareaCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What is wrong, anything we should know." /></Field>
                {error && <Notice tone="warn" className="sm:col-span-2">{error}</Notice>}
              </div>
            )}

            {step === 4 && booking && (
              <Card className="p-6 lg:p-8">
                <div className="flex items-center gap-3 text-ok"><Check className="w-6 h-6" /><span className="font-display font-extrabold wdth-75 text-3xl text-bone">{t('book.done.title')}</span></div>
                <p className="mt-3 text-mist-2 max-w-xl">{t('book.done.lead', { ref: booking.ref })}</p>
                <dl className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
                  <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">Reference</dt><dd className="font-mono text-lg">{booking.ref}</dd></div>
                  <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">When</dt><dd className="font-semibold">{fmtDate(booking.date, lang)} · {booking.slot}</dd></div>
                  <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">Service</dt><dd>{serviceName}</dd></div>
                  <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">Vehicle</dt><dd>{booking.vehicle.make} {booking.vehicle.model} {booking.vehicle.year}</dd></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={downloadIcs} icon={<Download className="w-4 h-4" />} variant="bone">{t('book.done.ics')}</Button>
                  <Button to="/track" variant="outline">{t('book.done.track')}</Button>
                  <Button to="/admin" variant="ghost">See it in the staff inbox →</Button>
                </div>
              </Card>
            )}

            {step < 4 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>{t('form.back')}</Button>
                {step < 3 ? (
                  <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext[step]} arrow>{t('form.next')}</Button>
                ) : (
                  <Button onClick={confirm} disabled={!canNext[3]} loading={sending} arrow>{t('book.confirm')}</Button>
                )}
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <Card className="p-5 sticky top-24">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-mist">Summary</h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div><dt className="text-mist">Service</dt><dd className="font-semibold">{serviceName}</dd></div>
                <div><dt className="text-mist">Vehicle</dt><dd className="font-semibold">{vehicle.make || vehicle.model ? `${vehicle.make} ${vehicle.model} ${vehicle.year}`.trim() : '—'}{vehicle.plate && <span className="font-mono text-xs text-mist ml-2">{vehicle.plate}</span>}</dd></div>
                <div><dt className="text-mist">When</dt><dd className="font-semibold flex items-center gap-2"><CalendarDays className="w-4 h-4 text-mist" />{date ? `${fmtDate(date, lang)}${slot ? ` · ${slot}` : ''}` : '—'}</dd></div>
                {pickup && <div><dt className="text-mist">Pickup</dt><dd className="font-semibold">Yes</dd></div>}
                {fleet && <div><dt className="text-mist">Account</dt><dd className="font-mono">FL-DEMO</dd></div>}
              </dl>
              <p className="mt-5 text-xs text-mist leading-relaxed">Slots come from <span className="font-mono">getAvailableSlots()</span>; the booking goes to <span className="font-mono">createBooking()</span>. See BACKEND_SCOPE.md.</p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
