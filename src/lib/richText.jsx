import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { SITE } from '../config/site';

const LINK_CLASS =
  'text-ink-900 underline decoration-ink-400 underline-offset-4 transition-colors hover:decoration-ink-900';

// Template elements passed to <Trans components={...}>. Children here act as a
// fallback for static a11y analysis — <Trans> replaces them with the actual
// translation content at render time.
export const RICH_COMPONENTS = {
  email: (
    <a href={`mailto:${SITE.email}`} className={LINK_CLASS}>
      {SITE.email}
    </a>
  ),
  tg: (
    <a href={SITE.telegramUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {SITE.telegramHandle}
    </a>
  ),
  privacy: (
    <Link to={ROUTES.privacy} className={LINK_CLASS}>
      privacy
    </Link>
  ),
  terms: (
    <Link to={ROUTES.terms} className={LINK_CLASS}>
      terms
    </Link>
  ),
  parentalConsent: (
    <Link to={ROUTES.parentalConsent} className={LINK_CLASS}>
      parental-consent
    </Link>
  ),
  br: <br />,
};

export const RICH_VALUES = {
  email: SITE.email,
  telegramHandle: SITE.telegramHandle,
};
