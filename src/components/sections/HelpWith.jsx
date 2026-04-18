import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';

export function HelpWith() {
  const { t } = useTranslation();
  const items = t('sections.helpWith.items', { returnObjects: true });

  return (
    <section className="bg-white py-14">
      <Container>
        <h2 className="mb-8 text-3xl font-semibold text-zinc-900">
          {t('sections.helpWith.title')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item} as="div" className="bg-stone-50">
              <p className="text-zinc-800">{item}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
