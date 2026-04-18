import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { logger } from '../lib/logger';

class ErrorBoundaryBase extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('error-boundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="text-3xl text-ink-900">{t('errorBoundary.title')}</h1>
          <button
            type="button"
            className="mt-6 min-h-12 rounded-full bg-ink-900 px-5 py-3 text-paper"
            onClick={() => window.location.reload()}
          >
            {t('errorBoundary.reload')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryBase);
