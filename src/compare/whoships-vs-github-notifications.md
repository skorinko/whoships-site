---
title: "Whoships vs GitHub's Own Dashboard and Notifications"
h1: Whoships vs GitHub's own dashboard and notifications
short: Whoships vs GitHub's own tools
description: "What GitHub's Pull requests dashboard, notifications and GitHub Desktop already do for free, and what Whoships adds on the Mac for a whole organization."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["Does GitHub have a dashboard for my pull requests?", "Yes. The Pull requests dashboard at github.com/pulls, generally available since July 2026, shows review requests, your PRs that need fixing and those ready to merge."]
  - ["Does GitHub show DORA metrics?", "Not as a built-in report. GitHub has the underlying data (deployments, releases, merges), and tools such as Whoships compute the four DORA metrics from it."]
  - ["Does GitHub Desktop show pull requests?", "GitHub Desktop lists pull requests for the repository you have open and notifies you when checks fail on your branch. It has no widgets and no organization-wide view."]
---
<p class="answer">GitHub's own tools cover a lot for free: the Pull requests dashboard lists reviews requested from you, your pull requests that need fixing and those ready to merge, and notifications tell you when things happen. What GitHub doesn't offer is a view on the Mac desktop, an organization-wide picture, CI failure reasons at a glance, or DORA metrics. That's the gap Whoships fills.</p>

<p class="small">Facts about GitHub checked in GitHub Docs, the GitHub changelog and the App Store on 20 November 2026.</p>

## What GitHub gives you

- **Pull requests dashboard** ([github.com/pulls](https://github.com/pulls)): an inbox with review requests, PRs that need fixing (for example CI failures or new comments) and PRs ready to merge, with filters such as Authored by me and Review requested. Web only, for your own pull requests.
- **Notifications**: every review request, mention and failed run, filterable by reason, repository and organization, on the web, by email and in GitHub Mobile.
- **GitHub Desktop**: a free Git client for macOS and Windows. It lists pull requests for the repository you have open and notifies you when checks fail on your branch.
- **Insights**: per-repository graphs and Actions usage and performance metrics.

## What Whoships adds

<div class="table">

| | GitHub (free) | Whoships |
|---|---|---|
| Reviews requested from you and your teams | Yes, on the web | Yes, widget and menu bar, every 3 minutes |
| Your PRs with failed CI | Yes | Yes, with the reason (tests, lint, timeout, out of disk…) |
| Lives on the Mac desktop | No | Widgets, menu bar, full-desktop dashboard |
| Red CI on main, force pushes, unreviewed merges across the org | No single view | [Attention](/watchers/stale-pull-requests/) |
| Who is working on what | No | [Who's on what](/watchers/who-is-working-on-what/) |
| Stale PRs, review bottlenecks, cycle time | No | [Flow health](/watchers/pull-request-cycle-time/) |
| DORA metrics | No | [Delivery (DORA)](/watchers/dora-metrics/) |
| Security alerts across the org | Per repository, or the security overview | [Security](/watchers/security-alerts/) in one card |
| Flaky and slower workflows | No | [CI health](/watchers/github-actions-failures/) |
| Price | Free | 14 days free, then €19.99 once |

</div>

## When GitHub alone is enough

If you mostly need your own review queue and you're happy keeping a browser tab open, the Pull requests dashboard is excellent and free. Add a bookmarked search such as `is:pr is:open review-requested:@me org:your-org` for one organization. See [how to see every PR waiting for your review](/guides/pull-requests-waiting-for-review-github/).

## When Whoships helps

When you want it **without a browser tab**, when you're responsible for **more than your own pull requests**, or when you want **delivery, security and CI health** without setting up a metrics platform. Whoships reads the same GitHub data with your own sign-in, from your Mac, read-only.
