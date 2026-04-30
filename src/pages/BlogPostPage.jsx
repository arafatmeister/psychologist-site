import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PortableText } from '@portabletext/react';
import { SITE } from '../config/site';
import { ROUTES } from '../config/routes';
import { SEO } from '../components/SEO/SEO';
import { StructuredData } from '../components/SEO/StructuredData';
import { Container } from '../components/layout/Container';
import { formatDate } from '../lib/formatDate';
import { sanityClient, sanityEnabled } from '../lib/sanity';
import { logger } from '../lib/logger';

const SHORT_DATE = { year: 'numeric', month: 'short', day: 'numeric' };

const POST_QUERY = `*[_type == "post" && language == $lang && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id, "slug": slug.current, title, teaser, category, readTime, "date": publishedAt, body
}`;

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'uk';
  const [state, setState] = useState({ post: null, loading: sanityEnabled, error: null });

  useEffect(() => {
    if (!sanityEnabled) return;
    let cancelled = false;
    setState({ post: null, loading: true, error: null });
    sanityClient
      .fetch(POST_QUERY, { lang, slug })
      .then((post) => {
        if (!cancelled) setState({ post: post || null, loading: false, error: null });
      })
      .catch((err) => {
        logger.error('post fetch failed', err);
        if (!cancelled) setState({ post: null, loading: false, error: err });
      });
    return () => {
      cancelled = true;
    };
  }, [lang, slug]);

  const { post, loading } = state;
  const path = `${ROUTES.blog}/${slug}`;

  if (loading) {
    return (
      <Container className="pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="animate-pulse space-y-4">
          <div className="h-3 w-32 rounded-sm bg-ink-200/60" />
          <div className="h-9 w-3/4 rounded-sm bg-ink-200/60" />
          <div className="h-5 w-1/2 rounded-sm bg-ink-200/60" />
          <div className="mt-8 h-64 w-full rounded-sm bg-ink-200/60" />
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <>
        <SEO path={path} noindex title={t('seo.notFound.title', { name: SITE.name })} />
        <Container className="pt-12 md:pt-20 pb-20 md:pb-28 text-center">
          <h1 className="text-2xl">{t('common.notFound')}</h1>
          <Link to={ROUTES.blog} className="mt-6 inline-block link-underline">
            ← {t('common.backHome')}
          </Link>
        </Container>
      </>
    );
  }

  return (
    <>
      <SEO path={path} title={`${post.title} | ${SITE.name}`} description={post.teaser} />
      <StructuredData
        breadcrumbs={[
          { name: SITE.name, path: ROUTES.home },
          { name: 'Blog', path: ROUTES.blog },
          { name: post.title, path },
        ]}
      />

      <Container className="pt-12 md:pt-20 pb-20 md:pb-28 max-w-[68ch]">
        <Link to={ROUTES.blog} className="text-sm text-ink-500 link-underline">
          ← Blog
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-ink-500">
          {post.category && <span>{post.category}</span>}
          {post.category && <span aria-hidden>·</span>}
          <time dateTime={post.date}>{formatDate(post.date, lang, SHORT_DATE)}</time>
          {post.readTime && <span aria-hidden>·</span>}
          {post.readTime && <span>{post.readTime}</span>}
        </div>

        <h1 className="mt-4 text-[1.75rem] leading-[1.15] md:text-3xl md:leading-[1.1] lg:text-4xl lg:leading-[1.05]">
          {post.title}
        </h1>

        {post.teaser && <p className="mt-6 text-lg text-ink-500">{post.teaser}</p>}

        {post.body && (
          <div className="prose mt-12 font-serif text-lg leading-[1.7] text-ink-800">
            <PortableText value={post.body} />
          </div>
        )}
      </Container>
    </>
  );
}
