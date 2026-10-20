import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useT } from '../i18n';
import { PageHead } from '../components/PageHead';
import { Button, Card, Notice, Placeholder, StatusDot } from '../components/ui';
import { getFleetAccount } from '../api/api';
import type { FleetAccount } from '../api/types';
import { fmtDate } from '../lib/format';

export default function FleetPortal() {
  const { t } = useT();
  const [acct, setAcct] = useState<FleetAccount | null>(null);
  useEffect(() => { getFleetAccount('FL-DEMO').then(setAcct); }, []);

  const kpis = acct ? [
    { k: 'Vehicles', v: acct.vehicles.length },
    { k: 'In workshop', v: acct.vehicles.filter((v) => v.status === 'in-shop').length },
    { k: 'Service due', v: acct.vehicles.filter((v) => v.status === 'due').length },
    { k: 'Open statement', v: acct.statements.filter((s) => s.status === 'open').length },
  ] : [];

  return (
    <div className="pb-24">
      <PageHead eyebrow="Fleet account" title={t('fleetp.title')} lead={t('fleetp.lead')}
        right={<Button to="/book?fleet=1" arrow>Request pickup / booking</Button>} />
      <div className="wrap py-8">
        <Notice tone="info" className="flex items-start gap-3"><Lock className="w-4 h-4 mt-0.5 shrink-0" /><span>Requires organisation accounts with sign-in, roles (coordinator, finance, viewer) and data scoped per organisation. Served here by <span className="font-mono">getFleetAccount()</span> with demo rows.</span></Notice>
        {!acct ? <p className="mt-8 text-sm text-mist font-mono">Loading…</p> : (
          <>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display font-extrabold wdth-75 text-3xl"><Placeholder label={acct.name.replace(/[[\]]/g, '')} /></h2>
                <p className="mt-2 text-sm text-mist-2">Coordinator: <Placeholder label={acct.contactName.replace(/[[\]]/g, '')} /> · SLA: {acct.sla}</p>
              </div>
            </div>
            <ul className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {kpis.map((k) => <li key={k.k} className="bg-ink p-5"><div className="font-display font-black wdth-75 text-4xl">{k.v}</div><div className="mt-1 text-xs font-mono uppercase tracking-widest text-mist">{k.k}</div></li>)}
            </ul>

            <Card className="mt-8 overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead className="text-left font-mono text-[10px] uppercase tracking-widest text-mist border-b border-white/10">
                  <tr><th className="p-4">Plate</th><th className="p-4">Vehicle</th><th className="p-4">Status</th><th className="p-4">Last service</th><th className="p-4">Next due</th><th className="p-4 text-right">km</th><th className="p-4"></th></tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {acct.vehicles.map((v) => (
                    <tr key={v.plate}>
                      <td className="p-4 font-mono">{v.plate}</td>
                      <td className="p-4 font-semibold">{v.make} {v.model}</td>
                      <td className="p-4"><span className="inline-flex items-center gap-2"><StatusDot tone={v.status === 'ok' ? 'ok' : v.status === 'due' ? 'warn' : 'red'} />{v.status === 'in-shop' ? 'In workshop' : v.status === 'due' ? 'Service due' : 'OK'}</span></td>
                      <td className="p-4 text-mist-2">{v.lastService ? fmtDate(v.lastService) : '—'}</td>
                      <td className="p-4 text-mist-2">{v.nextDue ? fmtDate(v.nextDue) : '—'}</td>
                      <td className="p-4 text-right font-mono text-mist-2">{v.odometerKm?.toLocaleString('en-US')}</td>
                      <td className="p-4 text-right">
                        {v.ticketRef && v.status === 'in-shop' ? <Button size="sm" variant="outline" to={`/track?t=${v.ticketRef}`}>Track</Button> : <Button size="sm" variant="ghost" to={`/book?fleet=1&plate=${encodeURIComponent(v.plate)}`}>Book</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <h3 className="mt-10 font-mono text-[10px] uppercase tracking-widest text-mist">Statements</h3>
            <ul className="mt-3 grid sm:grid-cols-3 gap-3">
              {acct.statements.map((s) => (
                <Card as="li" key={s.id} className="p-4 text-sm">
                  <div className="flex items-center justify-between"><span className="font-semibold">{s.period}</span><span className="font-mono text-[10px] uppercase tracking-widest text-mist">{s.status}</span></div>
                  <div className="mt-1 text-mist-2">{s.jobs} jobs · {s.vehicles} vehicles</div>
                  <div className="mt-3"><Placeholder label="Amount — demo" /></div>
                </Card>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
