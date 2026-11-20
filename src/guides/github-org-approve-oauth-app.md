---
title: "Get a GitHub Organization to Approve an OAuth App"
h1: Get your GitHub organization to approve an OAuth app
short: Org approval for OAuth apps
description: "Why an OAuth app sees no private repos in your GitHub organization, how to request approval, how an owner approves it, and what the app can read."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["Why can't an OAuth app see my organization's private repositories?", "The organization has OAuth app access restrictions turned on. Until an owner approves the app, it can only see public data, and GitHub doesn't report an error."]
  - ["Who can approve an OAuth app for an organization?", "Organization owners. Members can request approval, and owners get a notification."]
  - ["Does a personal access token need the same approval?", "No. OAuth app restrictions don't apply to personal access tokens. If the organization uses SAML single sign-on, a classic token still needs to be authorized for SSO."]
  - ["Can Whoships change anything in my organization?", "No. Whoships only reads. The repo scope it requests is GitHub's only way to grant read access to private repositories through OAuth, but Whoships never writes."]
---
<p class="answer">If an app you signed in to with GitHub shows nothing from your organization's private repositories, the organization has OAuth app access restrictions on. A member requests access for the app, and an organization owner approves it under Organization settings › Third-party access › OAuth app policy. Until then, GitHub quietly hides private data from the app instead of showing an error.</p>

## Why the app sees nothing

Organizations can limit which OAuth apps read their private data. With restrictions on, an app you authorized can still sign you in, but GitHub answers its requests as if the organization's private repositories didn't exist. The app gets empty lists, not an error. That's why a badly built dashboard shows “all quiet” when in fact it can't see anything.

Whoships checks for this before it starts watching. When the organization blocks it, through OAuth app approval, SAML single sign-on or an IP allow list, it pauses, says why in the widgets and menu bar, and doesn't show empty results.

## How to request approval (members)

1. Open the app's authorization on GitHub: **Settings › Applications › Authorized OAuth Apps**, then click the app. (In Whoships, the waiting screen's **Open Whoships on GitHub** takes you there.)
2. Under **Organization access**, click **Request access** next to your organization.
3. Tell an owner why. Whoships's **Copy message for an owner** copies a short note with the direct link to the approval page.

## How to approve it (owners)

1. Open the organization on GitHub and go to **Settings**.
2. Under **Third-party Access**, click **OAuth app policy**.
3. Find the app in the list of requests and click **Review**, then **Grant access**.

Approval covers everyone in the organization who signs in to that app. Owners can deny or revoke it at any time from the same page.

## What Whoships asks for

Whoships signs in with GitHub's device flow and requests three scopes:

- `repo`: read pull requests, reviews, checks, workflow runs, branches and security alerts in private repositories. GitHub has no read-only version of this scope for OAuth apps.
- `read:org`: read the organization, its members and teams.
- `read:user`: read your own profile, to know which reviews and pull requests are yours.

Whoships only reads. It never comments, approves, merges, pushes or changes settings, and what it reads stays on your Mac: there is no Whoships server.

## The alternative: a personal access token

If an approval would take too long, Whoships can use a classic personal access token with the same `repo`, `read:org` and `read:user` scopes. OAuth app restrictions don't apply to tokens. If your organization uses SAML single sign-on, click **Configure SSO** next to the token on GitHub and authorize the organization.

Whoships checks access again every two minutes and starts on its own, with a notification, once the organization lets it in. More in [Support](/support/).
