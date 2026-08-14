// Loads media data from media.json. The admin panel (/admin) saves local
// edits in the browser first, so we check localStorage before the bundled
// JSON.
import mediaData from "./media.json";
import { loadLocalContent } from "../utils/localContent.js";

const data = loadLocalContent("media", mediaData);

export const mediaTypes = data.types;
export const mediaItems = data.items;