import { useTranslation } from 'react-i18next';

export function PageLoader() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex min-h-40 max-w-[1180px] items-center justify-center px-6 py-12 md:px-10 lg:px-16">
      <span className="text-sm text-ink-500">{t('common.loading')}</span>
    </div>
  );
}
