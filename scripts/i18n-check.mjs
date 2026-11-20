// Checks that every locale file matches en.json: same keys, same array lengths, same placeholders and
// HTML tags.
// Usage: node scripts/i18n-check.mjs [locale ...]
import { readFileSync, existsSync } from "node:fs";
import site from "../src/_data/site.js";

const read = (p) => JSON.parse(readFileSync(new URL("../" + p, import.meta.url), "utf8"));
const en = read("src/_data/i18n/en.json");
const codes = process.argv.slice(2).length ? process.argv.slice(2) : site.locales.map((l) => l.code).filter((c) => c !== "en");
const tokens = (s) => [...s.matchAll(/\{\w+\}|<\/?[a-z]+[^>]*>/g)].map((m) => m[0]).sort().join(" ");
let problems = 0;
const fail = (code, path, msg) => { problems++; console.log(`${code}: ${path}: ${msg}`); };

function compare(code, a, b, path) {
  if (typeof a === "string") {
    if (typeof b !== "string") return fail(code, path, "missing or not a string");
    if (tokens(a) !== tokens(b)) fail(code, path, `placeholders/tags differ\n  en: ${tokens(a)}\n  ${code}: ${tokens(b)}`);
    if (b.trim() === "" && a.trim() !== "") fail(code, path, "empty");
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return fail(code, path, `array length ${b && b.length} != ${a.length}`);
    a.forEach((x, i) => compare(code, x, b[i], `${path}[${i}]`));
    return;
  }
  if (!b || typeof b !== "object") return fail(code, path, "missing object");
  for (const k of Object.keys(a)) compare(code, a[k], b[k], path ? `${path}.${k}` : k);
  for (const k of Object.keys(b)) if (!(k in a)) fail(code, `${path}.${k}`, "extra key");
}

for (const code of codes) {
  const file = `src/_data/i18n/${code}.json`;
  if (!existsSync(new URL("../" + file, import.meta.url))) { fail(code, file, "file missing"); continue; }
  compare(code, en, read(file), "");
}
console.log(problems ? `${problems} problem(s)` : `OK: ${codes.join(", ")}`);
process.exit(problems ? 1 : 0);
