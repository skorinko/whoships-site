// Facts about Whoships used on every page, in llms.txt and in structured data.
// Keep these in step with the app (Whoships/project.yml, Whoships/app-store/metadata.md).
import { readFileSync } from "node:fs";

// Latest version and its date come from the Sparkle feed, so they never go stale.
const appcast = readFileSync(new URL("../../appcast.xml", import.meta.url), "utf8");
const latest = appcast.match(/<item>[\s\S]*?<sparkle:shortVersionString>([^<]+)<[\s\S]*?<\/item>/);
const latestDate = appcast.match(/<item>[\s\S]*?<pubDate>([^<]+)</);

// Site locales: the app's 11 interface languages. `paddle` is Paddle checkout's locale code.
const locales = [
  { code: "en", prefix: "", hreflang: "en", intl: "en", og: "en_US", name: "English", paddle: "en" },
  { code: "de", prefix: "/de", hreflang: "de", intl: "de", og: "de_DE", name: "Deutsch", paddle: "de" },
  { code: "es", prefix: "/es", hreflang: "es", intl: "es", og: "es_ES", name: "Español", paddle: "es" },
  { code: "fr", prefix: "/fr", hreflang: "fr", intl: "fr", og: "fr_FR", name: "Français", paddle: "fr" },
  { code: "it", prefix: "/it", hreflang: "it", intl: "it", og: "it_IT", name: "Italiano", paddle: "it" },
  { code: "ja", prefix: "/ja", hreflang: "ja", intl: "ja", og: "ja_JP", name: "日本語", paddle: "ja" },
  { code: "ko", prefix: "/ko", hreflang: "ko", intl: "ko", og: "ko_KR", name: "한국어", paddle: "ko" },
  { code: "pt-br", prefix: "/pt-br", hreflang: "pt-BR", intl: "pt-BR", og: "pt_BR", name: "Português (Brasil)", paddle: "pt" },
  { code: "pt-pt", prefix: "/pt-pt", hreflang: "pt-PT", intl: "pt-PT", og: "pt_PT", name: "Português (Portugal)", paddle: "pt" },
  { code: "zh-hans", prefix: "/zh-hans", hreflang: "zh-Hans", intl: "zh-Hans", og: "zh_CN", name: "简体中文", paddle: "zh-Hans" },
  { code: "zh-hant", prefix: "/zh-hant", hreflang: "zh-Hant", intl: "zh-Hant", og: "zh_TW", name: "繁體中文", paddle: "zh-Hant" },
];

function intlLocale(code) {
  return (locales.find((l) => l.code === code) || locales[0]).intl;
}

// Feature hubs, localized in every locale (/<slug>/ and /<locale>/<slug>/). Keys match i18n `hubs`.
const hubs = [
  { key: "dashboard", slug: "github-dashboard-mac" },
  { key: "widgets", slug: "github-widgets-mac" },
  { key: "menubar", slug: "github-menu-bar-app-mac" },
];

const site = {
  url: "https://whoships.app",
  name: "Whoships",
  appStoreName: "Whoships: Dev Team Radar",
  version: latest ? latest[1] : "1.0",
  versionDate: latestDate ? new Date(latestDate[1]).toISOString() : new Date().toISOString(),
  minMacOS: "26",
  price: { eur: "19.99", usd: "19.99" },
  trialDays: 14,
  watcherCount: 10,
  appStoreId: "6835878917",
  // Add pt=<provider ID> once the app is live: without it analytics.js can't add ct= campaign tokens.
  appStoreUrl: "https://apps.apple.com/app/id6835878917?mt=12",
  appStoreLive: false, // flip when the App Store version is live: shows badges and adds the listing to structured data
  supportEmail: "macapps.support@icloud.com",
  author: "Dmitry Skorinko",
  locales,
  hubs,
  hubSlug: Object.fromEntries(hubs.map((h) => [h.key, h.slug])),
  intlLocale,
  build: new Date().toISOString(),
};

export default site;
