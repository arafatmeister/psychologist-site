import { useTranslation } from 'react-i18next';
import { SITE } from '../config/site';
import { ROUTES } from '../config/routes';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';

export default function BlogPage() {
  const { t } = useTranslation();
  const posts = t('sections.blog.items', { returnObjects: true });

  return (
    <>
      <SEO
        path={ROUTES.blog}
        title={t('seo.blog.title', { name: SITE.name })}
        description={t('seo.blog.description')}
      />
      <StructuredData
        breadcrumbs={[
          { name: SITE.name, path: ROUTES.home },
          { name: t('sections.blog.title'), path: ROUTES.blog },
        ]}
      />
      <Container className="py-14">
        <h1 className="text-4xl font-semibold text-zinc-900">{t('sections.blog.title')}</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">{t('sections.blog.subtitle')}</p>

        <div className="mt-10 grid gap-4">
          {posts.map((post) => (
            <Card key={post.slug} as="article" id={post.slug}>
              <h2 className="text-2xl font-semibold text-zinc-900">{post.title}</h2>
              <p className="mt-3 text-zinc-600">{post.excerpt}</p>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
