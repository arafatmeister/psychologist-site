import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';

export function WhyTrustMe() {
  const { t } = useTranslation();
  const items = t('sections.trust.items', { returnObjects: true });

  return (
    <section className="bg-white py-14">
      <Container>
        <h2 className="text-3xl font-semibold text-zinc-900">{t('sections.trust.title')}</h2>
        <p className="mt-3 text-zinc-600">{t('sections.trust.subtitle')}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item} as="div" className="bg-zinc-50">
              <p className="text-zinc-800">{item}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
