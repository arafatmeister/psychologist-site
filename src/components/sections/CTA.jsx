import { useTranslation } from 'react-i18next';
import { SITE } from '../../config/site';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="bg-zinc-900 py-16 text-white">
      <Container className="text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">{t('sections.cta.title')}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-300">{t('sections.cta.subtitle')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button as="a" href="#contact" variant="light">
            {t('hero.cta.book')}
          </Button>
          <Button
            as="a"
            href={SITE.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlineLight"
          >
            {SITE.telegramHandle}
          </Button>
        </div>
      </Container>
    </section>
  );
}
