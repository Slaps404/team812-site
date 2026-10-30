import { expect, test } from '@playwright/test';

for (const route of ['/', '/sponsors/']) {
  test(`${route} keeps every sponsor inside the panel and clear of following content`, async ({ page }) => {
    await page.goto(route);
    const wall = page.locator('.wall');
    await wall.scrollIntoViewIfNeeded();
    await expect(wall.locator('.logo')).toHaveCount(5);
    await expect(wall.getByRole('link', { name: 'General Atomics Sciences Education Foundation', exact: true })).toHaveAttribute('href', 'https://www.sci-ed-ga.org/');
    await expect(wall.getByRole('link', { name: 'BAE Systems' })).toHaveAttribute('href', 'https://www.baesystems.com/');

    const issues = await wall.evaluate((element) => {
      const issues: string[] = [];
      const panel = element.closest('.panel')!;
      const panelBox = panel.getBoundingClientRect();
      const wallBox = element.getBoundingClientRect();
      if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) issues.push('horizontal page overflow');
      if (wallBox.left < 0 || wallBox.right > document.documentElement.clientWidth + 1) issues.push('wall outside viewport');
      for (const cell of element.querySelectorAll('.logo')) {
        const box = cell.getBoundingClientRect();
        const image = cell.querySelector('img')!;
        const imageBox = image.getBoundingClientRect();
        if (!image.complete || !image.naturalWidth) issues.push(`broken ${image.alt}`);
        if (box.left < wallBox.left - 1 || box.right > wallBox.right + 1 || box.bottom > panelBox.bottom + 1) issues.push(`overflowing ${image.alt} cell`);
        if (imageBox.left < box.left - 1 || imageBox.right > box.right + 1 || imageBox.top < box.top - 1 || imageBox.bottom > box.bottom + 1) issues.push(`overflowing ${image.alt} image`);
      }
      const next = panel.nextElementSibling;
      if (next && next.getBoundingClientRect().top < wallBox.bottom - 1) issues.push('sponsors overlap following section');
      return issues;
    });
    expect(issues).toEqual([]);
  });
}
