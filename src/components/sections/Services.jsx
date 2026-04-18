import { useTranslation } from 'react-i18next';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';

export function Services() {
  const { t } = useTranslation();
  const services = t('sections.services.items', { returnObjects: true });

  return (
    <section id="services" className="py-14">
      <Container>
        <h2 className="text-3xl font-semibold text-zinc-900">{t('sections.services.title')}</h2>
        <p className="mt-3 text-zinc-600">{t('sections.services.subtitle')}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="text-xl font-semibold text-zinc-900">{service.title}</h3>
              <p className="mt-2 text-zinc-600">{service.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
