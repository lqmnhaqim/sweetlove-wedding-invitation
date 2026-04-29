# Test Plan — PR #1: Figma palette + new sections + admin roundtrip

App: `http://localhost:3000` (Next.js dev server, already running). Admin PIN `1234`.

## What's being verified
The Figma redesign (cream parchment + burgundy hearts + olive buttons) renders correctly across the new sections, and the new admin fields actually persist and feed into the homepage.

## Test 1 — Cover & Hero render with new palette and illustration
1. Open `http://localhost:3000/`. Cover screen shows folded parchment envelope with embossed wax-seal monogram `S&L`. Click `OPEN INVITATION`.
2. **Pass criteria** for Hero:
   - Eyebrow text reads exactly **"THE WEDDING OF"** (uppercase, letter-spaced).
   - Names appear as **"Sweet"** and **"Love"** stacked, with an italic ampersand between them.
   - Couple illustration SVG (bride in white/veil + groom in burgundy, inside a dotted heart frame) is visible.
   - Date line reads exactly **"Sunday, 22 November 2026"**.
   - Primary button text is exactly **"CONFIRM ATTENDANCE"** with **olive green** background (computed `background-color` ≈ `rgb(74, 93, 42)` / `#4a5d2a`).
   - At least 8 burgundy heart SVGs are visible scattered around the hero area, with a `heartPulse` animation applied (will inspect via DOM/computed style).

## Test 2 — Wedding Reception card (new section)
1. Scroll down past Hero.
2. **Pass criteria**:
   - Eyebrow reads **"Wedding Reception"**.
   - Card shows two parents lines: both contain **"Mr. Anonymous & Mrs. Anonymous"**.
   - Greeting paragraph contains the substring **"With joy and gratitude, we warmly invite Mr/Mrs/Encik/Puan/Dato'/Datin"**.
   - A burgundy heart divider sits between greeting and couple names.
   - Full names appear as **"Sweet Binti Anonymous"** and **"Love Bin Anonymous"** with a script `&` between them.

## Test 3 — Save The Date heart-frame date + countdown ticks
1. Continue scrolling to the **Save The Date** section.
2. **Pass criteria**:
   - Eyebrow reads **"Save The Date"** in burgundy script.
   - Heart frame contains the day **"22"** (zero-padded), flanked by faded **"21"** on the left and **"23"** on the right.
   - Month label is exactly **"NOVEMBER"** and weekday label is **"Sunday"**.
   - Countdown row shows 4 boxes labeled `month`, `days`, `hours`, `minutes`. Read minute value M1, wait 65 seconds, re-read M2 — **M2 must be M1 - 1** (or the hour rolled over). This proves the interval is live.
   - Two calendar buttons present: olive **"GOOGLE CALENDAR"** + olive **"APPLE CALENDAR"**.
   - "Find Your Way" subsection shows venue address + olive **"GOOGLE MAPS"** button + burgundy **"WAZE"** button (`href` starts with `https://waze.com/ul?q=`).

## Test 4 — Attire Guide swatches reflect data
1. Scroll to **Dress Code / Attire Guide** section.
2. **Pass criteria**:
   - Title is exactly **"Attire Guide"**, eyebrow **"Dress Code"**.
   - Three colour swatches visible with names **"Forest Green"**, **"Beige / Tan"**, **"Sage Green"** (case-insensitive substring match).
   - Each swatch's `background-color` matches its data hex (verified via DOM `style` attribute):
     - Forest Green swatch's inline style contains `#2f4a1e` (or computed rgb equivalent `rgb(47, 74, 30)`).
     - Beige/Tan swatch's inline style contains `#caa987` (`rgb(202, 169, 135)`).
     - Sage Green swatch's inline style contains `#8c9a6c` (`rgb(140, 154, 108)`).
   - Note paragraph contains substring **"reserved certain colours for the bride, groom"**.

## Test 5 — Admin roundtrip persists into homepage (the critical regression test)
This is the test designed to fail loudly if the new admin fields aren't actually wired.

1. Navigate to `http://localhost:3000/admin`. Enter PIN `1234`. **Couple** tab loads.
2. In the **Greeting / Invitation message** textarea, replace the value with the marker string **"DEVIN_TEST_GREETING_42"**. Click **Save Changes**. Toast should read **"Changes saved"**.
3. Click **Event** tab. Scroll to **Attire Guide (extended)** → **Colours to Avoid** → click **Add Colour**. In the new row, set Name = **"DEVIN_BLUE"** and Hex = **`#1d4ed8`**. Click **Save Changes**. Toast appears.
4. Open `http://localhost:3000/` in a new tab and scroll to the **Wedding Reception** section.
   - **Pass criteria**: greeting text contains the literal substring **"DEVIN_TEST_GREETING_42"**.
5. Scroll to the **Attire Guide** section.
   - **Pass criteria**: a 4th swatch exists labeled **"DEVIN_BLUE"** with inline style containing `#1d4ed8` (or `rgb(29, 78, 216)`).
6. Cleanup: return to admin, click **Reset** (confirm prompt) — verify `/` reverts to default greeting and 3 swatches.

**Why this test catches breakage**: if the schema/types/store didn't actually pick up the new fields, step 4 would still show the original greeting and step 5 would not show the new swatch. A broken implementation would therefore look visibly different from the passing case.
