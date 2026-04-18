import { Suspense } from 'react';
import { PageLoader } from '../components/ui/PageLoader';
import { ErrorBoundary } from './ErrorBoundary';
import { Router } from './Router';

export function AppRoot() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Router />
      </Suspense>
    </ErrorBoundary>
  );
}
