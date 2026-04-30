import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Container } from '../layout/Container';
import { useInView } from '../../lib/useInView';
import { useSanityContent } from '../../lib/sanityContentContext';

export function Hero() {
  const { homePage } = useSanityContent();
  const { ref, inView } = useInView();

  if (!homePage) return null;

  return (
    <section
      ref={ref}
      className={`overflow-x-clip py-12 md:py-20 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <Eyebrow>{homePage.heroEyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-[16ch] text-[1.75rem] leading-[1.15] tracking-tight text-balance hyphens-none md:max-w-[20ch] md:text-3xl md:leading-[1.1] lg:max-w-[26ch] lg:text-4xl lg:leading-[1.05]">
            {homePage.heroTitleBefore}
            <em className="italic">{homePage.heroTitleEm}</em>
            {homePage.heroTitleAfter}
          </h1>

          <p className="mt-6 max-w-[52ch] text-lg text-ink-500 md:text-xl">
            {homePage.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button as="a" href="/#contact" variant="primary">
              {homePage.heroCtaBook}
            </Button>
            <a
              href="/#contact"
              className="group inline-flex items-baseline gap-2 text-ink-900 link-underline"
            >
              {homePage.heroCtaFree}
              <span aria-hidden className="transition group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {homePage.heroNote && (
            <p className="mt-5 font-serif text-base italic text-ink-500">
              {homePage.heroNote.split(/<br\s*\/?>/i).map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          )}
        </div>

        <figure className="min-w-0">
          <picture className="block">
            <source srcSet="/yaroslav.avif" type="image/avif" />
            <source srcSet="/yaroslav.webp" type="image/webp" />
            <img
              src="/yaroslav.jpg"
              alt={homePage.heroPhotoAlt || ''}
              width="800"
              height="1000"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="aspect-[4/5] w-full rounded-sm object-cover shadow-[0_40px_80px_-30px_rgba(10,10,10,0.35)] md:aspect-auto md:h-[440px]"
            />
          </picture>
          <figcaption className="mt-3 text-left text-xs uppercase tracking-widest text-ink-500">
            {homePage.heroPhotoCaption}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
