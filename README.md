# Mountain Children's Home website

Public website for OHCDS Mountain Children's Home, a family home for 40 children in Budhanilkantha, Dadagaun, Kathmandu.

Built with React 19, Vite, Tailwind CSS v4, TanStack Query, react-hook-form and zod. Content (letters, events, albums, photos) and contact messages come from the OHCDS CMS API.

## Getting started

Requires Node 20+ and pnpm 9.

```bash
pnpm install
echo "VITE_APP_SERVER_URL=https://mchapi.codex.com.np/api" > .env.local
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server with hot reload |
| `pnpm build` | Typecheck, then production build to `dist/` |
| `pnpm lint` | ESLint (Airbnb rules) |
| `pnpm preview` | Serve the production build locally |

## Where things live

```
src/
  App/           Router (pages are code-split), auth guards, route error page
  components/    Layout, Navbar, Footer, PageHeader, ReplyPanel, States, ui/button
    Postal/      The airmail world: Stamp, Postmark, FrankedFigures
    Sections/    BudgetLedger and Credentials, shared by Home and Transparency
  constants/     Navigation, contact details, approved figures and budget split
  hooks/         useInView, usePageTitle
  lib/           api.ts (typed CMS calls), format.ts (dates, excerpts, HTML sanitizing), base.ts (axios)
  pages/         One folder per route
```

Figures, the budget split and contact details live in `src/constants`. Change them there and every page follows.

## Design

The visual system is documented in `DESIGN.md`, and product facts and approved claims are in `PRODUCT.md`. Read both before adding a page. Copy uses no em dashes.

## Deploying

`Dockerfile` builds the site and serves `dist/` with `serve` on `$PORT` (default 3000). CI in `.github/workflows/ci.yml` lints and builds on every push.
