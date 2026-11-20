---
title: "Whoships vs Gitify: GitHub on the Mac Menu Bar"
h1: Whoships vs Gitify
short: Whoships vs Gitify
description: "Gitify is a free menu bar app for GitHub notifications on Mac, Windows and Linux. Whoships shows an organization's PRs, CI and metrics in widgets."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["What does Gitify do?", "Gitify shows your notifications from GitHub, and from GitLab, Gitea, Forgejo, Codeberg and Bitbucket, in the menu bar or system tray, with native notifications. It is free and open source."]
  - ["Does Whoships replace GitHub notifications?", "Not entirely. Whoships shows the current state of what needs you, not every event. Mentions and discussion comments still arrive as GitHub notifications."]
  - ["Which one works on Windows?", "Gitify runs on macOS, Windows and Linux. Whoships is Mac only."]
---
<p class="answer">Gitify and Whoships both sit in the Mac menu bar, but Gitify is a notifications client and Whoships is an organization dashboard. Gitify shows your unread GitHub notifications, free and on every desktop platform. Whoships shows what is still waiting for you in one GitHub organization, plus organization-wide CI, flow, DORA and security, in widgets and on the desktop.</p>

<p class="small">Facts about Gitify checked on gitify.io and its GitHub repository on 20 November 2026.</p>

## At a glance

<div class="table">

| | Gitify | Whoships |
|---|---|---|
| What it shows | Your notifications (events) | Current state: what needs you and organization health |
| Forges | GitHub (incl. Enterprise Server), GitLab, Gitea, Forgejo, Codeberg, Bitbucket | GitHub.com |
| Accounts | Several at once | One organization at a time |
| Platforms | macOS, Windows, Linux | Mac (macOS 26+) |
| Where it shows | Menu bar or tray, system notifications | Widgets, menu bar, desktop dashboard, notifications |
| CI failure reason | No | Yes |
| Metrics and security | No | Flow health, DORA, CI health, security alerts |
| Price | Free, open source (MIT) | 14 days free, then €19.99 once |

</div>

## Notifications vs state

A notification records that something happened: a review was requested, a check failed, someone commented. It stays until you mark it done, whether or not the work is finished. Whoships reads the current state instead: a review request leaves the list when you've reviewed, a failed check leaves when CI passes. That makes Whoships a to-do list and Gitify an inbox.

## When Gitify is the better choice

- You want **every notification**, including mentions, issue comments and discussions.
- You use **GitLab, Bitbucket or GitHub Enterprise Server**, several accounts, or Windows and Linux.
- You want a **free, open-source** tool.

## When Whoships is the better choice

- You want **what's still waiting**, not a feed: reviews owed, your PRs blocked on CI with the reason, conflicts, PRs ready to merge.
- You lead a team and want **organization-wide signals**: red `main`, force pushes, stale PRs, [DORA metrics](/watchers/dora-metrics/), [security alerts](/watchers/security-alerts/), [flaky workflows](/watchers/github-actions-failures/).
- You want **widgets and a desktop dashboard**.

Plenty of people use both: Gitify for conversation, Whoships for state. See also [Whoships vs Trailer](/compare/whoships-vs-trailer/).
