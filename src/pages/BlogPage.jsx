import { useTranslation } from 'react-i18next';
import { SITE } from '../config/site';
import { ROUTES } from '../config/routes';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';
import { formatDate } from '../lib/formatDate';
import { useSanityContent } from '../lib/sanityContentContext';

const SHORT_DATE = { year: 'numeric', month: 'short', day: 'numeric' };

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const { homePage, posts } = useSanityContent();
  const lang = i18n.resolvedLanguage || 'uk';

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
          { name: homePage?.blogTitle || '', path: ROUTES.blog },
        ]}
      />

      <Container className="pt-12 md:pt-20 pb-20 md:pb-28">
        <h1 className="text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {homePage?.blogTitle}
        </h1>
        {homePage?.blogSubtitle && (
          <p className="mt-6 max-w-[60ch] text-ink-500">{homePage.blogSubtitle}</p>
        )}

        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3 md:divide-x md:divide-ink-200">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-t border-ink-200 pt-8 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-ink-500">
                {post.category && <span>{post.category}</span>}
                {post.category && <span aria-hidden>·</span>}
                <time dateTime={post.date}>{formatDate(post.date, lang, SHORT_DATE)}</time>
                {post.readTime && <span aria-hidden>·</span>}
                {post.readTime && <span>{post.readTime}</span>}
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
