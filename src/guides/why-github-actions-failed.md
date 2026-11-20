---
title: "Why Did My GitHub Actions Run Fail? Quick Diagnosis"
h1: Why did my GitHub Actions run fail?
short: Why GitHub Actions failed
description: "How to find the reason a GitHub Actions run failed fast: read the failed step, the end of the log, and spot common causes like timeouts, disk and flaky tests."
layout: article.njk
updated: 2026-11-20
faqItems:
  - ["Where is the error in a GitHub Actions log?", "Open the failed run, click the failed job, and expand the step with the red cross. The error is almost always in the last 20 to 50 lines of that step."]
  - ["Why did my job fail with no error message?", "Usually the runner was stopped: the job hit its timeout, the run was cancelled, or the runner ran out of memory or disk. The job's summary or annotations say which."]
  - ["How do I know if a test is flaky?", "Re-run only the failed jobs. If the same commit passes without changes, the failure was flaky. Whoships flags workflows where this happens twice or more in a week."]
---
<p class="answer">To find why a GitHub Actions run failed, open the run, click the failed job and expand the step with the red cross: the reason is almost always in the last lines of that step's log. The step's name (Test, Lint, Build) tells you the kind of failure before you read anything. Messages like timeouts, cancellations or “no space left on device” point to the runner, not your code.</p>

## Read the failure in three steps

1. **Look at the check's conclusion.** On the pull request, a check that says *Cancelled* or *Timed out* failed for a different reason than one that says *Failure*. Cancelled usually means a newer push replaced the run.
2. **Look at the failed step's name.** Open the job. The first step with a red cross is the one that failed: `Run tests`, `Lint`, `Build`, `Deploy`, `Migrate database`. That already tells you whose problem it is.
3. **Read the end of that step's log.** Scroll to the bottom of the failed step. Test runners print a summary of failures there; compilers print the first error a little above it. Search the log (the box at the top right of the log view) for `error`, `FAIL` or `Error:` if it's long.

## Common causes and what they look like

<div class="table">

| Cause | Typical log line | What to do |
|---|---|---|
| Failing tests | `FAIL`, `AssertionError`, `1 failed` | Fix the test or the code; re-run if it's known to be flaky |
| Lint or types | `error  'x' is defined but never used`, `TS2322` | Run the linter or type checker locally |
| Build error | `error:`, `cannot find module`, `exit code 1` from the compiler | Check dependencies and the lockfile |
| Timeout | `The job running on runner … has exceeded the maximum execution time` | Raise `timeout-minutes` or speed up the job |
| Out of disk | `No space left on device` | Clean caches or Docker images, or use a larger runner |
| Out of memory | `Killed`, `exit code 137`, `JavaScript heap out of memory` | Lower parallelism or raise memory limits |
| Network | `ETIMEDOUT`, `Could not resolve host`, `429 Too Many Requests` | Retry, cache dependencies, or check the registry's status |
| Permissions | `Resource not accessible by integration`, `403` | Set `permissions:` for the `GITHUB_TOKEN`, or check secrets |
| Invalid workflow | `Invalid workflow file` | Fix the YAML; GitHub shows the line |
| Waiting for approval | The run waits on an environment | A reviewer approves the deployment |

</div>

Also check [githubstatus.com](https://www.githubstatus.com): when GitHub Actions has an incident, many runs fail at once for reasons that have nothing to do with your code.

## Is it flaky?

Click **Re-run jobs › Re-run failed jobs**. If the same commit passes without a change, the failure was flaky. One flaky run is noise. The same workflow passing only on retry several times a week is a problem worth fixing, because people learn to ignore red builds.

## See the reason without opening the log

[Whoships](/watchers/github-actions-failures/) reads failures for you. For your own pull requests, its Needs me watcher shows the reason a check failed right in the widget: tests, lint, type check, build, security scan, deploy, migrations, timeout, cancelled, out of disk, out of memory, network, merge conflict, access denied, invalid workflow, needs approval or runner problem. It works this out from the check's conclusion, the failed step's name and the end of the job log, reading each log once.

For the whole organization, the [CI health watcher](/watchers/github-actions-failures/) lists workflows that fail often, flaky workflows, workflows that got 30% slower, runner queue time and offline self-hosted runners, and the [Attention watcher](/watchers/stale-pull-requests/) warns when `main` turns red.
