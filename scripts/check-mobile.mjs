#!/usr/bin/env node
// Phone-width check: loads the site at phone, tablet and desktop widths and fails if anything
// pushes the page wider than the screen (the "off-centre on mobile" bug). It also lists tap
// targets smaller than 44px as warnings, and saves screenshots to mobile-check/ (git-ignored).
//
//   npm run check:mobile                 starts the dev server itself and checks "/"
//   npm run check:mobile -- / /about     check more pages
//   BASE_URL=https://example.com npm run check:mobile   check a deployed site instead
//
// Uses your installed Google Chrome. Set CHROME_PATH if it isn't found.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import net from "node:net";
import puppeteer from "puppeteer-core";

const WIDTHS = [320, 360, 390, 768, 1280];
const PHONE = 768; // below this, emulate a touch phone
const paths = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (paths.length === 0) paths.push("/");

const chromePath =
  process.env.CHROME_PATH ||
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find(existsSync);
if (!chromePath) {
  console.error("Chrome not found. Install Google Chrome or set CHROME_PATH.");
  process.exit(2);
}

const freePort = () =>
  new Promise((resolve) => {
    const srv = net.createServer().listen(0, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

const waitFor = async (url, ms = 30000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Dev server didn't start at ${url}`);
};

let server;
let base = process.env.BASE_URL?.replace(/\/$/, "");
if (!base) {
  const port = await freePort();
  base = `http://localhost:${port}`;
  server = spawn("npx", ["vite", "--port", String(port), "--strictPort"], {
    stdio: "ignore",
    detached: true,
  });
  await waitFor(base);
}
const stopServer = () => {
  if (server) try { process.kill(-server.pid); } catch {}
};
process.on("exit", stopServer);

mkdirSync("mobile-check", { recursive: true });
const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
let failures = 0;

for (const path of paths) {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    const phone = width < PHONE;
    await page.setViewport({ width, height: 800, isMobile: phone, hasTouch: phone, deviceScaleFactor: 1 });
    await page.goto(base + path, { waitUntil: "networkidle0", timeout: 30000 });

    // Scroll through the page so scroll-triggered animations and lazy content have run.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 800));
    });

    const result = await page.evaluate((width) => {
      const vw = width;
      const visible = (el) =>
        el.checkVisibility?.({ opacityProperty: true, visibilityProperty: true }) ?? true;
      // Overflow inside a scrolling/clipping box that itself fits (carousels, swipe rows) is fine.
      const contained = (el) => {
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
          const ox = getComputedStyle(a).overflowX;
          if (ox !== "visible" && a.getBoundingClientRect().right <= vw + 1) return true;
        }
        return false;
      };
      const label = (el) => {
        const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 4).join(".") : "";
        const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
        return `<${el.tagName.toLowerCase()}${cls ? "." + cls : ""}>${text ? ` "${text}"` : ""}`;
      };

      const sticking = [...document.body.querySelectorAll("*")].filter((el) => {
        const r = el.getBoundingClientRect();
        // Partly on screen (fully off-screen drawers are fine) but past the right edge
        return r.width > 0 && r.left < vw && r.right > vw + 1 && visible(el) && !contained(el);
      });
      // Report the outermost offenders, not every child inside them.
      const culprits = sticking.filter((el) => !sticking.includes(el.parentElement));

      const small = [...document.querySelectorAll("a[href], button, input, select, textarea, [role=button]")]
        .filter((el) => {
          if (!visible(el)) return false;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          // Links inside running text are exempt (WCAG 2.5.8 inline exception)
          if (el.tagName === "A" && getComputedStyle(el).display === "inline" && el.closest("p, li")) return false;
          return r.width < 44 || r.height < 44;
        })
        .map((el) => {
          const r = el.getBoundingClientRect();
          return `${label(el)} ${Math.round(r.width)}×${Math.round(r.height)}`;
        });

      return {
        pageWidth: Math.max(document.documentElement.scrollWidth, innerWidth),
        culprits: culprits.map((el) => `${label(el)} reaches ${Math.round(el.getBoundingClientRect().right)}px`),
        small,
      };
    }, width);

    const overflow = result.pageWidth > width + 1 || result.culprits.length > 0;
    const name = `${path === "/" ? "home" : path.replace(/\W+/g, "-").replace(/^-|-$/g, "")}-${width}`;
    await page.screenshot({ path: `mobile-check/${name}.png`, fullPage: true });

    console.log(`${overflow ? "✗" : "✓"} ${path} @ ${width}px${overflow ? `: page is ${result.pageWidth}px wide` : ""}`);
    for (const c of result.culprits.slice(0, 8)) console.log(`    sticks out: ${c}`);
    if (phone && result.small.length) {
      console.log(`    warning: ${result.small.length} tap target(s) under 44px, e.g.`);
      for (const s of result.small.slice(0, 3)) console.log(`      ${s}`);
    }
    if (overflow) failures++;
    await page.close();
  }
}

await browser.close();
stopServer();
console.log(failures ? `\n${failures} check(s) failed. Screenshots in mobile-check/` : "\nAll widths fit. Screenshots in mobile-check/");
process.exit(failures ? 1 : 0);
