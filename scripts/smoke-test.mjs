// Smoke test: renders every route in a real browser (system Edge via playwright-core)
// and reports console errors, failed requests, and missing key content.
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";

const routes = [
  { path: "/", text: "Jesse Brooks" },
  { path: "/articles", text: "Search articles" },
  { path: "/articles/the-price-of-progress", text: "The Price of Progress" },
  { path: "/articles/the-power-brokers", text: "The Power Brokers" },
  { path: "/portfolio", text: "Selected work" },
  { path: "/media", text: "Interviews & appearances" },
  { path: "/about", text: "The person behind the byline" },
  { path: "/contact", text: "Let's talk" },
  { path: "/this-page-does-not-exist", text: "This story doesn't exist" },
];

const server = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "preview", "--port", "4173", "--strictPort"],
  { stdio: "ignore" }
);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await wait(4000);

const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
let failed = false;

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("requestfailed", (req) => errors.push("REQ FAIL: " + req.url()));

  try {
    await page.goto("http://localhost:4173" + route.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const body = await page.textContent("body");
    const hasText = body.includes(route.text);
    const status = hasText && errors.length === 0 ? "PASS" : "FAIL";
    if (status === "FAIL") failed = true;
    results.push(`${status} ${route.path}${hasText ? "" : " [missing text: " + route.text + "]"}${errors.length ? " [errors: " + errors.join(" | ") + "]" : ""}`);
  } catch (err) {
    failed = true;
    results.push(`FAIL ${route.path} [exception: ${err.message}]`);
  }
  await page.close();
}

await browser.close();
server.kill();

console.log(results.join("\n"));
process.exit(failed ? 1 : 0);