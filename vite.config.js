import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves the site from /jessesweb/ (repo subpath).
  // Dev stays at the root ("/").
  base: process.env.NODE_ENV === "production" ? "/jessesweb/" : "/",
  plugins: [react(), tailwindcss()],
});
