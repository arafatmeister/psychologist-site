import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PUBLIC_ROUTES, ROUTES } from '../src/config/routes.js';
import { SITE } from '../src/config/site.js';

const buildDate = new Date().toISOString().slice(0, 10);

// Routes that exist only in Ukrainian (no EN alternate).
const UK_ONLY_ROUTES = new Set([ROUTES.parentalConsent]);

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';

async function fetchPostSlugs() {
  if (!projectId) return [];
  try {
    const query = encodeURIComponent(
      `*[_type == "post" && !(_id in path("drafts.**"))]{ language, "slug": slug.current, "lastmod": _updatedAt }`,
    );
    const url = `https://${projectId}.apicdn.sanity.io/v2026-04-01/data/query/${dataset}?query=${query}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.result) ? json.result : [];
  } catch {
    return [];
  }
}

const staticEntries = PUBLIC_ROUTES.map((route) => {
  const absolute = `${SITE.url}${route}`;
  const ukOnly = UK_ONLY_ROUTES.has(route);

  const alternates = ukOnly
    ? `    <xhtml:link rel="alternate" hreflang="uk" href="${absolute}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute}" />`
    : `    <xhtml:link rel="alternate" hreflang="uk" href="${absolute}?lang=uk" />\n    <xhtml:link rel="alternate" hreflang="en" href="${absolute}?lang=en" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute}" />`;

  return `  <url>\n    <loc>${absolute}</loc>\n    <lastmod>${buildDate}</lastmod>\n${alternates}\n  </url>`;
}).join('\n');

const posts = await fetchPostSlugs();

// Group by slug to build alternates between languages.
const bySlug = new Map();
for (const p of posts) {
  if (!p.slug || !p.language) continue;
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, {});
  bySlug.get(p.slug)[p.language] = p;
}

const postEntries = [...bySlug.entries()]
  .map(([slug, langs]) => {
    const primary = langs.uk || langs.en;
    if (!primary) return '';
    const lastmod = (primary.lastmod || '').slice(0, 10) || buildDate;
    const absolute = `${SITE.url}${ROUTES.blog}/${slug}`;
    const alts = ['uk', 'en']
      .filter((l) => langs[l])
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute}?lang=${l}" />`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute}" />`)
      .join('\n');
    return `  <url>\n    <loc>${absolute}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alts}\n  </url>`;
  })
  .filter(Boolean)
  .join('\n');

const allEntries = [staticEntries, postEntries].filter(Boolean).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${allEntries}\n</urlset>\n`;

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');

const total = (postEntries ? bySlug.size : 0) + PUBLIC_ROUTES.length;
console.log(`sitemap: ${total} URLs (${bySlug.size} blog posts)`);
