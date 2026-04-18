import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Container } from '../layout/Container';
import { useInView } from '../../lib/useInView';

export function CTA() {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={`on-dark bg-ink-800 py-20 text-paper md:py-28 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container className="text-center md:max-w-[780px]">
        <Eyebrow className="text-ink-300">{t('sections.cta.eyebrow')}</Eyebrow>
        <p className="mt-8 italic-display text-xl leading-[1.45] md:text-2xl md:leading-[1.4]">
          «{t('sections.cta.body')}»
        </p>
        <div className="mt-12">
          <Button as="a" href="/#contact" variant="primary" invert className="px-10 py-4 text-base">
            {t('sections.cta.button')}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
