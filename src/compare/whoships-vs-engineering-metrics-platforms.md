---
title: "Whoships vs LinearB and Swarmia for DORA Metrics"
h1: Whoships vs engineering-metrics platforms
short: Whoships vs LinearB and Swarmia
description: "LinearB and Swarmia are cloud platforms for DORA and engineering metrics, priced per developer. When they're the better choice, and when Whoships is enough."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["How much do LinearB and Swarmia cost?", "On 20 November 2026, LinearB listed $29 per user per month (annual, minimum 50 users) with a 45-day trial and no free tier. Swarmia was free for up to 9 developers, then from $45 per developer per month billed annually."]
  - ["Do they need an organization admin?", "Yes. Both are installed as a GitHub App on the organization, which needs owner or admin permission. Whoships signs in as you and needs at most an owner's approval of its OAuth app."]
  - ["Can Whoships replace a metrics platform for a large company?", "Usually not. Whoships is a personal Mac view of one organization. Large companies that report metrics per team to leadership need a platform."]
---
<p class="answer">LinearB and Swarmia are cloud platforms that measure DORA and other engineering metrics for whole companies, with team reports, benchmarks and integrations, priced per developer per month. Whoships is a Mac app that computes the four DORA metrics, flow health and CI health for one GitHub organization on your own Mac, for a one-time €19.99. For a small team or a single lead, Whoships is often enough; for reporting across many teams, a platform is the better choice.</p>

<p class="small">Facts about LinearB and Swarmia checked on their pricing pages and documentation on 20 November 2026. Prices change; check their sites.</p>

## At a glance

<div class="table">

| | LinearB | Swarmia | Whoships |
|---|---|---|---|
| Type | Cloud platform | Cloud platform | Mac app, no server |
| DORA metrics | Deploy frequency, cycle time, change failure rate, MTTR | Deployment frequency, change lead time, time to deploy, change failure rate, MTTR | Deploy frequency, lead time, change failure rate, time to restore |
| Price | $29 per user per month, annual, 50-user minimum; Enterprise $59 | Free up to 9 developers; Standard $45, Enterprise $55 per developer per month, annual | €19.99 once per person, after 14 days free |
| Setup | GitHub App installed by an org owner or admin | GitHub App installed with admin permission | Sign in as yourself; an owner may need to approve the OAuth app |
| Where your data goes | Their cloud | Their cloud | Stays on your Mac |
| Team reports, benchmarks, surveys | Yes | Yes | No |
| Issue tracker and incident data | Jira and other integrations | Integrations and API | No (GitHub only) |
| On your desktop | No (web) | No (web, Slack) | Widgets, menu bar, dashboard |
| Reviews waiting for you, CI failure reasons | No | No | Yes |

</div>

## When a platform is the better choice

- You need **metrics per team** for many teams, shared with leadership, with history and benchmarks.
- You want failures and restores measured from **incidents** (PagerDuty, Jira) rather than inferred from hotfixes and reverts.
- You use **GitLab, Bitbucket or Azure DevOps** as well as GitHub, or GitHub Enterprise Server.
- You want **workflow automation, developer surveys** or investment reporting.

## When Whoships is enough

- You're a **team lead, staff engineer or CTO of a small company** and want to see delivery trends yourself, not report them.
- You can't or don't want to **install a GitHub App** with organization-wide access, or send your code metadata to another cloud.
- You want the numbers **next to your daily work**: the same widgets show the reviews waiting for you, red CI on `main` and failing workflows.

## How Whoships measures DORA

Deploys come from GitHub Deployments to a production environment, else releases, else merges to a production branch. A deploy counts as failed when a hotfix or revert lands within 24 hours. More in the [Delivery (DORA) watcher](/watchers/dora-metrics/) and the guide to [DORA metrics from GitHub](/guides/dora-metrics-github/).
