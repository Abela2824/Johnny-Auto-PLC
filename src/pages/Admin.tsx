import { useCallback, useEffect, useState } from 'react';
import { Inbox, Kanban, LayoutGrid, RefreshCw, Lock } from 'lucide-react';
import { useT } from '../i18n';
import { Link } from '../lib/router';
import { PageHead } from '../components/PageHead';
import { Button, Card, Chip, Notice, StatusDot } from '../components/ui';
import { SERVICE_BY_ID, STAGES, STAGE_INDEX } from '../data/company';
import { getBoard, getIncomingBookings, getIncomingQuotes, moveTicketStage, resetDemo } from '../api/api';
import { ZONE_SHORT } from '../components/CarTop';
import type { Board, Booking, Quote } from '../api/types';
import { classNames as cx, fmtDate, fmtDateTime, relTime } from '../lib/format';

type Tab = 'inbox' | 'board' | 'bays';

export default function Admin() {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>('inbox');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [b, q, bd] = await Promise.all([getIncomingBookings(), getIncomingQuotes(), getBoard()]);
    setBookings(b); setQuotes(q); setBoard(bd);
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  const advance = async (ref: string, from: Board['columns'][number]['stage']) => {
    const next = STAGES[STAGE_INDEX[from] + 1];
    if (!next) return;
    setBusy(ref);
    try { await moveTicketStage(ref, next.id); await refresh(); } finally { setBusy(null); }
  };

  const tabs: { id: Tab; label: string; icon: typeof Inbox; count?: number }[] = [
    { id: 'inbox', label: t('admin.tab.inbox'), icon: Inbox, count: bookings.length + quotes.length },
    { id: 'board', label: t('admin.tab.board'), icon: Kanban, count: board?.columns.reduce((n, c) => n + c.tickets.length, 0) },
    { id: 'bays', label: t('admin.tab.bays'), icon: LayoutGrid, count: board?.bays.filter((b) => b.ticketRef).length },
  ];

  return (
    <div className="pb-24">
      <PageHead eyebrow="Staff preview" title={t('admin.title')} lead={t('admin.lead')}
        right={<Button variant="outline" size="sm" icon={<RefreshCw className="w-4 h-4" />} onClick={async () => { await resetDemo(); await refresh(); }}>Reset demo data</Button>} />
      <div className="wrap py-8">
        <Notice tone="info" className="flex items-start gap-3"><Lock className="w-4 h-4 mt-0.5 shrink-0" /><span>Production needs sign-in, roles (front desk, estimator, technician, manager) and live updates. Everything below is served by the mock adapter in <span className="font-mono">src/api/mock</span>.</span></Notice>

        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar" role="tablist">
          {tabs.map((tb) => (
            <button key={tb.id} role="tab" aria-selected={tab === tb.id} onClick={() => setTab(tb.id)} type="button"
              className={cx('inline-flex items-center gap-2 h-10 px-4 rounded-sm border text-sm font-semibold whitespace-nowrap', tab === tb.id ? 'bg-bone text-ink border-bone' : 'border-white/15 text-mist-2 hover:border-white/40')}>
              <tb.icon className="w-4 h-4" /> {tb.label} {tb.count !== undefined && <span className={cx('font-mono text-xs px-1.5 rounded-sm', tab === tb.id ? 'bg-ink/10' : 'bg-white/10')}>{tb.count}</span>}
            </button>
          ))}
        </div>

        {tab === 'inbox' && (
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <section aria-label="Bookings">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-mist">Bookings · <span className="text-bone">{bookings.length}</span></h2>
              {bookings.length === 0 ? <p className="mt-3 text-sm text-mist">{t('admin.empty')} <Link className="underline" to="/book">Book now</Link>.</p> : (
                <ul className="mt-3 space-y-2">
                  {bookings.map((b) => (
                    <Card as="li" key={b.id} className="p-4 grid sm:grid-cols-12 gap-3 text-sm">
                      <div className="sm:col-span-3"><div className="font-mono text-red-3">{b.ref}</div><div className="text-xs text-mist">{relTime(b.createdAt)} · {b.source}</div></div>
                      <div className="sm:col-span-4"><div className="font-semibold">{b.vehicle.make} {b.vehicle.model} {b.vehicle.year}</div><div className="text-xs text-mist-2">{b.serviceId === 'unsure' ? 'Diagnose' : SERVICE_BY_ID[b.serviceId].name}{b.pickup && ' · pickup'}{b.fleetAccountId && ` · ${b.fleetAccountId}`}</div></div>
                      <div className="sm:col-span-3"><div className="font-semibold">{fmtDate(b.date)} · {b.slot}</div><div className="text-xs text-mist-2">{b.customer.name} · {b.channel}</div></div>
                      <div className="sm:col-span-2 flex sm:justify-end items-start"><Chip as="span" className="!h-7 !px-2.5 !text-xs">{b.status}</Chip></div>
                    </Card>
                  ))}
                </ul>
              )}
            </section>
            <section aria-label="Quote requests">
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-mist">Estimator queue · <span className="text-bone">{quotes.length}</span></h2>
              {quotes.length === 0 ? <p className="mt-3 text-sm text-mist">{t('admin.empty')} <Link className="underline" to="/quote">Request a quote</Link>.</p> : (
                <ul className="mt-3 space-y-2">
                  {quotes.map((q) => (
                    <Card as="li" key={q.id} className="p-4 text-sm">
                      <div className="flex flex-wrap items-baseline justify-between gap-2"><span className="font-mono text-red-3">{q.ref}</span><span className="text-xs text-mist">{relTime(q.createdAt)}{q.insurance?.claim && ` · insurance${q.insurance.insurer ? `: ${q.insurance.insurer}` : ''}`}</span></div>
                      <div className="mt-1 font-semibold">{q.vehicle.make} {q.vehicle.model} {q.vehicle.year} <span className="text-mist font-normal">· {q.customer.name} · {q.channel}</span></div>
                      <div className="mt-2 flex flex-wrap gap-1.5">{q.zones.map((z) => <span key={z.zone} className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-white/10">{ZONE_SHORT[z.zone] ?? z.zone} · {z.severity}</span>)}</div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-mist-2"><span>{q.photos.length} photos</span><span>→ {q.departments.map((d) => SERVICE_BY_ID[d].name.split(' ·')[0]).join(', ')}</span></div>
                      {q.photos.some((p) => p.url) && <div className="mt-2 flex gap-1.5">{q.photos.filter((p) => p.url).slice(0, 6).map((p) => <img key={p.name} src={p.url} alt={p.name} className="w-12 h-12 object-cover rounded-sm" />)}</div>}
                    </Card>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {tab === 'board' && board && (
          <div className="mt-6 -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="grid grid-flow-col auto-cols-[16rem] lg:auto-cols-fr gap-3 min-w-max lg:min-w-0">
              {board.columns.map((c) => {
                const st = STAGES[STAGE_INDEX[c.stage]];
                return (
                  <section key={c.stage} className="rounded-sm border border-white/10 bg-white/[.02] flex flex-col" aria-label={st.name}>
                    <header className="p-3 border-b border-white/10 flex items-center justify-between"><span className="font-mono text-xs uppercase tracking-widest">0{st.n} {st.name}</span><span className="font-mono text-xs text-mist">{c.tickets.length}</span></header>
                    <ul className="p-2 space-y-2 min-h-24">
                      {c.tickets.map((tk) => (
                        <li key={tk.ref} className="rounded-sm border border-white/10 bg-ink-2 p-3 text-sm">
                          <div className="flex items-center justify-between"><span className="font-mono text-red-3 text-xs">{tk.ref}</span><span className="font-mono text-[10px] text-mist">{tk.bay ?? '—'}</span></div>
                          <div className="mt-1 font-semibold leading-tight">{tk.vehicle.make} {tk.vehicle.model}</div>
                          <div className="mt-1 text-[11px] text-mist-2">{tk.services.map((s) => SERVICE_BY_ID[s].name.split(' ·')[0]).join(' · ')}</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className={cx('inline-flex items-center gap-1 font-mono text-[10px]', (tk.daysInStage ?? 0) >= 3 ? 'text-warn' : 'text-mist')}><StatusDot tone={(tk.daysInStage ?? 0) >= 3 ? 'warn' : 'mist'} /> {tk.daysInStage}d in stage</span>
                            {c.stage !== 'ready' && <button type="button" onClick={() => advance(tk.ref, c.stage)} disabled={busy === tk.ref} className="text-xs font-semibold text-bone hover:text-red-3 disabled:opacity-50">{t('admin.advance')} →</button>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'bays' && board && (
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {board.bays.map((b) => (
              <Card as="li" key={b.id} className={cx('p-4 min-h-28 flex flex-col', b.ticketRef ? 'border-red/40' : '')}>
                <div className="flex items-center justify-between"><span className="font-display font-extrabold wdth-75 text-2xl">{b.id}</span><span className="font-mono text-[10px] uppercase tracking-widest text-mist">{b.type}</span></div>
                <div className="mt-auto text-sm">{b.ticketRef ? <span className="font-mono text-red-3">{b.ticketRef}</span> : <span className="text-mist">free</span>}</div>
              </Card>
            ))}
          </ul>
        )}
        {board && <p className="mt-6 text-xs text-mist">Board as of {fmtDateTime(new Date().toISOString())}. In production: <span className="font-mono">GET /api/v1/staff/board</span> with live updates.</p>}
      </div>
    </div>
  );
}
