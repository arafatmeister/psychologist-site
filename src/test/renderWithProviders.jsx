import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import i18n from '../i18n';
import { SanityContentContext } from '../lib/sanityContentContext';

const MOCK_HOME_PAGE = {
  heroEyebrow: 'Online · UA / EN · Confidential',
  heroTitleBefore: 'Helping you through crises, ',
  heroTitleEm: 'reclaiming meaning',
  heroTitleAfter: ' and finding yourself.',
  heroSubtitle: 'Individual counseling and support.',
  heroCtaBook: 'Book session',
  heroCtaFree: 'Free 15-minute intro call',
  heroNote: 'Reply within 24 hours.',
  heroPhotoCaption: '— Kyiv, 2024',
  heroPhotoAlt: 'Portrait',

  helpWithEyebrow: 'How I can help',
  helpWithTitle: 'Topics',
  helpWithItems: [{ title: 'Anxiety', desc: 'Support for anxiety.' }],

  servicesEyebrow: 'Formats',
  servicesTitle: 'Services',
  servicesSubtitle: 'Tailored sessions.',

  trustEyebrow: 'Trust',
  trustTitle: 'Why clients trust me',
  trustQuote: 'A testimonial.',
  trustQuoteAuthor: 'client',
  trustFacts: [{ value: '6+', label: 'years' }],

  ctaEyebrow: 'Start',
  ctaBody: 'Write to me.',
  ctaButton: 'Write',

  blogEyebrow: 'Reading',
  blogTitle: 'Blog',
  blogSubtitle: 'Essays.',
  blogReadMore: 'Read more',

  faqEyebrow: 'FAQ',
  faqTitle: 'Questions',
};

const MOCK_CONTEXT = {
  homePage: MOCK_HOME_PAGE,
  services: [
    {
      _id: 'service-1',
      format: 'Individual',
      title: 'Individual counseling',
      desc: 'Deep work.',
      duration: '50 min',
      mode: 'online',
    },
  ],
  faqs: [
    { _id: 'faq-1', question: 'How long does one session take?', answer: 'It takes 50 minutes.' },
  ],
  posts: [],
  isLoading: false,
};

export function renderWithProviders(ui, { route = '/', sanity = MOCK_CONTEXT } = {}) {
  return render(
    <I18nextProvider i18n={i18n}>
      <SanityContentContext.Provider value={sanity}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </SanityContentContext.Provider>
    </I18nextProvider>,
  );
}
