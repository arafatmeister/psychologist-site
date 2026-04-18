import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { Container } from '../layout/Container';
import { Card } from '../ui/Card';

export function Blog() {
  const { t } = useTranslation();
  const posts = t('sections.blog.items', { returnObjects: true });

  return (
    <section className="py-14">
      <Container>
        <h2 className="text-3xl font-semibold text-zinc-900">{t('sections.blog.title')}</h2>
        <p className="mt-3 text-zinc-600">{t('sections.blog.subtitle')}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug}>
              <h3 className="text-xl font-semibold text-zinc-900">{post.title}</h3>
              <p className="mt-2 text-zinc-600">{post.excerpt}</p>
              <Link
                className="mt-4 inline-block text-sm font-medium text-zinc-900 underline"
                to={`${ROUTES.blog}#${post.slug}`}
              >
                {t('common.readMore')}
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
