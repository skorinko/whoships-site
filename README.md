# whoships.app

The website for [Whoships](https://whoships.app/), the Mac app that shows a GitHub organization's
pull requests, CI, reviews and DORA metrics in widgets, the menu bar and a desktop dashboard.

Eleventy 3. Source in `src/`, output in `_site/`. Every push to `main` is built, checked and
deployed to GitHub Pages by `.github/workflows/pages.yml` (Settings › Pages › Source: GitHub Actions).

```bash
npm ci
npm run serve    # http://localhost:8766
npm run build && npm run check
```

- `src/_data/site.js`: facts (price, trial, App Store, locales, hub slugs). Version and date come
  from `appcast.xml`.
- `src/_data/i18n/<locale>.json`: strings for the 11 localized pages; `en.json` is the source.
  `node scripts/i18n-check.mjs` checks the others against it.
- `src/_data/watchers.json`: the ten watcher pages.
- `src/guides/`, `src/compare/`: Markdown articles.
- `appcast.xml`: the Sparkle update feed, written by `Whoships/tools/release-direct.sh publish`,
  which commits and pushes it here. It's served unchanged; `whoships.app/download` (the
  edge-analytics Worker) reads it.
- `assets/`: CSS, analytics, Paddle checkout (`buy.js`), images. Screenshots and watcher images
  come from `Whoships/tools/make-screenshots.sh`.
- `static/`: copied to the site root (IndexNow key, `/img/icon.png` for Paddle's product image).

Content and SEO plan: [docs/content-strategy.md](docs/content-strategy.md). Launch copy:
[docs/launch-kit.md](docs/launch-kit.md).
