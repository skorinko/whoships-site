---
title: "Measure DORA Metrics from GitHub Without a Platform"
h1: Measure DORA metrics from GitHub without a metrics platform
short: DORA metrics from GitHub
description: "How to measure deployment frequency, lead time, change failure rate and time to restore from GitHub data alone, and where the estimates fall short."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["Does GitHub show DORA metrics by itself?", "Not as a ready-made report for the four DORA metrics. The data is there (Deployments, releases, pull requests and merges), so tools and scripts can compute them."]
  - ["What counts as a deploy if we don't use GitHub Deployments?", "A release, or a merge into a production branch such as main. Whoships uses Deployments when a repository has them, then releases, then merges."]
  - ["How can GitHub data tell a deploy failed?", "By the fix that follows it. Whoships counts a deploy as failed when a hotfix or revert lands within 24 hours, and measures time to restore until that fix ships."]
  - ["Are these numbers good enough to compare teams?", "No. DORA metrics are for a team to see its own trend. Repositories deploy in different ways, so comparing teams by these numbers is misleading."]
---
<p class="answer">You can measure all four DORA metrics from GitHub alone. Deploys come from GitHub Deployments, releases or merges to a production branch. Lead time runs from a pull request's first commit to the deploy that shipped it, and a hotfix or revert soon after a deploy marks it as failed. Whoships does this on your Mac for a whole organization, with no server or pipeline changes.</p>

## The four DORA metrics

DORA (DevOps Research and Assessment) describes software delivery with four measures:

<div class="table">

| Metric | Question | From GitHub data |
|---|---|---|
| Deployment frequency | How often do we ship to production? | Count production deploys per week |
| Lead time for changes | How long from commit to production? | First commit of a merged PR → the deploy that included it |
| Change failure rate | How often does a deploy need a fix? | Deploys followed by a hotfix or revert ÷ all deploys |
| Time to restore | How long until a failed deploy is fixed? | Failed deploy → the fix's deploy |

</div>

Recent DORA reports call the last one “failed deployment recovery time”. It measures the same thing.

## Step 1: decide what a deploy is

This is the decision that matters most. Each repository usually fits one of three patterns:

1. **GitHub Deployments.** If your workflows create deployments to an environment named `production` (GitHub Actions does this when a job sets `environment: production`), those are your deploys. This is the most accurate source.
2. **Releases.** If you ship by publishing a GitHub release, each release is a deploy.
3. **Merges to a production branch.** With continuous deployment from `main`, each merge into `main` is a deploy.

Whoships checks for each source in that order, per repository, and the [Delivery watcher](/watchers/dora-metrics/) shows which one it used. Production branch names (`main`, `master`, `production`, `prod`, `release/*`) and environment names (`production`, `prod`, `live`) can be changed in Settings › Rules.

## Step 2: decide what a failure is

GitHub doesn't know about incidents, but it sees how teams fix them. A deploy is a reasonable “failure” when, within a day, the team ships:

- a revert (a PR whose title starts with “Revert”);
- a hotfix branch, such as `hotfix/*`;
- a PR labelled `hotfix`, `incident`, `sev1` or `sev2`.

Whoships uses a 24-hour window and these patterns by default. If your team labels incidents differently, change the patterns so the change failure rate means something.

## Step 3: read the trend, not the band

Each metric falls into a DORA performance band, from Low to Elite. Bands are useful as a rough guide, but the trend is what tells you something: lead time creeping from one day to four, or failures rising after a big refactor. Whoships shows each metric with its change against the previous period, per repository and for the organization.

## Where GitHub-only DORA metrics fall short

- **Incidents that aren't code changes.** A rollback by redeploying an old build, a feature-flag switch or a config change outside GitHub won't show up as a failure.
- **Monorepos with many services.** Merges to `main` count as one stream of deploys unless each service deploys to its own GitHub environment.
- **Manual deploys.** If people deploy from their laptops, GitHub never sees it. Creating a GitHub Deployment from your deploy script fixes this.

If you need incident data from PagerDuty or Jira, or numbers per team for many teams, a dedicated platform does that better. See [Whoships vs engineering-metrics platforms](/compare/whoships-vs-engineering-metrics-platforms/).

## Try it on your organization

[Download Whoships](/download), choose **Try with sample data** to see the Delivery card with a made-up organization, then sign in with GitHub. Watching your own organization is free for 14 days.
