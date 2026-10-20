# Backend scope — Johnny Auto service platform

This document lists everything the prototype front end needs from a backend. Every backend-dependent screen already calls a function in `src/api/api.ts`; today those functions are served by `src/api/mock/` (localStorage and seed data). Replacing the mock adapter with an HTTP adapter against the endpoints below makes the site real. Models are in `src/api/types.ts` and can be shared with a TypeScript backend as-is.

Effort figures are indicative for a small team (one backend engineer, one front-end engineer, part-time QA) and assume the integrations' commercial onboarding (SMS, WhatsApp, Telebirr) runs in parallel.

## 1. What the front end calls today

| Screen | Function in `api.ts` | Endpoint (proposed) | Auth |
|---|---|---|---|
| Hero status strip | `getWorkshopStatus()` | `GET /api/v1/workshop/status` | public, cached 60 s |
| Booking · slots | `getAvailableSlots(date, service)` | `GET /api/v1/bookings/slots?date&service` | public |
| Booking · confirm | `createBooking(input)` | `POST /api/v1/bookings` | public, rate-limited |
| Photo quote | `submitQuote(input)` | `POST /api/v1/quotes` (multipart) | public, rate-limited |
| Tracker · lookup | `getRepairStatus(ticketOrPhone)` | `GET /api/v1/tickets/lookup?q=` | ticket ref: public · phone: OTP |
| Tracker · notifications | `subscribeNotifications(ref, channel, on)` | `PUT /api/v1/tickets/{ref}/notifications` | OTP session |
| Future · interest list | `registerEvInterest(input)` | `POST /api/v1/leads/ev-interest` | public |
| Contact · quick message | `sendMessage(input)` | `POST /api/v1/messages` | public |
| Fleet portal | `getFleetAccount(id)` | `GET /api/v1/fleet/accounts/{id}` | fleet role, org-scoped |
| Staff · inbox | `getIncomingBookings()`, `getIncomingQuotes()` | `GET /api/v1/staff/bookings`, `GET /api/v1/staff/quotes` | staff |
| Staff · board | `getBoard()` | `GET /api/v1/staff/board` (+ SSE stream) | staff |
| Staff · advance | `moveTicketStage(ref, stage, note)` | `POST /api/v1/staff/tickets/{ref}/stage` | technician / manager |

Conventions: base path `/api/v1`, JSON bodies, ISO-8601 UTC timestamps, errors as `{ error: { code, message } }` with matching HTTP status, cursor pagination on list endpoints.

## 2. Phase 1 — MVP (indicative 6–8 weeks)

Goal: the public site works for real. A booking becomes a ticket, the ticket moves across the staff board, and the customer sees the same stages in the tracker and on their phone.

### Endpoints
**Public**
- `GET /workshop/status` — open/closed from configured hours, bays in use, booth queue, tow availability (manual toggle).
- `GET /bookings/slots?date&service` — derived from bay capacity per service type, existing bookings and blocked periods.
- `POST /bookings` — validates phone, creates `Booking`, sends confirmation on the chosen channel, notifies front desk.
- `GET /bookings/{ref}` — after OTP.
- `POST /quotes` — multipart: JSON + up to 6 photos. Stores photos, derives departments from zones, creates estimator task.
- `GET /tickets/lookup?q=` — by ticket ref (public, unguessable refs) or by phone (requires OTP session).
- `POST /otp/request`, `POST /otp/verify` — SMS or Telegram one-time code; returns a short-lived session token.
- `PUT /tickets/{ref}/notifications` — channel + on/off.
- `POST /leads/ev-interest` — segment, contact; auto-reply.
- `POST /messages` — routed to the right channel; lands in the staff inbox.

**Staff** (JWT with roles)
- `POST /auth/login` (phone + OTP, or email + password), `POST /auth/refresh`.
- `GET /staff/bookings?status=new|confirmed|arrived`.
- `POST /staff/bookings/{ref}/check-in` — creates the `Ticket` at the Intake stage, assigns a bay, tags keys.
- `GET /staff/quotes?status=new|estimating|sent`.
- `POST /staff/quotes/{ref}/estimate` — amount, line items, validity; sends to customer.
- `GET /staff/board` — tickets grouped by stage plus bay occupancy; `GET /staff/board/stream` as Server-Sent Events for live updates on the workshop screen.
- `POST /staff/tickets/{ref}/stage` — appends a `TicketEvent`, triggers customer notification, validates allowed transitions.
- `POST /staff/tickets/{ref}/photos` — technician photo upload from a phone; attaches to the current stage.
- `PUT /staff/tickets/{ref}/bay`, `GET /staff/bays`.
- `PUT /staff/workshop/status` — tow availability, temporary closures.

**Webhooks**
- `POST /webhooks/telegram` — bot updates (start, language choice, ticket lookups in chat).
- `POST /webhooks/sms/dlr` — delivery receipts.

### Data models
- `Customer` — id, name, phone (E.164), email?, preferred language (en/am), preferred channel, created_at.
- `Vehicle` — id, customer_id?, make, model, year?, plate?, vin?, colour?.
- `Booking` — ref `JA-B-####`, service_id, vehicle_id, date, slot, channel, pickup?, notes?, status (new, confirmed, arrived, cancelled, no_show), source (web, fleet, phone), fleet_account_id?.
- `Ticket` — ref `JA-#####`, vehicle_id, customer_id, services[], stage (intake, diagnosis, body, paint, qc, ready, collected), bay_id?, promised_at?, created_at, closed_at?, fleet_account_id?.
- `TicketEvent` — ticket_id, stage, note, photos[], staff_user_id, created_at. Append-only (audit log).
- `Bay` — id, type (body, paint, prep, mechanical, diagnostics), active.
- `CapacityRule` — service → bay types, slot length, max concurrent, working hours, holidays.
- `QuoteRequest` — ref `JA-Q-####`, zones[{zone, severity}], photos[], vehicle, customer, channel, insurance{claim, insurer}, description, status (new, estimating, sent, accepted, declined), departments[], estimate?.
- `Photo` — id, owner (quote|ticket_event), storage_key, width, height, bytes, taken_at, uploaded_by.
- `Notification` — to, channel, template, payload, status (queued, sent, delivered, failed), provider_message_id.
- `StaffUser` — id, name, phone/email, role (front_desk, estimator, technician, paint, qc, manager, admin), active.
- `Lead` — segment (buyer, fleet, investor, supplier, careers), contact, org?, note?, source.
- `Message` — from customer, channel, body, status, assigned_to?.
- `OtpSession` — phone, code hash, expires_at, verified_at.

### Auth and roles
- Customers: no accounts. Ticket refs are unguessable; phone lookups and notification changes require an OTP session (SMS or Telegram).
- Staff: JWT access + refresh tokens. Roles above. Technicians can only move tickets forward within their department; managers can move any ticket and reassign bays. Every stage change is attributed and immutable.
- Rate limiting on all public POSTs; CAPTCHA-free (phone OTP is the friction).

### Integrations
- **SMS**: Ethio Telecom bulk SMS or a local aggregator (to confirm commercially). Amharic text is UCS-2, so 70 characters per segment: templates must be short. Delivery receipts via webhook.
- **Telegram Bot API**: free, no verification, the most used messaging app in Addis. Bot sends stage updates with photos, handles `/track JA-24117`, and offers Amharic/English.
- **WhatsApp**: in MVP only as a deep link (`wa.me`) from the contact section. The Business Cloud API is Phase 2.
- **Object storage**: S3-compatible (Cloudflare R2, Backblaze B2 or self-hosted MinIO) for photos. Server-side resize to 1600 px and 400 px, EXIF stripped, HEIC converted.
- **Email**: transactional provider (Postmark, SES) for staff password resets and quote PDFs.

### Infrastructure
- Postgres 15+, one application server (Node/TypeScript recommended so `src/api/types.ts` is shared; NestJS or Fastify), a job queue (BullMQ on Redis) for notifications and image processing, SSE for the board.
- Hosting in a region with good routes to Ethiopia (EU) or a local provider; nightly database backups; photos replicated.
- Observability: request logs, error tracking, notification delivery dashboard.

## 3. Phase 2 — Fleet, money and reminders (indicative 6–10 weeks)

### Features
- **Fleet / corporate accounts**: organisations with users (coordinator, finance, viewer); vehicles registered to the org; bookings and tickets scoped to it; monthly statements; pickup requests; SLA fields.
- **Estimates and approvals**: estimate line items on a ticket; customer or fleet coordinator approves from a link; approval recorded as an event.
- **WhatsApp Business Cloud API**: Meta business verification, template approval for Amharic and English messages, inbound messages into the staff inbox.
- **Payments**: Telebirr and CBE Birr merchant integration for booking deposits and invoice settlement; reconciliation report; receipts by channel.
- **Service reminders**: per-vehicle intervals by date or km; scheduler sends SMS/Telegram with a one-tap booking link.
- **Vehicle health report**: inspection checklist at QC; PDF and shareable link; feeds the tracker and the fleet portal.
- **Bay scheduling and booth queue**: calendar engine that turns real bay capacity into booking slots; paint-booth queue visible on the board; feeds the public status strip.
- **Technician photo capture → gallery**: before/after pairs flagged on tickets; moderation queue; approved pairs published to the public gallery automatically.

### Additional endpoints
`/fleet/accounts/{id}/vehicles`, `/fleet/accounts/{id}/statements`, `/fleet/accounts/{id}/pickups`, `/staff/tickets/{ref}/estimate`, `/public/estimates/{token}/approve`, `/payments/telebirr/*`, `/payments/cbebirr/*`, `/webhooks/whatsapp`, `/reminders/*`, `/staff/tickets/{ref}/inspection`, `/staff/capacity/*`, `/gallery/*`.

### Additional models
`Organisation`, `OrgUser`, `Statement`, `StatementLine`, `Estimate`, `EstimateLine`, `Approval`, `Payment`, `ReminderRule`, `Reminder`, `Inspection`, `InspectionItem`, `CapacityCalendar`, `GalleryItem`.

## 4. Phase 3 — Insurance, warranty, content, plant (indicative 8–12 weeks)

- **Insurance claim support**: claim record on a ticket, document uploads, insurer read-only portal link with status, assessor appointments, settlement tracking.
- **Warranty and repair-history lookup** by plate/VIN with OTP; warranty terms per job type.
- **Parts orders** on tickets with supplier ETA; "waiting for parts" visible to the customer.
- **Workshop Notes CMS**: bilingual articles (EN/AM), seasonal scheduling, images from the gallery.
- **Analytics**: days-in-stage, booth utilisation, no-show rate, lead sources, fleet revenue.
- **EV plant programme**: pre-registration with deposits (Telebirr), model interest, investor/supplier CRM export, careers intake.

Additional models: `Claim`, `ClaimDocument`, `Insurer`, `WarrantyRecord`, `PartsOrder`, `Article`, `ArticleTranslation`, `PreRegistration`.

## 5. Cross-cutting requirements

- **Bilingual**: every outbound message has an Amharic template; staff UI can stay English.
- **Low bandwidth**: photo uploads resumable and compressed client-side (Phase 2); API responses small; tracker works on 2G.
- **Privacy**: public tracker never shows customer names or full phone numbers (the prototype masks them); photos only visible with the ticket ref or OTP; data retention policy for photos (for example 24 months).
- **Audit**: stage changes, estimates, approvals and payments are append-only events.
- **Backups and export**: nightly backups; CSV export of tickets and leads for the client's accountant.

## 6. Open questions for the client

1. Working hours and public holidays (the site lists none).
2. Real bay count and types; which services share bays.
3. Which SMS provider or aggregator they already use, if any.
4. Whether the WhatsApp number (+251 94 429 4429) is a business account that can be verified with Meta.
5. Telegram handle for the workshop.
6. Insurers they already work with (for Phase 3 priorities).
7. Founding year, and the real figure behind "500k+ customers" (or a replacement metric).
8. EV plant timeline and whether EV servicing is offered today.
