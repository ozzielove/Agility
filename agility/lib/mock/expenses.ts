/**
 * Mock expense data generator
 */

import type { Expense } from "../types/expense";
import { subDays, subMonths } from "date-fns";

const MERCHANTS = [
  "Amazon Web Services",
  "Adobe Creative Cloud",
  "Uber",
  "Starbucks",
  "Office Depot",
  "FedEx",
  "LinkedIn Premium",
  "Zoom",
  "Dropbox",
  "Slack",
  "Google Workspace",
  "Figma",
  "GitHub",
  "Mailchimp",
  "Canva Pro",
  "United Airlines",
  "Hilton Hotels",
  "WeWork",
  "Best Buy",
  "Apple Store",
];

const CATEGORY_IDS = [
  "cat-1",  // Travel
  "cat-2",  // Meals
  "cat-3",  // Software
  "cat-4",  // Equipment
  "cat-5",  // Marketing
  "cat-6",  // Office Supplies
  "cat-7",  // Professional Services
  "cat-8",  // Education
  "cat-9",  // Internet & Phone
  "cat-10", // Subscriptions
];

function getMerchantCategory(merchant: string): string {
  if (merchant.includes("AWS") || merchant.includes("Cloud") || merchant.includes("GitHub")) {
    return "cat-3"; // Software
  }
  if (merchant.includes("Uber") || merchant.includes("Airlines") || merchant.includes("Hotels")) {
    return "cat-1"; // Travel
  }
  if (merchant.includes("Starbucks")) {
    return "cat-2"; // Meals
  }
  if (merchant.includes("Office") || merchant.includes("FedEx")) {
    return "cat-6"; // Office Supplies
  }
  if (merchant.includes("Slack") || merchant.includes("Zoom") || merchant.includes("Figma") || merchant.includes("Dropbox")) {
    return "cat-10"; // Subscriptions
  }
  if (merchant.includes("Best Buy") || merchant.includes("Apple")) {
    return "cat-4"; // Equipment
  }
  if (merchant.includes("LinkedIn") || merchant.includes("Mailchimp")) {
    return "cat-5"; // Marketing
  }
  if (merchant.includes("WeWork")) {
    return "cat-6"; // Office Supplies
  }

  // Random category for others
  return CATEGORY_IDS[Math.floor(Math.random() * CATEGORY_IDS.length)];
}

export function generateMockExpenses(userId: string, count: number = 100): Expense[] {
  const expenses: Expense[] = [];

  for (let i = 0; i < count; i++) {
    const merchant = MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];
    const categoryId = getMerchantCategory(merchant);

    // Random amount between $10 and $500
    const amount = Math.floor(Math.random() * 490) + 10;

    // Random date in the past 6 months
    const daysAgo = Math.floor(Math.random() * 180);
    const date = subDays(new Date(), daysAgo);

    // Most expenses are deductible
    const isDeductible = Math.random() > 0.2;

    // Some expenses have receipts
    const hasReceipt = Math.random() > 0.3;

    expenses.push({
      id: `exp-${i + 1}`,
      userId,
      amount,
      currency: "USD",
      merchant,
      vendor: merchant,
      description: `${merchant} - Business expense`,
      date,
      categoryId,
      receiptUrl: hasReceipt ? `https://via.placeholder.com/400x600.png?text=Receipt+${i + 1}` : undefined,
      notes: Math.random() > 0.7 ? "Business related expense" : undefined,
      isDeductible,
      createdAt: date,
      updatedAt: new Date(),
    });
  }

  // Sort by date descending (newest first)
  return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
}
