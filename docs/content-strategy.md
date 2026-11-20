# Whoships content and SEO strategy

Living document. Owner: Dmitry. Started 2026-11-20. Review monthly (see "Monthly routine").
Modelled on mailkin.app's strategy (`~/Mailkin/mailkin-site/docs/content-strategy.md`); the site
uses the same Eleventy setup, templates and checks.

## 1. Goal and positioning

**Goal:** engineers, team leads and CTOs who look for a way to see their GitHub organization's
pull requests, CI and delivery numbers on a Mac find Whoships, in Google, Bing, the App Store and
AI assistants (ChatGPT, Claude, Gemini, Perplexity, Copilot), and the answer states the facts
correctly.

**The opening:** GitHub has no Mac widgets and no organization-wide "what needs me" view on the
desktop. Results for "github mac widget", "github menu bar app" and "github pull request
dashboard" are notification menu bar apps, per-repo PR clients and SaaS engineering-metrics
platforms priced per seat. Nothing owns "your organization's pulse on your Mac desktop, read-only,
no server, pay once".

**Canonical one-liner** (word for word everywhere: site, llms.txt, listings, press):

> Whoships is a Mac app that shows your GitHub organization's pull requests, CI, reviews and DORA
> metrics in desktop widgets, the menu bar and a desktop dashboard.

**Fact block** (`facts` in `src/_data/i18n/*.json`, shown on most pages and in llms.txt):
€19.99 / US$19.99 once after a 14-day trial; sample data always free; macOS 26+; 11 interface
languages; 10 watchers refreshing every 3/15/60 min; read-only; the token stays in the keychain;
only the app talks to GitHub.

**Privacy wording differs by build.** The App Store build sends nothing to us. The whoships.app
build sends anonymous usage statistics (`first_launch`, `app_active`), which can be turned off.
Never write "no analytics" without that split (`app-store/metadata.md` in the app repo is the
App Store wording and may say it for that build only).

**Three pillars**

1. *Own the problem queries:* "PRs waiting for my review", "GitHub widget Mac", "DORA metrics
   GitHub", "flaky GitHub Actions", one page per question.
2. *Be the quotable source:* pages open with a direct answer, carry the fact block, and say
   plainly what Whoships doesn't do (one org at a time, no GitHub Enterprise Server, Mac only).
3. *Exist off-site:* listings, community answers, newsletters and press, all with the one-liner.

**Trademark rule:** titles say "for GitHub" or "from GitHub", never "GitHub <product>" as a name.
The footer's "not affiliated with GitHub" line stays on every page.

## 2. What's built (site architecture)

English at the root, the other 10 app languages under `/de/ /es/ /fr/ /it/ /ja/ /ko/ /pt-br/
/pt-pt/ /zh-hans/ /zh-hant/`.

| Section | URL | Locales | Target queries |
|---|---|---|---|
| Home | `/` | 11 | github dashboard mac, Whoships |
| Hub: desktop dashboard | `/github-dashboard-mac/` | 11 | github organization dashboard, github wallpaper dashboard |
| Hub: widgets | `/github-widgets-mac/` | 11 | github widget mac, github desktop widget |
| Hub: menu bar | `/github-menu-bar-app-mac/` | 11 | github menu bar app, pull request menu bar mac |
| Pricing, Support, FAQ | `/buy/ /support/ /faq/` | 11 | whoships price, questions |
| Watchers | `/watchers/`, `/watchers/<slug>/` (10) | en | see `src/_data/watchers.json` |
| Guides | `/guides/…` | en | how-to queries |
| Comparisons | `/compare/…` | en | X vs Y, alternatives |
| Changelog, Press kit | `/changelog/ /press/` | en | freshness, journalists, LLM facts |
| Legal | `/privacy/ /terms/ /refunds/` | en | none |
| Old URLs | `/buy.html` etc. | en | noindex, forward with query string (the app's buy link uses `buy.html?utm_…`) |
| Machine-readable | robots.txt, sitemap.xml, llms.txt, llms-full.txt, feed.xml | n/a | crawlers, AI agents |

**Where things live**

- `src/_data/site.js`: facts (price, trial, App Store ID, `appStoreLive`, locales, hub slugs).
  Version and date come from `appcast.xml`.
- `src/_data/i18n/<locale>.json`: every localized string; `en.json` is the source.
- `src/_data/watchers.json`: the ten watcher pages (English). Images:
  `assets/watchers/<key>-light.webp` / `-dark.webp`, rendered from sample data with
  `Whoships/Packages/WhoshipsCore` → `swift run WhoshipsRender <dir> --sample`, then `cwebp`.
- Guides and comparisons: Markdown with front matter (`title`, `h1`, `short`, `description`,
  `updated`, `faqItems`).
- JSON-LD: built in `eleventy.config.js` (SoftwareApplication with offers, Organization, WebSite,
  FAQPage, Article, BreadcrumbList). No ratings until real reviews exist.

**Rules for every new page**

- The first two sentences answer the query (`<p class="answer">`).
- Question-style H2s, a table when comparing, 3 or 4 FAQs.
- One H1, a unique title under 60 characters, a description under 155, a visible "Last updated",
  at least 3 internal links (a hub, a watcher, a guide).
- Every claim about Whoships matches the app's code or README; every claim about GitHub or a
  competitor comes from their own docs, checked on the date the page shows.
- No thin pages: a watcher page ships only with a real sample-data image and its own FAQ.
- Comparisons include "when the other option is better" and the date competitor facts were checked.
- `npm run build && npm run check` before pushing (CI runs it too).

## 3. Content backlog

P1 = next month, P2 = months 2–3, P3 = later or when a feature ships. After month 1, picks come
from Search Console: queries at position 8–20 get a new or stronger page.

**Built on 2026-11-20:** home, 3 hubs, pricing, support and FAQ in 11 languages; 10 watcher pages;
6 guides; comparisons; changelog; press kit; 404; machine-readable files.

**Guides**

| P | Title | Target query |
|---|---|---|
| done | See every pull request waiting for your review | PRs waiting for my review github |
| done | Add GitHub widgets to your Mac desktop | github widget mac |
| done | Measure DORA metrics from GitHub without a platform | dora metrics github |
| done | Why did my GitHub Actions run fail? | github actions failed why |
| done | Get your GitHub organization to approve an OAuth app | github oauth app approval organization |
| done | Best GitHub apps for Mac | best github app mac |
| P1 | Run a standup from your desktop dashboard | async standup github |
| P1 | Spot review bottlenecks in a GitHub organization | code review bottleneck |
| P1 | Dependabot alerts for a whole organization | dependabot alerts organization |
| P2 | Find stale pull requests in GitHub | stale pull requests github |
| P2 | Flaky tests in GitHub Actions: find and fix them | flaky tests github actions |
| P2 | Track deploys with GitHub Deployments (so DORA is accurate) | github deployments environment production |

**Comparisons:** P1 vs Raycast's GitHub extension. Add others only where the competitor's own
site gives enough facts to compare honestly.

**Use cases (P1), under `/for/`:** staff engineers, engineering managers, startup CTOs,
open-source maintainers. Each: the scenario, which watchers, a widget layout, setup, FAQ.

**Glossary (P2), `/glossary/`:** lead time for changes, change failure rate, deployment frequency,
time to restore, cycle time, time to first review, flaky test. Short definitions with how Whoships
measures each; good LLM citation targets.

**Localization (P2):** localize the watcher pages and guides that get impressions in Search
Console, starting with de and ja. Watcher names must match the app's string catalog.

**Feature hubs (P3, one per shipped feature):** from the app's README backlog: deploy and
incident correlation, release readiness, review fairness, CODEOWNERS coverage, bus factor,
Copilot and AI-agent activity, Slack/Teams forwarding. Each gets a hub or watcher page, 2–3 guides
and 1–2 comparisons. No page before the feature ships.

## 4. Technical SEO checklist

**Done (seo-foundation branch):**

- [x] Canonical, hreflang (11 locales + x-default), Open Graph and Twitter tags, `assets/og.png`
- [x] JSON-LD on every page
- [x] robots.txt allows search and AI crawlers explicitly; sitemap with hreflang alternates
- [x] llms.txt and llms-full.txt generated from the same data as the pages
- [x] RSS `/feed.xml` (releases and guides)
- [x] Custom 404, apple-touch-icon, meta description on every page
- [x] Screenshots as WebP with width and height; lazy loading below the fold
- [x] `buy.js` reads its strings from the button; Paddle checkout opens in the page's language
- [x] Old `.html` URLs forward with their query string; `/img/icon.png` kept for Paddle's product image
- [x] IndexNow key file in `static/`

**Owner's steps:**

- [ ] GitHub: `whoships-site` › Settings › Pages › Source: **GitHub Actions**, then merge the
      `seo-foundation` pull request (merging deploys).
- [ ] After the first deploy: `https://whoships.app/appcast.xml` and `/download` still work
      (Sparkle and the edge-analytics Worker read the appcast), `/buy.html?utm_source=x` lands on
      `/buy/?utm_source=x`.
- [ ] Cloudflare: AI Crawl Control / "Block AI bots" must not block the crawlers robots.txt allows;
      managed robots.txt off. Use AI Crawl Control analytics (GitHub Pages has no logs).
- [ ] Google Search Console: domain property via DNS TXT, submit the sitemap, request indexing for
      `/`, `/github-widgets-mac/`, `/watchers/dora-metrics/` and `/de/`.
- [ ] Bing Webmaster Tools: import from Search Console, submit the sitemap (Bing feeds ChatGPT
      search and Copilot).
- [ ] IndexNow: after each deploy, ping
      `https://api.indexnow.org/indexnow?url=<changed url>&key=<key in static/>`.
- [ ] When the App Store version is live: `appStoreLive: true` and `pt=<provider ID>` in
      `appStoreUrl` (`site.js`), and the App Store Marketing URL `https://whoships.app/` and
      Support URL `https://whoships.app/support/`.
- [ ] Rich Results Test on `/`, `/faq/` and `/watchers/dora-metrics/`.

## 5. Off-site

See [launch-kit.md](launch-kit.md) for ready-to-paste copy.

- **Blocker first:** check that people can pay. The live Paddle token is in `assets/buy.js`; confirm
  Paddle has approved whoships.app (a live checkout opens) before any launch post.
- **Listings (P1):** AlternativeTo (as an alternative to Trailer, Gitify, LinearB), Product Hunt,
  MacUpdate, a PR to `jaywcjlove/awesome-mac` (Developer Tools), Indie Hackers, Show HN, Setapp.
- **Communities (ongoing, always disclosed):** r/macapps launch post; answer existing threads in
  r/github, r/devops, r/ExperiencedDevs, r/EngineeringManagers, GitHub Community discussions and
  Stack Overflow where Whoships genuinely answers the question.
- **Newsletters and press (P2):** Console.dev, TLDR, Changelog News, Pointer, MacStories, Michael
  Tsai's blog, Six Colors; local Mac press (Macwelt, iFun, MacGeneration, ITmedia) once the
  locales have had a native read. Angle: "GitHub has no Mac widgets. This app puts your whole
  organization on the desktop, and explains why CI failed."
- **Video (P1):** 60 seconds, "See your whole GitHub organization on your Mac desktop", embedded on
  `/github-dashboard-mac/` with `VideoObject`.
- **Reviews:** an App Store review prompt once the App Store version is live. `aggregateRating`
  only with real reviews.

## 6. App Store optimization

- Current en-US keywords: `PR,review,DevOps,DORA,engineering,lead,dashboard,widget,repository,developer,code,merge,team,GitHub`.
  "GitHub" is in the name and "PR", "review" are in the subtitle, so they're wasted in keywords.
  Consider replacing them with `pull request,menu bar,CI,actions,standup` after checking rank data.
- Per-locale keywords (`app-store/listing/*.json`) should match the site's hub titles in each
  language.
- Screenshot captions can reuse the hub H1s; promotional text (no review needed) mirrors
  `/changelog/` ("New: …").

## 7. Measurement

- **Search Console / Bing:** impressions, clicks and position by folder (`/watchers/`,
  `/guides/`, hubs, each locale).
- **PostHog** ([Whoships overview](https://eu.posthog.com/project/358159/dashboard/1132365)):
  - add an insight of pageviews by referring domain for AI assistants: chatgpt.com,
    chat.openai.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com, bing.com;
  - a funnel by landing folder: pageview → `download_clicked` → `dmg_download` → `first_launch`
    → `purchase`.
- **Cloudflare AI Crawl Control:** crawl volume per AI bot.
- **Monthly LLM check.** Ask ChatGPT, Claude, Gemini, Perplexity and Copilot (logged out where
  possible) and log: date, assistant, prompt, mentioned (y/n), facts correct (y/n), cited URL.
  1. Is there a GitHub widget for Mac?
  2. Best GitHub menu bar app for Mac
  3. How do I see all pull requests waiting for my review across an organization?
  4. Mac app to see what my engineering team is working on in GitHub
  5. How can I track DORA metrics from GitHub without a paid platform?
  6. GitHub dashboard for engineering managers on Mac
  7. Trailer alternative for Mac
  8. How do I see why GitHub Actions failed without opening the logs?
  9. One-time purchase alternative to LinearB for a small team
  10. Best Mac apps for developers 2026

| Date | Assistant | Prompt | Mentioned | Facts correct | Cited URL |
|---|---|---|---|---|---|
| | | | | | |

## 8. Localization notes

- The 10 locale files were drafted by AI from `en.json`, using the app's string catalog
  (`Whoships/Shared/Localizable.xcstrings`) for watcher names and UI labels, and the App Store
  listings for tone. Each needs a native read-through, starting with de, ja, fr and es.
- Form of address follows the app and listing (German "du").
- Every new string goes into every locale file, or `node scripts/i18n-check.mjs` fails the build.

## 9. Monthly routine (about 2 hours)

1. Search Console and Bing: pick two new or stronger pages from queries at position 8–20.
2. Update `updated` dates only for real changes.
3. Run the LLM check and log it above.
4. One off-site action (a listing, an answer, a pitch).
5. After each release, `tools/release-direct.sh publish` commits the new `appcast.xml` here;
   the changelog, feed and llms.txt update on deploy. Update the App Store promotional text.
