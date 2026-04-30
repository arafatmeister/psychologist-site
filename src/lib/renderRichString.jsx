import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';

const LINK_CLASS =
  'text-ink-900 underline decoration-ink-400 underline-offset-4 transition-colors hover:decoration-ink-900';

const TAG_REGEX =
  /<(privacy|terms|parentalConsent|email|tg|br)(\s*\/)?>((?:(?!<\/\1>).)*)(<\/\1>)?/g;

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
  const parts = [];
  let lastIndex = 0;
  let match;
  let i = 0;
  const re = new RegExp(TAG_REGEX);
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(wrap(match[1], match[3] || '', `t${i++}`));
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
