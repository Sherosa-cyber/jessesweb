// Loads site configuration from site.json. The admin panel (/admin) saves
// local edits in the browser first, so we check localStorage before the
// bundled JSON. Edit the JSON file directly or use the admin UI.
import siteData from "./site.json";
import { loadLocalContent } from "../utils/localContent.js";

export const site = loadLocalContent("site", siteData);

export const categories = [
  "Politics",
  "Business",
  "Technology",
  "Culture",
  "Society",
  "International",
  "Opinion",
];