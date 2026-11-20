# Setting up your portfolio website

This is the list of things we need from you to get your site live. Most of it is sending us your content. The productions sheet takes about 5 minutes and is the only thing you set up yourself.

## 1. Send us your content

- [ ] **Your name** as it should appear, and what you do (e.g. "Actor · Singer")
- [ ] **Bio**: two or three short paragraphs
- [ ] **Headshots**: 2–6, in full size, with the photographer's name for each
- [ ] **Production photos** for the gallery, each with a caption: show, company, year, and photographer (e.g. "Hamlet, Stratford Festival, 2025 (Jane Doe)")
- [ ] **Videos**: links to 1–3 YouTube clips (reels, performances)
- [ ] **Contact email**, and your agent's details if you want them listed
- [ ] **Links**: Instagram, and anything else you'd like (IMDb, Spotlight, etc.)

## 2. Set up your productions list

Your "Productions" section updates itself from a Google Sheet. Add a row and it appears on the site within a few minutes.

1. Create a new sheet at [sheets.google.com](https://sheets.google.com).
2. In the first row, type these column headers. Leave out any you don't need:

   | Name of Production | Name of Character | Position | Location | Date | Time | Link to Site | Subtitle | Description |
   |---|---|---|---|---|---|---|---|---|
   | Hamlet | Ophelia | Lead | Stratford Festival | 2026-06-12 | 7:30 PM | https://… | Summer season | A short note |

   - **Position**: lead, ensemble, understudy, director, etc.
   - **Date**: written like `2026-06-12` sorts and displays most reliably.
   - **Link to Site**: tickets or the company's page for the show.
3. **File → Share → Publish to web**, choose **Comma-separated values (.csv)** instead of "Web page", and click **Publish**.
4. **Send us the link** it gives you.

Only the published copy is public. To keep the list current, edit the sheet; there's no need to publish again.

## 3. Your web address

- [ ] **Already have a domain** (like `yourname.com`)? Tell us where you bought it (GoDaddy, Namecheap, Squarespace…). We'll send you two records to add, or you can add us as a user on the account.
- [ ] **Don't have one?** Tell us the name you'd like and we'll check it's available. Expect about $15–25 a year.

## 4. After launch

- **Productions**: edit the sheet yourself, any time.
- **Everything else** (bio, photos, videos): send us the change and we'll update it.

---

## Developer steps

- Productions sheet: paste the published CSV link into `sheetUrl` in [`src/components/ProductionsList.tsx`](src/components/ProductionsList.tsx). More on the sheet format in [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md).
- Gallery photos and captions: [`src/data/galleryData.ts`](src/data/galleryData.ts) (images in `public/gallery/`). Hero image: `public/lovable-uploads/hero.jpg`.
- Email and Instagram are hard-coded in [`src/components/Contact.tsx`](src/components/Contact.tsx) and [`src/components/Footer.tsx`](src/components/Footer.tsx). Videos: [`src/components/Video.tsx`](src/components/Video.tsx).
- Run locally with `npm install && npm run dev`. Deploy as a static site (Vercel, Netlify or Cloudflare Pages): build `npm run build`, output `dist`.
