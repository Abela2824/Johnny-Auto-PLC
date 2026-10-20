# Johnny Auto — reimagined site and service prototype

A redesign of [johnnyautoplc.com](https://johnnyautoplc.com/) for **Johnny General Auto Car Maintenance & Assembly P.L.C.** (Johnny Auto), the collision, paint, diagnostics and fibreglass workshop in Megenagna, Addis Ababa, with a planned electric-vehicle assembly plant in Gelan.

The concept is **THE LINE**: one line runs from the service bays in Megenagna, through the six-station repair process, to the assembly line in Gelan. Red is what the company has done; blue is where it is going. See [docs/03-CONCEPTS.md](docs/03-CONCEPTS.md).

Alongside the marketing page the prototype ships five working tools (booking, photo quote, live repair tracker, staff board, fleet portal) running on mock data behind a documented API boundary. The backend they need is specified in [BACKEND_SCOPE.md](BACKEND_SCOPE.md).

## Run it locally

Requirements: Node.js 20.19+ or 22.12+ (tested on Node 24) and npm.

```bash
npm install          # .npmrc sets legacy-peer-deps
npm run dev          # http://localhost:3000 (also reachable on your LAN for phone testing)
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves `dist/` at http://localhost:4173 |
| `npm run typecheck` | `tsc --noEmit` |

No environment variables and no API keys are needed.

## What is in the prototype

| Route | What it is |
| --- | --- |
| `/` | The marketing page: hero, stats, interactive services car, process line, workshop, before/after gallery, Gelan EV plant with interest list, fleet, workshop notes, partners, contact |
| `/book` | Online booking: service → vehicle → real-looking slots → contact → confirmation with calendar file |
| `/quote` | Photo quote: mark damage zones on a car diagram, set severity, add photos, send |
| `/track` | Live repair tracker by ticket number or phone (demo: `JA-24117`, `JA-24102`, `JA-24121`, `0900000001`) |
| `/admin` | Staff preview: bookings inbox, estimator queue, six-stage pipeline board with "Advance", bay grid |
| `/fleet` | Fleet portal demo account with vehicles, statuses and statements |
| `/notes`, `/notes/:slug` | Workshop Notes (replaces the borrowed blog) with placeholder articles |

The loop is wired end to end on mock data: make a booking or a quote on the public pages and it appears in `/admin`; advance a ticket on the board and `/track` shows the new station.

Language: the EN / አማ toggle in the header switches the interface. Amharic strings live in `src/i18n/am.ts`; any key missing there falls back to English, so translations can be added one key at a time.

## Project structure

```
index.html                 HTML shell, fonts, schema.org data
src/
  main.tsx, App.tsx        entry, providers, routes (code-split tools)
  index.css                design tokens (Tailwind v4 @theme), duotone treatment, hero animation
  lib/router.tsx           tiny History-API router with section anchors
  lib/hooks.ts, format.ts  media queries, reduced motion, count-up, formatting
  i18n/                    en.ts (all strings), am.ts (Amharic, partial), provider
  data/company.ts          every fact about the company, services, stages, gallery, notes
  api/api.ts               THE API BOUNDARY: one documented function per endpoint
  api/types.ts             data models shared with the backend
  api/mock/                localStorage-backed adapter with seeded tickets and bays
  components/              ui primitives, CarSide (hero / interactive / icon), CarTop (damage picker), header, footer, mobile bar, progress rail
  sections/                home page sections
  pages/                   Book, Quote, Track, Admin, FleetPortal, NotesPage
public/
  images/, partners/       photos and partner logos from the current site
  hero-poster.webp         hero background (duotoned in CSS)
  noise.png                grain tile
docs/                      audit, feature brainstorm and ranking, creative concepts, screenshots
BACKEND_SCOPE.md           endpoints, models, auth, integrations, phases
PITCH.md                   the five-line pitch
```

## Design notes

- **Type**: Archivo (variable width: condensed headlines, expanded labels), JetBrains Mono for ticket numbers and readouts, Noto Sans Ethiopic for Amharic. Loaded from Google Fonts with `display=swap`.
- **Colour**: Ink `#0A0C10`, Bone `#F2EEE6`, Signal Red `#E2342D`, Volt Blue `#2F6BFF → #5CE1FF`.
- **Photos**: the client's existing photos are used with a duotone + grain treatment so lower-quality images still read as premium; hover or focus reveals the original colour.
- **Hero**: the car silhouette draws itself, a sweep paints it, and the line continues off the right edge; scrolling rolls the car along it. With `prefers-reduced-motion` the final state is shown immediately.
- **Performance**: no hero video; the home page ships about 135 KB of gzipped JavaScript and 10 KB of CSS; the tools load on demand; images are lazy; the map loads only on request.
- **Accessibility**: semantic landmarks, skip link, keyboard-operable car zones and compare slider, visible focus, labelled form fields, `aria-current` on process steps.
- **Honesty**: anything not verifiable on the current site is rendered with the `Placeholder` component as `[… — TO CONFIRM]` (founding year, 500k customers, working hours, Telegram handle, boat photos, turnaround times).

## Deployment

`vercel.json` builds with Vite and rewrites every path to `index.html`, which the History-API router needs. Any static host works as long as it rewrites unknown paths to `index.html`.

## Housekeeping

- `public/` still contains unused media from the previous build (`herosection*.mp4`, `videos/`, `hero-frame.jpg`, `about_us.jpg`); they are not referenced and can be deleted to shrink deployments.
- `package.json` still lists `@google/genai`, `express`, `dotenv` and `tsx` from the original scaffold; nothing imports them.
- Working rules for contributors (including AI assistants) are in `CLAUDE.md`.
