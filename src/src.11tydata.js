// Defaults for every page. `t` is the page's strings (falls back to English while a locale is missing);
// `v` holds the placeholder values for the fmt filter ({p} = this locale's URL prefix).
export default {
  layout: "base.njk",
  eleventyComputed: {
    t: (d) => d.i18n[d.locale.code] || d.i18n.en,
    v: (d) => ({ p: d.locale.prefix, _locale: d.locale.intl, ...(d.vars || {}) }),
  },
};
