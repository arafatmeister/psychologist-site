import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PUBLIC_ROUTES } from '../src/config/routes.js';
import { SITE } from '../src/config/site.js';

const buildDate = new Date().toISOString().slice(0, 10);

const urlEntries = PUBLIC_ROUTES.map((route) => {
  const absolute = `${SITE.url}${route}`;
  return `  <url>\n    <loc>${absolute}</loc>\n    <lastmod>${buildDate}</lastmod>\n    <xhtml:link rel="alternate" hreflang="uk" href="${absolute}?lang=uk" />\n    <xhtml:link rel="alternate" hreflang="en" href="${absolute}?lang=en" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute}" />\n  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>\n`;

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');
