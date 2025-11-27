/**
 * E2E SMOKE TESTS - Critical Path Validation
 *
 * Test Strategy: Verify critical user journeys work end-to-end.
 * These tests run against a real browser instance.
 */

import { test, expect } from '@playwright/test';

test.describe('E2E Smoke Tests', () => {
  test.describe('Landing Page', () => {
    test('should load landing page', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Agility/);
    });

    test('should display hero section', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByText('Financial')).toBeVisible();
      await expect(page.getByText('Command Center')).toBeVisible();
    });

    test('should have navigation links', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();
    });

    test('should navigate to login page', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('link', { name: /Sign In/i }).click();
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Authentication Flow', () => {
    test('should display login form', async ({ page }) => {
      await page.goto('/login');
      await expect(page.getByPlaceholder(/email/i)).toBeVisible();
      await expect(page.getByPlaceholder(/password/i)).toBeVisible();
    });

    test('should login with valid credentials', async ({ page }) => {
      await page.goto('/login');

      await page.getByPlaceholder(/email/i).fill('test@example.com');
      await page.getByPlaceholder(/password/i).fill('password123');
      await page.getByRole('button', { name: /Sign In/i }).click();

      // Should redirect to dashboard after login
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    });

    test('should display signup form', async ({ page }) => {
      await page.goto('/signup');
      await expect(page.getByPlaceholder(/full name/i)).toBeVisible();
      await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    });
  });

  test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      // Login first
      await page.goto('/login');
      await page.getByPlaceholder(/email/i).fill('test@example.com');
      await page.getByPlaceholder(/password/i).fill('password123');
      await page.getByRole('button', { name: /Sign In/i }).click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    });

    test('should display dashboard elements', async ({ page }) => {
      await expect(page.getByText(/Scan Receipt/i)).toBeVisible();
    });

    test('should navigate to invoices', async ({ page }) => {
      await page.getByRole('link', { name: /Invoices/i }).first().click();
      await expect(page).toHaveURL(/\/invoices/);
    });

    test('should navigate to expenses', async ({ page }) => {
      await page.getByRole('link', { name: /Expenses/i }).first().click();
      await expect(page).toHaveURL(/\/expenses/);
    });
  });

  test.describe('Invoices', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.getByPlaceholder(/email/i).fill('test@example.com');
      await page.getByPlaceholder(/password/i).fill('password123');
      await page.getByRole('button', { name: /Sign In/i }).click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    });

    test('should display invoices page', async ({ page }) => {
      await page.goto('/invoices');
      await expect(page.getByRole('heading', { name: /Invoices/i })).toBeVisible();
    });

    test('should navigate to new invoice form', async ({ page }) => {
      await page.goto('/invoices');
      await page.getByRole('link', { name: /New Invoice|Create Invoice/i }).click();
      await expect(page).toHaveURL(/\/invoices\/new/);
    });
  });

  test.describe('Expenses', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.getByPlaceholder(/email/i).fill('test@example.com');
      await page.getByPlaceholder(/password/i).fill('password123');
      await page.getByRole('button', { name: /Sign In/i }).click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    });

    test('should display expenses page', async ({ page }) => {
      await page.goto('/expenses');
      await expect(page.getByRole('heading', { name: /Expenses/i })).toBeVisible();
    });
  });

  test.describe('Settings', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.getByPlaceholder(/email/i).fill('test@example.com');
      await page.getByPlaceholder(/password/i).fill('password123');
      await page.getByRole('button', { name: /Sign In/i }).click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    });

    test('should display settings page', async ({ page }) => {
      await page.goto('/settings');
      await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();
    });

    test('should display user profile', async ({ page }) => {
      await page.goto('/settings');
      await expect(page.getByText(/Edit Profile/i)).toBeVisible();
    });
  });
});
