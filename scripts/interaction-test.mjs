// Interaction test: category filters, search, mobile menu, newsletter,
// contact form validation, and in-page navigation links.
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";

const BASE = "/jessesweb";
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
const check = (name, ok, detail = "") => {
  results.push(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " [" + detail + "]" : ""}`);
  if (!ok) failed = true;
};

// 1. Article filters + search
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4173" + BASE + "/articles", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Culture/ }).click();
  await page.waitForTimeout(300);
  let cards = await page.locator("article").count();
  check("category filter (Culture)", cards === 2, `expected 2 cards, got ${cards}`);

  await page.getByRole("button", { name: /^All / }).click();
  await page.waitForTimeout(300);
  cards = await page.locator("article").count();
  check("category filter (All)", cards === 10, `expected 10 cards, got ${cards}`);

  await page.fill("#article-search", "cybersecurity");
  await page.waitForTimeout(300);
  cards = await page.locator("article").count();
  check("search 'cybersecurity'", cards === 1, `expected 1 card, got ${cards}`);

  await page.fill("#article-search", "zzzzznothing");
  await page.waitForTimeout(300);
  const empty = await page.getByText("Nothing found").isVisible();
  check("empty search state", empty);

  await page.click("#article-search");
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");

  await page.click('a:has-text("The Power Brokers")');
  await page.waitForTimeout(400);
  check("article nav link", page.url().endsWith(BASE + "/articles/the-power-brokers"));
  await page.close();
}

// 2. Mobile menu
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:4173" + BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(300);
  const visible = await page.locator("#mobile-menu").isVisible();
  check("mobile hamburger opens", visible);
  await page.locator('#mobile-menu a:has-text("Media")').click();
  await page.waitForTimeout(400);
  check("mobile menu navigation", page.url().endsWith(BASE + "/media"));
  await page.close();
}

// 3. Newsletter form
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4173" + BASE + "/", { waitUntil: "networkidle" });
  await page.fill("#newsletter-email", "not-an-email");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await page.waitForTimeout(300);
  check("newsletter invalid email", await page.getByRole("alert").isVisible());
  await page.fill("#newsletter-email", "reader@example.com");
  await page.getByRole("button", { name: "Subscribe" }).click();
  await page.waitForTimeout(300);
  check("newsletter success state", await page.getByText("You're on the list").isVisible());
  await page.close();
}

// 4. Contact form validation + success
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4173" + BASE + "/contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Send message" }).click();
  await page.waitForTimeout(300);
  const errs = await page.locator("p.text-accent").count();
  check("contact validation errors", errs === 4, `expected 4 errors, got ${errs}`);
  await page.fill("#contact-name", "A Reader");
  await page.fill("#contact-email", "reader@example.com");
  await page.fill("#contact-subject", "Commission enquiry");
  await page.fill("#contact-message", "Hello Jesse, I would love to commission an investigation.");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.waitForTimeout(300);
  check("contact success state", await page.getByText("Message sent").isVisible());
  await page.close();
}

// 5. Article page: share buttons, prev/next, related
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4173" + BASE + "/articles/the-price-of-progress", { waitUntil: "networkidle" });
  const shareBtns = await page.getByRole("link", { name: /Share on/ }).count();
  check("share buttons", shareBtns === 4, `expected 4, got ${shareBtns}`);
  check("related stories", await page.getByText("Related stories").isVisible());
  check("previous article nav (newest article)", await page.getByText("Previous article").isVisible());
  check("no next on newest", (await page.getByText("Next article").count()) === 0);
  await page.goto("http://localhost:4173" + BASE + "/articles/the-housing-divide", { waitUntil: "networkidle" });
  check("both prev & next on middle article",
    (await page.getByText("Previous article").count()) === 1 &&
    (await page.getByText("Next article").count()) === 1);
  check("author box", await page.getByText("About the author").isVisible());
  await page.close();
}

// 6. Admin panel: local-first editing (no login), instant save, publish panel
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto("http://localhost:4173" + BASE + "/admin", { waitUntil: "networkidle" });
  check("admin opens without login", await page.getByText("Edit anything below").isVisible());
  check("admin tabs visible", await page.getByRole("tab", { name: "Articles" }).isVisible());

  // Edit an article locally and confirm it shows on the site instantly
  await page.locator('li:has-text("The Power Brokers") button:has-text("Edit")').click();
  await page.waitForTimeout(300);
  await page.getByLabel("Title", { exact: true }).fill("The Power Brokers (edited locally)");
  await page.getByRole("button", { name: "Save article" }).first().click();
  await page.waitForTimeout(500);
  check("article saved locally", await page.getByText("live on this device").isVisible());
  await page.goto("http://localhost:4173" + BASE + "/articles", { waitUntil: "networkidle" });
  check("edited title on site instantly",
    await page.getByText("The Power Brokers (edited locally)").isVisible());

  // Publish panel opens with token instructions
  await page.goto("http://localhost:4173" + BASE + "/admin", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Publish to web" }).click();
  await page.waitForTimeout(300);
  check("publish panel opens", await page.getByText("How to get the token").isVisible());
  await page.getByText("How to get the token").click();
  await page.waitForTimeout(200);
  check("publish panel instructions", await page.getByText("Fine-grained").first().isVisible());

  // Invalid token → graceful error (real API call now that a change exists), no crash
  await page.fill("input[aria-label='GitHub token']", "invalid-token-xyz");
  await page.getByRole("button", { name: "Publish now" }).click();
  await page.waitForTimeout(4000);
  check("publish bad token shows error", await page.getByRole("alert").isVisible());
  check("admin no runtime errors", errors.length === 0, errors.join(" | "));
  await page.getByRole("button", { name: "Close" }).click();
  await page.waitForTimeout(200);
  await page.close();
}

// 7. Footer + navbar links on every page
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const path of ["/", "/about", "/portfolio", "/media", "/contact"]) {
    await page.goto("http://localhost:4173" + BASE + path, { waitUntil: "networkidle" });
    const footerLinks = await page.locator('footer a[href^="/"]').count();
    check(`footer links present on ${path}`, footerLinks >= 6, `got ${footerLinks}`);
    const navLinks = await page.locator('nav[aria-label="Main navigation"] a').count();
    check(`navbar links present on ${path}`, navLinks === 6, `got ${navLinks}`);
  }
  await page.close();
}

await browser.close();
server.kill();
console.log(results.join("\n"));
process.exit(failed ? 1 : 0);