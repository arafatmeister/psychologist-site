import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function Blog() {
  const { t, i18n } = useTranslation();
  const posts = t('sections.blog.items', { returnObjects: true });
  const { ref, inView } = useInView();

  if (!SITE.features?.blog) return null;

  return (
    <section
      ref={ref}
      className={`bg-paper py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{t('sections.blog.eyebrow')}</Eyebrow>
        <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{t('sections.blog.title')}</h2>
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

              <h3 className="mt-4 text-2xl leading-snug">
                <Link to={`/blog/${post.slug}`} className="hover:text-ink-700">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 text-ink-500">{post.teaser}</p>

              <Link
                to={`${ROUTES.blog}#${post.slug}`}
                className="mt-6 inline-flex items-baseline gap-2 text-sm link-underline"
              >
                {t('sections.blog.readMore')} <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
