import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';
import { useSanityContent } from '../../lib/sanityContentContext';

export function WhyTrustMe() {
  const { homePage } = useSanityContent();
  const { ref, inView } = useInView();

  if (!homePage) return null;
  const facts = homePage.trustFacts || [];

  return (
    <section
      ref={ref}
      className={`bg-paper py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{homePage.trustEyebrow}</Eyebrow>
        <h2 className="mt-4 text-center text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {homePage.trustTitle}
        </h2>

        <blockquote className="pullquote mx-auto mt-12 max-w-[52ch] text-center md:mt-16">
          <p className="italic-display text-xl leading-[1.45] text-ink-800 md:text-2xl md:leading-[1.4]">
            «{homePage.trustQuote}»
          </p>
          <footer className="mt-6 text-sm not-italic text-ink-500">
            — {homePage.trustQuoteAuthor}
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
