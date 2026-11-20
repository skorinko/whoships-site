---
title: "How to Add GitHub Widgets to Your Mac Desktop"
h1: Add GitHub widgets to your Mac desktop
short: Add GitHub widgets on Mac
description: "Step by step: put GitHub pull requests, reviews and CI on your Mac desktop with widgets, pick what each shows, and three layouts for different roles."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["Does GitHub have a Mac widget?", "No. GitHub's own Mac app, GitHub Desktop, is a Git client without widgets. Whoships adds Mac widgets for one GitHub organization."]
  - ["Where can I put the widgets?", "On the desktop or in Notification Center. Since macOS Sonoma, widgets can sit directly on the desktop."]
  - ["Why do my widgets look faded?", "macOS dims desktop widgets while an app window is in front. Turn it off in System Settings › Desktop & Dock › Dim widgets on desktop."]
---
<p class="answer">GitHub has no widgets for the Mac, but Whoships adds them. Install Whoships, sign in with GitHub, then Control-click the desktop, choose Edit Widgets, search for Whoships and drag a widget onto the desktop. Each widget shows one watcher, such as reviews waiting for you or CI health, and updates on its own.</p>

## Step by step

1. **Install Whoships.** [Download it](/download) (macOS 26 or later), open the disk image and drag Whoships to Applications.
2. **Sign in.** Open Whoships and click **Sign in with GitHub**, or choose **Try with sample data** to set things up with a made-up organization first.
3. **Choose the organization** you want to watch.
4. **Add a widget.** Control-click an empty spot on the desktop and choose **Edit Widgets**. Search for **Whoships** and drag the size you want onto the desktop.
5. **Pick what it shows.** Control-click the widget and choose **Edit “Whoships”**. Choose a watcher, or **Most urgent**, which follows whichever watcher has the most severe item.
6. **Keep it fresh.** Turn on Settings › General › **Open at login**. Widgets update when Whoships refreshes.

## Which size for which watcher?

<div class="table">

| Size | Best for |
|---|---|
| Small | One number at a glance: how many PRs need you, CI success rate |
| Medium | The top few rows of a list, with key numbers |
| Large | A full list: up to six rows with reasons and chips |
| Extra large | Two watchers side by side, such as Needs me and Attention |

</div>

## Three layouts that work

**For a developer.** A large [Needs me](/watchers/pull-requests-waiting-for-my-review/) widget and a medium [I'm waiting on](/watchers/my-pull-requests-waiting-on-review/). You see reviews to do and who you're waiting for without switching apps.

**For a team lead or staff engineer.** An extra large widget with Needs me and [Attention](/watchers/stale-pull-requests/), plus a medium [Flow health](/watchers/pull-request-cycle-time/). That covers your own queue, anything on fire and where reviews are stuck.

**For a CTO or engineering manager.** Medium widgets for [Delivery (DORA)](/watchers/dora-metrics/), [Security](/watchers/security-alerts/) and [CI health](/watchers/github-actions-failures/), and a small **Most urgent**. Or skip widgets and turn on the [desktop dashboard](/github-dashboard-mac/), which shows every card at once behind your windows.

## Working with a widget

- Click a row to open that pull request, run or alert on GitHub.
- The round button at the top right switches the widget to the next watcher.
- The bell snoozes an item for a day.

More about [GitHub widgets for Mac](/github-widgets-mac/).
