import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import './i18n';
import { SITE } from './config/site';
import { hasAnalyticsConsent } from './lib/consent';
import './index.css';
import { AppRoot } from './app/AppRoot';

function AnalyticsGate() {
  const [enabled, setEnabled] = useState(hasAnalyticsConsent());

  useEffect(() => {
    function onConsentChanged() {
      setEnabled(hasAnalyticsConsent());
    }

    window.addEventListener('consent:changed', onConsentChanged);
    return () => {
      window.removeEventListener('consent:changed', onConsentChanged);
    };
  }, []);

  if (!SITE.analytics.vercel || !enabled) return null;
  return <Analytics />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AppRoot />
      <AnalyticsGate />
    </HelmetProvider>
  </StrictMode>,
);
