// Release history for /changelog/ and feed.xml, read from the Sparkle feed (appcast.xml).
import { readFileSync } from "node:fs";

const xml = readFileSync(new URL("../../appcast.xml", import.meta.url), "utf8");

export default [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
  const get = (re) => (item.match(re) || [])[1];
  return {
    version: get(/<sparkle:shortVersionString>([^<]+)</),
    date: new Date(get(/<pubDate>([^<]+)</)).toISOString(),
    notes: (get(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || "").trim(),
  };
});
