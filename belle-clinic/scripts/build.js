// Build treatment / condition / image inventories from pages-extracted.json.
const fs = require('fs');
const dir = process.argv[2];
const pages = JSON.parse(fs.readFileSync(dir + '/pages-extracted.json', 'utf8'));
const byUrl = Object.fromEntries(pages.map((p) => [p.url, p]));
const BASE = 'https://mybelleclinic.com';

const csv = (rows) => {
  const cols = Object.keys(rows[0]);
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return '﻿' + [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\r\n');
};

// Hub pages list cards as: image, ### name, subtitle, ](url)
const hubCards = (url) => {
  const L = byUrl[url].mainContent.split('\n');
  const cards = [];
  for (let i = 0; i < L.length; i++) {
    if (!L[i].startsWith('### ')) continue;
    const link = (L[i + 2] || '').match(/^\]\((https:[^)]+)\)/);
    if (!link) continue;
    const img = (L[i - 1] || '').match(/^!\[[^\]]*\]\(([^)]+)\)/);
    cards.push({ name: L[i].slice(4), subtitle: L[i + 1], url: link[1], cardImage: img ? img[1].split('?')[0] : '' });
  }
  return cards;
};

const bodyOf = (p) => {
  const L = p.mainContent.split('\n');
  const t = L.findIndex((l) => l.startsWith('## Talk to Us'));
  return { before: L.slice(0, t < 0 ? L.length : t), after: t < 0 ? [] : L.slice(t + 2) };
};
const intro = (p) => {
  const L = p.mainContent.split('\n');
  const h2 = L.findIndex((l) => l.startsWith('## '));
  return L[h2 + 1] || '';
};
const subItems = (lines) => {
  const out = [];
  for (const l of lines) {
    let m = l.match(/^\*\*(.+?)\*\*$/) || l.match(/^#{2,3} (.+)$/) || l.match(/^\*\s+\*\*(.+?)\*\*/);
    // Skip section headings that are just group labels, not named treatments/concerns.
    if (m && !/^(Dis[a-z]*ver |Let us help|Find Out|Personalized treatments plans|Face And Neck|Chemical Peel Treatments|Hair Loss Treatments|Face Sculpting Treatments|Acne Scar Treatments|A Commitment)/i.test(m[1])) out.push(m[1].trim());
  }
  return out;
};
const prices = (lines) => lines.filter((l) => /RM\s?[\d,]+|per session|priced at/i.test(l))
  .flatMap((l) => l.replace(/\*\*/g, '').split(/(?<=\.)\s+/).filter((s) => /RM\s?[\d,]+|\b\d{3,4} per session/i.test(s)));
const related = (lines) => lines.filter((l) => l.startsWith('### ')).map((l) => l.slice(4));

// ---- treatments
const treatmentNotes = {
  '/treatments/acne-scar-treatments': 'Gold Cell 价格写作 "starts at 1200 per session for 3 sessions"（缺 RM，且与 Gold Cell 页面的 "RM1,200/次，3次 RM3,000" 表述不一致）；产品名拼写 BioRePeelCl3 / BiorepelCI3 不统一',
  '/treatments/body-contouring': '与 /treatments/body-contouring-solutions 内容完全相同（重复页）；未写具体疗法、仪器或价格；页尾"相关治疗"出现空标题"Body Contouring"及多项脸部治疗',
  '/treatments/skin-peeling-solutions': '页名 Chemical Peel 与网址 skin-peeling-solutions 不一致',
  '/treatments/eyebag-treatment': '资料不足：未说明具体方法/产品、疗程、价格',
  '/treatments/dermal-fillers': '未写价格、品牌；About Us meta 提到 "Korean FDA-approved fillers"，需确认',
  '/treatments/face-sculpting': 'Mesolipo 描述为"塑造身体线条"却放在 Face Sculpting 页；Full Rounded Forehead 提到 fat transfer（属手术类，需确认是否提供）',
  '/treatments/facelifts-and-threadlifts': '资料不足：未写线材类型、疗程、价格；页面同时写 "Facelifts" 与 "Non-Surgical Face Lift"，需确认是否提供手术型拉皮',
  '/treatments/gold-cell-skin-booster': 'meta 和首段拼写错误 "xperience"；价格 RM1,200/次、3次 RM3,000',
  '/treatments/gummy-smile-corrections': '资料不足：未说明治疗方法和价格',
  '/treatments/laser-hair-removal': '',
  '/treatments/hair-loss-treatments': '包含 FUE 植发（手术）和 Finasteride 口服药，需确认是否仍提供',
  '/treatments/laser-skin-pigmentation-treatment': '',
  '/treatments/laser-skin-treatment': '文中写 "Our dermatologists"，与其他页"aesthetic doctor / LCP"表述不一致，需确认资历用词',
  '/treatments/noseshaping': '资料不足：未说明方法（线雕/填充）及价格；网址 noseshaping 无连字符',
  '/treatments/skin-rejuvination-injections': '网址拼写错误 rejuvination；内容实为 Sunekos，页面自称 skin booster',
};
const treatments = hubCards(BASE + '/treatments').map((c) => {
  const p = byUrl[c.url];
  const b = bodyOf(p);
  const path = c.url.replace(BASE, '');
  return {
    treatment_name: c.name,
    source_url: c.url,
    page_title: p.title,
    h1: p.h1,
    subtitle: c.subtitle,
    intro: intro(p),
    sub_treatments_or_options: subItems(b.before.slice(2)).filter((x) => x !== c.subtitle).join(' | '),
    prices_as_stated_on_site: prices(b.before).join(' | '),
    hero_image: (p.images.find((i) => !i.sharedAcrossSite) || {}).url || '',
    listing_card_image: c.cardImage,
    flags: treatmentNotes[path] ?? '',
  };
});

// ---- conditions
const conditionNotes = {
  '/treatments/body-contouring-solutions': '与治疗页 /treatments/body-contouring 内容完全相同（重复）',
  '/treatments/anti-aging-solutions': '分类卡片名 "Skin Rejuvenation and Renewal" 与网址 anti-aging-solutions 不符；与 /treatments/anti-aging 主题重叠（都含 Fine Lines and Wrinkles）；页面没有链接任何治疗',
  '/treatments/anti-aging': '与 anti-aging-solutions 重叠',
  '/treatments/hair-removal': '与治疗页 Laser Hair Removal 重叠',
  '/treatments/hair-restoration': '与治疗页 Hair Loss Treatments 重叠；介绍提到 PRP 和激光生发，但治疗页没有这两项',
  '/treatments/skin-brightening-and-whitening': '标题拼写错误 "Disocover"',
  '/treatments/skin-disease-treatments': '提到 Light Therapy（光疗）、Systemic Medications，治疗清单中没有对应页面，需确认是否提供；页面没有链接任何治疗',
  '/treatments/scars-and-stretch-marks': '页面没有链接任何治疗（可链接 Acne Scar / Chemical Peel / Laser）',
};
const conditions = hubCards(BASE + '/treatments/conditions').map((c) => {
  const p = byUrl[c.url];
  const b = bodyOf(p);
  const path = c.url.replace(BASE, '');
  return {
    category_name: c.name,
    source_url: c.url,
    page_title: p.title,
    h1: p.h1,
    subtitle: c.subtitle,
    intro: intro(p),
    concerns_listed: subItems(b.before.slice(2)).filter((x) => x !== c.subtitle).join(' | '),
    linked_treatments: related(b.after).filter(Boolean).join(' | '),
    hero_image: (p.images.find((i) => !i.sharedAcrossSite) || {}).url || '',
    listing_card_image: c.cardImage,
    flags: conditionNotes[path] ?? '',
  };
});

// ---- images
const usage = new Map();
for (const p of pages) for (const i of p.images) {
  if (!usage.has(i.url)) usage.set(i.url, { alts: new Set(), pages: [], shared: i.sharedAcrossSite });
  const u = usage.get(i.url);
  if (i.alt) u.alts.add(i.alt);
  u.pages.push(p.url.replace(BASE, '') || '/');
}
const roleOf = (url) => {
  const t = treatments.find((r) => r.hero_image === url || r.listing_card_image === url);
  if (t) return 'treatment: ' + t.treatment_name;
  const c = conditions.find((r) => r.hero_image === url || r.listing_card_image === url);
  if (c) return 'category: ' + c.category_name;
  return '';
};
const imageNotes = {
  'r2HfZUkof6SJpUXIqZQhpj2rY2M.png': 'doctor photo: Dr. Jeffrey Lim',
  'FL6jP2jVH4jlZ903runIr0pBxw.png': 'doctor photo: Dr. Chiam Tee Kiang',
  'vvfT82Vh2shVMTmnZ6Uz8qft1eo.jpg': 'team group photo (alt 写 "Dental Clinic"，是模板残留)',
  'f4b3IC2JikvTuUDtg6ykreDwDA.jpg': 'team photo (alt 写 "Dentist with his Patient"，是模板残留)',
  'UR87saUVhAY9d76c1GvGRgkPYQ.jpg': 'clinic lobby entrance',
  'Sg8ASsXBb8GkvOFXNg6xWeFRsA.png': 'home hero (alt "Girl with a bright white smile"，牙科模板残留)',
  'rD7p2YP0Ue4F3VugG8Y3FfkoPk.png': 'home hero mobile (同上)',
  '4S6aghnR99Qe1zxIycAJ53BvgRY.png': 'reviews section graphic',
  '21ECMc2746QRnnaBWq4x5Ppo48.png': 'clinic location / map graphic',
};
const images = [...usage.entries()]
  .map(([url, u]) => {
    const file = url.split('/').pop();
    const ext = (file.split('.').pop() || '').toLowerCase();
    return {
      image_url: url,
      file_type: ext,
      alt_text: [...u.alts].join(' / '),
      role: imageNotes[file] || roleOf(url) || (u.shared ? 'site-wide UI (logo/icon/footer)' : ''),
      used_on_pages_count: new Set(u.pages).size,
      used_on_pages: [...new Set(u.pages)].slice(0, 8).join(' | ') + (new Set(u.pages).size > 8 ? ' | …' : ''),
      notes: !u.alts.size && ext !== 'svg' ? '无 alt 文字' : '',
    };
  })
  .sort((a, b) => (a.role.startsWith('site-wide') - b.role.startsWith('site-wide')) || a.role.localeCompare(b.role));

fs.writeFileSync(dir + '/treatments.csv', csv(treatments));
fs.writeFileSync(dir + '/categories.csv', csv(conditions));
fs.writeFileSync(dir + '/images.csv', csv(images));
fs.writeFileSync(dir + '/inventory.json', JSON.stringify({ treatments, conditions, images }, null, 2));
console.log('treatments', treatments.length, '| categories', conditions.length, '| images', images.length);
for (const t of treatments) console.log('T', t.treatment_name, '|', t.sub_treatments_or_options.slice(0, 80), '|', t.prices_as_stated_on_site.slice(0, 120));
for (const c of conditions) console.log('C', c.category_name, '| linked:', c.linked_treatments);
console.log('no-alt images:', images.filter((i) => i.notes).length);
