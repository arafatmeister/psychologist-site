import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';

export function FAQ() {
  const { t } = useTranslation();
  const faqItems = t('sections.faq.items', { returnObjects: true });

  return (
    <section id="faq" className="bg-white py-14">
      <Container>
        <h2 className="mb-8 text-3xl font-semibold text-zinc-900">{t('sections.faq.title')}</h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-5 py-4"
            >
              <summary className="cursor-pointer text-lg font-medium text-zinc-900">
                {item.question}
              </summary>
              <p className="mt-3 text-zinc-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
