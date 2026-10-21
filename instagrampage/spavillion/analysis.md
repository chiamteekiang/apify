# Instagram Content Analysis — @spavilion.my

Source: Apify `apify/instagram-scraper` | Scraped: 2026-10-21 | Profile: 22,979 followers, business account ("Entrepreneur"), 4 branches (Bangi Sentral Selangor, Taman Melawati KL, Vista Alam Shah Alam, Damansara Aliff Johor). Raw data in `profile-details.json` and `posts.json` (last 30 posts). Sample thumbnails in `thumbs/`.

## 1. Content direction

Single-service-focused, not a general spa page. ~90% of the last 30 posts are built entirely around **HIFU (High-Intensity Focused Ultrasound) facial lifting treatment** — one treatment, hammered consistently rather than a broad spa/wellness menu. Supporting themes are secondary and infrequent:
- Occasional "new branch" teasers (expansion signal)
- One off-brand tribute post (national news event — Tun Dr. Siti Hasmah's passing) that happened to be the top-liked post, not representative of normal content
- No pricing, promo, or seasonal-sale content in the sample — it's an authority/results-building feed, not a hard-sell feed

**Core content pillars:**
1. **Client testimonials/reactions** post-treatment ("First time of my life kita try...", "Finally buat HIFU juga")
2. **Myth-busting / objection handling** ("HIFU ni betul-betul berkesan ke?", "HIFU ni untuk orang berusia je ke?")
3. **Before/after result reveals** (sidecar carousels, "Result After Hifu")
4. **Repeat-customer loyalty stories** (named regulars — "Kak Kuza", "Kak Shiela" — doing their 4th session)
5. **Male-targeting posts** (small but present — "Orang laki jarang lah tahu...")

## 2. Hooks being used

Captions are almost entirely **first-line pattern-interrupt hooks** in colloquial Bahasa Melayu (Manglish), written in the customer's own voice, not brand-voice ad copy:

- **Pain/insecurity callout:** "Muka nampak tired?", "Tengok cermin je muka nampak puffy teruk!", "Umur makin naik. Tapi muka yang makin turun?!!"
- **Skeptic-to-convert arc:** "Pernah buat tapi tak nampak result." / "HIFU ni betul-betul berkesan ke?" — raises doubt, then resolves it in-post
- **Quoted objection as hook:** literally opens with a quoted comment/DM — "Kenapa semua yg buat HIFU ni semua nya artist..." — kata kata dari salah seorang makcik fb."
- **Curiosity/contrast format:** "Perform dekat pentas ❌ / Perform dekat spa ✅"
- **"First time" / novelty framing:** "New experience unlocked 🔓", "Tried HIFU Treatment today"
- On-screen text overlays reinforce the spoken hook in bold yellow/white caption style (see Shooting style) — e.g. "ITU YANG PALING", "1 MASALAH", "PIPI GEMUK MACAM"

## 3. Shooting style

Verified directly from frame captures (`thumbs/`), consistent across the sample:

- **Vertical 9:16 Reels**, shot as **UGC-style talking-to-camera / testimonial video**, not polished studio ads
- **Two recurring formats:**
  - **In-treatment-room testimonial**: client in spa bonnet + towel robe, sitting at the treatment mirror, talking directly to camera right after/during treatment
  - **Presenter/host explainer**: a recurring host figure in regular outfits (blouse, modest wear), filmed against a neutral beige/plaster backdrop with a boom mic stand or visible clip-on lavalier mic, used for myth-busting and "problem" hook formats
- **Lavalier mic clearly visible in-frame** in nearly every clip — intentional "authentic/unscripted" signal rather than hiding the mic
- **Bold burned-in captions** (yellow highlight keyword + white bold text, black outline) — classic TikTok/Reels native-editing style, keyword-highlighted for scroll-stopping and sound-off viewing
- Natural, soft indoor lighting; minimal set dressing (plain walls, occasional greenery prop); no high-production colour grading — reads as authentic/relatable rather than glossy

## 4. Call to action

CTAs are **light-touch and infrequent** — most posts carry no explicit CTA at all, relying on curiosity/relatability to drive profile visits. When a CTA does appear:
- **"Klik link di bio"** → routes to Linktree (`linktr.ee/spavilion`)
- **"Boleh WhatsApp team SPAVILION untuk consultation"** — WhatsApp-first consultation funnel, not a direct booking/checkout link
- Soft, non-salesy phrasing: "Datang dulu kita consult sama sama baru boleh decide" (come consult first, decide treatment later) — positions the brand as advisory, not pushy
- Engagement-bait CTA used once: "Cuba comment dekat bawah" (try spotting the difference in comments) — drives comments for algorithmic reach

**Conclusion:** the funnel is Reel → profile/bio → Linktree → WhatsApp consultation. No in-caption pricing or "book now" urgency language.

## 5. Pricing

**No pricing is disclosed anywhere in the scraped captions or bio.** Mentions of "package" occur but without figures ("terus continue sampai ambil package"). Pricing is gated behind the WhatsApp consultation / Linktree funnel — consistent with the advisory, consult-first positioning rather than transactional self-serve pricing. If exact pricing is needed, it would require following the Linktree (`linktr.ee/spavilion`) or a direct WhatsApp inquiry — out of scope for public scraping.

## 6. Engagement snapshot (last 30 posts)

| Metric | Value |
|---|---|
| Posts sampled | 30 (28 Reels, 1 image, 1 carousel) |
| Avg likes/post | 36 |
| Avg comments/post | 1.3 |
| Avg Reel views | 2,584 |
| Top post | 367 likes — off-topic tribute post (national news), not treatment content |
| Best-performing treatment content | 129 likes — "patuh syariah dan selamat" (halal/safety reassurance) post |

Engagement is modest relative to follower count (22,979) — reach is driven more by consistent posting cadence (near-daily) and hook-driven Reels than by viral spikes.

## Files in this folder
- `profile-details.json` — raw profile/bio data
- `posts.json` — raw 30-post dataset (captions, hashtags, engagement, media URLs)
- `posts_fulltext.txt` — human-readable full captions per post
- `thumbs/` — sample downloaded thumbnails used to verify shooting style
- `input-details.json`, `input-posts.json` — Apify actor inputs used for the runs
