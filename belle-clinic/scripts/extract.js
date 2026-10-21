// Extract per-page main content + images from website-content-crawler output.
const fs = require('fs');
const dir = process.argv[2];
const pages = JSON.parse(fs.readFileSync(dir + '/raw-pages.json', 'utf8'));

const dedupe = (md) => {
  const seen = new Set();
  const out = [];
  for (const l of md.split('\n')) {
    const t = l.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
};
const imgsOf = (md) => [...md.matchAll(/!\[([^\]]*)\]\(([^)\s]+)\)/g)].map((m) => ({ alt: m[1], url: m[2].split('?')[0] }));

// Images that appear on most pages are site chrome (logo, arrows, footer).
const imgPageCount = new Map();
for (const p of pages) for (const u of new Set(imgsOf(p.markdown).map((i) => i.url))) imgPageCount.set(u, (imgPageCount.get(u) || 0) + 1);
const isShared = (u) => imgPageCount.get(u) >= 10;

const result = pages.map((p) => {
  const lines = dedupe(p.markdown);
  const h1i = lines.findIndex((l) => l.startsWith('# '));
  let end = lines.findIndex((l, i) => i > h1i && /^(View all Treatments|\*\s+Dr\. Chiam is a professional|Clinic Location)$/i.test(l));
  if (end < 0) end = lines.length;
  const main = lines.slice(Math.max(h1i, 0), end);
  const imgs = [];
  const seen = new Set();
  for (const i of imgsOf(p.markdown)) {
    if (seen.has(i.url)) continue;
    seen.add(i.url);
    imgs.push({ ...i, sharedAcrossSite: isShared(i.url) });
  }
  return {
    url: p.url,
    title: p.metadata.title,
    metaDescription: p.metadata.description || '',
    h1: h1i >= 0 ? lines[h1i].slice(2) : '',
    mainContent: main.join('\n'),
    images: imgs,
  };
});

fs.writeFileSync(dir + '/pages-extracted.json', JSON.stringify(result, null, 2));
let txt = '';
for (const r of result) {
  txt += `\n\n===== ${r.url}\nTITLE: ${r.title}\nMETA: ${r.metaDescription}\nPAGE IMAGES: ${r.images.filter((i) => !i.sharedAcrossSite).length} (shared: ${r.images.filter((i) => i.sharedAcrossSite).length})\n-----\n${r.mainContent}`;
}
fs.writeFileSync(dir + '/pages-main-content.txt', txt);
console.log('pages', result.length, '| txt chars', txt.length);
