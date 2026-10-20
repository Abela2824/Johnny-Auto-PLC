/**
 * Facts about the company. Everything here is taken from johnnyautoplc.com
 * (checked 20 Oct 2026) or from the client brief. Anything we could not
 * verify is marked `tbc: true` and rendered as a visible placeholder.
 */
import type { ServiceId, StageId } from '../api/types';

export const COMPANY = {
  short: 'Johnny Auto',
  legal: 'Johnny General Auto Car Maintenance & Assembly P.L.C.',
  acronym: 'JGACMA',
  amharicLegal: 'ጆኒ ጀነራል አውቶ የመኪና መጠገኛ እና መገጣጠሚያ ኃ/የተ/የግ/ማህበር',
  address: {
    line1: 'Near the Ethiopian Standards Authority',
    district: 'Megenagna',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    amharic: 'መገናኛ፣ አዲስ አበባ',
    /** Approximate; confirm with the client before launch. */
    lat: 9.0107,
    lng: 38.808,
    tbc: true,
  },
  phones: [
    { display: '+251 11 646 3573', e164: '+251116463573' },
    { display: '+251 93 096 9696', e164: '+251930969696' },
    { display: '+251 91 171 7197', e164: '+251911717197' },
  ],
  whatsapp: { display: '+251 94 429 4429', e164: '+251944294429' },
  /** Telegram: assumed to be the same number as WhatsApp. Confirm handle with the client. */
  telegram: { href: 'https://t.me/+251944294429', tbc: true },
  emails: ['info@johnnyautoplc.com', 'johnnygeneralautoplc@yahoo.com'],
  /** The live site lists no working hours. Demo slots assume 08:00–17:00 Mon–Sat. */
  hours: { tbc: true, demo: { open: '08:00', close: '17:00', days: [1, 2, 3, 4, 5, 6] } },
  mapsSearch: 'https://www.google.com/maps/search/?api=1&query=Johnny+General+Auto+Megenagna+Addis+Ababa',
  site: 'https://johnnyautoplc.com/',
};

export const STATS = [
  { id: 'years', value: 25, suffix: '+', labelKey: 'stats.years', tbc: true, noteKey: 'stats.years.note' },
  { id: 'staff', value: 100, suffix: '+', labelKey: 'stats.staff', tbc: false },
  { id: 'area', value: 2000, suffix: ' m²', labelKey: 'stats.area', tbc: false },
  { id: 'customers', value: 500, suffix: 'k+', labelKey: 'stats.customers', tbc: true, noteKey: 'stats.customers.note' },
] as const;

export interface Service {
  id: ServiceId;
  name: string;
  nameAm: string;
  short: string;
  long: string;
  points: string[];
  image: string;
  zone: string;
}

export const SERVICES: Service[] = [
  {
    id: 'body',
    name: 'Collision & body repair',
    nameAm: 'የመኪና አካል ጥገና',
    short: 'Panels, frames and dents, from a scraped door to a full rebuild.',
    long: 'The core of the shop. Panel beating, chassis and frame straightening, door and wing replacement, bumper and quarter-panel rebuilding, and the structural checks that make a repaired car safe again.',
    points: ['Chassis and frame straightening', 'Panel beating and replacement', 'Doors, wings, bonnets, tailgates', 'Structural safety checks'],
    image: '/images/johnny-auto1.jpg',
    zone: 'Doors, wings, quarters',
  },
  {
    id: 'paint',
    name: 'Paint · Nova Verta booth',
    nameAm: 'ቀለም ቅብ',
    short: 'Italian downdraft spray booth with Total Control Technology. Dust-free, baked finish.',
    long: 'An Italian Nova Verta booth with Total Control Technology: pressure-controlled, filtered airflow and a baking cycle that cures a whole car in hours instead of days. PPG refinish products are used in the shop.',
    points: ['Nova Verta downdraft booth', 'Spot repair to full respray', 'Baked clear coat', 'PPG refinish systems'],
    image: '/images/johnny-auto28.jpg',
    zone: 'Roof, bonnet, boot',
  },
  {
    id: 'diagnostics',
    name: 'Electronic diagnostics',
    nameAm: 'የኮምፒውተር ምርመራ',
    short: 'Computerised fault finding before anything is replaced.',
    long: 'Electronic diagnostic systems read the car’s control units so the fault is found first and the part is replaced second. Faster, cheaper, and the basis of the written report you get at handover.',
    points: ['Engine and transmission codes', 'ABS, airbag and body modules', 'Electrical fault tracing', 'Written diagnostic report'],
    image: '/images/Latest-technology.jpg',
    zone: 'Engine bay, dashboard',
  },
  {
    id: 'mechanical',
    name: 'Mechanical & maintenance',
    nameAm: 'መካኒካል ጥገና',
    short: 'Oil changes to engine overhauls, suspension, brakes and gearboxes.',
    long: 'Routine servicing and heavier mechanical work on the same floor as the body shop, so a collision repair and an engine problem are handled on one ticket.',
    points: ['Scheduled servicing', 'Engine overhaul', 'Suspension, brakes, steering', 'Gearbox and drivetrain'],
    image: '/images/johnny-auto17.jpg',
    zone: 'Underside, wheels',
  },
  {
    id: 'fiberglass',
    name: 'Fibreglass repair & construction',
    nameAm: 'ፋይበር ግላስ',
    short: 'A dedicated composites department. Bumpers, body kits, canopies, and boats.',
    long: 'A dedicated fibreglass department repairs cracked bumpers and panels, builds custom composite parts, and repairs fibreglass boats: hulls, floors, stringers and transoms, with colour-matched finishing.',
    points: ['Bumpers and body kits', 'Canopies and commercial bodies', 'Boat hull, floor and transom repair', 'Custom moulding'],
    image: '/images/fiberglass-repair.jpg',
    zone: 'Bumpers, trims',
  },
  {
    id: 'end-to-end',
    name: 'End-to-end service',
    nameAm: 'ሙሉ አገልግሎት',
    short: 'Towing, key programming, alarms and fleet care. One ticket from recovery to handover.',
    long: 'One-stop-shop: our own tow truck brings the car in, the same ticket follows it through diagnosis, body, paint and QC, and you collect a finished car. Key programming, alarm fitting and fleet agreements included.',
    points: ['Tow truck and recovery', 'Key programming', 'Alarm and security fitting', 'Fleet agreements'],
    image: '/images/johnny-auto46.jpg',
    zone: 'Whole car, tow hook',
  },
];

export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s])) as Record<ServiceId, Service>;

export interface Stage {
  id: StageId;
  n: number;
  name: string;
  nameAm: string;
  what: string;
  get: string;
}

export const STAGES: Stage[] = [
  { id: 'intake', n: 1, name: 'Intake', nameAm: 'መቀበያ', what: 'Walk-around with you, photos of every panel, ticket opened, keys tagged.', get: 'Ticket number by SMS or Telegram, photos on your tracker.' },
  { id: 'diagnosis', n: 2, name: 'Diagnosis', nameAm: 'ምርመራ', what: 'Electronic scan, structural inspection, written estimate and parts list.', get: 'Estimate to approve before work starts.' },
  { id: 'body', n: 3, name: 'Body', nameAm: 'አካል', what: 'Frame straightening, panel beating, replacement panels, fibreglass work.', get: 'Progress photo when the metalwork is done.' },
  { id: 'paint', n: 4, name: 'Paint booth', nameAm: 'ቀለም', what: 'Prep, primer, colour and clear coat in the Nova Verta booth, then baked.', get: 'Photo out of the booth.' },
  { id: 'qc', n: 5, name: 'Quality check', nameAm: 'የጥራት ቁጥጥር', what: 'Panel gaps, paint finish, electronics re-scan, road test, wash.', get: 'Vehicle health report.' },
  { id: 'ready', n: 6, name: 'Handover', nameAm: 'ርክክብ', what: 'Walk-around with you, warranty note, keys back.', get: 'Ready message with pickup time and your invoice.' },
];

export const STAGE_INDEX = Object.fromEntries(STAGES.map((s) => [s.id, s.n - 1])) as Record<StageId, number>;

export const FUTURE = {
  name: 'Electric-vehicle assembly plant',
  status: 'Planned',
  statusNote: 'The current site says “under evaluation” in one place and describes a planned site in another. Confirm wording.',
  location: 'Gelan Town, Oromia Special Zone surrounding Finfinne',
  area: '5,000 m²',
  capacity: '780 – 1,000 SKD units / year',
  method: 'Semi-knocked-down (SKD) kits assembled locally',
  image: '/images/Gelan-Plant-electric.jpg',
};

export const PARTNERS = [
  { id: 'ppg', name: 'PPG', role: 'Refinish paint systems', logo: '/partners/ppg.png', tbc: false },
  { id: 'nova-verta', name: 'Nova Verta', role: 'Spray booth', logo: '/partners/nova-verta.png', tbc: false },
  { id: 'yamaha', name: 'Yamaha', role: 'Marine — to confirm', logo: '/partners/yamaha.png', tbc: true },
  { id: 'honda-marine', name: 'Honda Marine', role: 'Marine — to confirm', logo: '/partners/honda-marine.png', tbc: true },
  { id: 'trane', name: 'Trane', role: 'Climate — to confirm', logo: '/partners/trane.png', tbc: true },
];

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  cat: 'Paint' | 'Body' | 'Facility' | 'Team' | 'Handover' | 'Commercial' | 'Mechanical';
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: 'booth', src: '/images/johnny-auto28.jpg', alt: 'Nova Verta spray booth on the workshop floor', caption: 'Nova Verta downdraft booth', cat: 'Paint' },
  { id: 'booth-in', src: '/images/Nova-verta-room.jpg', alt: 'Inside the Nova Verta booth', caption: 'Inside the booth', cat: 'Paint', tall: true },
  { id: 'patrol-colour', src: '/images/johnny-auto24.jpg', alt: 'Nissan Patrol in fresh blue paint being masked', caption: 'Patrol, colour coat', cat: 'Paint' },
  { id: 'patrol-primer', src: '/images/johnny-auto1.jpg', alt: 'Nissan Patrol in grey primer with wing removed', caption: 'Patrol, primer stage', cat: 'Body' },
  { id: 'limo', src: '/images/johnny-auto40.jpg', alt: 'Stretched limousine in prep in front of the booth', caption: 'Limousine in prep', cat: 'Body' },
  { id: 'strip', src: '/images/johnny-auto44.jpg', alt: 'Cars stripped for body repair in the hall', caption: 'Stripped for repair', cat: 'Body' },
  { id: 'tanker', src: '/images/johnny-auto41.jpg', alt: 'Tanker trailer masked for paint', caption: 'Tanker trailer', cat: 'Commercial' },
  { id: 'team', src: '/images/johnny-auto6.jpg', alt: 'Johnny Auto team photo, May 2020', caption: 'The team, May 2020', cat: 'Team' },
  { id: 'yard', src: '/images/johnny-auto20.jpg', alt: 'Workshop yard with Nissan Patrol and Toyota Hilux', caption: 'Yard, Megenagna', cat: 'Facility' },
  { id: 'classics', src: '/hero-poster.webp', alt: 'Classic cars under the workshop roof', caption: 'Under the roof', cat: 'Facility' },
  { id: 'handover', src: '/images/johnny-auto31.jpg', alt: 'Finished Range Rover and Land Cruiser', caption: 'Ready for handover', cat: 'Handover' },
  { id: 'lift', src: '/images/johnny-auto17.jpg', alt: 'Range Rover on a lift', caption: 'On the lift', cat: 'Mechanical' },
  { id: 'van', src: '/images/johnny-auto46.jpg', alt: 'Johnny Auto service van', caption: 'Service van', cat: 'Facility' },
  { id: 'office', src: '/images/johnny-auto2.jpg', alt: 'Front office', caption: 'Front office', cat: 'Facility' },
  { id: 'tow', src: '/images/johnny-auto3.jpg', alt: 'Johnny Auto tow truck', caption: 'Tow truck', cat: 'Facility' },
  { id: 'fibre', src: '/images/fiberglass-repair.jpg', alt: 'Technician working in the booth', caption: 'In the booth', cat: 'Paint', tall: true },
];

export const COMPARE_PAIRS = [
  {
    id: 'patrol',
    title: 'Nissan Patrol — primer to colour',
    note: 'Two stages of the same model from the current site. Replace with a true before/after set.',
    before: { src: '/images/johnny-auto1.jpg', label: 'Primer' },
    after: { src: '/images/johnny-auto24.jpg', label: 'Colour coat' },
  },
];

// Workshop Notes live in ./notes.ts

export const DAMAGE_ZONES: { id: string; name: string; side?: 'L' | 'R'; depts: ServiceId[] }[] = [
  { id: 'front-bumper', name: 'Front bumper', depts: ['fiberglass', 'paint'] },
  { id: 'bonnet', name: 'Bonnet', depts: ['body', 'paint'] },
  { id: 'windscreen', name: 'Windscreen', depts: ['body'] },
  { id: 'roof', name: 'Roof', depts: ['body', 'paint'] },
  { id: 'rear-window', name: 'Rear window', depts: ['body'] },
  { id: 'boot', name: 'Boot / tailgate', depts: ['body', 'paint'] },
  { id: 'rear-bumper', name: 'Rear bumper', depts: ['fiberglass', 'paint'] },
  { id: 'l-front-wing', name: 'Front wing', side: 'L', depts: ['body', 'paint'] },
  { id: 'r-front-wing', name: 'Front wing', side: 'R', depts: ['body', 'paint'] },
  { id: 'l-front-door', name: 'Front door', side: 'L', depts: ['body', 'paint'] },
  { id: 'r-front-door', name: 'Front door', side: 'R', depts: ['body', 'paint'] },
  { id: 'l-rear-door', name: 'Rear door', side: 'L', depts: ['body', 'paint'] },
  { id: 'r-rear-door', name: 'Rear door', side: 'R', depts: ['body', 'paint'] },
  { id: 'l-rear-quarter', name: 'Rear quarter', side: 'L', depts: ['body', 'paint'] },
  { id: 'r-rear-quarter', name: 'Rear quarter', side: 'R', depts: ['body', 'paint'] },
  { id: 'headlights', name: 'Headlights', depts: ['body', 'diagnostics'] },
  { id: 'taillights', name: 'Tail lights', depts: ['body', 'diagnostics'] },
  { id: 'underside', name: 'Underside / mechanical', depts: ['mechanical', 'diagnostics'] },
];
