import { useTranslation } from 'react-i18next';

export function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex min-h-40 max-w-6xl items-center justify-center px-6 py-12">
      <span className="text-sm text-zinc-500">{t('common.loading')}</span>
    </div>
  );
}
