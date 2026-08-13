import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const siteOrigin = 'https://themidnightmechanics.com';
const dist = path.resolve('dist');

const routes = [
  {
    output: 'index.html',
    title: 'The Midnight Mechanics | FRC Team 812',
    description:
      'FRC Team 812, The Midnight Mechanics, builds competition robots at The Preuss School UC San Diego.',
    canonical: `${siteOrigin}/`,
  },
  {
    output: 'sponsors/index.html',
    title: 'Sponsor FRC Team 812 | The Midnight Mechanics',
    description:
      'Learn about sponsoring The Midnight Mechanics for the 2027 FRC season at The Preuss School UC San Diego.',
    canonical: `${siteOrigin}/sponsors/`,
  },
];

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
  return match?.[1];
}

function meta(html, attributeName, attributeValue) {
  const tag = tags(html, 'meta').find(
    (candidate) => attribute(candidate, attributeName) === attributeValue,
  );
  return tag && attribute(tag, 'content');
}

function link(html, rel) {
  return tags(html, 'link').find((candidate) =>
    (attribute(candidate, 'rel') ?? '').split(/\s+/).includes(rel),
  );
}

async function assertDistAssetExists(url) {
  const pathname = decodeURIComponent(new URL(url, siteOrigin).pathname);
  const info = await stat(path.join(dist, pathname));
  assert.ok(info.isFile(), `${pathname} should resolve to an emitted file`);
}

test('built routes expose complete, distinct production metadata', async () => {
  for (const route of routes) {
    const html = await readFile(path.join(dist, route.output), 'utf8');
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];

    assert.equal(title, route.title);
    assert.equal(meta(html, 'name', 'description'), route.description);
    assert.doesNotMatch(html, /prototype/i);

    assert.equal(attribute(link(html, 'canonical'), 'href'), route.canonical);
    assert.equal(meta(html, 'property', 'og:type'), 'website');
    assert.equal(meta(html, 'property', 'og:title'), route.title);
    assert.equal(meta(html, 'property', 'og:description'), route.description);
    assert.equal(meta(html, 'property', 'og:url'), route.canonical);
    assert.match(meta(html, 'property', 'og:image'), /^https:\/\/themidnightmechanics\.com\//);
    assert.equal(
      meta(html, 'property', 'og:image:alt'),
      'Team 812 students and mentors working around their robot in the pit.',
    );

    assert.equal(meta(html, 'name', 'twitter:card'), 'summary_large_image');
    assert.equal(meta(html, 'name', 'twitter:title'), route.title);
    assert.equal(meta(html, 'name', 'twitter:description'), route.description);
    assert.equal(meta(html, 'name', 'twitter:image'), meta(html, 'property', 'og:image'));

    await assertDistAssetExists(meta(html, 'property', 'og:image'));
    await assertDistAssetExists(attribute(link(html, 'icon'), 'href'));
  }

  assert.equal(new Set(routes.map(({ title }) => title)).size, routes.length);
  assert.equal(new Set(routes.map(({ description }) => description)).size, routes.length);
});

test('normal built pages self-host DM Sans with a readable fallback', async () => {
  const localStylesheets = new Set();

  for (const route of routes) {
    const html = await readFile(path.join(dist, route.output), 'utf8');
    const fontServiceLinks = tags(html, 'link').filter((candidate) =>
      /fonts\.(?:googleapis|gstatic)\.com/.test(attribute(candidate, 'href') ?? ''),
    );
    assert.deepEqual(fontServiceLinks, [], `${route.output} must not contact Google Fonts`);

    for (const candidate of tags(html, 'link')) {
      if ((attribute(candidate, 'rel') ?? '').split(/\s+/).includes('stylesheet')) {
        const href = attribute(candidate, 'href');
        if (href?.startsWith('/')) localStylesheets.add(href);
      }
    }
  }

  const css = (
    await Promise.all(
      [...localStylesheets].map((href) => readFile(path.join(dist, href), 'utf8')),
    )
  ).join('\n');

  assert.match(css, /@font-face/);
  assert.match(css, /font-family:["']?DM Sans["']?/);
  assert.match(css, /font-display:swap/);
  assert.match(css, /--font-sans:["']DM Sans Variable["'][^;}]*sans-serif/);
  assert.match(css, /--font-mono:["']DM Sans Variable["'][^;}]*sans-serif/);

  const fontUrls = [...css.matchAll(/url\(["']?([^"')]+\.woff2)["']?\)/g)].map(
    ([, url]) => url,
  );
  assert.ok(fontUrls.length > 0, 'at least one local WOFF2 font should be emitted');
  for (const fontUrl of new Set(fontUrls)) await assertDistAssetExists(fontUrl);
});
