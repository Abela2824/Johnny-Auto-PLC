import { lazy, Suspense } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { I18nProvider } from './i18n';
import { RouterProvider, matchPath, useRoute } from './lib/router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBar } from './components/MobileBar';
import Home from './pages/Home';

// Service tools are code-split so the marketing page stays light.
const Book = lazy(() => import('./pages/Book'));
const Quote = lazy(() => import('./pages/Quote'));
const Track = lazy(() => import('./pages/Track'));
const Admin = lazy(() => import('./pages/Admin'));
const FleetPortal = lazy(() => import('./pages/FleetPortal'));
const NotesPage = lazy(() => import('./pages/NotesPage'));

function Fallback() {
  return (
    <div className="wrap py-32 text-mist font-mono text-sm" role="status" aria-live="polite">Loading…</div>
  );
}

function NotFound() {
  return (
    <div className="wrap py-32">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-display font-extrabold wdth-75 text-5xl">That page is not on the line.</h1>
      <p className="mt-4 text-mist-2"><a className="underline" href="/">Back to the workshop</a></p>
    </div>
  );
}

function Routes() {
  const r = useRoute();
  if (r.path === '/') return <Home />;
  if (r.path === '/book') return <Book />;
  if (r.path === '/quote') return <Quote />;
  if (r.path === '/track') return <Track />;
  if (r.path === '/admin') return <Admin />;
  if (r.path === '/fleet') return <FleetPortal />;
  if (r.path === '/notes') return <NotesPage />;
  const n = matchPath('/notes/:slug', r.path);
  if (n) return <NotesPage slug={n.slug} />;
  return <NotFound />;
}

function Shell() {
  const r = useRoute();
  const isHome = r.path === '/';
  return (
    <div className="min-h-screen flex flex-col bg-ink text-bone">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header transparent={isHome} />
      <main id="main" className="flex-1">
        <Suspense fallback={<Fallback />}>
          <Routes />
        </Suspense>
      </main>
      <Footer />
      <MobileBar />
      <div className="grain" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            <Shell />
          </MotionConfig>
        </LazyMotion>
      </RouterProvider>
    </I18nProvider>
  );
}
