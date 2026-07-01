/**
 * Session Indicator — Playwright recording script
 *
 * Launches Chromium, loads index.html via a local HTTP server,
 * performs the choreographed demo sequence, and saves a .webm
 * to record/recordings/. Run convert.sh afterward to get an .mp4.
 *
 * Usage:
 *   npx serve . -p 3456 &        ← start server from repo root
 *   node record/choreography.js  ← run this script
 *   kill %1                      ← stop server
 *
 * Or use the convenience wrapper: bash record/record.sh
 */

const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'http://localhost:3456';
const RECORDINGS_DIR = path.join(__dirname, 'recordings');

const wait = ms => new Promise(r => setTimeout(r, ms));

/**
 * Move cursor to an element's center with smooth interpolation.
 * Uses evaluate() to get coords so it never blocks on hidden elements.
 */
async function moveTo(page, selector) {
  const box = await page.locator(selector).first().boundingBox({ timeout: 5000 }).catch(() => null);
  if (!box) { console.warn(`  moveTo: no bounding box for "${selector}", skipping`); return; }
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
}

/**
 * Click element and wait for a visible confirmation selector to appear.
 */
async function clickAndWaitFor(page, clickSel, waitSel, timeout = 5000) {
  await page.locator(clickSel).first().click();
  if (waitSel) await page.waitForSelector(waitSel, { timeout });
}

(async () => {
  const browser = await chromium.launch({
    headless: false,        // headful — cursor visible in recording
    args: ['--start-maximized'],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: RECORDINGS_DIR,
      size: { width: 1280, height: 800 },
    },
    deviceScaleFactor: 2,   // retina-quality frames
  });

  const page = await context.newPage();
  console.log('Loading page…');
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // ── Chapter 0: establish initial state ──────────────────────────────────
  console.log('Chapter 0: initial state');
  await moveTo(page, '.si-wrap');
  await wait(3000);   // hold so viewer reads the scene

  // ── Chapter 1: open the popover ─────────────────────────────────────────
  console.log('Chapter 1: open popover');
  // Click .si-wrap (the actual onClick handler target, not the pill inside it)
  await clickAndWaitFor(page, '.si-wrap', '.popover.visible');
  await wait(1200);   // let popIn animation finish

  // ── Chapter 2: hover a session row ──────────────────────────────────────
  console.log('Chapter 2: hover session row');
  // .s-row elements are children of .s-row-wrap — use nth() on the locator
  await moveTo(page, '.s-row-wrap:nth-child(2) .s-row');
  await wait(1000);

  // ── Chapter 3: approve a waiting session ────────────────────────────────
  console.log('Chapter 3: approve');
  // First Approve button (primary, in a waiting row's .s-btns)
  const approveBtn = page.locator('.s-btns .s-btn.primary').first();
  const approveBox = await approveBtn.boundingBox({ timeout: 4000 }).catch(() => null);
  if (approveBox) {
    await page.mouse.move(approveBox.x + approveBox.width / 2, approveBox.y + approveBox.height / 2, { steps: 15 });
    await wait(600);
    await approveBtn.click();
  } else {
    console.warn('  No Approve button found — skipping approve step');
  }
  await wait(1800);   // state transitions, dot color change

  // ── Chapter 4: open a terminal ──────────────────────────────────────────
  console.log('Chapter 4: open terminal');
  // Click the session name on the first row — that opens a terminal
  const firstName = page.locator('.s-name').first();
  await moveTo(page, '.s-name');
  await wait(600);
  await firstName.click();
  await wait(1800);   // terminal slides in

  // ── Chapter 5: add a second session ─────────────────────────────────────
  console.log('Chapter 5: add session');
  await page.keyboard.press('s');
  await wait(2200);   // second session + terminal appear

  // ── Chapter 6: swap focus between terminals ──────────────────────────────
  // Click .term-chrome (title bar) rather than .term-win, because .term-body
  // intercepts pointer events and Playwright can't click through it.
  // Focus is triggered by onMouseDown on the parent .term-win, which bubbles
  // up from the chrome click fine.
  console.log('Chapter 6: focus swap');
  const chromes = page.locator('.term-chrome');
  const count = await chromes.count();
  if (count >= 2) {
    const firstBox = await chromes.nth(0).boundingBox({ timeout: 4000 }).catch(() => null);
    if (firstBox) {
      await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2, { steps: 15 });
      await wait(500);
      await page.mouse.click(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2);
    }
    await wait(1800);   // dimming transition

    const secondBox = await chromes.nth(1).boundingBox({ timeout: 4000 }).catch(() => null);
    if (secondBox) {
      await page.mouse.move(secondBox.x + secondBox.width / 2, secondBox.y + secondBox.height / 2, { steps: 15 });
      await wait(500);
      await page.mouse.click(secondBox.x + secondBox.width / 2, secondBox.y + secondBox.height / 2);
    }
    await wait(2000);
  } else {
    console.warn(`  Only ${count} terminal chrome(s) visible — skipping focus swap`);
    await wait(2000);
  }

  // ── Chapter 7: close popover, hold on final wide shot ───────────────────
  console.log('Chapter 7: close and hold');
  await moveTo(page, '.si-wrap');
  await wait(500);
  await page.locator('.si-wrap').click();  // close popover
  await wait(1000);
  await moveTo(page, '.si-wrap');
  await wait(3000);   // hold — editor trims here

  // ── Done ────────────────────────────────────────────────────────────────
  console.log('Closing browser and saving video…');
  await context.close();   // triggers .webm flush to disk
  await browser.close();

  console.log(`\n✓ Recording saved to: ${RECORDINGS_DIR}`);
  console.log('  Run: bash record/convert.sh  to produce an .mp4\n');
})();
