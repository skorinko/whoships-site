// Whoships website. Source in src/, output in _site/ (deployed to GitHub Pages by .github/workflows/pages.yml).
// Files served as they are: assets/, appcast.xml (Sparkle update feed, written by Whoships/tools/release-direct.sh),
// CNAME, and static/ (copied to the site root).
import site from "./src/_data/site.js";

const strip = (html) => String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

// Structured data for a page, as one JSON-LD @graph. `schema` lists the extra parts a page wants:
// "app" (SoftwareApplication with offers), "home" (WebSite + Organization), "article".
// FAQPage comes from `faq` ([question, answer] pairs), BreadcrumbList from `crumbs`.
function jsonld({ locale, t, title, description, url, schema = [], faq, crumbs, updated, image }) {
  const abs = (u) => (u.startsWith("http") ? u : site.url + u);
  const lang = locale.hreflang;
  const org = { "@type": "Organization", "@id": `${site.url}/#org`, name: "Whoships", url: `${site.url}/`, logo: `${site.url}/assets/icon.png`, email: site.supportEmail, founder: { "@type": "Person", name: site.author } };
  const app = {
    "@type": "SoftwareApplication",
    "@id": `${site.url}/#app`,
    name: "Whoships",
    alternateName: site.appStoreName,
    description: t.oneLiner,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "GitHub organization dashboard",
    operatingSystem: `macOS ${site.minMacOS} or later`,
    softwareVersion: site.version,
    url: `${site.url}/`,
    downloadUrl: `${site.url}/download`,
    image: `${site.url}/assets/icon.png`,
    screenshot: [`${site.url}/assets/dashboard.webp`, `${site.url}/assets/widgets.webp`],
    inLanguage: site.locales.map((l) => l.hreflang),
    featureList: [
      "Desktop widgets in every size for GitHub pull requests, reviews and CI",
      "Menu bar count of what needs you",
      "Full-desktop dashboard behind your windows",
      "CI failure reasons from the failed step and job log",
      "DORA metrics: deployment frequency, lead time, change failure rate, time to restore",
      "Flow health: stale PRs, review bottlenecks, cycle time",
      "Security alerts and branch protection gaps across the organization",
      "Flaky and slow GitHub Actions workflows",
      "Read-only, with data kept on the Mac",
    ],
    offers: [
      { "@type": "Offer", name: `Free ${site.trialDays}-day trial and sample data`, price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Whoships Lifetime", price: site.price.usd, priceCurrency: "USD", url: `${site.url}/buy/` },
      { "@type": "Offer", name: "Whoships Lifetime", price: site.price.eur, priceCurrency: "EUR", url: `${site.url}/buy/` },
    ],
    publisher: { "@id": `${site.url}/#org` },
    ...(site.appStoreLive ? { sameAs: [site.appStoreUrl] } : {}),
  };
  const graph = [];
  const pageNode = {
    "@type": schema.includes("article") ? "Article" : faq && schema.includes("faq") ? "FAQPage" : "WebPage",
    "@id": `${abs(url)}#page`,
    url: abs(url),
    name: title,
    ...(schema.includes("article") ? { headline: title, author: { "@type": "Person", name: site.author }, publisher: { "@id": `${site.url}/#org` }, image: abs(image || "/assets/og.png") } : {}),
    description,
    inLanguage: lang,
    isPartOf: { "@id": `${site.url}/#website` },
    ...(updated ? { dateModified: new Date(updated).toISOString().slice(0, 10) } : {}),
    ...(schema.includes("app") || schema.includes("home") ? { about: { "@id": `${site.url}/#app` } } : {}),
  };
  if (faq && schema.includes("faq")) {
    pageNode.mainEntity = faq.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } }));
  }
  graph.push(pageNode);
  graph.push({ "@type": "WebSite", "@id": `${site.url}/#website`, url: `${site.url}/`, name: "Whoships", publisher: { "@id": `${site.url}/#org` }, inLanguage: site.locales.map((l) => l.hreflang) });
  if (schema.includes("home") || schema.includes("app")) graph.push(org, app);
  if (crumbs && crumbs.length) {
    const items = [{ name: t.breadcrumbHome, url: `${locale.prefix}/` }, ...crumbs.map((c) => ({ name: c.name, url: c.url || url }))];
    graph.push({ "@type": "BreadcrumbList", itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.url) })) });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}

export default function (cfg) {
  cfg.addPassthroughCopy("assets");
  cfg.addPassthroughCopy("appcast.xml");
  cfg.addPassthroughCopy("CNAME");
  cfg.addPassthroughCopy({ static: "/" });

  // {p} = this locale's URL prefix, and any other values the page passes.
  cfg.addFilter("fmt", function (str, vars = {}) {
    if (typeof str !== "string") return str;
    return str.replace(/\{(\w+)\}/g, (m, key) => (vars[key] !== undefined ? vars[key] : m));
  });

  // Every page sharing a pageKey is a translation of the same page: used for hreflang and the language switcher.
  cfg.addFilter("alternates", (all, key) => {
    if (!key) return [];
    const order = site.locales.map((l) => l.code);
    return all
      .filter((p) => p.data.locale && (p.data.locale.pageKey || p.data.pageKey) === key)
      .map((p) => ({ url: p.url, hreflang: p.data.locale.hreflang, code: p.data.locale.code, name: p.data.locale.name }))
      .sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code));
  });

  cfg.addFilter("localDate", (date, localeCode = "en") =>
    new Intl.DateTimeFormat(site.intlLocale(localeCode), { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(date)));
  cfg.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  cfg.addFilter("rfc822", (date) => new Date(date).toUTCString());
  cfg.addFilter("absolute", (url) => (url.startsWith("http") ? url : site.url + url));
  cfg.addFilter("xmlEscape", (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"));
  cfg.addFilter("plainText", (html) => String(html).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

  cfg.addFilter("jsonld", jsonld);
  // US dollars always say "US$" so they can't be read as another dollar.
  cfg.addFilter("money", (amount, currency, intl = "en") =>
    new Intl.NumberFormat(intl, { style: "currency", currency, currencyDisplay: currency === "USD" ? "code" : "symbol" })
      .format(Number(amount)).replace("USD", "US$").replace(/US\$\s/, "US$"));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
