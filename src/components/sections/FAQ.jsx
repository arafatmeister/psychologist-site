import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Chevron } from '../ui/Chevron';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';

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
        <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{t('sections.faq.title')}</h2>

        <div className="mt-12">
          {faqItems.map((item) => (
            <details key={item.question} className="group border-t border-ink-200 py-6">
              <summary className="flex list-none cursor-pointer items-baseline justify-between gap-6">
                <span className="text-xl font-sans font-medium text-ink-900">{item.question}</span>
                <Chevron className="mt-1 shrink-0 text-ink-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-4 max-w-[60ch] font-serif text-lg leading-[1.6] text-ink-700">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
