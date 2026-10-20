# Feature brainstorm, ranking and selection

Effort scale (small team): **S** ≤ 1 week · **M** 1–3 weeks · **L** 3–6 weeks.

| # | Feature | Who it helps | Business value | FE | BE | Backend pieces needed |
|---|---|---|---|---|---|---|
| 1 | **Online booking with real slots** (service → vehicle → date/time → channel) | Private customers, fleet coordinators, front desk | Turns site visits into scheduled bays; captures vehicle data before arrival; fewer phone calls | M | M | Booking + vehicle models, slot/capacity engine per bay type, SMS/Telegram confirmation, front-desk calendar |
| 2 | **Smart quote request** (damage zones on a car diagram + photo upload) | Collision customers, estimators, insurers | Pre-qualified leads; estimators see damage before the car arrives; higher close rate; seeds insurance claims | M | M | File storage (S3-compatible), image pipeline (resize, EXIF strip), lead/quote model, estimator queue, optional AI pre-classification later |
| 3 | **Live repair tracker** (ticket number or phone) | Customers, service advisors | Ends "where is my car?" calls; visible process builds trust; photos at each stage | M | L | Job/ticket model with stage history, stage-change UI for staff, photo upload, phone-verified lookup (OTP), notification triggers |
| 4 | **Staff pipeline board + bookings inbox** (admin) | Workshop manager, service advisors | One view of every car's stage, bay and days-in-stage; spots the paint-booth bottleneck; the same data powers #3 | M | M | Auth + roles, stage transition audit log, bay assignment, metrics |
| 5 | **Fleet / corporate accounts portal** | NGOs, embassies, company fleets, rental firms | Recurring B2B revenue, SLAs, consolidated monthly statements; Addis has thousands of NGO/UN/embassy vehicles | M | L | Organisation accounts, multi-user roles, vehicle registry, service history, statements/invoices, pickup requests, SLA reporting |
| 6 | **EV assembly plant interest list** (buyer / fleet / investor / supplier / careers) | Leadership, investors, future buyers | Demand evidence for plant financing; early fleet buyers; partner and supplier pipeline | S | S | Leads table with segment, CRM export, auto-reply via email/Telegram |
| 7 | Service reminders by date or km (SMS/Telegram) | Customers, shop | Repeat routine maintenance at near-zero cost | S | M | Vehicle records + intervals, scheduler, SMS gateway, Telegram bot |
| 8 | Digital vehicle health report at handover (PDF/Telegram) | Customers | Evidence-based upsell; proof of work for resale | S | M | Inspection checklist model, PDF generation, storage, share links |
| 9 | Insurance claim support (upload documents, status shared with insurer) | Customers, insurers | Insurer-referred collision work is high volume; shared status cuts friction and days-in-shop | M | L | Claim model, document store, insurer read-only portal, email integration |
| 10 | Telebirr / CBE Birr deposits and payments | Customers, finance | Deposits lock bookings and cut no-shows; faster settlement | S | M | Payment gateway integration, reconciliation, receipts |
| 11 | Warranty and repair-history lookup by plate/VIN | Customers | Confidence in paint/body warranty; resale proof | S | M | History model keyed to plate/VIN, warranty terms, verified lookup |
| 12 | Pickup, drop-off and tow request with location | Customers, tow operator | Uses the tow truck as an acquisition channel; emergency path | S | M | Request model, geolocation, dispatcher alerts (WhatsApp/Telegram) |
| 13 | Technician before/after photo capture that feeds the gallery | Marketing, technicians | Gallery updates itself with proof-of-work; same photos feed the tracker | S | M | Mobile upload, moderation queue, image pipeline, public gallery API |
| 14 | Bay scheduling and paint-booth queue | Workshop manager | The booth is the bottleneck asset; utilisation drives slot availability in #1 | M | L | Resource/bay model, calendar engine, constraints |
| 15 | Parts-order status on tickets | Service advisors, customers | Most delays are parts; showing ETA reduces calls | S | M | Parts order model, supplier ETA, link to ticket stage |
| 16 | Public workshop status strip ("9 of 12 bays in use, booth queue 2") | Customers | Honest expectation setting; memorable; derived from #14 | S | S | Read-only aggregate endpoint |
| 17 | Workshop Notes (owned bilingual content) | SEO, customers | Replaces the borrowed blog with seasonal Addis advice | S | S | Lightweight CMS or markdown |
| 18 | Corporate tender pack (company profile PDF, equipment list, certifications) | Procurement officers | NGOs tender maintenance contracts; makes the shop citable | S | S | Document storage, download tracking |

## Ranking

| Rank | Feature | Why it ranks here |
|---|---|---|
| 1 | #3 Live repair tracker | Highest trust impact per birr; the thing no competitor in Addis offers |
| 2 | #1 Online booking | The front door; everything else hangs off a booking or a ticket |
| 3 | #2 Smart quote | Collision is the core business; photos + zones pre-qualify every lead |
| 4 | #4 Admin board | Without it, #1–#3 have no operator; also the first internal tool staff will use daily |
| 5 | #5 Fleet portal | Largest revenue lever in Addis (NGO, embassy, corporate fleets) |
| 6 | #6 EV interest list | Near-zero cost; converts the Future section into evidence for the plant |
| 7 | #7 Reminders | Cheap retention, phase 2 |
| 8 | #10 Payments | Deposits reduce no-shows, phase 2 |
| 9 | #9 Insurance support | High value but needs insurer buy-in, phase 2 |
| 10 | #14 Bay scheduling | Powers real slot availability, phase 2 |
| 11 | #13 Photo capture | Phase 2 add-on to tracker |
| 12 | #8 Health report | Phase 2 add-on to handover |
| 13 | #16 Status strip | Prototype shows it with mock data |
| 14 | #12 Tow request | Phase 2 |
| 15 | #11 Warranty lookup | Phase 3 |
| 16 | #15 Parts status | Phase 3 |
| 17 | #17 Workshop Notes | Built into the prototype as structure |
| 18 | #18 Tender pack | Phase 3 |

## Selected for the prototype (six)

**Booking (#1), Smart quote (#2), Live tracker (#3), Admin board (#4), Fleet portal (#5), EV interest list (#6).**

The first four form one data loop: a booking becomes a ticket, the ticket moves across the staff board, and the customer watches the same stages in the tracker. That makes the backend pitch a single coherent system rather than six disconnected forms. The fleet portal is included because corporate fleets are the biggest revenue opportunity for a 100-person shop in Addis and it reuses the same ticket and vehicle models. The EV interest list costs almost nothing and turns the Future section from a brochure page into a lead engine for the Gelan plant. Reminders and Telebirr payments are deliberately left for phase 2: they bolt onto the same models once those exist.
