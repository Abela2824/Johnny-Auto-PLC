import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Tiny path router (no dependency). Uses the History API so URLs are real
 * (/book, /track?t=JA-24117). vercel.json already rewrites every path to
 * index.html; the Vite dev server does the same.
 */
export interface Route {
  path: string;
  params: Record<string, string>;
  query: URLSearchParams;
  hash: string;
}

const RouteCtx = createContext<Route>({ path: '/', params: {}, query: new URLSearchParams(), hash: '' });

function read(): Route {
  const { pathname, search, hash } = window.location;
  return { path: pathname.replace(/\/+$/, '') || '/', params: {}, query: new URLSearchParams(search), hash };
}

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  const url = new URL(to, window.location.origin);
  if (opts.replace) window.history.replaceState({}, '', url);
  else window.history.pushState({}, '', url);
  window.dispatchEvent(new Event('ja:navigate'));
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = useState<Route>(() => read());
  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('popstate', onChange);
    window.addEventListener('ja:navigate', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('ja:navigate', onChange);
    };
  }, []);

  // Scroll management: new path → top; hash → element.
  useEffect(() => {
    if (route.hash) {
      const el = document.getElementById(route.hash.slice(1));
      if (el) {
        // Wait a frame so the page has rendered.
        requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [route.path, route.hash]);

  return <RouteCtx.Provider value={route}>{children}</RouteCtx.Provider>;
}

export function useRoute() {
  return useContext(RouteCtx);
}

/** Match a pattern like "/notes/:slug" against the current path. */
export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const a = pattern.split('/').filter(Boolean);
  const b = path.split('/').filter(Boolean);
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, onClick, target, children, ...rest }, ref) {
  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === '_blank') return;
    if (/^(https?:|mailto:|tel:)/.test(to)) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a ref={ref} href={to} onClick={handle} target={target} {...rest}>
      {children}
    </a>
  );
});

export function useQueryParam(name: string) {
  const r = useRoute();
  return useMemo(() => r.query.get(name), [r, name]);
}
