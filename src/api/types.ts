/**
 * Shared data models for the public site, the customer tools and the staff
 * preview. These are the shapes the backend is expected to return; see
 * BACKEND_SCOPE.md for the endpoint list.
 */

export type ServiceId = 'body' | 'paint' | 'diagnostics' | 'mechanical' | 'fiberglass' | 'end-to-end';
export type StageId = 'intake' | 'diagnosis' | 'body' | 'paint' | 'qc' | 'ready';
export type Channel = 'sms' | 'telegram' | 'whatsapp';
export type Severity = 'scratch' | 'dent' | 'structural';

export interface Vehicle {
  make: string;
  model: string;
  year?: string;
  plate?: string;
  colour?: string;
}

export interface Customer {
  name: string;
  phone: string;
  email?: string;
  org?: string;
}

/* ----- Booking ----------------------------------------------------------- */

export interface Slot {
  time: string;          // "09:00"
  available: boolean;
  capacityLeft: number;  // bays of the right type still free at that time
}

export interface BookingInput {
  serviceId: ServiceId | 'unsure';
  vehicle: Vehicle;
  date: string;          // YYYY-MM-DD
  slot: string;          // HH:MM
  customer: Customer;
  channel: Channel;
  pickup?: boolean;
  fleetAccountId?: string;
  notes?: string;
}

export interface Booking extends BookingInput {
  id: string;
  ref: string;           // JA-B-1234 (customer-facing)
  createdAt: string;     // ISO
  status: 'new' | 'confirmed' | 'arrived' | 'cancelled';
  source: 'web' | 'fleet' | 'phone';
}

/* ----- Quote ------------------------------------------------------------- */

export interface DamageSelection {
  zone: string;          // DAMAGE_ZONES id
  severity: Severity;
}

export interface PhotoMeta {
  name: string;
  size: number;
  type: string;
  /** Set by the backend after upload; the mock keeps a local object URL. */
  url?: string;
}

export interface QuoteInput {
  zones: DamageSelection[];
  photos: PhotoMeta[];
  vehicle: Vehicle;
  customer: Customer;
  channel: Channel;
  insurance?: { claim: boolean; insurer?: string };
  description?: string;
}

export interface Quote extends QuoteInput {
  id: string;
  ref: string;           // JA-Q-1234
  createdAt: string;
  status: 'new' | 'estimating' | 'sent' | 'accepted' | 'declined';
  /** Derived from zones: which departments the job touches. */
  departments: ServiceId[];
}

/* ----- Ticket / repair tracking ----------------------------------------- */

export interface TicketEvent {
  at: string;            // ISO
  stage: StageId;
  note: string;
  photos?: string[];
  by?: string;           // staff role, never a personal name on the public site
}

export interface HealthItem {
  item: string;
  status: 'ok' | 'attention' | 'replaced';
  note?: string;
}

export interface Ticket {
  id: string;
  ref: string;           // JA-24117
  vehicle: Vehicle;
  services: ServiceId[];
  stage: StageId;
  bay?: string;
  createdAt: string;
  promisedAt?: string;
  /** Masked on the public tracker: "09** *** 123" */
  phoneMasked: string;
  events: TicketEvent[];
  health?: HealthItem[];
  notify?: { channel: Channel; on: boolean };
  fleetAccountId?: string;
  daysInStage?: number;
}

/* ----- Fleet ------------------------------------------------------------- */

export interface FleetVehicle {
  plate: string;
  make: string;
  model: string;
  status: 'ok' | 'due' | 'in-shop';
  lastService?: string;  // ISO date
  nextDue?: string;      // ISO date
  odometerKm?: number;
  ticketRef?: string;
}

export interface FleetStatement {
  id: string;
  period: string;        // "Sep 2026"
  vehicles: number;
  jobs: number;
  status: 'open' | 'issued' | 'paid';
}

export interface FleetAccount {
  id: string;
  name: string;
  contactName: string;
  vehicles: FleetVehicle[];
  statements: FleetStatement[];
  sla?: string;
}

/* ----- Misc -------------------------------------------------------------- */

export interface EvInterestInput {
  segment: 'buyer' | 'fleet' | 'investor' | 'supplier' | 'careers';
  name: string;
  phone: string;
  email?: string;
  org?: string;
  note?: string;
}

export interface MessageInput {
  name: string;
  phone: string;
  channel: Channel;
  message: string;
}

export interface WorkshopStatus {
  open: boolean;
  closesAt: string;
  opensAt: string;
  baysInUse: number;
  baysTotal: number;
  boothQueue: number;
  towAvailable: boolean;
  asOf: string;
}

export interface Bay {
  id: string;            // "B1"
  type: 'body' | 'paint' | 'prep' | 'mechanical' | 'diagnostics';
  ticketRef?: string;
}

export interface Board {
  columns: { stage: StageId; tickets: Ticket[] }[];
  bays: Bay[];
}
