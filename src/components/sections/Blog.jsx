import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/routes';
import { SITE } from '../../config/site';
import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { useInView } from '../../lib/useInView';
import { formatDate } from '../../lib/formatDate';
import { useSanityContent } from '../../lib/sanityContentContext';

const SHORT_DATE = { year: 'numeric', month: 'short', day: 'numeric' };

export function Blog() {
  const { i18n } = useTranslation();
  const { homePage, posts } = useSanityContent();
  const { ref, inView } = useInView();

  if (!SITE.features?.blog) return null;
  if (!homePage) return null;

  return (
    <section
      ref={ref}
      className={`bg-paper py-16 md:py-24 fade-in-section ${inView ? 'is-visible' : ''}`}
    >
      <Container>
        <Eyebrow>{homePage.blogEyebrow}</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {homePage.blogTitle}
        </h2>
        <p className="mt-6 max-w-[60ch] text-ink-500">{homePage.blogSubtitle}</p>

        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-3 md:divide-x md:divide-ink-200">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-t border-ink-200 pt-8 md:px-6 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-ink-500">
                {post.category && <span>{post.category}</span>}
                {post.category && <span aria-hidden>·</span>}
                <time dateTime={post.date}>
                  {formatDate(post.date, i18n.resolvedLanguage || 'uk', SHORT_DATE)}
                </time>
                {post.readTime && <span aria-hidden>·</span>}
                {post.readTime && <span>{post.readTime}</span>}
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
                {homePage.blogReadMore} <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
