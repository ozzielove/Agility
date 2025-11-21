/**
 * SMOKE TESTS - Utility Functions
 *
 * Test Strategy: Verify all utility functions execute without throwing errors.
 * Expected Behavior: Functions return expected data types.
 * Risks: Type errors, undefined values, edge cases.
 */

import {
  cn,
  formatCurrency,
  formatDate,
  formatRelativeDate,
  getGreeting,
  calculateTax,
  calculateSimpleTax,
  generateInvoiceNumber,
  getInitials,
  truncate,
  slugify,
  debounce,
} from '@/lib/utils';

describe('Smoke Tests - Utility Functions', () => {
  describe('cn (className merger)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2');
      expect(typeof result).toBe('string');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'conditional', 'another');
      expect(result).toContain('base');
      expect(result).toContain('another');
      expect(result).not.toContain('conditional');
    });

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end');
      expect(typeof result).toBe('string');
    });
  });

  describe('formatCurrency', () => {
    it('should format positive numbers', () => {
      const result = formatCurrency(1234.56);
      expect(typeof result).toBe('string');
      expect(result).toContain('1');
    });

    it('should format zero', () => {
      const result = formatCurrency(0);
      expect(typeof result).toBe('string');
    });

    it('should format negative numbers', () => {
      const result = formatCurrency(-1000);
      expect(typeof result).toBe('string');
    });

    it('should format large numbers', () => {
      const result = formatCurrency(1000000);
      expect(typeof result).toBe('string');
    });
  });

  describe('formatDate', () => {
    it('should format date string', () => {
      const result = formatDate('2024-01-15');
      expect(typeof result).toBe('string');
    });

    it('should format Date object', () => {
      const result = formatDate(new Date());
      expect(typeof result).toBe('string');
    });
  });

  describe('formatRelativeDate', () => {
    it('should format relative date', () => {
      const result = formatRelativeDate(new Date());
      expect(typeof result).toBe('string');
    });

    it('should handle past dates', () => {
      const pastDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const result = formatRelativeDate(pastDate);
      expect(typeof result).toBe('string');
    });
  });

  describe('getGreeting', () => {
    it('should return a greeting string', () => {
      const result = getGreeting();
      expect(typeof result).toBe('string');
      expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(result);
    });
  });

  describe('calculateTax', () => {
    it('should calculate tax correctly (income - expenses with SE tax)', () => {
      // calculateTax(income, expenses, taxRate) - includes SE tax 15.3%
      const result = calculateTax(10000, 5000, 0.25);
      expect(typeof result).toBe('number');
      // Profit: 5000, SE tax: 5000 * 0.153 = 765, Income tax: 5000 * 0.25 = 1250
      expect(result).toBeCloseTo(765 + 1250, 2);
    });

    it('should handle zero profit', () => {
      const result = calculateTax(1000, 1000);
      expect(result).toBe(0);
    });

    it('should handle negative profit', () => {
      const result = calculateTax(500, 1000);
      expect(result).toBe(0);
    });
  });

  describe('calculateSimpleTax', () => {
    it('should calculate simple percentage tax', () => {
      const result = calculateSimpleTax(1000, 25);
      expect(result).toBe(250);
    });

    it('should handle zero amount', () => {
      const result = calculateSimpleTax(0, 25);
      expect(result).toBe(0);
    });

    it('should handle zero rate', () => {
      const result = calculateSimpleTax(1000, 0);
      expect(result).toBe(0);
    });
  });

  describe('generateInvoiceNumber', () => {
    it('should generate sequential invoice numbers', () => {
      const invoice1 = generateInvoiceNumber();
      const invoice2 = generateInvoiceNumber(invoice1);
      expect(typeof invoice1).toBe('string');
      expect(typeof invoice2).toBe('string');
      expect(invoice1).not.toBe(invoice2);
    });

    it('should follow expected format', () => {
      const invoice = generateInvoiceNumber();
      expect(invoice).toMatch(/^INV-\d{4}-\d{4}$/);
    });

    it('should start from 0001 when no last number provided', () => {
      const invoice = generateInvoiceNumber();
      expect(invoice).toMatch(/-0001$/);
    });

    it('should increment from last number', () => {
      const invoice = generateInvoiceNumber('INV-2024-0005');
      expect(invoice).toMatch(/-0006$/);
    });
  });

  describe('getInitials', () => {
    it('should get initials from full name', () => {
      const result = getInitials('John Doe');
      expect(result).toBe('JD');
    });

    it('should handle single name', () => {
      const result = getInitials('John');
      expect(result).toBe('J');
    });

    it('should handle empty string', () => {
      const result = getInitials('');
      expect(typeof result).toBe('string');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      const result = truncate('This is a very long string', 10);
      expect(result.length).toBeLessThanOrEqual(13); // 10 + '...'
    });

    it('should not truncate short strings', () => {
      const result = truncate('Short', 10);
      expect(result).toBe('Short');
    });
  });

  describe('slugify', () => {
    it('should convert string to slug', () => {
      const result = slugify('Hello World');
      expect(result).toBe('hello-world');
    });

    it('should handle special characters', () => {
      const result = slugify('Hello! World?');
      expect(typeof result).toBe('string');
      expect(result).not.toContain('!');
      expect(result).not.toContain('?');
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should debounce function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      jest.useRealTimers();
    });
  });
});
