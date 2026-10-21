require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { ApifyClient } = require('apify-client');

const ACTOR_ID = process.env.APIFY_SEARCH_ACTOR_ID || 'apify/google-search-scraper';
const OUTPUT_DIR = path.join(__dirname, 'output');

async function main() {
  const query = process.argv.slice(2).join(' ').trim();
  if (!query) {
    console.error('Usage: node search.js <search query>');
    process.exit(1);
  }
  if (!process.env.APIFY_TOKEN) {
    console.error('Missing APIFY_TOKEN. Copy .env.example to .env and add your token.');
    process.exit(1);
  }

  const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

  console.log(`Running actor "${ACTOR_ID}" for query: "${query}"...`);
  const run = await client.actor(ACTOR_ID).call({ queries: query });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const slug = query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = path.join(OUTPUT_DIR, `${slug}_${timestamp}.json`);

  fs.writeFileSync(outFile, JSON.stringify(items, null, 2));
  console.log(`Saved ${items.length} result(s) to ${outFile}`);
}

main().catch((err) => {
  console.error('Search failed:', err.message);
  process.exit(1);
});
