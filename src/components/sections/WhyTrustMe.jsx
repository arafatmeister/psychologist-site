import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';

export function WhyTrustMe() {
  const { t } = useTranslation();
  const facts = t('sections.trust.facts', { returnObjects: true });
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={`bg-paper py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{t('sections.trust.eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-center text-4xl leading-tight md:text-5xl">
          {t('sections.trust.title')}
        </h2>

        <blockquote className="pullquote mx-auto mt-12 max-w-[52ch] text-center md:mt-16">
          {/* TODO: replace with real testimonial after collecting consent */}
          <p className="italic-display text-xl leading-[1.45] text-ink-800 md:text-2xl md:leading-[1.4]">
            «{t('sections.trust.quote')}»
          </p>
          <footer className="mt-6 text-sm not-italic text-ink-500">
            — {t('sections.trust.quoteAuthor')}
          </footer>
        </blockquote>

        <dl className="mt-20 grid grid-cols-1 text-center md:grid-cols-3 md:divide-x md:divide-ink-300">
          {facts.map((fact) => (
            <div key={fact.label} className="px-8 py-6">
              <dt className='text-4xl text-ink-900 [font-feature-settings:"lnum","tnum"]'>
                {fact.value}
              </dt>
              <dd className="mt-2 text-sm uppercase tracking-widest text-ink-500">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
