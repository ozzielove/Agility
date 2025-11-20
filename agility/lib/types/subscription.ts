/**
 * Subscription type definitions
 */

export type SubscriptionPlan = "FREE" | "PRO";
export type SubscriptionStatus = "ACTIVE" | "CANCELLED" | "PAST_DUE";

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface PlanFeatures {
  invoicesPerMonth: number | "unlimited";
  expensesPerMonth: number | "unlimited";
  receiptScan: boolean;
  aiAssistant: boolean;
  taxReports: boolean;
  prioritySupport: boolean;
  price: number;
}

export const PLAN_FEATURES: Record<SubscriptionPlan, PlanFeatures> = {
  FREE: {
    invoicesPerMonth: 10,
    expensesPerMonth: 50,
    receiptScan: false,
    aiAssistant: false,
    taxReports: false,
    prioritySupport: false,
    price: 0,
  },
  PRO: {
    invoicesPerMonth: "unlimited",
    expensesPerMonth: "unlimited",
    receiptScan: true,
    aiAssistant: true,
    taxReports: true,
    prioritySupport: true,
    price: 9.99,
  },
};
