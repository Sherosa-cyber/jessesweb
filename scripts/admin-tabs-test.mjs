import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--port", "4173", "--strictPort"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 4000));
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
await page.goto("http://localhost:4173/jessesweb/admin", { waitUntil: "networkidle" });

const checks = [];
const check = (name, ok, detail = "") => {
  checks.push(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " [" + detail + "]" : ""}`);
};

// Articles tab (default)
check("articles list", await page.getByText("10 articles").isVisible());
check("new article button", await page.getByRole("button", { name: "+ New article" }).isVisible());

// Site Settings tab
await page.getByRole("tab", { name: "Site Settings" }).click();
await page.waitForTimeout(600);
check("site settings form", await page.getByText("Your name", { exact: true }).isVisible());
check("add social button", await page.getByRole("button", { name: "+ Add social link" }).isVisible());
check("add education button", await page.getByRole("button", { name: "+ Add education entry" }).isVisible());
check("add experience button", await page.getByRole("button", { name: "+ Add experience entry" }).isVisible());
check("save button", await page.getByRole("button", { name: "Save all changes" }).first().isVisible());

// Portfolio tab
await page.getByRole("tab", { name: "Portfolio" }).click();
await page.waitForTimeout(600);
check("portfolio list", await page.getByText("portfolio items").first().isVisible());
check("new portfolio button", await page.getByRole("button", { name: "+ New portfolio item" }).isVisible());

// Media tab
await page.getByRole("tab", { name: "Media" }).click();
await page.waitForTimeout(600);
check("media list", await page.getByText("media items").first().isVisible());
check("new media button", await page.getByRole("button", { name: "+ New media item" }).isVisible());

// Photos tab
await page.getByRole("tab", { name: "Photos" }).click();
await page.waitForTimeout(600);
check("photos upload", await page.getByRole("button", { name: "Add photo" }).isVisible());
check("photos empty state", await page.getByText("No photos added yet").isVisible());

// Publish with no local changes → friendly message
await page.getByRole("button", { name: "Publish to web" }).click();
await page.waitForTimeout(300);
await page.fill("input[aria-label='GitHub token']", "invalid-token-xyz");
await page.getByRole("button", { name: "Publish now" }).click();
await page.waitForTimeout(500);
check("publish guard with no changes", await page.getByText("no local changes to publish").isVisible());

check("no runtime errors", errors.length === 0, errors.join(" | "));
console.log(checks.join("\n"));
await browser.close();
server.kill();