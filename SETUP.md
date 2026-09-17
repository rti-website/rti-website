# Run the RTI site locally — step by step

Windows, macOS or Linux. You need **Node 22.22 or newer** (`node -v` to check;
get it from nodejs.org if yours is older).

---

## 1. Unzip and open the folder

Unzip `rti-website.zip` wherever you keep projects, then open a terminal in it.

    cd path/to/rti-website

On Windows, open the folder in File Explorer, type `cmd` in the address bar and
press Enter — that opens a terminal already in the right place.

## 2. Install the dependencies

    npm install

Takes a minute or two the first time.

> Windows note: if `npm run dev` ever fails with `Cannot find module
> './data/redirects.json'`, you have an older copy. The dev and build scripts now
> generate that file automatically, and the config tolerates it being absent.

## 3. Download the images and icons from Figma

    node scripts/fetch-figma-assets.mjs

**Do not skip this.** `public/images/` ships with 57 transparent placeholders.
This command replaces every one of them with the real export from the Figma
file. You should see 57 lines and then `57/57 assets downloaded`.

It has to run on your machine rather than mine because figma.com is blocked
from the cloud sandbox this was built in.

> If any line fails with HTTP 404, the Figma export link has expired (they last
> about 7 days from 15 Sep 2026). Tell me and I'll regenerate the manifest —
> `data/figma-assets.json` records the Figma node id for every asset, so nothing
> is lost.

## 4. Start the dev server

    npm run dev

Open **http://localhost:3000**. The homepage is built at 1920px and scales to
fit whatever width your browser is, so zoom out or widen the window to see it at
full size.

---

## Checking it before you commit anything

    npm run build          # every route must show ○ Static or ● SSG, never ƒ
    npm run verify:static  # noindex guard + prerender coverage

The build is currently green: 6 routes, all static, document height exactly
10391px — the same as the Figma frame.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript only, no build |
| `npm run redirects:build` | Regenerate `data/redirects.json` from `data/url-map.csv` |
| `npm run verify:redirects -- --base <url>` | Assert every 301 resolves in one hop |
| `npm run verify:parity -- baseline.csv staging.csv --staging-origin <url>` | Diff staging against the live crawl |

## Where things are

    src/app/page.tsx                 the homepage, section offsets documented at the top
    src/components/sections/         one file per Figma section, node id in each header
    src/components/design/Frame.tsx  the 1920 canvas primitives
    src/data/home.ts                 all homepage copy, transcribed from Figma
    src/lib/nav.ts                   navigation — every href is a LIVE site URL
    src/lib/urls.ts                  the only place a URL is built
    src/lib/seo.ts                   the only place metadata is built
    data/figma-assets.json           the asset manifest, with Figma node ids
