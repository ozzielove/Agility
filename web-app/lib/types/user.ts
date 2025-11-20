/**
 * User type definitions
 */

export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  country?: string;
  currency: string;
  taxYear?: Date;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string;
  businessName?: string;
  country?: string;
  currency: string;
  taxYearStart?: number; // Month (1-12)
  fiscalYearType: "calendar" | "custom";
}

export interface UserPreferences {
  userId: string;
  notifications: {
    invoicePayments: { email: boolean; push: boolean; inApp: boolean };
    expenseReminders: { email: boolean; push: boolean; inApp: boolean };
    taxDeadlines: { email: boolean; push: boolean; inApp: boolean };
    weeklySummaries: { email: boolean; push: boolean; inApp: boolean };
    aiInsights: { email: boolean; push: boolean; inApp: boolean };
    securityAlerts: { email: boolean; push: boolean; inApp: boolean };
  };
  automation: {
    autoCategorizeSubscriptions: boolean;
    tagRideSharesAsTravel: boolean;
    newClientNotifications: boolean;
    weeklySummaryEmails: boolean;
    smartTaxEstimates: boolean;
    receiptReminders: boolean;
  };
}
