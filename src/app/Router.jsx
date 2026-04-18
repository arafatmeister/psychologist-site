import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CookieBanner } from '../components/CookieBanner';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { ROUTES } from '../config/routes';
import { HashScroll } from '../lib/HashScroll';
import { ScrollToTop } from '../lib/ScrollToTop';
import HomePage from '../pages/HomePage';

const BlogPage = lazy(() => import('../pages/BlogPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function AppRouterBody() {
  const { t } = useTranslation();

  return (
    <>
      <ScrollToTop />
      <HashScroll />
      <a
        href="#main"
        className="sr-only left-4 top-4 bg-ink-900 px-4 py-2 text-paper focus:not-sr-only focus:absolute"
      >
        {t('a11y.skipToMain')}
      </a>
      <div className="min-h-screen bg-paper text-ink-900">
        <Header />
        <main id="main" tabIndex={-1} className="pt-2 outline-none">
          <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.blog} element={<BlogPage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            <Route path={ROUTES.terms} element={<TermsPage />} />
            <Route path={ROUTES.notFound} element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </>
  );
}

export function Router() {
  return (
    <BrowserRouter>
      <AppRouterBody />
    </BrowserRouter>
  );
}
