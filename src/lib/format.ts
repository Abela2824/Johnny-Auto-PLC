export const pad = (n: number) => String(n).padStart(2, '0');

export function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function relTime(iso: string, now = Date.now()): string {
  const diff = now - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (Math.abs(m) < 60) return m <= 0 ? 'just now' : `${m} min ago`;
  const h = Math.round(m / 60);
  if (Math.abs(h) < 24) return h <= 0 ? `in ${-h} h` : `${h} h ago`;
  const d = Math.round(h / 24);
  return d <= 0 ? `in ${-d} d` : `${d} d ago`;
}

export function fmtDate(iso: string, lang: 'en' | 'am' = 'en') {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function fmtDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function telHref(display: string) {
  return `tel:${display.replace(/[^+\d]/g, '')}`;
}

export function waHref(number: string, text?: string) {
  const n = number.replace(/[^\d]/g, '');
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export function uid(prefix: string) {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${n}`;
}

export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ');
}
