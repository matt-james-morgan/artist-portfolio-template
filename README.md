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
