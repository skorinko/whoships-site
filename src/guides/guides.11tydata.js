// Guides are written in English first (Markdown). Each one is an Article with breadcrumbs.
export default {
  schema: ["article"],
  tags: ["guide"],
  eleventyComputed: {
    permalink: (d) => (d.page.fileSlug === "guides" ? "/guides/" : `/guides/${d.page.fileSlug}/`),
    crumbs: (d) => (d.page.fileSlug === "guides" ? [{ name: "Guides" }] : [{ name: "Guides", url: "/guides/" }, { name: d.short || d.title }]),
  },
};
