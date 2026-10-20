/**
 * API BOUNDARY
 * ------------
 * Every piece of UI that needs a backend calls one of these functions and
 * nothing else. Today they are served by the mock adapter (localStorage +
 * seed data) so the prototype works with no server. Swapping in the real
 * backend means replacing `impl` with an HTTP adapter that hits the
 * endpoints documented on each function. Models are in ./types.ts and the
 * full backend scope is in BACKEND_SCOPE.md.
 *
 * Conventions assumed for the real API:
 *   base URL      /api/v1
 *   auth          public endpoints: none (rate-limited); phone lookups: OTP;
 *                 fleet + staff: bearer JWT with roles
 *   errors        { error: { code, message } } with a matching HTTP status
 *   timestamps    ISO 8601, UTC
 */
import type {
  Board, Booking, BookingInput, Channel, EvInterestInput, FleetAccount, MessageInput, Quote, QuoteInput,
  ServiceId, Slot, StageId, Ticket, WorkshopStatus,
} from './types';
import { mockAdapter } from './mock/adapter';

export interface ApiAdapter {
  getWorkshopStatus(): Promise<WorkshopStatus>;
  getAvailableSlots(date: string, serviceId: ServiceId | 'unsure'): Promise<Slot[]>;
  createBooking(input: BookingInput): Promise<Booking>;
  submitQuote(input: QuoteInput): Promise<Quote>;
  getRepairStatus(ticketOrPhone: string): Promise<Ticket[]>;
  subscribeNotifications(ticketRef: string, channel: Channel, on: boolean): Promise<Ticket>;
  getFleetAccount(accountId: string): Promise<FleetAccount>;
  registerEvInterest(input: EvInterestInput): Promise<{ ref: string }>;
  sendMessage(input: MessageInput): Promise<{ ref: string }>;
  // staff
  getIncomingBookings(): Promise<Booking[]>;
  getIncomingQuotes(): Promise<Quote[]>;
  getBoard(): Promise<Board>;
  moveTicketStage(ticketRef: string, stage: StageId, note?: string): Promise<Ticket>;
  resetDemo(): Promise<void>;
}

const impl: ApiAdapter = mockAdapter;

/** GET /api/v1/workshop/status — public, cached 60 s. Powers the hero status strip. */
export const getWorkshopStatus = () => impl.getWorkshopStatus();

/** GET /api/v1/bookings/slots?date=YYYY-MM-DD&service=body — public. Derived from bay capacity and existing bookings. */
export const getAvailableSlots = (date: string, serviceId: ServiceId | 'unsure') => impl.getAvailableSlots(date, serviceId);

/** POST /api/v1/bookings — public. Triggers SMS/Telegram/WhatsApp confirmation and a front-desk notification. */
export const createBooking = (input: BookingInput) => impl.createBooking(input);

/** POST /api/v1/quotes (multipart: photos[] + JSON) — public. Photos go to object storage; estimator queue gets a task. */
export const submitQuote = (input: QuoteInput) => impl.submitQuote(input);

/** GET /api/v1/tickets/lookup?q=JA-24117 | q=0911… — public by ticket ref; phone lookups require an OTP (POST /api/v1/otp). */
export const getRepairStatus = (ticketOrPhone: string) => impl.getRepairStatus(ticketOrPhone);

/** PUT /api/v1/tickets/{ref}/notifications — public after OTP. */
export const subscribeNotifications = (ticketRef: string, channel: Channel, on: boolean) => impl.subscribeNotifications(ticketRef, channel, on);

/** GET /api/v1/fleet/accounts/{id} — role: fleet_admin | fleet_user, scoped to the caller’s organisation. */
export const getFleetAccount = (accountId: string) => impl.getFleetAccount(accountId);

/** POST /api/v1/leads/ev-interest — public. Writes to the CRM/leads table and sends an auto-reply. */
export const registerEvInterest = (input: EvInterestInput) => impl.registerEvInterest(input);

/** POST /api/v1/messages — public. Routes to WhatsApp Business / Telegram bot / SMS depending on channel. */
export const sendMessage = (input: MessageInput) => impl.sendMessage(input);

/** GET /api/v1/staff/bookings?status=new — role: front_desk | manager. */
export const getIncomingBookings = () => impl.getIncomingBookings();

/** GET /api/v1/staff/quotes?status=new — role: estimator | manager. */
export const getIncomingQuotes = () => impl.getIncomingQuotes();

/** GET /api/v1/staff/board — role: any staff. Tickets grouped by stage + bay occupancy. Real-time via SSE/WebSocket in production. */
export const getBoard = () => impl.getBoard();

/** POST /api/v1/staff/tickets/{ref}/stage — role: technician | manager. Appends an event, notifies the customer. */
export const moveTicketStage = (ticketRef: string, stage: StageId, note?: string) => impl.moveTicketStage(ticketRef, stage, note);

/** Mock only: clears local demo data. Not part of the real API. */
export const resetDemo = () => impl.resetDemo();
