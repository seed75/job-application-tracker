import { test, expect } from '@playwright/test';

test('guest login → sees demo data → read-only UI', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByTestId('login-page')).toBeVisible();

  // Click the guest button
  await page.getByRole('button', { name: 'Login as Guest' }).click();

  // Should land on the applications page
  await expect(page).toHaveURL('/');
  await expect(page.getByTestId('applications-page')).toBeVisible();

  // Guest banner must be visible
  await expect(page.getByText('You are viewing a')).toBeVisible();

  // Demo apps should be listed
  const items = page.getByTestId('application-item');
  await expect(items).toHaveCount(6);

  // "New" button should not exist for guests
  await expect(page.getByTestId('open-create-form')).not.toBeVisible();

  // Status dropdowns should be disabled
  const firstStatus = items.first().getByTestId('status-select');
  await expect(firstStatus).toBeDisabled();

  // Clicking "Sign in" in the banner should log out and go back to /login
  await page.getByRole('link', { name: 'Sign in' }).or(page.getByRole('button', { name: 'Sign in' })).click();
  await expect(page).toHaveURL('/login');
});

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
