import { useEffect, useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useT } from '../i18n';
import { useQueryParam } from '../lib/router';
import { PageHead } from '../components/PageHead';
import { Button, Card, Chip, Notice, StatusDot, inputCls, selectCls } from '../components/ui';
import { CarSide } from '../components/CarSide';
import { SERVICE_BY_ID, STAGES, STAGE_INDEX } from '../data/company';
import { getRepairStatus, subscribeNotifications } from '../api/api';
import { DEMO_PHONES } from '../api/mock/store';
import type { Channel, Ticket } from '../api/types';
import { classNames as cx, fmtDateTime, relTime } from '../lib/format';

function Pipeline({ stage }: { stage: Ticket['stage'] }) {
  const { lang } = useT();
  const cur = STAGE_INDEX[stage];
  const pct = (cur / (STAGES.length - 1)) * 100;
  return (
    <div className="relative mt-2">
      <div className="h-px bg-white/15 absolute left-0 right-0 top-[5px]" />
      <div className="h-px bg-red absolute left-0 top-[5px]" style={{ width: `${pct}%` }} />
      <div className="absolute -top-7 text-red-3 transition-[left] duration-700" style={{ left: `calc(${pct}% - 20px)` }} aria-hidden><CarSide mode="icon" className="w-10" /></div>
      <ol className="relative grid grid-cols-6">
        {STAGES.map((s, i) => (
          <li key={s.id} className={cx('flex flex-col', i === 0 ? 'items-start' : i === STAGES.length - 1 ? 'items-end' : 'items-center')} aria-current={i === cur ? 'step' : undefined}>
            <span className={cx('w-[11px] h-[11px] rounded-full border', i < cur ? 'bg-red border-red' : i === cur ? 'bg-bone border-bone' : 'bg-ink border-white/30')} />
            <span className={cx('mt-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-center', i === cur ? 'text-bone' : 'text-mist')}>{lang === 'am' ? s.nameAm : s.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TicketView({ ticket, onChange }: { ticket: Ticket; onChange: (t: Ticket) => void }) {
  const { t, lang } = useT();
  const stage = STAGES[STAGE_INDEX[ticket.stage]];
  const [busy, setBusy] = useState(false);
  const setNotify = async (channel: Channel, on: boolean) => {
    setBusy(true);
    try { onChange(await subscribeNotifications(ticket.ref, channel, on)); } finally { setBusy(false); }
  };
  return (
    <Card as="article" className="overflow-hidden">
      <div className="p-6 lg:p-8 border-b border-white/10 grid sm:grid-cols-12 gap-6">
        <div className="sm:col-span-7">
          <div className="font-mono text-sm text-red-3">{ticket.ref}</div>
          <h2 className="mt-1 font-display font-extrabold wdth-75 text-3xl lg:text-4xl">{ticket.vehicle.make} {ticket.vehicle.model} <span className="text-mist font-bold">{ticket.vehicle.year}</span></h2>
          <div className="mt-2 flex flex-wrap gap-1.5">{ticket.services.map((s) => <Chip key={s} as="span" className="!h-7 !px-2.5 !text-xs">{lang === 'am' ? SERVICE_BY_ID[s].nameAm : SERVICE_BY_ID[s].name.split(' ·')[0]}</Chip>)}</div>
        </div>
        <dl className="sm:col-span-5 grid grid-cols-3 sm:grid-cols-1 gap-3 text-sm sm:text-right">
          <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('track.stage')}</dt><dd className="font-semibold">0{stage.n} {lang === 'am' ? stage.nameAm : stage.name}</dd></div>
          <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('track.bay')}</dt><dd className="font-mono">{ticket.bay ?? '—'}</dd></div>
          <div><dt className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('track.promised')}</dt><dd className="font-semibold">{ticket.promisedAt ? fmtDateTime(ticket.promisedAt) : '—'}</dd></div>
        </dl>
      </div>
      <div className="px-6 lg:px-8 pt-12 pb-6 border-b border-white/10"><Pipeline stage={ticket.stage} /></div>

      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 lg:p-8 lg:border-r border-white/10">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('track.timeline')}</h3>
          <ol className="mt-4 space-y-5">
            {[...ticket.events].reverse().map((e, i) => (
              <li key={`${e.at}-${i}`} className="relative pl-6">
                <span className={cx('absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full', i === 0 ? 'bg-red' : 'bg-white/30')} aria-hidden />
                <div className="flex flex-wrap items-baseline gap-x-3"><span className="font-semibold">{STAGES[STAGE_INDEX[e.stage]].name}</span><span className="font-mono text-xs text-mist">{relTime(e.at)} · {fmtDateTime(e.at)}{e.by ? ` · ${e.by}` : ''}</span></div>
                <p className="mt-1 text-sm text-mist-2">{e.note}</p>
                {e.photos && e.photos.length > 0 && (
                  <div className="mt-2 flex gap-2">{e.photos.map((p) => <span key={p} className="duo duo-reveal w-24 aspect-[4/3] rounded-sm" tabIndex={0}><img src={p} alt="Progress photo" loading="lazy" /></span>)}</div>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-5 p-6 lg:p-8 space-y-8">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist flex items-center gap-2"><Bell className="w-3.5 h-3.5" /> {t('track.notify')}</h3>
            <div className="mt-3 flex items-center gap-2">
              <select className={cx(selectCls, 'flex-1')} value={ticket.notify?.channel ?? 'sms'} onChange={(e) => setNotify(e.target.value as Channel, ticket.notify?.on ?? true)} disabled={busy} aria-label={t('form.channel')}>
                <option value="sms">{t('form.channel.sms')}</option><option value="telegram">{t('form.channel.telegram')}</option><option value="whatsapp">{t('form.channel.whatsapp')}</option>
              </select>
              <Button variant={ticket.notify?.on ? 'bone' : 'outline'} size="md" loading={busy} onClick={() => setNotify(ticket.notify?.channel ?? 'sms', !ticket.notify?.on)}>
                {ticket.notify?.on ? t('track.notify.on') : 'Off'}
              </Button>
            </div>
            <p className="mt-2 text-xs text-mist">{t('track.otp')}</p>
          </div>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-mist">{t('track.health')}</h3>
            {ticket.health ? (
              <ul className="mt-3 divide-y divide-white/10 border-y border-white/10 text-sm">
                {ticket.health.map((h) => (
                  <li key={h.item} className="py-2.5 flex items-start gap-3">
                    <span className="mt-1.5"><StatusDot tone={h.status === 'ok' ? 'ok' : h.status === 'attention' ? 'warn' : 'volt'} /></span>
                    <span className="flex-1"><span className="font-semibold">{h.item}</span>{h.note && <span className="block text-xs text-mist-2">{h.note}</span>}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-mist">{h.status}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-3 text-sm text-mist">Issued at the quality-check station.</p>}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Track() {
  const { t } = useT();
  const initial = useQueryParam('t') ?? '';
  const [q, setQ] = useState(initial);
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const find = async (value = q) => {
    if (!value.trim()) return;
    setState('loading');
    try { setTickets(await getRepairStatus(value)); } catch { setTickets([]); } finally { setState('done'); }
  };

  useEffect(() => {
    if (!initial) return;
    let alive = true;
    setState('loading');
    getRepairStatus(initial).then((r) => { if (alive) { setTickets(r); setState('done'); } }).catch(() => { if (alive) { setTickets([]); setState('done'); } });
    return () => { alive = false; };
  }, [initial]);

  return (
    <div className="pb-24">
      <PageHead eyebrow="Live repair tracker" title={t('track.title')} lead={t('track.lead')} />
      <div className="wrap py-8">
        <form onSubmit={(e) => { e.preventDefault(); find(); }} className="flex gap-2 max-w-xl">
          <label className="sr-only" htmlFor="track-q">{t('track.title')}</label>
          <input id="track-q" className={cx(inputCls, 'font-mono')} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('track.placeholder')} autoComplete="off" />
          <Button type="submit" loading={state === 'loading'} icon={<Search className="w-4 h-4" />}>{t('track.find')}</Button>
        </form>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mist">
          <span className="font-mono uppercase tracking-widest">{t('track.demo')}:</span>
          {['JA-24117', 'JA-24102', 'JA-24121', DEMO_PHONES.a].map((d) => <Chip key={d} className="!h-7 !px-2.5 !text-xs font-mono" onClick={() => { setQ(d); find(d); }}>{d}</Chip>)}
        </div>

        <div className="mt-8 space-y-8" aria-live="polite">
          {state === 'done' && tickets.length === 0 && <Notice tone="warn">{t('track.notfound')}</Notice>}
          {tickets.map((tk) => <TicketView key={tk.ref} ticket={tk} onChange={(n) => setTickets(tickets.map((x) => (x.ref === n.ref ? n : x)))} />)}
        </div>
      </div>
    </div>
  );
}
