# TikTok Content Analysis — @vogueclinic

Source: Apify `clockworks/tiktok-scraper` | Scraped: 2026-10-21 | Account: **Vogue Clinic** (Vogue Aesthetic Sdn Bhd, Jalan Kelang Lama, Kuala Lumpur). 80,300 fans, 344,600 total hearts, 651 videos, not verified. Raw data in `videos.json` (last 30 videos). Sample covers in `thumbs/`.

## 1. Content direction

A **full-menu aesthetic clinic**, not single-treatment-focused like Spavilion. The last 30 videos cover a wide spread of individual procedures, each given its own dedicated post with its own branded name:

- **Facial lifting/contouring:** BabyFace Lifting (Vogue Facial Architecture™), HIFU Lift, HIFU Double Chin, Double Chin Slimming, Chin Contour
- **Skin quality:** Mesoglow, BabySkin, XL Skin Revival, Alma Aura Laser, Alma Glow Laser, Skin Renewal Peel, CO2 Skin Refining Laser
- **Filler/injectables:** Lip & Chin Contour, Signature Lips, Juvelook Scar Renewal
- **Body:** ONDA Pro (body contouring/cellulite)
- **Hair:** PRP Hair Therapy
- **Niche/add-on:** Korean Lip Spa, Under-Eye Brightening (dark circles), skin tag removal
- **Men's aesthetics:** a dedicated post targeting men ("Perfect for men who want: sharper jawline...")
- **Social proof/relationship-building:** a customer shoutout post (tagging a client by handle)

Every treatment is branded with "Vogue" prefix (Vogue BabyFace Lifting, Vogue Mesoglow, Vogue ONDA Pro) — a deliberate proprietary-naming strategy to make generic procedures feel exclusive to the clinic. Posting cadence is roughly every 3–9 days.

## 2. Hooks being used

Much more **templated and copy-driven** than Spavilion — reads like structured ad copy, not organic UGC voice:

- **Insecurity question hook:** "Muka nampak sagging & tired?", "Dagu pendek buat muka nampak kurang balance?", "Double chin buat muka nampak bulat?"
- **Quoted-complaint hook:** "😭 'Kenapa dah kurus tapi double chin masih ada?'"
- **Before/after contrast as opener:** "Bye double chin, hello jawline", "Bye garis dahi 👋 Hello muka fresh"
- **Reassurance/positioning hook:** "Not a different face. Just a better you.", "You don't need surgery to look more lifted."
- Every post follows the same **closing structure**: 3–5 bullet benefits (💎/✨/💖 emoji bullets) → soft reassurance line ("natural-looking, tak over") → CTA → branded hashtag block
- One caption literally leaked its AI-generation process: *"Here's an engaging Instagram Reels caption: ✨ KOREAN LIP SPA..."* — indicating captions are AI-drafted/templated and occasionally not fully cleaned before posting (video 16)

## 3. Shooting style

Verified from cover frames (`thumbs/`) — a clinical/polished house style, distinct from Spavilion's raw UGC talking-head approach:

- **Before/after split-screen or split-face comparisons** are the dominant format — same subject, same framing, controlled studio lighting against a plain dark backdrop, clearly labeled "before"/"after" in clean bold sans-serif
- **Diagnostic-style annotated markup**: arrows and drawn lines directly on the face indicating lift direction/treatment area (dermaplaning/consult-style visual), layered over a shorter talking-segment clip
- **Branded set design**: visible neon signage/backdrop element (brand environment, not a plain room) in some clips — signals an actual clinic environment with intentional branding, not an at-home or candid setting
- Clean, legible **title-card text overlays** (treatment name in bold white sans-serif) rather than keyword-highlighted hook captions
- Overall: **produced/marketing-team output** — consistent template, consistent lighting setup, consistent graphic style — vs. Spavilion's lo-fi, mic-visible, customer-voice Reels

## 4. Call to action

More explicit and consistent than Spavilion:

- **"📩 DM us untuk consultation!"** — repeated almost verbatim across nearly every post; DM-to-book is the primary funnel
- **"Book your consultation today."** (English variant)
- Location drop included directly in some captions: **"📍 Vogue Clinic, Kuala Lumpur"**
- No link-in-bio funnel used (bioLink is empty) — DM is the sole conversion path, not Linktree/WhatsApp-in-bio like Spavilion
- Secondary soft-CTA: tagging/crediting a real client ("Thank you so much @didi_angel_astillah...") to invite relationship-driven engagement/UGC reposting

## 5. Pricing

**No pricing disclosed in any of the 30 captions.** Consistent with Spavilion — pricing is gated behind DM consultation. Bio signature only lists contact info: *"Vogue Aesthetic Sdn Bhd (1421990-T), Jalan Kelang Lama, 0124817373, appointment"* — no listed rates.

## 6. Engagement snapshot (last 30 videos)

| Metric | Value |
|---|---|
| Videos sampled | 30 |
| Avg plays/video | 1,669 |
| Avg likes/video | 16 |
| Avg comments/video | 0.6 |
| Avg shares/video | 2.8 |
| Avg saves/video | 6.3 |
| Top video | 3,362 plays — "Stronger. Sharper. Younger." (BabyFace Lifting, men's-targeted angle) |

Saves-to-likes ratio is notably high relative to likes (near parity) — before/after and "how it works" content tends to get bookmarked for later reference rather than liked outright, typical of aesthetic-clinic audiences doing research before booking.

## Comparison snapshot vs. Spavilion (Instagram)

| | Spavilion (IG) | Vogue Clinic (TikTok) |
|---|---|---|
| Service breadth | Single treatment (HIFU) | Full menu, many branded treatments |
| Voice | Organic, customer-first-person, Manglish | Templated ad copy, benefit-bullet structure |
| Visual style | UGC talking-head, visible lav mic, lo-fi | Studio before/after, branded signage, polished |
| CTA | Light-touch, mostly none → WhatsApp | Explicit, near-every-post → DM |
| Pricing | Not disclosed | Not disclosed |

## Files in this folder
- `videos.json` — raw 30-video dataset (captions, hashtags, engagement, author meta, media URLs)
- `videos_fulltext.txt` — human-readable full captions per video
- `thumbs/` — sample downloaded cover frames used to verify shooting style
- `input.json` — Apify actor input used for the run
