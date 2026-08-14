// Loads site configuration from site.json (editable via the admin
// panel at /admin). Edit the JSON file directly or use the admin UI.
import siteData from "./site.json";

export const site = siteData;

export const categories = [
  "Politics",
  "Business",
  "Technology",
  "Culture",
  "Society",
  "International",
  "Opinion",
];