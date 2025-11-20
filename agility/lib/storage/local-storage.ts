/**
 * LocalStorage utility functions with TypeScript support
 */

const PREFIX = "agility-";

/**
 * Get item from localStorage with type safety
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(PREFIX + key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return null;
  }
}

/**
 * Set item in localStorage
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
}

/**
 * Remove item from localStorage
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
}

/**
 * Clear all Agility items from localStorage
 */
export function clear(): void {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Check if localStorage is available
 */
export function isAvailable(): boolean {
  try {
    const test = "__test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// Storage keys (constants)
export const STORAGE_KEYS = {
  USER: "user",
  INVOICES: "invoices",
  EXPENSES: "expenses",
  TRANSACTIONS: "transactions",
  CATEGORIES: "categories",
  SUBSCRIPTION: "subscription",
  PREFERENCES: "preferences",
  ONBOARDING_COMPLETE: "onboarding_complete",
  AUTH_TOKEN: "auth_token",
} as const;
