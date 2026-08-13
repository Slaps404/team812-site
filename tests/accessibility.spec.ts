import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', currentPath: '/', minimumProseLinks: 0 },
  { path: '/sponsors', currentPath: '/sponsors', minimumProseLinks: 1 },
];

for (const route of routes) {
  test.describe(route.path, () => {
    test('puts the primary content in exactly one main landmark', async ({ page }) => {
      await page.goto(route.path);

      const main = page.locator('main');
      await expect(main).toHaveCount(1);
      await expect(main.getByRole('heading', { level: 1 })).toHaveCount(1);
    });

    test('marks only the current navigation link as the current page', async ({ page }) => {
      await page.goto(route.path);

      const currentLink = page.locator('nav a[aria-current="page"]');
      await expect(currentLink).toHaveCount(1);
      await expect(currentLink).toHaveAttribute('href', route.currentPath);
    });

    test('has a meaningful, sequential heading hierarchy', async ({ page }) => {
      await page.goto(route.path);

      const headings = await page.locator('main h1, main h2, main h3, main h4, main h5, main h6').evaluateAll((nodes) =>
        nodes.map((node) => ({
          level: Number(node.tagName.slice(1)),
          text: node.textContent?.trim() ?? '',
        })),
      );

      expect(headings.length).toBeGreaterThan(0);
      expect(headings[0]?.level).toBe(1);
      expect(headings.every(({ text }) => text.length > 0)).toBe(true);
      for (let index = 1; index < headings.length; index += 1) {
        expect(
          headings[index].level - headings[index - 1].level,
          `Heading "${headings[index].text}" skips a level`,
        ).toBeLessThanOrEqual(1);
      }
    });

    test('has no landmark or heading-order violations', async ({ page }) => {
      await page.goto(route.path);

      const results = await new AxeBuilder({ page }).analyze();
      const structureViolations = results.violations.filter(({ id }) =>
        id.includes('landmark') || id === 'region' || id === 'heading-order',
      );

      expect(structureViolations).toEqual([]);
    });

    test('keeps sponsor-panel text at WCAG AA contrast', async ({ page }) => {
      await page.goto(route.path);

      const results = await new AxeBuilder({ page })
        .include('.panel')
        .withRules(['color-contrast'])
        .analyze();

      expect(results.violations).toEqual([]);
    });

    test('distinguishes prose links at rest, hover, and focus', async ({ page }) => {
      await page.goto(route.path);

      const links = page.locator('main .body a[href]');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThanOrEqual(route.minimumProseLinks);

      for (let index = 0; index < linkCount; index += 1) {
        const link = links.nth(index);
        const restingStyle = await link.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            decorationLine: style.textDecorationLine,
            decorationThickness: style.textDecorationThickness,
          };
        });

        expect(restingStyle.decorationLine).toContain('underline');

        await link.hover();
        const hoverThickness = await link.evaluate((element) => getComputedStyle(element).textDecorationThickness);
        expect(hoverThickness).not.toBe(restingStyle.decorationThickness);

        await link.focus();
        const focusStyle = await link.evaluate((element) => {
          const style = getComputedStyle(element);
          return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) };
        });
        expect(focusStyle.outlineStyle).not.toBe('none');
        expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(2);
      }
    });
  });
}
