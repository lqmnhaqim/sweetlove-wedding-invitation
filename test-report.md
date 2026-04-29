# Test report — Figma redesign + admin roundtrip

I drove the localhost build end-to-end, walking each new section in order and then proving the admin form writes through to the homepage by saving two unmistakable marker values and reloading.

## Results

- **Cover** — passed: parchment envelope + 3D embossed S&L wax seal + olive `OPEN INVITATION` button render correctly.
- **Hero** — passed: `THE WEDDING OF` eyebrow, script `Sweet`/`Love`, couple illustration in dotted heart frame, `Sunday, 22 November 2026`, olive `CONFIRM ATTENDANCE` CTA, scattered burgundy hearts.
- **Wedding Reception** — passed: parents lines + greeting + heart divider + `Sweet Binti Anonymous` & `Love Bin Anonymous`.
- **Save The Date** — passed: heart-framed `22` flanked by `21`/`23`, `NOVEMBER` / `Sunday`, live countdown ticking (minutes 38 → 33 between two screenshots), olive `GOOGLE CALENDAR` + `APPLE CALENDAR`, `Find Your Way` with venue + olive `GOOGLE MAPS` (href confirmed pointing to maps.google.com) + burgundy `WAZE`.
- **Attire Guide** — passed: `Dress Code` / `Attire Guide` titles, 3 default swatches `FOREST GREEN` / `BEIGE / TAN` / `SAGE GREEN`, dashed-box note paragraph.
- **Admin → homepage roundtrip** — passed: setting greeting to `DEVIN_TEST_GREETING_42` and adding a swatch `DEVIN_BLUE` (`#1d4ed8`) in `/admin` survives a save and renders on `/` (greeting in reception card, blue circle as 4th swatch in Attire).
- **Travel `Things to Do` comma input regression** (Devin Review fix) — passed: typing `, DEVIN_NEW_ITEM` after `Fine Dining` now persists the trailing comma + new token; previous behavior stripped the trailing comma on every keystroke.

## Evidence

### Hero & Wedding Reception

| Hero | Wedding Reception |
| --- | --- |
| ![hero](https://app.devin.ai/attachments/dba2fe12-38e7-4eff-a49b-da87b97b1c2d/hero.png) | ![reception](https://app.devin.ai/attachments/904bcb99-257f-43c4-b2d7-ac0b33516532/reception.png) |

### Save The Date & Find Your Way

| Save The Date | Find Your Way |
| --- | --- |
| ![std](https://app.devin.ai/attachments/0b5d5af0-5de3-4f71-a765-2e9c1214ce05/save-the-date.png) | ![way](https://app.devin.ai/attachments/f30f132f-7771-4b83-8a97-6b3c992a9f03/find-your-way.png) |

### Attire Guide

![attire](https://app.devin.ai/attachments/02340535-2539-400d-9b14-3793480af1d0/attire.png)

### Admin roundtrip

| Greeting marker | Blue swatch added |
| --- | --- |
| ![greeting](https://app.devin.ai/attachments/fbf1239c-cdc7-4613-a243-d07d68ec5383/admin-greeting-roundtrip.png) | ![swatch](https://app.devin.ai/attachments/47ea3658-67ba-4ccc-a476-f081713250a9/admin-swatch-roundtrip.png) |

### Comma-input regression

![comma](https://app.devin.ai/attachments/db4c1a38-9c3c-431e-8f32-df8b44b3b207/comma-fix.png)

### Recording

[Walkthrough video](https://app.devin.ai/attachments/61c9e88b-ddf9-4d31-a17f-92fa1b55cd9c/rec-d3852934-85f7-4c44-8e8d-c4a982999c2d-subtitled.mp4)

## Follow-up fixes pushed during this session

- `SaveTheDate.tsx` — guard `parseISO` against Invalid Date and wrap `format()` in a `safeFormat` helper.
- `store.ts` — replace shallow merge with `deepMergeDefaults` so older localStorage payloads still receive newly-added nested fields (`couple.heroImageUrl`, `reception.*`, `attire.*`).

Both addressed Devin Review comments on PR #1 and were committed in 9f8d3d7.
