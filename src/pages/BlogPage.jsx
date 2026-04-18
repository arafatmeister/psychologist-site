import { useTranslation } from 'react-i18next';
import { SITE } from '../config/site';
import { ROUTES } from '../config/routes';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export default function BlogPage() {
  const { t, i18n } = useTranslation();
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

      <Container className="py-20 md:py-28">
        <h1 className="text-5xl leading-tight md:text-6xl">{t('sections.blog.title')}</h1>
        <p className="mt-6 max-w-[60ch] text-ink-500">{t('sections.blog.subtitle')}</p>

        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3 md:divide-x md:divide-ink-200">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-t border-ink-200 pt-8 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-ink-500">
                <span>{post.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>
                  {formatDate(post.date, i18n.resolvedLanguage || 'uk')}
                </time>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 id={post.slug} className="mt-4 text-2xl leading-snug">
                {post.title}
              </h2>
              <p className="mt-3 text-ink-500">{post.teaser}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
