import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';

const LINK_CLASS =
  'text-ink-900 underline decoration-ink-400 underline-offset-4 transition-colors hover:decoration-ink-900';

const SELF_CLOSING_REGEX = /<(br)\s*\/?>/g;
const PAIRED_REGEX = /<(privacy|terms|parentalConsent|email|tg)>([^<]+)<\/\1>/g;

const wrap = (tag, content, key) => {
  switch (tag) {
    case 'privacy':
      return (
        <Link key={key} to={ROUTES.privacy} className={LINK_CLASS}>
          {content}
        </Link>
      );
    case 'terms':
      return (
        <Link key={key} to={ROUTES.terms} className={LINK_CLASS}>
          {content}
        </Link>
      );
    case 'parentalConsent':
      return (
        <Link key={key} to={ROUTES.parentalConsent} className={LINK_CLASS}>
          {content}
        </Link>
      );
    case 'email':
      return (
        <a key={key} href={`mailto:${SITE.email}`} className={LINK_CLASS}>
          {content || SITE.email}
        </a>
      );
    case 'tg':
      return (
        <a
          key={key}
          href={SITE.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {content || SITE.telegramHandle}
        </a>
      );
    case 'br':
      return <br key={key} />;
    default:
      return content;
  }
};

export function renderRichString(text) {
  if (!text) return null;
  const tokens = [];
  let lastIndex = 0;
  let i = 0;

  const matches = [];
  for (const m of text.matchAll(PAIRED_REGEX)) {
    matches.push({ start: m.index, end: m.index + m[0].length, tag: m[1], content: m[2] });
  }
  for (const m of text.matchAll(SELF_CLOSING_REGEX)) {
    matches.push({ start: m.index, end: m.index + m[0].length, tag: m[1], content: '' });
  }
  matches.sort((a, b) => a.start - b.start);

  for (const m of matches) {
    if (m.start < lastIndex) continue;
    if (m.start > lastIndex) tokens.push(text.slice(lastIndex, m.start));
    tokens.push(wrap(m.tag, m.content, `t${i++}`));
    lastIndex = m.end;
  }
  if (lastIndex < text.length) tokens.push(text.slice(lastIndex));
  return tokens;
}
