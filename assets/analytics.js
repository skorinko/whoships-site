// Visitor analytics, sent first-party through /_e (the edge-analytics Worker) to PostHog.
// Cookieless: nothing is stored in the browser, so no consent banner is needed.
//
// Tracked clicks: any element with data-track="<name>" sends "<name>_clicked" with
// placement = data-placement (or the page path). Download links also carry the visit's
// utm_* / referrer to /download so the download (and the app's first launch) is credited to it.
// App Store badges (data-track="appstore") get ct=<source> for App Store Connect's campaign report.
(function () {
  var KEY = "phc_B4emGAE78ZtKqemBXrME6ECvgtXq8WEoRx8MgbxjHo8Y";
  var APP = "whoships";
  var host = location.hostname;
  // Attribution for this visit: utm_* from the URL, else from the previous page on this site
  // (same-origin referrers include the query), plus the external referrer's host.
  var UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  function attribution() {
    var out = {};
    var here = new URLSearchParams(location.search);
    var prev = null;
    try { prev = document.referrer ? new URL(document.referrer) : null; } catch (e) { }
    var sameSite = prev && prev.hostname === host;
    var from = here.get("utm_source") ? here : sameSite ? prev.searchParams : here;
    UTM.forEach(function (k) { if (from.get(k)) out[k] = from.get(k); });
    if (prev && !sameSite) out.ref = prev.hostname;
    return out;
  }

  window.whoshipsAttribution = attribution; // buy.js puts it on the Paddle checkout

  // App Store badges: <a href="https://apps.apple.com/app/id<app ID>?pt=<provider ID>&mt=12" data-track="appstore">.
  // ct= (Apple's campaign token) becomes this visit's source, the same label the dashboard uses
  // (utm_source, else the referring site, else "direct"), so App Store Connect's per-campaign
  // downloads and sales line up with PostHog's sources. Set on load, so every way of opening the
  // link (click, middle-click, copy) carries it. Runs even where analytics is off. Without pt=
  // Apple ignores ct=, so links without it are left as they are.
  function source(attr) { return attr.utm_source || attr.ref || "direct"; }
  function tagAppStoreLinks() {
    var ct = source(attribution()).replace(/[^\w.-]+/g, "-").slice(0, 40); // Apple allows 40 characters
    document.querySelectorAll('a[data-track="appstore"]').forEach(function (a) {
      try {
        var url = new URL(a.href);
        if (!url.searchParams.get("pt")) return; // Apple ignores ct= without the provider ID
        url.searchParams.set("ct", ct);
        a.href = url.toString();
      } catch (e) { }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tagAppStoreLinks);
  else tagAppStoreLinks();

  var dev = host === "localhost" || host === "127.0.0.1";
  if (dev && location.port !== "8787") return; // the Python dev server has no /_e; `wrangler dev` (8787) does
  if (!dev && KEY.indexOf("REPLACE") !== -1) return; // project key not filled in yet

  // PostHog loader stub (official snippet, shortened method list).
  !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset get_distinct_id get_session_id".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);

  posthog.init(KEY, {
    api_host: "/_e",
    ui_host: "https://eu.posthog.com",
    cookieless_mode: "always",
    persistence: "memory",
    person_profiles: "identified_only",
    disable_compression: true, // lets the Worker tag each event with is_bot
    autocapture: false,
    capture_performance: false, // no $web_vitals: they'd use the event allowance and skip bot tagging
    capture_pageview: "history_change",
    capture_pageleave: true,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_feature_flags: true,
  });
  posthog.register({ app: APP });

  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-track]");
    if (!el) return;
    var name = el.getAttribute("data-track");
    var placement = el.getAttribute("data-placement") || location.pathname;
    var attr = attribution();
    posthog.capture(name + "_clicked", Object.assign({ placement: placement, link: el.getAttribute("href") }, attr));

    if (name === "download" && el.href) {
      var url = new URL(el.href, location.href);
      Object.keys(attr).forEach(function (k) { url.searchParams.set(k, attr[k]); });
      url.searchParams.set("placement", placement);
      el.href = url.toString();
    }
  }, true);
})();
