import type { ApiAdapter } from '../api';
import type { Booking, Quote, ServiceId, Slot, StageId, Ticket, WorkshopStatus, FleetAccount } from '../types';
import { BAYS, DEMO_PHONES, load, mask, reset, save } from './store';
import { COMPANY, DAMAGE_ZONES, STAGES, STAGE_INDEX } from '../../data/company';
import { uid } from '../../lib/format';

const wait = (ms = 320 + Math.random() * 280) => new Promise((r) => setTimeout(r, ms));

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function withDays(t: Ticket): Ticket {
  const last = t.events[t.events.length - 1];
  const days = last ? Math.max(0, Math.round((Date.now() - new Date(last.at).getTime()) / 86400000)) : 0;
  return { ...t, daysInStage: days };
}

function status(): WorkshopStatus {
  const db = load();
  const now = new Date();
  const { open, close, days } = COMPANY.hours.demo;
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  const isDay = days.includes(now.getDay());
  const isOpen = isDay && mins >= oh * 60 + om && mins < ch * 60 + cm;
  const active = db.tickets.filter((t) => t.bay && t.stage !== 'ready');
  const boothQueue = db.tickets.filter((t) => t.services.includes('paint') && (t.stage === 'body' || (t.stage === 'paint' && t.bay !== 'P1'))).length;
  return {
    open: isOpen,
    closesAt: close,
    opensAt: open,
    baysInUse: active.length,
    baysTotal: BAYS.length,
    boothQueue,
    towAvailable: hash(now.toDateString()) % 3 !== 0,
    asOf: now.toISOString(),
  };
}

export const mockAdapter: ApiAdapter = {
  async getWorkshopStatus() {
    await wait(150);
    return status();
  },

  async getAvailableSlots(date, serviceId) {
    await wait();
    const db = load();
    const d = new Date(date + 'T00:00:00');
    const { open, close, days } = COMPANY.hours.demo;
    if (!days.includes(d.getDay())) return [];
    const [oh] = open.split(':').map(Number);
    const [ch] = close.split(':').map(Number);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    const slots: Slot[] = [];
    const cap = serviceId === 'paint' ? 1 : serviceId === 'body' ? 2 : 3;
    for (let h = oh; h < ch; h++) {
      const time = `${String(h).padStart(2, '0')}:00`;
      const booked = db.bookings.filter((b) => b.date === date && b.slot === time && b.status !== 'cancelled').length;
      // deterministic "existing" load so the calendar does not look empty
      const load_ = hash(date + time + serviceId) % 4 === 0 ? cap : hash(date + time) % 3;
      const left = Math.max(0, cap - Math.min(cap, load_) - booked);
      const past = isToday && h <= today.getHours();
      slots.push({ time, available: left > 0 && !past, capacityLeft: left });
    }
    return slots;
  },

  async createBooking(input) {
    await wait();
    const db = load();
    const booking: Booking = {
      ...input,
      id: `b_${Date.now()}`,
      ref: uid('JA-B'),
      createdAt: new Date().toISOString(),
      status: 'new',
      source: input.fleetAccountId ? 'fleet' : 'web',
    };
    db.bookings.unshift(booking);
    save();
    return booking;
  },

  async submitQuote(input) {
    await wait(600);
    const db = load();
    const depts = new Set<ServiceId>();
    for (const z of input.zones) {
      const def = DAMAGE_ZONES.find((d) => d.id === z.zone);
      def?.depts.forEach((d) => depts.add(d));
      if (z.severity === 'structural') depts.add('diagnostics');
    }
    if (depts.has('body')) depts.add('paint');
    const quote: Quote = {
      ...input,
      id: `q_${Date.now()}`,
      ref: uid('JA-Q'),
      createdAt: new Date().toISOString(),
      status: 'new',
      departments: Array.from(depts),
    };
    db.quotes.unshift(quote);
    save();
    return quote;
  },

  async getRepairStatus(q) {
    await wait();
    const db = load();
    const s = q.trim().toUpperCase();
    if (/^JA-?\d{3,}/.test(s)) {
      const ref = s.replace(/^JA-?/, 'JA-');
      return db.tickets.filter((t) => t.ref === ref).map(withDays);
    }
    const digits = s.replace(/\D/g, '');
    if (digits.length >= 9) {
      const tail = digits.slice(-9);
      const known = Object.values(DEMO_PHONES).find((p) => p.slice(-9) === tail);
      if (known) return db.tickets.filter((t) => t.phoneMasked === mask(known)).map(withDays);
    }
    return [];
  },

  async subscribeNotifications(ref, channel, on) {
    await wait(200);
    const db = load();
    const t = db.tickets.find((x) => x.ref === ref);
    if (!t) throw new Error('not found');
    t.notify = { channel, on };
    save();
    return withDays(t);
  },

  async getFleetAccount(accountId) {
    await wait();
    const db = load();
    const inShop = (ref: string) => db.tickets.find((t) => t.ref === ref && t.stage !== 'ready');
    const acct: FleetAccount = {
      id: accountId,
      name: '[FLEET ACCOUNT — DEMO]',
      contactName: '[FLEET COORDINATOR — DEMO]',
      sla: 'Priority intake, 48 h estimate, monthly statement',
      vehicles: [
        { plate: 'DEMO-01', make: 'Toyota', model: 'Hilux', status: inShop('JA-24119') ? 'in-shop' : 'ok', ticketRef: 'JA-24119', lastService: '2026-08-14', nextDue: '2026-11-14', odometerKm: 84210 },
        { plate: 'DEMO-02', make: 'Toyota', model: 'Land Cruiser', status: inShop('JA-24123') ? 'in-shop' : 'ok', ticketRef: 'JA-24123', lastService: '2026-07-02', nextDue: '2026-10-02', odometerKm: 132400 },
        { plate: 'DEMO-03', make: 'Toyota', model: 'Hilux', status: 'due', lastService: '2026-04-20', nextDue: '2026-10-20', odometerKm: 97800 },
        { plate: 'DEMO-04', make: 'Toyota', model: 'Hilux', status: 'ok', lastService: '2026-09-30', nextDue: '2027-01-30', odometerKm: 41200 },
        { plate: 'DEMO-05', make: 'Hyundai', model: 'H1', status: 'due', lastService: '2026-05-11', nextDue: '2026-10-11', odometerKm: 156900 },
        { plate: 'DEMO-06', make: 'Toyota', model: 'Prado', status: 'ok', lastService: '2026-09-12', nextDue: '2027-01-12', odometerKm: 60300 },
        { plate: 'DEMO-07', make: 'Toyota', model: 'Vitz', status: 'ok', lastService: '2026-09-25', nextDue: '2027-03-25', odometerKm: 23100 },
        { plate: 'DEMO-08', make: 'Toyota', model: 'Land Cruiser', status: 'ok', lastService: '2026-08-01', nextDue: '2026-12-01', odometerKm: 118750 },
      ],
      statements: [
        { id: 'st-2026-10', period: 'Oct 2026', vehicles: 2, jobs: 2, status: 'open' },
        { id: 'st-2026-09', period: 'Sep 2026', vehicles: 3, jobs: 4, status: 'issued' },
        { id: 'st-2026-08', period: 'Aug 2026', vehicles: 2, jobs: 2, status: 'paid' },
      ],
    };
    return acct;
  },

  async registerEvInterest(input) {
    await wait();
    const db = load();
    const ref = uid('JA-EV');
    db.ev.unshift({ ...input, ref, at: new Date().toISOString() });
    save();
    return { ref };
  },

  async sendMessage(input) {
    await wait();
    const db = load();
    const ref = uid('JA-M');
    db.messages.unshift({ ...input, ref, at: new Date().toISOString() });
    save();
    return { ref };
  },

  async getIncomingBookings() {
    await wait(200);
    return load().bookings;
  },

  async getIncomingQuotes() {
    await wait(200);
    return load().quotes;
  },

  async getBoard() {
    await wait(200);
    const db = load();
    const columns = STAGES.map((s) => ({ stage: s.id, tickets: db.tickets.filter((t) => t.stage === s.id).map(withDays) }));
    const bays = BAYS.map((b) => ({ ...b, ticketRef: db.tickets.find((t) => t.bay === b.id && t.stage !== 'ready')?.ref }));
    return { columns, bays };
  },

  async moveTicketStage(ref, stage: StageId, note) {
    await wait(200);
    const db = load();
    const t = db.tickets.find((x) => x.ref === ref);
    if (!t) throw new Error('not found');
    t.stage = stage;
    if (stage === 'ready') t.bay = undefined;
    else if (stage === 'paint' && t.bay !== 'P1' && !db.tickets.some((x) => x.bay === 'P1' && x.ref !== ref)) t.bay = 'P1';
    t.events.push({ at: new Date().toISOString(), stage, note: note ?? `Moved to ${STAGES[STAGE_INDEX[stage]].name.toLowerCase()}.`, by: 'Staff' });
    save();
    return withDays(t);
  },

  async resetDemo() {
    reset();
  },
};
