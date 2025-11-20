/**
 * Mock user data generator
 */

import type { User, UserPreferences } from "../types/user";

export function generateMockUser(): User {
  return {
    id: "user-1",
    email: "freelancer@agility.app",
    name: "Alex Johnson",
    businessName: "Alex Johnson Design Studio",
    country: "United States",
    currency: "USD",
    taxYear: new Date(new Date().getFullYear(), 0, 1),
    avatar: undefined,
    phone: "+1 (555) 123-4567",
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(),
  };
}

export function generateDefaultPreferences(userId: string): UserPreferences {
  return {
    userId,
    notifications: {
      invoicePayments: { email: true, push: true, inApp: true },
      expenseReminders: { email: true, push: false, inApp: true },
      taxDeadlines: { email: true, push: true, inApp: true },
      weeklySummaries: { email: true, push: false, inApp: false },
      aiInsights: { email: false, push: false, inApp: true },
      securityAlerts: { email: true, push: true, inApp: true },
    },
    automation: {
      autoCategorizeSubscriptions: true,
      tagRideSharesAsTravel: true,
      newClientNotifications: false,
      weeklySummaryEmails: false,
      smartTaxEstimates: true,
      receiptReminders: false,
    },
  };
}
