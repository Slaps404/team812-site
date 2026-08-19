import { expect, test } from '@playwright/test';

test('contact page keeps one simple sponsor-focused form', async ({ page }) => {
  await page.goto('/contact');

  await expect(page.getByRole('heading', { name: 'Want to reach out?' })).toBeVisible();
  await expect(page.getByText('Please leave a message below.')).toBeVisible();
  await expect(page.locator('main > section')).toHaveCount(1);
  await expect(page.locator('main .eyebrow')).toHaveCount(0);

  const form = page.locator('#contact-form');
  await expect(form).toHaveAttribute('action', 'https://formsubmit.co/team812@preuss.ucsd.edu');
  await expect(form).toHaveAttribute('method', 'POST');
  await expect(form).toHaveAttribute('target', '_blank');
  await expect(form.locator('input')).toHaveCount(6);
  await expect(form.locator('select')).toHaveCount(1);
  await expect(form.locator('textarea')).toHaveCount(1);
  await expect(form.locator('input[name="name"]')).toHaveAttribute('required', '');
  await expect(form.locator('input[name="email"]')).toHaveAttribute('required', '');
  await expect(form.locator('select[name="topic"]')).toHaveAttribute('required', '');
  await expect(form.locator('textarea[name="message"]')).toHaveAttribute('required', '');
  await expect(form.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.locator('.contact-email-link')).toHaveAttribute('href', 'mailto:team812@preuss.ucsd.edu');
  await expect(page.locator('.footer-contact-link')).toHaveText('team812@preuss.ucsd.edu');

  await form.locator('textarea').focus();
  await expect(form.locator('textarea')).toHaveCSS('outline-style', 'none');
});
