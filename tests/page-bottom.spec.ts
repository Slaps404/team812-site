import { test, expect } from '@playwright/test';

for (const route of ['/', '/team/', '/robots/', '/sponsors/', '/contact/']) {
  test(`${route} stops at the footer`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator('footer')).toBeInViewport();
    const bottom = await page.evaluate(() => ({
      footer: document.querySelector('footer')!.getBoundingClientRect().bottom + window.scrollY,
      document: document.documentElement.scrollHeight,
      overscroll: getComputedStyle(document.documentElement).overscrollBehaviorY,
    }));
    expect(Math.abs(bottom.document - bottom.footer)).toBeLessThanOrEqual(1);
    expect(bottom.overscroll).toBe('none');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
}
