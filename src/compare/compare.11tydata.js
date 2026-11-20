// Comparisons: factual, with a "when the other option is better" section. English first.
export default {
  schema: ["article"],
  tags: ["compare"],
  eleventyComputed: {
    permalink: (d) => (d.page.fileSlug === "compare" ? "/compare/" : `/compare/${d.page.fileSlug}/`),
    crumbs: (d) => (d.page.fileSlug === "compare" ? [{ name: "Comparisons" }] : [{ name: "Comparisons", url: "/compare/" }, { name: d.short || d.title }]),
  },
};
