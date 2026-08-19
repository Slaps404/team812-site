import { expect, test } from '@playwright/test';

test('homepage hero and stats use the approved display copy', async ({ page }) => {
  await page.goto('/');

  const title = page.getByRole('heading', { level: 1 });
  await expect(title).toHaveText('THE MIDNIGHT MECHANICS');
  await expect(page.locator('.hero-subcaption')).toHaveText('Built After Hours');

  const titleStyle = await title.evaluate((element) => {
    const style = getComputedStyle(element);
    return { fontFamily: style.fontFamily, textTransform: style.textTransform };
  });
  expect(titleStyle.fontFamily).toContain('DM Sans Variable');
  expect(titleStyle.textTransform).toBe('uppercase');

  const logoFont = await page.locator('.mark span').evaluate((element) => getComputedStyle(element).fontFamily);
  expect(titleStyle.fontFamily).not.toBe(logoFont);

  const subcaption = page.locator('.hero-subcaption');
  const captionStyle = await subcaption.evaluate((element) => {
    const style = getComputedStyle(element);
    return { fontFamily: style.fontFamily, fontWeight: style.fontWeight, textTransform: style.textTransform };
  });
  expect(captionStyle.fontFamily).toContain('Helvetica Neue');
  expect(captionStyle.fontWeight).toBe('500');
  expect(captionStyle.textTransform).toBe('none');

  await expect
    .poll(() => subcaption.evaluate((element) => getComputedStyle(element).opacity))
    .toBe('0');
  await page.evaluate(() => window.scrollTo(0, 160));
  await expect
    .poll(() => subcaption.evaluate((element) => getComputedStyle(element).opacity))
    .toBe('1');

  const statLabels = await page.locator('.stat-label').evaluateAll((nodes) =>
    nodes.map((node) => ({
      text: node.textContent?.trim(),
      textTransform: getComputedStyle(node).textTransform,
    })),
  );

  expect(statLabels).toEqual([
    { text: 'Seasons since 2001', textTransform: 'none' },
    { text: 'Events competed', textTransform: 'none' },
    { text: 'Championship trips', textTransform: 'none' },
    { text: 'FRC team in San Diego', textTransform: 'none' },
  ]);
});
