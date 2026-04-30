import { createClient } from '@sanity/client';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error('Missing SANITY_STUDIO_PROJECT_ID / VITE_SANITY_PROJECT_ID');
if (!token) throw new Error('Missing SANITY_WRITE_TOKEN');

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-04-01',
  token,
  useCdn: false,
});

const uk = JSON.parse(await readFile(resolve(root, 'src/i18n/locales/uk.json'), 'utf8'));
const en = JSON.parse(await readFile(resolve(root, 'src/i18n/locales/en.json'), 'utf8'));

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const textToBlocks = (text) => [
  {
    _type: 'block',
    _key: `k${Math.random().toString(36).slice(2, 10)}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `s${Math.random().toString(36).slice(2, 10)}`,
        text,
        marks: [],
      },
    ],
  },
];

const docs = [];

// --- Posts (uk + en) ---
for (const [lang, data] of [
  ['uk', uk],
  ['en', en],
]) {
  const items = data.sections.blog.items;
  for (const p of items) {
    const _id = `post-${lang}-${p.slug}`;
    docs.push({
      _id,
      _type: 'post',
      language: lang,
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      teaser: p.teaser,
      category: p.category,
      readTime: p.readTime,
      publishedAt: new Date(p.date).toISOString(),
      body: textToBlocks(p.teaser),
    });
  }
}

// --- Services (localized uk+en in one doc) ---
{
  const ukItems = uk.sections.services.items;
  const enItems = en.sections.services.items;
  ukItems.forEach((s, i) => {
    const e = enItems[i] || {};
    docs.push({
      _id: `service-${i + 1}`,
      _type: 'service',
      order: i + 1,
      format: { _type: 'localeString', uk: s.format, en: e.format },
      title: { _type: 'localeString', uk: s.title, en: e.title },
      desc: { uk: s.desc, en: e.desc },
      duration: { _type: 'localeString', uk: s.duration, en: e.duration },
      mode: { _type: 'localeString', uk: s.mode, en: e.mode },
    });
  });
}

// --- FAQ (localized uk+en in one doc) ---
{
  const ukItems = uk.sections.faq.items;
  const enItems = en.sections.faq.items;
  ukItems.forEach((f, i) => {
    const e = enItems[i] || {};
    docs.push({
      _id: `faq-${i + 1}`,
      _type: 'faq',
      order: i + 1,
      question: { _type: 'localeString', uk: f.question, en: e.question },
      answer: { uk: f.answer, en: e.answer },
    });
  });
}

// --- HomePage (one doc per language) ---
for (const [lang, data] of [
  ['uk', uk],
  ['en', en],
]) {
  const s = data.sections;
  docs.push({
    _id: `homePage-${lang}`,
    _type: 'homePage',
    language: lang,

    heroEyebrow: data.hero.eyebrow,
    heroTitleBefore: data.hero.titleBefore,
    heroTitleEm: data.hero.titleEm,
    heroTitleAfter: data.hero.titleAfter,
    heroSubtitle: data.hero.subtitle,
    heroCtaBook: data.hero.ctaBook,
    heroCtaFree: data.hero.ctaFree,
    heroNote: data.hero.note,
    heroPhotoCaption: data.hero.photoCaption,
    heroPhotoAlt: data.hero.photoAlt,

    helpWithEyebrow: s.helpWith.eyebrow,
    helpWithTitle: s.helpWith.title,
    helpWithItems: s.helpWith.items.map((it, i) => ({
      _type: 'object',
      _key: `hw${i}`,
      title: it.title,
      desc: it.desc,
    })),

    servicesEyebrow: s.services.eyebrow,
    servicesTitle: s.services.title,
    servicesSubtitle: s.services.subtitle,

    trustEyebrow: s.trust.eyebrow,
    trustTitle: s.trust.title,
    trustQuote: s.trust.quote,
    trustQuoteAuthor: s.trust.quoteAuthor,
    trustFacts: s.trust.facts.map((f, i) => ({
      _type: 'object',
      _key: `f${i}`,
      value: f.value,
      label: f.label,
    })),

    ctaEyebrow: s.cta.eyebrow,
    ctaBody: s.cta.body,
    ctaButton: s.cta.button,

    blogEyebrow: s.blog.eyebrow,
    blogTitle: s.blog.title,
    blogSubtitle: s.blog.subtitle,
    blogReadMore: s.blog.readMore,

    faqEyebrow: s.faq.eyebrow,
    faqTitle: s.faq.title,
  });
}

console.log(`Seeding ${docs.length} documents to dataset "${dataset}"…`);

const tx = client.transaction();
for (const d of docs) tx.createOrReplace(d);
const result = await tx.commit();

console.log(`✓ Committed. Transaction id: ${result.transactionId}`);
console.log(
  `  Posts: ${docs.filter((d) => d._type === 'post').length}` +
    `, Services: ${docs.filter((d) => d._type === 'service').length}` +
    `, FAQ: ${docs.filter((d) => d._type === 'faq').length}` +
    `, HomePage: ${docs.filter((d) => d._type === 'homePage').length}`,
);
