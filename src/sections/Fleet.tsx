import { Building2, ClipboardCheck, Receipt, Truck } from 'lucide-react';
import { useT } from '../i18n';
import { Button, SectionHead } from '../components/ui';

const POINTS = [
  { icon: Truck, k: 'Pickup and return', v: 'Request collection from your compound; our tow truck or driver brings the vehicle in.' },
  { icon: ClipboardCheck, k: 'Approve from your desk', v: 'Estimates and photos arrive on the portal; approve or query without a visit.' },
  { icon: Receipt, k: 'One monthly statement', v: 'Every job, every vehicle, one document for finance.' },
  { icon: Building2, k: 'Priority bays', v: 'Fleet agreements get scheduled intake and a named contact.' },
];

export function Fleet() {
  const { t } = useT();
  return (
    <section id="fleet" className="scroll-mt-20 bg-bone text-ink" aria-labelledby="fleet-title">
      <div className="wrap py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <SectionHead light id="fleet-title" eyebrow={t('fleet.eyebrow')} title={t('fleet.title')} lead={t('fleet.lead')} />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/fleet" variant="bone" className="!bg-ink !text-bone hover:!bg-steel" arrow>{t('fleet.cta')}</Button>
            <Button to="/book?fleet=1" variant="outline" className="!text-ink !border-ink/30 hover:!border-ink">{t('nav.book')}</Button>
          </div>
        </div>
        <ul className="lg:col-span-6 grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/10">
          {POINTS.map((p) => (
            <li key={p.k} className="bg-bone p-6">
              <p.icon className="w-5 h-5 text-red" aria-hidden />
              <h3 className="mt-3 font-display font-bold wdth-87 text-xl">{p.k}</h3>
              <p className="mt-1.5 text-sm text-steel">{p.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
