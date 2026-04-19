import { Trans, useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Chevron } from '../ui/Chevron';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';
import { RICH_COMPONENTS, RICH_VALUES } from '../../lib/richText';

export function FAQ() {
  const { t } = useTranslation();
  const faqItems = t('sections.faq.items', { returnObjects: true });
  const { ref, inView } = useInView();

  return (
    <section
      id="faq"
      ref={ref}
      className={`bg-paper-2 py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{t('sections.faq.eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {t('sections.faq.title')}
        </h2>

        <div className="mt-12">
          {faqItems.map((item, index) => (
            <details key={item.question} className="group border-t border-ink-200 py-6">
              <summary className="flex list-none cursor-pointer items-baseline justify-between gap-6">
                <span className="text-xl font-sans font-medium text-ink-900">{item.question}</span>
                <Chevron className="mt-1 shrink-0 text-ink-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 max-w-[60ch] font-serif text-lg leading-[1.6] text-ink-700">
                <Trans
                  i18nKey={`sections.faq.items.${index}.answer`}
                  values={RICH_VALUES}
                  components={RICH_COMPONENTS}
                />
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
