import { useTranslation } from 'react-i18next';
import { useSanityContent } from '../../lib/sanityContentContext';

export function SanityErrorBanner() {
  const { error, homePage } = useSanityContent();
  const { t } = useTranslation();

  if (!error || homePage) return null;

  return (
    <div
      role="alert"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-sm border border-ink-300 bg-paper p-4 text-sm text-ink-800 shadow-lg"
    >
      <p className="font-medium">{t('errorBoundary.title')}</p>
      <p className="mt-1 text-ink-500">
        {t('common.loading')} — {String(error.message || error)}
      </p>
    </div>
  );
}
