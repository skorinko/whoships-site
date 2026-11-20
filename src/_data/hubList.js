// One entry per localized feature hub: each hub in every site locale.
import site from "./site.js";

export default site.locales.flatMap((locale) => site.hubs.map((hub) => ({ ...locale, hub, pageKey: `hub-${hub.key}` })));
