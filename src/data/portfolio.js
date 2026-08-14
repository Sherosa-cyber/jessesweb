// Loads portfolio data from portfolio.json. The admin panel (/admin) saves
// local edits in the browser first, so we check localStorage before the
// bundled JSON.
import portfolioData from "./portfolio.json";
import { loadLocalContent } from "../utils/localContent.js";

const data = loadLocalContent("portfolio", portfolioData);

export const portfolioCategories = data.categories;
export const portfolioItems = data.items;