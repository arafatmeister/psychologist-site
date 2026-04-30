import { Suspense } from 'react';
import { PageLoader } from '../components/ui/PageLoader';
import { SanityContentProvider } from '../lib/SanityContentProvider';
import { ErrorBoundary } from './ErrorBoundary';
import { Router } from './Router';

export function AppRoot() {
  return (
    <ErrorBoundary>
      <SanityContentProvider>
        <Suspense fallback={<PageLoader />}>
          <Router />
        </Suspense>
      </SanityContentProvider>
    </ErrorBoundary>
  );
}
