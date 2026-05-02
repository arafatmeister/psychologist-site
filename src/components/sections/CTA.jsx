import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Container } from '../layout/Container';
import { useInView } from '../../lib/useInView';
import { useSanityContent } from '../../lib/sanityContentContext';
import { CTASkeleton } from '../ui/SectionSkeleton';
import { SITE } from '../../config/site';

export function CTA() {
  const { homePage } = useSanityContent();
  const { ref, inView } = useInView();

  if (!homePage) return <CTASkeleton />;

  return (
    <section
      ref={ref}
      className={`on-dark bg-ink-800 py-20 text-paper md:py-28 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container className="text-center md:max-w-[780px]">
        <Eyebrow className="text-paper-3">{homePage.ctaEyebrow}</Eyebrow>
        <p className="mt-8 italic-display text-xl leading-[1.45] text-paper md:text-2xl md:leading-[1.4]">
          «{homePage.ctaBody}»
        </p>
        <div className="mt-12">
          <Button
            as="a"
            href={SITE.booking.session}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            invert
            className="px-10 py-4 text-base"
          >
            {homePage.ctaButton}
            <span aria-hidden className="ml-2">
              →
            </span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
