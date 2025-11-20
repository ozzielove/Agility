/**
 * Dashboard and analytics type definitions
 */

export interface DashboardStats {
  currentMonthProfit: number;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  profitChange: number; // Percentage change from last month
}

export interface ChartDataPoint {
  date: string;
  income: number;
  expenses: number;
  profit?: number;
}

export interface TaxSummary {
  estimatedTaxesDue: number;
  dueDate: Date;
  taxBracket: string;
  amountSetAside: number;
  recommendedAmount: number;
  progress: number; // 0-100
}

export interface FinancialHealthScore {
  score: number; // 0-100
  insights: string[];
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color?: string;
  trend?: number; // Percentage change
}

export interface AIInsight {
  id: string;
  icon: string;
  headline: string;
  description: string;
  detailedExplanation?: string;
  ctaText?: string;
  ctaAction?: string;
}
