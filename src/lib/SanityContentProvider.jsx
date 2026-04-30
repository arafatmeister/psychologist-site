import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sanityClient, sanityEnabled } from './sanity';
import { SanityContentContext } from './sanityContentContext';

const HOME_QUERY = `{
  "homePage": *[_type == "homePage" && language == $lang][0],
  "services": *[_type == "service"] | order(order asc){
    _id, order, format, title, desc, duration, mode
  },
  "faqs": *[_type == "faq"] | order(order asc){
    _id, order, question, answer
  },
  "posts": *[_type == "post" && language == $lang && !(_id in path("drafts.**"))] | order(publishedAt desc){
    _id, "slug": slug.current, title, teaser, category, readTime, "date": publishedAt
  }
}`;

const pickLocale = (obj, lang) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.uk || obj.en || '';
};

export function SanityContentProvider({ children }) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'uk';
  const [state, setState] = useState({
    homePage: null,
    services: [],
    faqs: [],
    posts: [],
    isLoading: sanityEnabled,
  });

  useEffect(() => {
    if (!sanityEnabled) return;
    let cancelled = false;
    setState((s) => ({ ...s, isLoading: true }));
    sanityClient
      .fetch(HOME_QUERY, { lang })
      .then((data) => {
        if (cancelled) return;
        setState({
          homePage: data.homePage || null,
          services: (data.services || []).map((s) => ({
            _id: s._id,
            format: pickLocale(s.format, lang),
            title: pickLocale(s.title, lang),
            desc: pickLocale(s.desc, lang),
            duration: pickLocale(s.duration, lang),
            mode: pickLocale(s.mode, lang),
          })),
          faqs: (data.faqs || []).map((f) => ({
            _id: f._id,
            question: pickLocale(f.question, lang),
            answer: pickLocale(f.answer, lang),
          })),
          posts: data.posts || [],
          isLoading: false,
        });
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, isLoading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const value = useMemo(() => state, [state]);

  return <SanityContentContext.Provider value={value}>{children}</SanityContentContext.Provider>;
}
