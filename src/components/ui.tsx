import React from 'react';
import { m } from 'motion/react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Link } from '../lib/router';
import { classNames as cx } from '../lib/format';

/* ----- Button ------------------------------------------------------------ */

type Variant = 'red' | 'volt' | 'bone' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  red: 'bg-red text-white hover:bg-red-2 border-transparent',
  volt: 'bg-volt text-white hover:bg-volt-3 border-transparent',
  bone: 'bg-bone text-ink hover:bg-bone-2 border-transparent',
  ghost: 'bg-transparent text-bone hover:bg-white/5 border-transparent',
  outline: 'bg-transparent text-bone border-white/20 hover:border-white/50',
};
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-6 text-base gap-2.5',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  arrow?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}

export function Button({ variant = 'red', size = 'md', to, href, arrow, loading, icon, className, children, target, rel, type, ...rest }: ButtonProps) {
  const cls = cx(
    'inline-flex items-center justify-center font-semibold tracking-tight border rounded-sm transition-[background,border-color,transform] duration-200 active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap',
    variants[variant], sizes[size], className,
  );
  const body = (
    <>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> : icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="w-4 h-4" aria-hidden />}
    </>
  );
  if (to) return <Link to={to} className={cls} target={target} rel={rel}>{body}</Link>;
  if (href) return <a href={href} className={cls} target={target} rel={rel}>{body}</a>;
  return <button type={type ?? 'button'} className={cls} disabled={loading || rest.disabled} {...rest}>{body}</button>;
}

/* ----- Section header ---------------------------------------------------- */

export function SectionHead({ eyebrow, title, lead, light, className, id }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode; light?: boolean; className?: string; id?: string }) {
  return (
    <div className={cx('max-w-3xl', className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className={cx('mt-4 font-display font-extrabold wdth-75 text-[2.25rem] leading-[0.98] sm:text-5xl lg:text-6xl', light ? 'text-ink' : 'text-bone')}>{title}</h2>
      {lead && <p className={cx('mt-5 text-lg leading-relaxed max-w-2xl', light ? 'text-steel' : 'text-mist-2')}>{lead}</p>}
    </div>
  );
}

/* ----- Reveal (motion) --------------------------------------------------- */

export function Reveal({ children, delay = 0, className, y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

/* ----- Forms ------------------------------------------------------------- */

export const inputCls = 'w-full h-11 px-3.5 rounded-sm bg-white/[.04] border border-white/15 text-bone placeholder:text-mist/60 focus:border-volt-2 focus:bg-white/[.06] transition-colors';
export const textareaCls = 'w-full min-h-28 p-3.5 rounded-sm bg-white/[.04] border border-white/15 text-bone placeholder:text-mist/60 focus:border-volt-2 transition-colors';
export const selectCls = inputCls + ' appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%239AA3B2%27 stroke-width=%272.5%27><path d=%27m6 9 6 6 6-6%27/></svg>")] bg-no-repeat bg-[right_.9rem_center] pr-9';

export function Field({ label, hint, required, children, className }: { label: string; hint?: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={cx('block', className)}>
      <span className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-semibold text-bone">{label}{required && <span className="text-red ml-1" aria-hidden>*</span>}</span>
        {hint && <span className="text-xs text-mist">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function Chip({ active, onClick, children, className, icon, as = 'button' }: { active?: boolean; onClick?: () => void; children: React.ReactNode; className?: string; icon?: React.ReactNode; as?: 'button' | 'span' }) {
  const cls = cx(
    'inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap',
    active ? 'bg-bone text-ink border-bone' : 'bg-transparent text-mist-2 border-white/15 hover:border-white/40 hover:text-bone',
    className,
  );
  if (as === 'span') return <span className={cls}>{icon}{children}</span>;
  return <button type="button" onClick={onClick} aria-pressed={active} className={cls}>{icon}{children}</button>;
}

/** Visible placeholder for content the client still has to supply. */
export function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cx('inline-flex items-center rounded-sm border border-dashed border-warn/60 bg-warn/5 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-warn', className)}>
      [{label}]
    </span>
  );
}

export function Notice({ tone = 'info', children, className }: { tone?: 'info' | 'warn' | 'ok'; children: React.ReactNode; className?: string }) {
  const tones = { info: 'border-volt/40 bg-volt/10 text-mist-2', warn: 'border-warn/40 bg-warn/10 text-bone', ok: 'border-ok/40 bg-ok/10 text-bone' };
  return <div className={cx('rounded-sm border px-4 py-3 text-sm leading-relaxed', tones[tone], className)}>{children}</div>;
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto no-scrollbar" aria-label="Progress">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2 shrink-0" aria-current={active ? 'step' : undefined}>
            <span className={cx('w-7 h-7 rounded-full grid place-items-center font-mono text-xs border', done ? 'bg-red border-red text-white' : active ? 'border-bone text-bone' : 'border-white/20 text-mist')}>
              {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </span>
            <span className={cx('text-sm', active ? 'text-bone font-semibold' : 'text-mist')}>{s}</span>
            {i < steps.length - 1 && <span className={cx('w-6 h-px', done ? 'bg-red' : 'bg-white/15')} aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}

export function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cx('font-mono text-[0.8em] tracking-wide', className)}>{children}</span>;
}

export function Card({ children, className, as: Tag = 'div' }: { children: React.ReactNode; className?: string; as?: 'div' | 'li' | 'article' | 'section' }) {
  return <Tag className={cx('rounded-sm border border-white/10 bg-white/[.03]', className)}>{children}</Tag>;
}

export function StatusDot({ tone }: { tone: 'ok' | 'warn' | 'red' | 'volt' | 'mist' }) {
  const c = { ok: 'bg-ok', warn: 'bg-warn', red: 'bg-red', volt: 'bg-volt-2', mist: 'bg-mist' }[tone];
  return <span className={cx('inline-block w-2 h-2 rounded-full', c)} aria-hidden />;
}
