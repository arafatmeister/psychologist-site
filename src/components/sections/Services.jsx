import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';
import { useSanityContent } from '../../lib/sanityContentContext';

export function Services() {
  const { homePage, services } = useSanityContent();
  const { ref, inView } = useInView();

  if (!homePage) return null;

  return (
    <section
      id="services"
      ref={ref}
      className={`bg-paper-2 py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{homePage.servicesEyebrow}</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {homePage.servicesTitle}
        </h2>
        <p className="mt-6 max-w-[60ch] text-ink-500">{homePage.servicesSubtitle}</p>

        <div className="mt-14 grid gap-x-16 gap-y-4 md:grid-cols-2">
          {services.map((item) => (
            <article key={item._id} className="border-t border-ink-200 pb-12 pt-8">
              <Eyebrow>{item.format}</Eyebrow>
              <h3 className="mt-3 text-2xl leading-snug">{item.title}</h3>
              <div className="mt-3 flex items-center gap-2 text-xs text-ink-500">
                <span className="inline-flex items-center rounded-full border border-ink-300 px-2.5 py-0.5">
                  {item.duration}
                </span>
                <span aria-hidden>·</span>
                <span>{item.mode}</span>
              </div>
              <p className="mt-5 text-ink-500">{item.desc}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
