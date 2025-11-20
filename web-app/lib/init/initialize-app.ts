/**
 * Initialize application with mock data on first load
 */

import { getItem, setItem, STORAGE_KEYS } from "../storage/local-storage";
import { generateMockUser, generateDefaultPreferences } from "../mock/users";
import { generateDefaultCategories } from "../mock/categories";
import { generateMockInvoices } from "../mock/invoices";
import { generateMockExpenses } from "../mock/expenses";
import { generateTransactionsFromInvoicesAndExpenses } from "../mock/transactions";
import type { Subscription } from "../types/subscription";

const INIT_KEY = "app-initialized";

/**
 * Initialize app data if this is the first load
 */
export function initializeAppData(): void {
  // Check if already initialized
  const isInitialized = getItem<boolean>(INIT_KEY);
  if (isInitialized) {
    return;
  }

  console.log("🚀 Initializing Agility app with mock data...");

  // Generate mock user
  const user = generateMockUser();
  setItem(STORAGE_KEYS.USER, user);

  // Generate default categories
  const categories = generateDefaultCategories(user.id);
  setItem(STORAGE_KEYS.CATEGORIES, categories);

  // Generate mock invoices
  const invoices = generateMockInvoices(user.id, 30);
  setItem(STORAGE_KEYS.INVOICES, invoices);

  // Generate mock expenses
  const expenses = generateMockExpenses(user.id, 100);
  setItem(STORAGE_KEYS.EXPENSES, expenses);

  // Generate transactions from invoices and expenses
  const transactions = generateTransactionsFromInvoicesAndExpenses(
    invoices,
    expenses
  );
  setItem(STORAGE_KEYS.TRANSACTIONS, transactions);

  // Set default subscription (FREE plan)
  const subscription: Subscription = {
    id: "sub-1",
    userId: user.id,
    plan: "FREE",
    status: "ACTIVE",
    cancelAtPeriodEnd: false,
  };
  setItem(STORAGE_KEYS.SUBSCRIPTION, subscription);

  // Set default preferences
  const preferences = generateDefaultPreferences(user.id);
  setItem(STORAGE_KEYS.PREFERENCES, preferences);

  // Mark as initialized
  setItem(INIT_KEY, true);

  console.log("✅ App initialized successfully!");
  console.log("📊 Generated:", {
    invoices: invoices.length,
    expenses: expenses.length,
    transactions: transactions.length,
    categories: categories.length,
  });
}

/**
 * Clear all app data (for testing)
 */
export function clearAppData(): void {
  if (typeof window === "undefined") return;

  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(`agility-${key}`);
  });
  localStorage.removeItem("agility-" + INIT_KEY);

  console.log("🗑️ All app data cleared");
}

/**
 * Re-initialize app data (for testing)
 */
export function reinitializeAppData(): void {
  clearAppData();
  initializeAppData();
}
