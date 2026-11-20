// Checks the built site in _site/ before it's deployed (run by `npm run check` and the Pages workflow).
// Fails on: missing legacy URLs, a changed appcast.xml, duplicate or missing titles/descriptions,
// bad canonicals, invalid JSON-LD, hreflang that isn't reciprocal, broken internal links,
// pages missing from the sitemap, and locale files out of step with en.json.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";

const root = new URL("../", import.meta.url).pathname;
const out = join(root, "_site");
const SITE = "https://whoships.app";
const errors = [];
const err = (m) => errors.push(m);

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const files = walk(out);
const pages = files.filter((f) => f.endsWith(".html"));
const urlOf = (f) => "/" + relative(out, f).replace(/index\.html$/, "").replace(/\\/g, "/");

// 1. URLs that existed before the Eleventy site, and files other systems depend on.
for (const u of ["/", "/buy/", "/support/", "/privacy/", "/terms/", "/refunds/"]) {
  if (!existsSync(join(out, u, "index.html"))) err(`page missing: ${u}`);
}
// The hand-written site's URLs: the app's buy link, the App Store listing and Paddle use them.
for (const f of ["buy.html", "support.html", "privacy.html", "terms.html", "refunds.html", "img/icon.png"]) {
  if (!existsSync(join(out, f))) err(`legacy URL missing: /${f}`);
}
for (const f of ["CNAME", "appcast.xml", "robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt", "feed.xml", "404.html", "assets/og.png", "assets/dashboard.webp"]) {
  if (!existsSync(join(out, f))) err(`missing file: ${f}`);
}
if (existsSync(join(out, "appcast.xml")) && !readFileSync(join(root, "appcast.xml")).equals(readFileSync(join(out, "appcast.xml")))) err("appcast.xml differs from the source (Sparkle feed must be served unchanged)");

// 2. Per-page checks.
const titles = new Map(), descs = new Map(), hreflangs = new Map();
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  const url = urlOf(f);
  const noindex = /<meta name="robots" content="noindex">/.test(html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) err(`${url}: no <title>`);
  if (!desc) err(`${url}: no meta description`);
  const lang = (html.match(/<html lang="([^"]+)"/) || [])[1];
  if (!noindex) {
    // Unique within a locale; pt-BR and pt-PT (or en and de) may share a title as hreflang alternates.
    const tKey = `${lang}|${title}`, dKey = `${lang}|${desc}`;
    if (titles.has(tKey)) err(`${url}: duplicate title with ${titles.get(tKey)}: ${title}`); else titles.set(tKey, url);
    if (descs.has(dKey)) err(`${url}: duplicate description with ${descs.get(dKey)}`); else descs.set(dKey, url);
    const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    if (canonical !== SITE + url) err(`${url}: canonical is ${canonical}`);
  }
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) err(`${url}: should have exactly one <h1>`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(`${url}: JSON-LD doesn't parse: ${e.message}`); }
  }
  const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map((m) => [m[1], m[2]]);
  hreflangs.set(SITE + url, alts);
  // Internal links must resolve to a built file (or the Worker-handled /download).
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const link = m[1];
    if (link === "/download" || link.startsWith("/_e/")) continue;
    const target = link.endsWith("/") ? join(out, link, "index.html") : join(out, link);
    if (!existsSync(target)) err(`${url}: broken link ${link}`);
  }
}

// 3. hreflang must be reciprocal: every alternate lists this page back.
for (const [page, alts] of hreflangs) {
  for (const [lang, href] of alts) {
    if (lang === "x-default") continue;
    const back = hreflangs.get(href);
    if (!back) { err(`${page}: hreflang ${lang} points to unknown page ${href}`); continue; }
    if (!back.some(([, h]) => h === page)) err(`${page}: ${href} doesn't link back`);
  }
}

// 4. Sitemap lists every indexable page.
const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
if (!sitemap.startsWith("<?xml")) err("sitemap.xml must start with the XML declaration");
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  if (/content="noindex"/.test(html)) continue;
  if (!inSitemap.has(SITE + urlOf(f))) err(`not in sitemap: ${urlOf(f)}`);
}

// 5. Locale strings in step with English.
try { execFileSync("node", [join(root, "scripts/i18n-check.mjs")], { stdio: "pipe" }); }
catch (e) { err("i18n-check failed:\n" + e.stdout); }

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} problem(s) in ${pages.length} pages`);
  process.exit(1);
}
console.log(`OK: ${pages.length} pages, ${inSitemap.size} in sitemap, ${titles.size} unique titles`);
