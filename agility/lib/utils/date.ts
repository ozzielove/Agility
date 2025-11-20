/**
 * Date utility functions
 */

import {
  addDays,
  addMonths,
  addYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subMonths,
  subYears,
  isAfter,
  isBefore,
  isWithinInterval,
  differenceInDays,
} from "date-fns";

/**
 * Get start and end of current month
 */
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date();
  return {
    start: startOfMonth(now),
    end: endOfMonth(now),
  };
}

/**
 * Get start and end of current year
 */
export function getCurrentYearRange(): { start: Date; end: Date } {
  const now = new Date();
  return {
    start: startOfYear(now),
    end: endOfYear(now),
  };
}

/**
 * Get last N months range
 */
export function getLastNMonthsRange(n: number): { start: Date; end: Date } {
  const now = new Date();
  return {
    start: subMonths(startOfMonth(now), n - 1),
    end: endOfMonth(now),
  };
}

/**
 * Get last N years range
 */
export function getLastNYearsRange(n: number): { start: Date; end: Date } {
  const now = new Date();
  return {
    start: subYears(startOfYear(now), n - 1),
    end: endOfYear(now),
  };
}

/**
 * Add business days to a date
 */
export function addBusinessDays(date: Date, days: number): Date {
  let result = new Date(date);
  let daysAdded = 0;

  while (daysAdded < days) {
    result = addDays(result, 1);
    // Skip weekends
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      daysAdded++;
    }
  }

  return result;
}

/**
 * Check if date is overdue
 */
export function isOverdue(date: Date): boolean {
  return isBefore(date, new Date());
}

/**
 * Check if date is within range
 */
export function isDateInRange(
  date: Date,
  start: Date,
  end: Date
): boolean {
  return isWithinInterval(date, { start, end });
}

/**
 * Get days until date
 */
export function getDaysUntil(date: Date): number {
  return differenceInDays(date, new Date());
}

/**
 * Get days between dates
 */
export function getDaysBetween(start: Date, end: Date): number {
  return differenceInDays(end, start);
}

/**
 * Get default due date (30 days from now)
 */
export function getDefaultDueDate(): Date {
  return addDays(new Date(), 30);
}

/**
 * Get next quarter end date
 */
export function getNextQuarterEnd(): Date {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  // Quarter ends: March, June, September, December
  const quarterEnds = [2, 5, 8, 11]; // Months are 0-indexed

  for (const quarterEnd of quarterEnds) {
    if (month <= quarterEnd) {
      return new Date(year, quarterEnd + 1, 0); // Last day of month
    }
  }

  // If we're past December, return next March
  return new Date(year + 1, 3, 0);
}
