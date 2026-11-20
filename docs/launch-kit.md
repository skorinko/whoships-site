# Whoships launch kit

Ready-to-paste copy for listings, launch posts, pitches and video. Part of month 1 in
[content-strategy.md](content-strategy.md). Keep the facts identical everywhere; if a fact
changes (price, trial, App Store availability), update `src/_data/site.js`, `src/_data/i18n/en.json`
and this file together.

## Before you launch anything

- [ ] **People can pay.** `assets/buy.js` has the live Paddle token and price; confirm Paddle has
      approved whoships.app and a live checkout opens on `https://whoships.app/buy/`. The App Store
      version is still "coming soon". A launch sends one burst of visitors: if they can't buy after
      the trial, it's wasted.
- [ ] The `seo-foundation` site is deployed, Search Console and Bing are set up, sitemap submitted.
- [ ] 60-second demo video uploaded (script below), so every listing can link it.
- [ ] Images ready: `assets/dashboard.png`, `assets/widgets.png` (2880×1800, sample data), plus the
      App Store screenshots in `Whoships/app-store/screenshots/`.
- [ ] Pick the launch week and spread posts (Product Hunt one day, Show HN and Reddit on others) so
      you can answer every comment.

**Always:** say you're the developer, answer quickly and plainly, never ask friends to upvote
(Product Hunt, HN and Reddit penalize it), and link with a `utm_source` so PostHog shows where
people came from, e.g. `https://whoships.app/?utm_source=producthunt`.

## Core facts (copy from here)

- **One-liner:** Whoships is a Mac app that shows your GitHub organization's pull requests, CI,
  reviews and DORA metrics in desktop widgets, the menu bar and a desktop dashboard.
- **Tagline (≤60 chars):** See who ships what, right on your Mac desktop
- **Price:** sample data always free; 14 days free with your own organization; then €19.99 /
  US$19.99 once. No subscription.
- **Requirements:** macOS 26 or later; a GitHub account with access to an organization on github.com.
- **Privacy:** read-only; only the app talks to GitHub; the sign-in stays in the keychain and the
  data on the Mac; no server of ours in between.
- **Links:** https://whoships.app/ · https://whoships.app/press/ (fact sheet, screenshots, icon)

## Short and medium descriptions

**Short (≤160 chars):**
> Whoships puts your GitHub organization on your Mac desktop: PRs waiting for you, red CI with the
> reason, DORA metrics and security alerts. Pay once.

**Medium (directories, ~80 words):**
> Whoships keeps one GitHub organization's pulse on your Mac. Ten watchers show what needs your
> review, what you're waiting on, who is working on what, and what's on fire: red CI on main, force
> pushes, unreviewed merges. Team leads get flow health, DORA metrics, security alerts and flaky
> workflows. It all lives in widgets, the menu bar and a dashboard behind your windows. Read-only,
> no server, data stays on your Mac. Try it with sample data; 14 days free, then a one-time purchase.

**Tags / categories:** GitHub, pull requests, code review, CI, GitHub Actions, DORA metrics,
developer tools, engineering management, macOS, widgets, menu bar.

## Product Hunt

- **Name:** Whoships
- **Tagline:** See who ships what, right on your Mac desktop
- **Topics:** Developer Tools, GitHub, Mac, Productivity
- **Description (≤260 chars):**
  > Your GitHub organization on your Mac desktop: reviews waiting for you, your PRs with failed CI
  > and why, red main branches, DORA metrics, security alerts. Widgets, menu bar and a dashboard
  > behind your windows. Read-only, no server. 14 days free, then pay once.
- **Gallery:** demo video first, then the desktop dashboard, widgets, a full list, Settings › Rules,
  the Welcome window with "Try with sample data".
- **Maker's first comment:**
  > Hi Product Hunt! I'm Dmitry, the developer of Whoships.
  >
  > [Your real reason for building it, in 1–2 sentences: which tabs you kept open, which review you
  > missed.] GitHub is great at showing one repo; it's bad at telling you what needs you across an
  > organization.
  >
  > Whoships watches one GitHub org and shows ten things on your desktop: reviews requested from you
  > and your team, your PRs with failed CI (with the reason from the job log), red CI on main,
  > force pushes, stale PRs, DORA metrics, Dependabot alerts and flaky workflows.
  >
  > It only reads, and it talks to GitHub straight from your Mac: no server, no account with me.
  > "Try with sample data" shows everything without signing in.
  >
  > What it doesn't do yet: watch more than one org at once, or GitHub Enterprise Server. I'd love
  > to hear what you'd want on your desktop next.

  *(Fill in the bracketed part with your own story; a real reason beats a polished one.)*

## Hacker News (Show HN)

- **Title:** Show HN: Whoships – your GitHub org's PRs, CI and DORA metrics in Mac widgets
- **URL:** https://whoships.app/?utm_source=hn
- **First comment:**
  > I built Whoships because I had a dozen GitHub tabs open to answer "what needs me?" and "is main
  > green?" across our org.
  >
  > How it works: a native macOS app (SwiftUI, WidgetKit) that signs in with GitHub's OAuth device
  > flow or a classic token and reads one organization through GraphQL and REST. There is no server:
  > each refresh writes one JSON snapshot per watcher into the app group container, and the widget
  > and desktop dashboard only read snapshots. Refresh tiers are 3, 15 and 60 minutes; REST calls
  > use ETags, so a typical org costs about 400 of GitHub's 5,000 points an hour.
  >
  > Parts I found interesting:
  > - CI failure reasons: from the check conclusion, then the failed step's name, then the tail of
  >   the job log (tests, lint, timeout, out of disk, OOM, network, access denied, …). Each log is
  >   fetched once and cached.
  > - DORA without instrumentation: deploys come from Deployments to a production environment, else
  >   releases, else merges to production branches; a deploy "failed" if a hotfix or revert lands
  >   within 24 hours.
  > - Orgs with OAuth app restrictions return empty lists, not errors, so the app checks access
  >   first and pauses instead of showing "all quiet".
  >
  > It's read-only. Sample data needs no account; 14 days free with your own org, then €19.99 once.
  > Happy to answer questions.

## Reddit

**r/macapps (launch post, follow the sub's self-promotion rules):**

- **Title:** I made Whoships: your GitHub organization's PRs, CI and alerts in widgets and on the desktop
- **Body:**
  > Hi r/macapps, I'm the developer. Whoships shows one GitHub organization on your Mac: a menu bar
  > count of what needs you, widgets from small to extra large, and a dashboard that sits on the
  > wallpaper behind your windows. Ten watchers: reviews waiting for you, your PRs with failed CI
  > and why, red main branches, stale PRs, DORA metrics, Dependabot alerts, flaky workflows.
  >
  > Read-only, no server: it talks to GitHub straight from your Mac. "Try with sample data" works
  > without an account. 14 days free with your org, then €19.99 once, no subscription.
  > macOS 26+. Feedback very welcome.

**Answering existing threads** (only when it genuinely answers the question; say you made it):

> Disclosure: I make a Mac app for this, Whoships. It shows [the specific thing they asked about]
> for one GitHub org in a widget/menu bar, read-only. Without an app: [give the free answer too,
> e.g. the `review-requested:@me org:…` search].

## AlternativeTo

- **Alternative to:** Trailer, Gitify, LinearB, Swarmia
- **License:** Commercial (one-time purchase, free trial)
- **Platforms:** Mac
- **Tags:** github, pull-requests, code-review, dora-metrics, ci-cd, menu-bar, widgets

## Mac directories and lists

- **MacUpdate / Softpedia:** use the medium description and the press-kit images.
- **awesome-mac** (`jaywcjlove/awesome-mac`, Developer Tools), one line in the list's style:
  `[Whoships](https://whoships.app/) - Your GitHub organization's PRs, CI and DORA metrics in widgets, the menu bar and a desktop dashboard. ![Freeware][Freeware Icon]`
  *(Check the list's legend first: it's paid after the trial, so use the paid marker if there is one.)*
- **Setapp:** apply through the developer portal; one-time pricing may need a Setapp-specific build.

## Newsletter and press pitch

**Subject:** GitHub has no Mac widgets. Whoships puts your whole org on the desktop

> Hi [name],
>
> I'm Dmitry, an independent Mac developer. Whoships is a new Mac app that shows a GitHub
> organization's pull requests, CI and delivery metrics in widgets, the menu bar and a dashboard
> behind your windows.
>
> Two things set it apart: it explains why CI failed (tests, lint, timeout, out of disk…) right in
> the widget, from the job log, and it measures the four DORA metrics from GitHub data alone, with
> no server. It's read-only and keeps everything on the Mac.
>
> 14 days free, then €19.99 once. Press kit with screenshots: https://whoships.app/press/
> Happy to send a license or answer anything.
>
> Dmitry

## Demo video (60 seconds)

| Time | Picture | Voice / caption |
|---|---|---|
| 0–6 s | A desktop with twelve GitHub tabs | "What needs you across your GitHub org? Usually: twelve tabs." |
| 6–16 s | Whoships dashboard fades in behind the windows | "Whoships puts your organization on your desktop." |
| 16–28 s | Needs me widget: a failed check says "Tests failed"; click opens the PR | "Reviews waiting for you. Your PRs with failed CI, and why." |
| 28–40 s | Attention and Flow health cards | "Red CI on main, force pushes, stale PRs, review bottlenecks." |
| 40–52 s | Delivery (DORA), Security and CI health cards | "DORA metrics, security alerts, flaky workflows. No server, read-only." |
| 52–60 s | Menu bar count, then logo and whoships.app | "Try it with sample data. 14 days free, then pay once." |

- **YouTube title:** See your whole GitHub organization on your Mac desktop (Whoships)
- **Description:** the medium description, then `https://whoships.app/?utm_source=youtube`.
- Then embed it on `/github-dashboard-mac/` and add `VideoObject` to its JSON-LD.

## Social posts

**Mastodon / Bluesky / X:**
> I made Whoships: your GitHub org on your Mac desktop. Reviews waiting for you, PRs with failed CI
> (and why), red main, DORA metrics, Dependabot alerts. Widgets, menu bar, dashboard. Read-only, no
> server. https://whoships.app/?utm_source=social

**LinkedIn:**
> Engineering leads keep a dozen GitHub tabs open to know what's going on. I built Whoships to
> replace them: a Mac app that shows one GitHub organization's reviews, failing CI, delivery (DORA)
> metrics and security alerts in widgets and on the desktop. It reads GitHub directly from your Mac,
> with no server in between. Free for 14 days, then a one-time purchase.
> https://whoships.app/?utm_source=linkedin
