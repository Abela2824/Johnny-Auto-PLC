import type { ReactNode } from 'react';
import { Link } from '../lib/router';
import { ChevronLeft } from 'lucide-react';

export function PageHead({ eyebrow, title, lead, right }: { eyebrow: string; title: ReactNode; lead?: ReactNode; right?: ReactNode }) {
  return (
    <div className="border-b border-white/10 bg-ink-2">
      <div className="wrap pt-24 lg:pt-32 pb-8 flex flex-col lg:flex-row lg:items-end gap-6">
        <div className="flex-1">
          <Link to="/" className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-mist hover:text-bone"><ChevronLeft className="w-3.5 h-3.5" /> Johnny Auto</Link>
          <span className="eyebrow block mt-4">{eyebrow}</span>
          <h1 className="mt-3 font-display font-extrabold wdth-75 text-4xl sm:text-5xl lg:text-6xl leading-[0.98]">{title}</h1>
          {lead && <p className="mt-4 max-w-2xl text-mist-2 leading-relaxed">{lead}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}
