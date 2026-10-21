const PROJECT = require('path').join(__dirname, '..', '..');
require('dotenv').config({ path: PROJECT + '/.env', quiet: true });
const { ApifyClient } = require('apify-client');
const fs = require('fs');

const input = {
  startUrls: [
    { url: 'https://mybelleclinic.com/' },
    { url: 'https://mybelleclinic.com/treatments' },
    { url: 'https://mybelleclinic.com/treatments/conditions' },
    { url: 'https://mybelleclinic.com/about-us' },
    { url: 'https://mybelleclinic.com/contact' },
  ],
  crawlerType: 'cheerio',
  includeUrlGlobs: [{ glob: 'https://mybelleclinic.com/**' }],
  excludeUrlGlobs: [{ glob: 'https://mybelleclinic.com/**/*.{png,jpg,jpeg,webp,svg,pdf}' }],
  maxCrawlDepth: 4,
  maxCrawlPages: 60,
  maxResults: 60,
  useSitemaps: false,
  // Keep nav/footer: contact details, hours and address usually live there.
  removeElementsCssSelector: "script, style, noscript, svg, img[src^='data:']",
  htmlTransformer: 'none',
  saveMarkdown: true,
  saveHtml: true,
  proxyConfiguration: { useApifyProxy: true },
};

(async () => {
  const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
  console.log('Starting apify/website-content-crawler ...');
  const run = await client.actor('apify/website-content-crawler').call(input, { memory: 2048, timeout: 900 });
  console.log('Run', run.id, run.status, '| usage USD:', run.usageTotalUsd);
  const { items } = await client.dataset(run.defaultDatasetId).listItems({ clean: true });
  const outDir = PROJECT + '/output/belle-clinic';
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outDir + '/raw-pages.json', JSON.stringify(items, null, 2));
  console.log('Pages:', items.length, '| dataset', run.defaultDatasetId);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
