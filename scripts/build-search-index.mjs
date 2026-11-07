import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = join(root, 'manifest.json');
const outPath = join(root, 'search-index.json');

/**
 * Lightweight markdown → plain text for search indexing.
 * Not a full parser; good enough for help-article bodies.
 */
function markdownToPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHeadings(markdown) {
  const headings = [];
  for (const line of markdown.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) {
      continue;
    }
    headings.push(match[2].replace(/[*_`]/g, '').trim());
  }
  return headings;
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
if (!Array.isArray(manifest.articles)) {
  throw new Error('manifest.json missing articles array');
}

const documents = manifest.articles.map((article) => {
  if (!article?.id || !article?.path || !article?.title) {
    throw new Error(`Invalid article entry: ${JSON.stringify(article)}`);
  }

  const articlePath = join(root, article.path);
  const markdown = readFileSync(articlePath, 'utf8');
  const headings = extractHeadings(markdown).filter((heading) => heading !== article.title);

  return {
    id: article.id,
    title: article.title,
    section: typeof article.section === 'string' ? article.section : '',
    headings,
    headingSlugs: headings.map(slugifyHeading),
    body: markdownToPlainText(markdown),
  };
});

// Fail if orphan article files exist but are not in the manifest (keeps authors honest).
const articlesDir = join(root, 'articles');
const listedPaths = new Set(
  manifest.articles.map((article) => relative(root, join(root, article.path)).replace(/\\/g, '/'))
);
for (const name of readdirSync(articlesDir)) {
  if (!name.endsWith('.md')) {
    continue;
  }
  const rel = `articles/${name}`;
  if (!listedPaths.has(rel)) {
    console.warn(`Warning: ${rel} is not listed in manifest.json`);
  }
}

const payload = {
  schemaVersion: 1,
  documents,
};

writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${documents.length} documents to ${relative(root, outPath)}`);
