import type { Bay, Booking, EvInterestInput, MessageInput, Quote, Ticket } from '../types';

export interface DB {
  v: number;
  seededAt: string;
  bookings: Booking[];
  quotes: Quote[];
  tickets: Ticket[];
  ev: (EvInterestInput & { ref: string; at: string })[];
  messages: (MessageInput & { ref: string; at: string })[];
}

const KEY = 'ja.proto.v1';
const VERSION = 3;

export const BAYS: Bay[] = [
  { id: 'B1', type: 'body' }, { id: 'B2', type: 'body' }, { id: 'B3', type: 'body' }, { id: 'B4', type: 'body' },
  { id: 'P1', type: 'paint' }, { id: 'P2', type: 'prep' },
  { id: 'M1', type: 'mechanical' }, { id: 'M2', type: 'mechanical' }, { id: 'M3', type: 'mechanical' }, { id: 'M4', type: 'mechanical' },
  { id: 'D1', type: 'diagnostics' }, { id: 'D2', type: 'diagnostics' },
];

/** Demo phone numbers that resolve in the tracker. */
export const DEMO_PHONES = { a: '0900000001', b: '0900000002' };

const H = 3600_000;
const D = 24 * H;
const ago = (ms: number) => new Date(Date.now() - ms).toISOString();
const ahead = (ms: number) => new Date(Date.now() + ms).toISOString();

export function mask(phone: string) {
  const d = phone.replace(/\D/g, '');
  return `${d.slice(0, 2)}** *** *${d.slice(-2)}`;
}

function seedTickets(): Ticket[] {
  return [
    {
      id: 't1', ref: 'JA-24117', vehicle: { make: 'Nissan', model: 'Patrol', year: '2019', colour: 'Blue' },
      services: ['body', 'paint'], stage: 'paint', bay: 'P1', createdAt: ago(5 * D), promisedAt: ahead(2 * D),
      phoneMasked: mask(DEMO_PHONES.a), notify: { channel: 'telegram', on: true },
      events: [
        { at: ago(5 * D), stage: 'intake', note: 'Front-left collision. Walk-around done, 14 photos taken, keys tagged.', photos: ['/images/johnny-auto3.jpg'], by: 'Front desk' },
        { at: ago(5 * D - 3 * H), stage: 'diagnosis', note: 'Wing, bumper and headlight to replace. Chassis measured: within tolerance. Estimate sent and approved.', by: 'Estimator' },
        { at: ago(4 * D), stage: 'body', note: 'Wing replaced, bumper mount repaired, panel gaps set.', photos: ['/images/johnny-auto3.jpg'], by: 'Body shop' },
        { at: ago(1 * D), stage: 'paint', note: 'In the Nova Verta booth. Primer and colour coat applied; clear coat and bake scheduled.', photos: ['/images/johnny-auto24.jpg'], by: 'Paint shop' },
      ],
    },
    {
      id: 't2', ref: 'JA-24102', vehicle: { make: 'Toyota', model: 'Vitz', year: '2014', colour: 'Silver' },
      services: ['mechanical', 'diagnostics'], stage: 'qc', bay: 'M2', createdAt: ago(3 * D), promisedAt: ahead(6 * H),
      phoneMasked: mask(DEMO_PHONES.a), notify: { channel: 'sms', on: true },
      events: [
        { at: ago(3 * D), stage: 'intake', note: 'Brake noise and warning light. Service history noted.', by: 'Front desk' },
        { at: ago(3 * D - 2 * H), stage: 'diagnosis', note: 'Scan: ABS sensor fault front-right. Pads worn to limit. Estimate approved by phone.', by: 'Diagnostics' },
        { at: ago(2 * D), stage: 'body', note: 'No body work on this ticket.', by: 'System' },
        { at: ago(2 * D), stage: 'paint', note: 'No paint work on this ticket.', by: 'System' },
        { at: ago(4 * H), stage: 'qc', note: 'Pads and sensor replaced. Road test done. Final re-scan clean. Wash in progress.', by: 'QC' },
      ],
      health: [
        { item: 'Front brake pads', status: 'replaced' },
        { item: 'ABS wheel sensor (FR)', status: 'replaced' },
        { item: 'Battery', status: 'attention', note: '11.9 V at rest. Expect replacement within 3 months.' },
        { item: 'Tyres', status: 'ok', note: '4.5 mm front, 5 mm rear' },
        { item: 'Engine oil', status: 'ok', note: 'Changed at last service' },
        { item: 'Coolant', status: 'ok' },
      ],
    },
    {
      id: 't3', ref: 'JA-24121', vehicle: { make: 'Hyundai', model: 'Tucson', year: '2021', colour: 'White' },
      services: ['diagnostics'], stage: 'diagnosis', bay: 'D1', createdAt: ago(1 * D),
      phoneMasked: mask(DEMO_PHONES.b), notify: { channel: 'whatsapp', on: false },
      events: [
        { at: ago(1 * D), stage: 'intake', note: 'Intermittent check-engine light. No visible damage.', by: 'Front desk' },
        { at: ago(2 * H), stage: 'diagnosis', note: 'Live-data logging in progress. Fault appears under load; road test scheduled.', by: 'Diagnostics' },
      ],
    },
    {
      id: 't4', ref: 'JA-24119', vehicle: { make: 'Toyota', model: 'Hilux', year: '2018', colour: 'White' },
      services: ['body'], stage: 'body', bay: 'B2', createdAt: ago(2 * D), promisedAt: ahead(3 * D), fleetAccountId: 'FL-DEMO',
      phoneMasked: '09** *** *10', events: [
        { at: ago(2 * D), stage: 'intake', note: 'Fleet vehicle. Rear-right quarter and tailgate damage.', by: 'Front desk' },
        { at: ago(2 * D - 2 * H), stage: 'diagnosis', note: 'Quarter panel repairable. Tailgate to replace. Fleet approval received.', by: 'Estimator' },
        { at: ago(1 * D), stage: 'body', note: 'Quarter panel pulled and dressed. Tailgate on order.', by: 'Body shop' },
      ],
    },
    {
      id: 't5', ref: 'JA-24123', vehicle: { make: 'Toyota', model: 'Land Cruiser', year: '2016', colour: 'White' },
      services: ['body', 'paint'], stage: 'intake', createdAt: ago(3 * H), fleetAccountId: 'FL-DEMO',
      phoneMasked: '09** *** *10', events: [
        { at: ago(3 * H), stage: 'intake', note: 'Fleet vehicle delivered by tow truck. Awaiting bay.', by: 'Front desk' },
      ],
    },
    {
      id: 't6', ref: 'JA-24110', vehicle: { make: 'Hyundai', model: 'H1', year: '2017', colour: 'Silver' },
      services: ['mechanical'], stage: 'ready', bay: 'M1', createdAt: ago(4 * D), promisedAt: ago(2 * H),
      phoneMasked: '09** *** *33', events: [
        { at: ago(4 * D), stage: 'intake', note: 'Scheduled service and clutch.', by: 'Front desk' },
        { at: ago(4 * D - H), stage: 'diagnosis', note: 'Clutch slipping. Estimate approved.', by: 'Diagnostics' },
        { at: ago(3 * D), stage: 'body', note: 'No body work.', by: 'System' },
        { at: ago(3 * D), stage: 'paint', note: 'No paint work.', by: 'System' },
        { at: ago(1 * D), stage: 'qc', note: 'Road test done. Clean.', by: 'QC' },
        { at: ago(2 * H), stage: 'ready', note: 'Ready for collection. Invoice sent.', by: 'Front desk' },
      ],
    },
    {
      id: 't7', ref: 'JA-24115', vehicle: { make: 'Suzuki', model: 'Dzire', year: '2020', colour: 'Grey' },
      services: ['body', 'fiberglass'], stage: 'body', bay: 'B1', createdAt: ago(3 * D), promisedAt: ahead(2 * D),
      phoneMasked: '09** *** *87', events: [
        { at: ago(3 * D), stage: 'intake', note: 'Front bumper cracked, bonnet dented.', by: 'Front desk' },
        { at: ago(3 * D - H), stage: 'diagnosis', note: 'Bumper: fibreglass repair. Bonnet: panel beat.', by: 'Estimator' },
        { at: ago(1 * D), stage: 'body', note: 'Bumper repaired in composites. Bonnet in progress.', by: 'Body shop' },
      ],
    },
    {
      id: 't8', ref: 'JA-24112', vehicle: { make: 'Isuzu', model: 'NPR', year: '2015', colour: 'White' },
      services: ['fiberglass'], stage: 'body', bay: 'B3', createdAt: ago(6 * D), promisedAt: ahead(1 * D),
      phoneMasked: '09** *** *45', events: [
        { at: ago(6 * D), stage: 'intake', note: 'Cargo box roof panel cracked.', by: 'Front desk' },
        { at: ago(6 * D - H), stage: 'diagnosis', note: 'Composite panel rebuild.', by: 'Estimator' },
        { at: ago(4 * D), stage: 'body', note: 'New panel laid up and curing.', by: 'Composites' },
      ],
    },
    {
      id: 't9', ref: 'JA-24120', vehicle: { make: 'Toyota', model: 'Corolla', year: '2012', colour: 'Red' },
      services: ['paint'], stage: 'paint', bay: 'P2', createdAt: ago(2 * D), promisedAt: ahead(2 * D),
      phoneMasked: '09** *** *19', events: [
        { at: ago(2 * D), stage: 'intake', note: 'Full respray, same colour.', by: 'Front desk' },
        { at: ago(2 * D - H), stage: 'diagnosis', note: 'Surface prep only; no structural work.', by: 'Estimator' },
        { at: ago(1 * D), stage: 'body', note: 'Trim removed, minor dents dressed.', by: 'Body shop' },
        { at: ago(5 * H), stage: 'paint', note: 'In prep bay: sanding and masking. Booth slot after JA-24117.', by: 'Paint shop' },
      ],
    },
  ];
}

export function seed(): DB {
  return { v: VERSION, seededAt: new Date().toISOString(), bookings: [], quotes: [], tickets: seedTickets(), ev: [], messages: [] };
}

let memory: DB | null = null;

export function load(): DB {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DB;
      // Reseed when the schema changes or the demo is older than a day (keeps relative dates sensible).
      if (parsed.v === VERSION && Date.now() - new Date(parsed.seededAt).getTime() < D) {
        memory = parsed;
        return parsed;
      }
    }
  } catch { /* private mode or corrupt */ }
  memory = seed();
  save();
  return memory;
}

export function save() {
  if (!memory) return;
  try { localStorage.setItem(KEY, JSON.stringify(memory)); } catch { /* ignore */ }
}

export function reset() {
  memory = seed();
  save();
}
