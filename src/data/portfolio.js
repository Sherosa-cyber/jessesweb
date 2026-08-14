// Loads portfolio data from portfolio.json (editable via the admin
// panel at /admin).
import portfolioData from "./portfolio.json";

export const portfolioCategories = portfolioData.categories;
export const portfolioItems = portfolioData.items;