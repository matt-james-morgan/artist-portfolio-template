# Artist Portfolio Template

A one-page portfolio for actors and performers: hero, bio, headshots, production gallery, videos, a productions list and contact.

**Setting up a new client? Start with [SETUP.md](SETUP.md):** what to ask the client for, and the developer steps.

The productions list reads a published Google Sheet (CSV). The sheet format is in [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md).

## Develop

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # static site in /dist
```

Stack: Vite, React, TypeScript, Tailwind, shadcn/ui, TanStack Query. Deploy `/dist` to Vercel, Netlify or Cloudflare Pages.

## Phone-width check

Every change gets this before it goes live (and before handing a site to a client):

```sh
npm run check:mobile
```

It starts the dev server, loads the home page at 320, 360, 390, 768 and 1280px in Chrome, and **fails if anything makes the page wider than the screen**, which is what makes a site look off-centre on phones. It names the element that sticks out, warns about tap targets under 44px, and saves full-page screenshots to `mobile-check/` (git-ignored). Look at the 360px ones. Check a deployed site with `BASE_URL=https://… npm run check:mobile`. Script: [`scripts/check-mobile.mjs`](scripts/check-mobile.mjs).
