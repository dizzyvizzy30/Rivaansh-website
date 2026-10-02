# Rivaansh ENT — Site Restructure Plan

_Decided 2026-10-02 through a structured debate: an Advocate (3–4 intent sections with dropdowns), a Challenger
(flat, task-first, fewer pages) and an Arbitrator (healthcare product/UX lead judging against the clinic's real
visitors). This is the Arbitrator's final plan. Nothing in it is built yet._

## 1. Verdict
**B's structure wins**: four plain destinations, no dropdowns, fewer and richer pages (doctor + clinic on one page;
timings, location, fees, first visit and FAQ on one page; surgeries folded into condition pages). **A wins three
details that are adopted**: existing patients keep a labelled home (`care.html` → "Before & After Surgery");
unwritten conditions appear on the hub as plain text, never dead links; and A's drawer/bar details (the word "Menu",
one-line drawer descriptions, bar hidden while typing). Both were right on the core move: **one page per condition
covering education and treatment**, and a sticky Call · WhatsApp · Book bar on every phone page. Change from both:
**we write the drafts, the doctor only reviews them.**

Factual errors found: B rebutted "For Patients", "Learn" and a "buried" Book that A's report doesn't contain (A
rejected both labels and puts Book in the header and bar); B proposes Netlify Forms, against the stated Google Sheet /
WhatsApp plan; A lists tinnitus as a flyer condition (it isn't — it comes from the template homepage); A keeps
`online-consultation.html` although no video or payment tool exists.

Both missed: `netlify.toml` still publishes `www/` with no build command, so no redirect works until the Astro
cutover; Netlify won't apply a redirect while a file still exists at that path ("shadowing"); the homepage claims
unconfirmed services (Cochlear Implant, Speech Therapy, Sleep Apnea Clinic, Smell & Taste); the hero's "READ MORE"
links to the wrong-doctor page; the flyer's "One stop solution…" wording must not be copied onto the site.

## 2. Scorecard (1–5, higher is better)
| | A | B | Final |
|---|---|---|---|
| Findability on mobile | 3 | 4 | 5 |
| Trust-building for prospects | 4 (spread over 3 pages) | 4 | 5 |
| Education / SEO | 4 (risk of splitting education and treatment) | 4 | 5 |
| Existing-patient tasks | 4 | 2 | 4 |
| Owner effort (5 = least) | 2 | 4 | 5 |
| NMC / compliance safety | 3 (emergency + online-consult pages) | 4 | 5 |
| Room to grow | 5 | 3 | 4 |

## 3. Final sitemap
| Page | URL | Status | Purpose | Primary action |
|---|---|---|---|---|
| Home | `/` | Rebuilt | What is this, who runs it, where, can I reach them now | Call |
| Treatments (hub) | `/pages/ent.html` | Rebuilt | Every condition grouped by area, with "Urgent problems" and `#procedures` | Tap a condition |
| Condition pages | `/pages/ent/<slug>.html` | **NEW** collection | The one page per condition: what it is + how it's treated here | WhatsApp / Call |
| Doctor & Clinic | `/pages/about-us.html` | Rebuilt; absorbs the old doctor page + gallery | Trust: doctor, clinic & equipment, hygiene, where surgery happens | Book |
| Visit Us | `/pages/contact.html` | Rebuilt; absorbs locations + FAQ | Timings, map, landmarks, fees, first visit, FAQ | Directions |
| Book | `/pages/appointment.html` | Rebuilt; absorbs online consultation | Call, pre-filled WhatsApp, request a call back; same page to reschedule | WhatsApp |
| Before & After Surgery | `/pages/care.html` | Repurposed | Per-procedure prep and aftercare; printable, shared by WhatsApp | "Call us if…" |
| Health Tips | `/pages/blog.html`, `/pages/blog/<slug>.html` | Kept; heading renamed | Cross-condition care and prevention topics | Link to the related condition page |
| 404 | — | Kept | Links to the 4 destinations + Call | Call |

Condition URLs mirror the existing `blog.html` + `blog/<slug>.html` pattern; keeping `ent.html` avoids a redirect.

## 4. Navigation spec
**Top-level labels (exact):** **Treatments · Doctor & Clinic · Visit Us · Health Tips** + a **Book Appointment**
button. Logo = Home. No dropdowns anywhere.

- **Desktop (≥769px, sticky, compacts on scroll as now):** two-line wordmark "Rivaansh ENT / Head & Neck Centre"
  (drop the "Empowering…" tagline) · 4 links with the current page marked · phone as a dial link · Book Appointment.
  769–1023px: wordmark shortens to "Rivaansh ENT", phone becomes a "Call" icon button. **Utility strip (≥1024px):**
  "Today: 10:00 AM–1:00 PM, 5:30–8:30 PM · 4th floor, Centre Point, Gota · WhatsApp" — says "Today", never
  "Open now" (holidays); without JS it shows the weekly schedule.
- **Mobile header (≤768px):** logo + "Rivaansh ENT", a 44px **Call** icon, and a **"Menu"** button with the word
  visible (replaces the fixed round button).
- **Drawer:** full height, 56px rows, 18px text: Home; the four destinations each with a one-line description
  (Treatments — "Ear, nose, throat, thyroid, children"; Doctor & Clinic — "Dr. Tanay S Parikh, clinic photos";
  Visit Us — "Timings, map, fees, first visit"; Health Tips — "Ear, nose & throat care advice"); secondary links
  Book an appointment · Before & after surgery; then plain text: today's hours, address with landmark and floor,
  "Open in Google Maps", phone numbers with what each is for (emergency line only if confirmed).
- **Sticky action bar (mobile, every page):** **Call · WhatsApp · Book**, equal thirds, icon + label, 56px + safe
  area; hidden while a form field is focused; body gets matching bottom padding. Replaces `FloatingCta.astro`. If
  nobody will answer WhatsApp: **Call · Directions · Book**.
- **Footer:** four columns — Treatments (every published condition + "All conditions") · Visit & Book (Visit Us,
  Book, Before & After Surgery, FAQ) · About (Doctor & Clinic, Health Tips) · Contact (name/address/phone exactly as
  on the Google Business Profile, hours, WhatsApp, email, map link). Bottom row: registration number, "General
  information, not a substitute for a consultation", privacy note, Gujarati tagline, © build year.

## 5. Homepage
| # | Section | Visitor question |
|---|---|---|
| 1 | **Hero** — one real photo (slideshow component with a single slide); "Rivaansh ENT, Head & Neck Centre · Gota, Ahmedabad", Gujarati tagline, "Dr. Tanay S Parikh, MS ENT, Fellowship in Otology", today's hours, 4th-floor landmark, Call / WhatsApp / Book | What is this, who runs it, where, can I reach them now? |
| 2 | **What we treat** — chips grouped Ear & Balance / Nose, Sinus & Allergy / Throat & Voice / Head, Neck & Thyroid / Children + "Not listed? Call to ask" | Do they treat my problem? |
| 3 | **Meet the doctor** — portrait, qualifications, registration no., languages, three-line factual bio | Who will examine me? |
| 4 | **The clinic** — 3–4 captioned real photos, actual equipment in plain words, hygiene facts | Is it clean and properly equipped? |
| 5 | **Your first visit** — 4 steps, what to bring, consultation fee | What happens and what does it cost? |
| 6 | **Location & timings** — static map image opening Google Maps, landmarks, lift, parking, hours | How and when do I get there? |
| 7 | **Quick answers** — children? walk-ins? Sunday? same-day hearing test? after hours? | What else is stopping me? |
| 8 | **Health Tips** — 3 latest, only once real articles exist | — |

**Removed:** stats band (15+, 10,000+, 98%), testimonials, template specialists and cartoon avatars, unconfirmed
service columns, "READ MORE" → `about.html`, "Empowering Better Lives" tagline, stock "doctor" photos. A's
"How can we help?" tiles are rejected: education seekers land on condition/tip pages from Google, so those pages
must stand alone.

## 6. Page templates
**Condition page** (one markdown file each). Metadata: title, local names (Gujarati/Hindi, e.g. "ચક્કર / chakkar
aana"), area group, children flag, procedures (name + anchor), related tips, reviewed date, draft flag. Title
"Vertigo & Dizziness"; browser title adds "— ENT, Gota, Ahmedabad". Headings:
1. In short — 2–3 lines + inline Call / WhatsApp
2. What it is
3. Common symptoms
4. When to see a doctor — and **when it's urgent**
5. What happens at your visit here (only tests actually done at this clinic)
6. Treatment options — medicines, procedures, surgery (each procedure has an anchor; the hub's `#procedures` points to it)
7. If you need a procedure — short summary linking to `care.html#<procedure>`
8. Questions patients ask (3–5, this condition only)
9. Doctor mini-card (photo, credentials, registration no.) + action block (call, WhatsApp, hours, address)
10. Related health tips
11. "Reviewed by Dr. Tanay S Parikh, MS ENT · Last reviewed <date> · General information, not a diagnosis."

**Doctor & Clinic** (`#doctor`, `#clinic`, `#surgery`): `#doctor` — real portrait; each qualification with
institution and year; registration number and council; "Practising since <year>" only if confirmed; areas of
interest as facts; languages; current memberships only. `#clinic` — 4–8 captioned photos in the lightbox (signboard
and exterior first, for wayfinding), equipment in plain words ("we can look inside your nose with a camera during the
visit"), hygiene facts (sterilisation method, single-use items). `#surgery` — where operations happen and who gives
anaesthesia. Banned adjectives: "highly skilled", "state-of-the-art", "hospital-grade", "world-class".

**One topic, one page:** condition pages own "what is X, symptoms, treatment"; Health Tips only cover behaviour and
prevention topics spanning several conditions; each tip links to 1–3 condition pages and vice versa. "What is
tinnitus" is a condition page, never a tip — so blog1 and blog3 are redirected and blog2 is rewritten.

## 7. Content plan
**Launch condition pages (8, all from the flyer):** vertigo & dizziness (matches the Otology fellowship); hearing loss
& hearing aids; perforated eardrum; ear pain & ear infections; tonsils & adenoids; sinus, allergy & blocked nose;
snoring; thyroid & neck swellings.
**Phase 3:** voice change, foreign bodies, ear lobe repair, head & neck cancer (written with extra care),
mucormycosis & nasal endoscopic follow-up, tinnitus, nosebleeds, ear wax.

**Launch health tips (8):** when to see an ENT doctor and when it's urgent (sudden hearing loss, foreign body,
nosebleed that won't stop, trouble breathing/swallowing, neck lump or hoarseness > 3 weeks); cotton buds, ear oil and
roadside ear cleaning — what's safe; is your parent's hearing getting worse?; loud sound and hearing — Navratri,
weddings, DJs, earphones (rewrite of blog2); steam, saline and nasal sprays incl. decongestant overuse; children's ear,
nose and throat — common vs worrying; caring for your voice — teachers, sellers, singers; swimming, bathing and your
ears.

**Gujarati, in order:** (1) Gujarati/Hindi local names in every condition title and intro; (2) Visit Us essentials
(hours, address, landmarks, directions); (3) aftercare sheets on `care.html`; (4) Phase 3 — full Gujarati versions of
the top 3 condition pages and Visit Us, only if Search Console shows Gujarati searches. A native speaker reviews every
translation; no unreviewed machine translation.

**Compliance rules (every page):** facts only (name, qualifications, registration no., services, hours, address,
fees); no superlatives or rankings ("best", "leading", "trusted", "one-stop", "advanced", "painless"); no
testimonials, rating widgets, patient stories or before/after photos; no patient counts, success rates or
"years of experience" badges unless documented; no guaranteed results; no discounts, offers or comparisons; no
identifiable patients; list only services the doctor confirms in writing; every medical page shows "Reviewed by" and a
date; "24/7" only if a named number is answered 24/7; "hospital" only if registered as one.

## 8. Owner-content restructure (replaces folders 00–14)
| Folder | Replaces | Owner provides | Owner time |
|---|---|---|---|
| `00-clinic-facts` | 00, 08, 12, 13, parts of 09/14 | One questionnaire: name, phone numbers and their purpose, WhatsApp number and who answers it, email, Google Maps link, hours, holidays, 24/7?, Unjha?, registration no., languages, fees, payment methods, mediclaim, where surgery is done, lift/parking | 30 min |
| `01-photos` | photo folders in 01, 02, 11, 12 | One phone photo session; sub-folders doctor-portrait, exterior-signboard, reception, consultation-room, equipment, operation-theatre (only if one exists) | 1 hr |
| `02-doctor-profile` | 02, 03 | Qualifications with institute and year, fellowship, council, memberships, areas of interest | 20 min |
| `03-conditions-review` | 04, 05, 06 | **We draft each condition**; the doctor corrects it or replies "OK" on WhatsApp and confirms tests/procedures done here | ~15 min per page |
| `04-surgery-guides` | 07 | Photos/scans of handouts already given to patients | 15 min |
| `05-health-tips-review` | 10 | Approve our drafts; list the questions patients ask most | 1 hr |
| `06-faq` | 14 | Receptionist lists the 10 most common phone questions | 20 min |

≈ 5 hours of owner time in total. Update `owner-content/README.md` and the folder map in
`.claude/skills/rivaansh-owner-content-intake/SKILL.md` to match.

## 9. Redirects
Add each rule for both the `.html` and extensionless path; delete the old page files so Netlify "shadowing" can't block
the rule; redirects only work after `netlify.toml` switches from `www/` to building Astro into `dist/`. After deploy,
check that `#anchor` destinations survive.

| Current | → New |
|---|---|
| `/pages/about.html` | `/pages/about-us.html` |
| `/pages/specialities.html` | `/pages/ent.html` |
| `/pages/surgeries.html` | `/pages/ent.html#procedures` |
| `/pages/gallery.html` | `/pages/about-us.html#clinic` |
| `/pages/locations.html` | `/pages/contact.html` (Unjha as a second card only if confirmed) |
| `/pages/faq.html` | `/pages/contact.html#faq` |
| `/pages/online-consultation.html` | `/pages/appointment.html` |
| `/pages/blog/blog1.html` (tinnitus) | `/pages/ent.html#ear` until the tinnitus page exists, then that page |
| `/pages/blog/blog3.html` (allergies) | `/pages/ent.html#nose` until the sinus page exists, then that page |
| `/`, `ent`, `about-us`, `contact`, `appointment`, `care`, `blog`, `blog/blog2` | Keep |

## 10. Phased roadmap
**Phase 1 — structure, no owner input (≈ 9–10 developer days):**
- Navigation: `navigation.ts` with the 4 links; rebuild header, drawer and utility strip (1.5 d). Mobile action bar
  replaces FloatingCta, showing Call + Book until WhatsApp is confirmed; every number from one field in `site.ts`
  (0.5 d). Footer (0.5 d).
- Conditions: collection, page template, rebuilt hub with unwritten conditions as plain text (1.5 d).
- Pages: merge into Doctor & Clinic, Visit Us and Book; turn `care.html` into a short overview (1.5 d). Rebuild the
  homepage (1 d).
- Compliance cleanup (0.5 d): remove stats, testimonials, template staff, unconfirmed services, superlatives, the
  wrong-doctor page and the stock portrait (monogram until a real photo arrives); hide the Unjha card; hide every form
  until it has somewhere to send.
- Deploy & SEO (0.5 d): `netlify.toml` cutover, redirects, clinic structured data, sitemap.
- Drafts: 8 condition drafts + 8 tip drafts, all `draft` until the doctor reviews them (2 d).
- Owner folders restructured as in §8 (0.5 d).

**Phase 2 — after owner content (≈ 4–6 developer days over 4–6 weeks):** apply facts; turn on WhatsApp and the
request form (pre-filled WhatsApp message or Google Sheet, with "for me / my child / my parent"); real photos; publish
condition pages in batches of 2–4 as approved; per-procedure sections on `care.html`; publish tips; Gujarati Visit Us
essentials and aftercare sheets; match the Google Business Profile exactly.

**Phase 3 — growth (1–2 days a month):** remaining 8 condition pages; 1–2 tips a month; Gujarati versions of top
pages; tip filters once there are more than 12 tips; grouped menus only when B's thresholds are reached (a second
doctor, a confirmed second branch, more than 25 conditions, or more than 40 articles).

## 11. Owner decisions (recommendation in brackets)
1. Official name (Rivaansh ENT, Head & Neck Centre — matches the signboard).
2. One public number (one mobile for Call + WhatsApp; landline only on Visit Us as "Appointments – landline");
   must match the Google Business Profile.
3. WhatsApp: who answers, during which hours, auto-reply text (no WhatsApp button if nobody answers in clinic hours).
4. 24/7 emergency (publish only if a named number is answered at 2 AM; otherwise out-of-hours advice to go to the
   nearest hospital emergency department).
5. Unjha branch: exists? address, days, hours.
6. Fees (show the consultation fee) and payment methods.
7. Where surgery is done, and whether to name the hospital.
8. Video consultation (drop unless really offered).
9. Registration number and council (publish both).
10. Gujarati "hospital" wording — accurate?
11. Draft-and-review workflow (review 2 condition pages a week).
12. Staff consent for photos showing faces.

## 12. Validation
**Before launch:** waiting-room test on the Phase 1 Netlify preview, on a phone. 6 consenting people (2 aged 55+ or
carers, 2 Gujarati-first readers, 2 parents), ~10 minutes each, no personal data. Tasks: "Your father can't hear
well — can they help? Call them." · "What time are they open on Sunday?" · "What does a first visit cost?" · "Last
week's tonsil surgery — what can you eat?" · "A child pushed a bead up his nose — what now?" Rename any label that
fewer than 4 of 6 tap first. Repeat 4 weeks after launch.

**Metrics** (cookie-less analytics, e.g. GoatCounter or Plausible):
1. Taps on Call / WhatsApp / Directions / form, per page — condition pages should start producing contact taps.
2. Search Console impressions and clicks for "ENT doctor Gota", "vertigo treatment Ahmedabad" and condition topics,
   plus the share of visits landing on condition and tip pages.
3. Google Business Profile calls, direction requests and website clicks per month.
4. A 4-week reception tally: "How did you find us?" — website / Google Maps / referral / flyer.

Also watch redirect hits and 404s on old URLs.
