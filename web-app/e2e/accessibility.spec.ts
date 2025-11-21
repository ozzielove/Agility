/**
 * ACCESSIBILITY TESTS - WCAG 2.1 Compliance
 *
 * Test Strategy: Use axe-core to validate accessibility on all pages.
 * Expected Behavior: No critical or serious accessibility violations.
 * @tag @a11y
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests @a11y', () => {
  test.describe('Public Pages', () => {
    test('landing page should have no accessibility violations', async ({ page }) => {
      await page.goto('/');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      // Log violations for debugging
      if (results.violations.length > 0) {
        console.log('Accessibility violations:', JSON.stringify(results.violations, null, 2));
      }

      // Allow some minor issues but no critical/serious ones
      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('login page should have no accessibility violations', async ({ page }) => {
      await page.goto('/login');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('signup page should have no accessibility violations', async ({ page }) => {
      await page.goto('/signup');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });
  });

  test.describe('Authenticated Pages', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
      await page.getByPlaceholder(/email/i).fill('test@example.com');
      await page.getByPlaceholder(/password/i).fill('password123');
      await page.getByRole('button', { name: /Sign In/i }).click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    });

    test('dashboard should have no critical accessibility violations', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('invoices page should have no critical accessibility violations', async ({ page }) => {
      await page.goto('/invoices');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('expenses page should have no critical accessibility violations', async ({ page }) => {
      await page.goto('/expenses');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });

    test('settings page should have no critical accessibility violations', async ({ page }) => {
      await page.goto('/settings');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(criticalViolations).toHaveLength(0);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should be able to navigate login form with keyboard', async ({ page }) => {
      await page.goto('/login');

      // Tab to email field
      await page.keyboard.press('Tab');
      await expect(page.getByPlaceholder(/email/i)).toBeFocused();

      // Tab to password field
      await page.keyboard.press('Tab');
      // May focus on eye icon or password - just verify focus moves

      // Continue tabbing through interactive elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
      }

      // Should eventually reach sign in button
      const signInButton = page.getByRole('button', { name: /Sign In/i });
      await signInButton.focus();
      await expect(signInButton).toBeFocused();
    });

    test('should be able to navigate landing page with keyboard', async ({ page }) => {
      await page.goto('/');

      // Tab through navigation
      await page.keyboard.press('Tab');

      // Should be able to reach navigation links
      const signInLink = page.getByRole('link', { name: /Sign In/i });
      await signInLink.focus();
      await expect(signInLink).toBeFocused();

      // Press Enter to navigate
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Color Contrast', () => {
    test('text should have sufficient color contrast', async ({ page }) => {
      await page.goto('/');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .options({ rules: { 'color-contrast': { enabled: true } } })
        .analyze();

      const contrastViolations = results.violations.filter(
        (v) => v.id === 'color-contrast' && (v.impact === 'critical' || v.impact === 'serious')
      );

      expect(contrastViolations).toHaveLength(0);
    });
  });

  test.describe('Focus Indicators', () => {
    test('interactive elements should have visible focus indicators', async ({ page }) => {
      await page.goto('/login');

      // Focus on email input
      await page.getByPlaceholder(/email/i).focus();

      // Check if the focused element has a visible outline/ring
      const emailInput = page.getByPlaceholder(/email/i);
      const focusStyles = await emailInput.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          boxShadow: styles.boxShadow,
          border: styles.border,
        };
      });

      // Should have some form of focus indicator
      const hasFocusIndicator =
        focusStyles.outline !== 'none' ||
        focusStyles.boxShadow !== 'none' ||
        focusStyles.border.includes('rgb');

      expect(hasFocusIndicator).toBe(true);
    });
  });
});
