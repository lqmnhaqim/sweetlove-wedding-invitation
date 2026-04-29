# Sweet & Love — Wedding Invitation

A warm, elegant wedding invitation web app. Built as a reusable template — every piece of content is editable from a built-in admin page.

Inspired by the visual style of [SweetLove Theme](https://sweetlove-theme.thedigitalinvite.com/) (dusty rose / cream palette, serif typography, scroll-fade animations). All markup, CSS, and copy in this repo are written from scratch and use placeholder content.

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Plain CSS** + CSS Modules (no Tailwind)
- **Zod** for form validation
- **Lucide React** for icons
- **date-fns** for date formatting + countdown
- **xlsx** for exporting RSVP responses
- **localStorage** for content persistence and RSVP storage (no backend required)
- **ESLint** for linting

## Features

- Animated envelope cover with wax-seal monogram entry screen
- Hero with names, date, live countdown, and CTA
- "Our Love Story" timeline (alternating left/right)
- "Day Program" schedule with iconography
- Gifts section with reveal IBAN + copy-to-clipboard
- Event Details (ceremony info, dress code, map + calendar links)
- RSVP form with Zod validation; submissions stored in localStorage
- Travel & Accommodation section (hotels, transit, things to do, contact)
- Floating petal animation, scroll-fade reveals, sticky navigation
- `/admin` page (PIN-gated) to edit every piece of content live, manage RSVP responses, and export them to Excel

## Getting Started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

The admin page is at <http://localhost:3000/admin>. Default PIN: `1234` (change it from the Settings tab).

## Useful Scripts

```bash
npm run dev     # Start the development server
npm run build   # Build for production
npm run start   # Run the production server
npm run lint    # Lint the project
```

## Project Structure

```
src/
├─ app/
│  ├─ admin/       # Admin page (content + RSVP management)
│  ├─ globals.css  # Design tokens, base styles, animations
│  ├─ layout.tsx   # Root layout with fonts
│  └─ page.tsx     # Main invitation page
├─ components/      # Cover, NavBar, Hero, Story, Program, Gifts, EventDetails, Rsvp, Travel, Footer, Reveal, Petals, Ornament
└─ lib/             # types, defaults, schemas, store (localStorage hooks)
```

## Reusing the Template

1. Visit `/admin`, sign in with PIN `1234`
2. Edit the couple, story, program, gifts, event, travel, and settings tabs
3. Click **Save Changes** — content is persisted in your browser's localStorage
4. Use **RSVPs** tab to view and export responses; **Reset** to restore defaults

To swap localStorage for a real backend later, only `src/lib/store.ts` needs changing.
