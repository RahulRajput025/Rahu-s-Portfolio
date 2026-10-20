# Rahul Rajput — Portfolio

Personal portfolio of Rahul Rajput, full-stack and mobile software engineer.

**Live:** https://rahulrajput025.github.io/Rahu-s-Portfolio/

Built with React 19, TypeScript, Vite, Tailwind CSS v4, Motion and React Three Fiber.

## Run locally

Requires Node 20.19+ and pnpm.

```bash
pnpm install
pnpm dev        # http://127.0.0.1:5173
pnpm build      # type-check and build to dist/
pnpm preview    # serve dist/ at http://127.0.0.1:4173
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages through
`.github/workflows/deploy.yml`. A deploy can also be started by hand from the
Actions tab with "Run workflow".

## QA

`node qa/shoot.mjs` builds nothing itself; run `pnpm build` first. It serves
`dist/`, drives the site in headless Chromium across viewports and themes, saves
screenshots to `qa/screenshots/`, and fails on console errors or horizontal overflow.
