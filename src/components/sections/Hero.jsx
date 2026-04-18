import { useTranslation } from 'react-i18next';
import { SITE } from '../../config/site';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="py-12 md:py-20">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-4 space-y-1 text-xs uppercase tracking-wide text-zinc-500">
            <p>{t('hero.kicker')}</p>
            <p>{t('hero.kickerMeta')}</p>
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-zinc-900 md:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg text-zinc-600">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#contact">
              {t('hero.cta.book')}
            </Button>
            <Button
              as="a"
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              {t('hero.cta.free')}
            </Button>
          </div>
          <p className="mt-4 text-sm text-zinc-500">{t('hero.note')}</p>
        </div>
        <picture>
          <source srcSet="/yaroslav.avif" type="image/avif" />
          <source srcSet="/yaroslav.webp" type="image/webp" />
          <img
            src="/yaroslav.jpg"
            alt={t('hero.photoAlt')}
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl border border-zinc-200 object-cover"
          />
        </picture>
      </Container>
    </section>
  );
}
