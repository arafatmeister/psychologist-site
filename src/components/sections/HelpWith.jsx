import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { OrdinalNumber } from '../ui/OrdinalNumber';
import { useInView } from '../../lib/useInView';

export function HelpWith() {
  const { t } = useTranslation();
  const items = t('sections.helpWith.items', { returnObjects: true });
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={`bg-paper py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{`01 · ${t('sections.helpWith.eyebrow')}`}</Eyebrow>
        <h2 className="mt-4 max-w-[24ch] text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {t('sections.helpWith.title')}
        </h2>

        <ul className="mt-16 grid gap-x-16 gap-y-10 md:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.title} className="flex gap-6 border-t border-ink-200 py-8">
              <OrdinalNumber n={index + 1} />
              <div>
                <h3 className="text-xl font-normal leading-snug text-ink-900">{item.title}</h3>
                {item.desc ? <p className="mt-2 text-ink-500">{item.desc}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
