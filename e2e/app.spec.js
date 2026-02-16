import { test, expect } from '@playwright/test';

test('login → create application → change status', async ({ page }) => {
  // ── Login ────────────────────────────────────────────────────
  await page.goto('/login');
  await expect(page.getByTestId('login-page')).toBeVisible();

  await page.getByTestId('login-email').fill('alice@example.com');
  await page.getByTestId('login-password').fill('password123');
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('/');
  await expect(page.getByTestId('applications-page')).toBeVisible();

  // ── Create application ───────────────────────────────────────
  await page.getByTestId('open-create-form').click();
  await expect(page.getByTestId('create-application-form')).toBeVisible();

  await page.getByTestId('input-company').fill('Acme Corp');
  await page.getByTestId('input-position').fill('Backend Engineer');
  await page.getByTestId('input-status').selectOption('applied');
  await page.getByTestId('submit-create').click();

  await expect(page.getByTestId('create-application-form')).not.toBeVisible();

  const firstItem = page.getByTestId('application-item').first();
  await expect(firstItem.getByTestId('app-company')).toHaveText('Acme Corp');
  await expect(firstItem.getByTestId('app-position')).toHaveText('Backend Engineer');
  await expect(firstItem.getByTestId('status-select')).toHaveValue('applied');

  // ── Change status ────────────────────────────────────────────
  await firstItem.getByTestId('status-select').selectOption('interview');
  await expect(firstItem.getByTestId('status-select')).toHaveValue('interview');
});
