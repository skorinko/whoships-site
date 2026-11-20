---
title: "Whoships vs Trailer: GitHub Pull Requests on Mac"
h1: Whoships vs Trailer
short: Whoships vs Trailer
description: "Trailer is a free, open-source menu bar app for your GitHub PRs and issues. Whoships watches a whole organization with widgets, CI reasons and DORA metrics."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["Is Trailer free?", "Yes. Trailer is free and open source under the MIT license. Its macOS app is downloaded from its website and updates itself."]
  - ["Does Trailer have Mac widgets?", "Trailer's documentation doesn't mention macOS widgets; it lives in the menu bar. Its iOS app, Pocket Trailer, has a Today view and Apple Watch complications."]
  - ["Can I use Trailer and Whoships together?", "Yes. They read GitHub independently. Some people use Trailer for detailed per-PR notifications and Whoships for the organization-wide picture on the desktop."]
---
<p class="answer">Trailer and Whoships both bring GitHub pull requests to the Mac menu bar, but they answer different questions. Trailer is a free, open-source client for the pull requests and issues you're involved in, across all your repositories, with notifications on comments and status changes. Whoships watches one organization as a whole, in widgets and on the desktop, and adds CI failure reasons, flow health, DORA metrics and security alerts.</p>

<p class="small">Facts about Trailer checked on its website, GitHub repository and App Store page on 20 November 2026.</p>

## At a glance

<div class="table">

| | Trailer | Whoships |
|---|---|---|
| What it tracks | Your PRs and issues: mine, participated, mentioned, merged, closed | One organization: what needs you, what you wait on, and org-wide health |
| Where it shows | Menu bar; iPhone, iPad and Watch apps | Desktop widgets, menu bar, full-desktop dashboard |
| macOS widgets | Not mentioned | Small to extra large |
| CI | Status per PR | Status plus the reason a check failed |
| Organization-wide view | No | Attention, Who's on what, Active repos and people |
| Metrics | None | Flow health, DORA, CI health |
| Security alerts | No | Dependabot, code and secret scanning, branch protection |
| GitHub Enterprise | GitHub Enterprise supported | github.com (incl. Enterprise Cloud); not Enterprise Server |
| Sign-in | Personal access token | GitHub sign-in or personal access token |
| Price | Free, open source (MIT) | 14 days free, then €19.99 once |

</div>

## When Trailer is the better choice

- You want **detailed notifications per pull request**: new comments, reviews, merges and status changes, with sections you can mute and snooze.
- You work across **many organizations or GitHub Enterprise Server**.
- You want something **free and open source**, or you need it on iPhone and Apple Watch.

## When Whoships is the better choice

- You lead a team and want **the organization at a glance**: red CI on `main`, force pushes, stale pull requests, review bottlenecks, who is working on what.
- You want to know **why CI failed** without opening the log: Whoships reads the failed step and the end of the job log and says “Tests failed”, “Timeout” or “Out of disk”.
- You want **DORA metrics, security alerts and CI health** without a separate metrics platform.
- You prefer **widgets and a desktop dashboard** to a menu.

## Try both

Both read GitHub with your own sign-in and keep data on your Mac. Whoships has a [sample-data mode](/github-dashboard-mac/) that needs no account, so you can compare without signing in. See also [Whoships vs Gitify](/compare/whoships-vs-gitify/) and the roundup of [the best GitHub apps for Mac](/guides/best-github-apps-mac/).
