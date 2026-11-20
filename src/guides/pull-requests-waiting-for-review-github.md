---
title: "See All PRs Waiting for Your Review in a GitHub Org"
h1: See every pull request waiting for your review, across an organization
short: PRs waiting for your review
description: "Four ways to find every GitHub pull request waiting for your review in one organization, including team requests, from search filters to a Mac widget."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["How do I find pull requests where my review is requested on GitHub?", "Search for <code>is:pr is:open review-requested:@me</code>, or open github.com/pulls/review-requested. Add <code>org:your-org</code> to limit it to one organization."]
  - ["Does review-requested:@me include requests to my team?", "Yes. <code>review-requested:@me</code> includes requests made to teams you belong to. Use <code>user-review-requested:@me</code> for requests made to you personally."]
  - ["Can I get these review requests on my Mac desktop?", "Yes. Whoships shows them in its Needs me watcher, as a desktop widget, in the menu bar and on a desktop dashboard, refreshed every 3 minutes."]
---
<p class="answer">To see every pull request waiting for your review in one GitHub organization, search GitHub for <code>is:pr is:open review-requested:@me org:your-org</code>. It lists requests made to you and to your teams. To keep that list in view without a browser tab, a Mac app such as Whoships shows it as a desktop widget and in the menu bar.</p>

## 1. Use GitHub's search filters

GitHub's pull request search understands who a review is requested from. Paste one of these into the search box at the top of github.com, replacing `your-org`:

<div class="table">

| What you want | Search |
|---|---|
| Everything waiting for you or your teams | `is:pr is:open review-requested:@me org:your-org` |
| Only requests made to you personally | `is:pr is:open user-review-requested:@me org:your-org` |
| Requests made to one team | `is:pr is:open team-review-requested:your-org/team-name` |
| PRs you reviewed that aren't approved yet | `is:pr is:open reviewed-by:@me -review:approved org:your-org` |

</div>

Bookmark the one you use most. The list is accurate when you load it, but it doesn't update or tell you when something new arrives.

## 2. Use the Pull requests dashboard

GitHub's [Pull requests dashboard](https://github.com/pulls), generally available since July 2026, has an inbox with review requests, your pull requests that need fixing (such as failed CI or new comments) and those ready to merge, plus filters like **Review requested**. It covers every organization you belong to, so add an `org:` filter when you only care about one. It's the best free view, as long as you keep it open in a browser tab and reload it.

## 3. Rely on notifications

GitHub sends a notification for every review request, and you can filter the inbox with `reason:review-requested`. Notifications record that something happened, not what is still waiting: a request stays in the inbox after the PR is merged, and it leaves when you mark it done even if the review is still owed. They work well as an alert, less well as a to-do list.

## 4. Put the list on your desktop

[Whoships](/github-widgets-mac/) is a Mac app that keeps the list in front of you. Its [Needs me watcher](/watchers/pull-requests-waiting-for-my-review/) shows, for the organization you choose:

- pull requests where your review or your team's review is requested;
- your own pull requests with failed CI, with the reason (tests, lint, build, timeout, out of disk and more);
- your pull requests with merge conflicts or requested changes, and those ready to merge.

It refreshes every 3 minutes and shows as a desktop widget, a count in the [menu bar](/github-menu-bar-app-mac/) and a card on the [desktop dashboard](/github-dashboard-mac/). Items leave the list when they're done, because Whoships reads the current state from GitHub instead of a feed of events. It only reads; it never approves, comments or merges.

## Which one should you use?

<div class="table">

| | Search filter | Pull requests dashboard | Notifications | Whoships |
|---|---|---|---|---|
| Team requests | Yes | Yes | Yes | Yes |
| One organization only | With `org:` | With a filter | With a filter | Yes |
| Updates on its own | No | No | Yes | Every 3 minutes |
| Leaves when done | Yes | Yes | No | Yes |
| Your PRs with failed CI | No | Yes | Partly | Yes, with the reason |
| Outside the browser | No | No | Mobile app | Widget, menu bar, desktop |
| Price | Free | Free | Free | 14 days free, then €19.99 once |

</div>

If you check reviews twice a day, a bookmarked search is enough. If reviews are a big part of your job, as for a staff engineer or team lead, a list that stays on screen and updates on its own saves the round trips.
