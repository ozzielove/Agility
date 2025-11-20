/**
 * Mock dashboard data generator
 */

import type {
  DashboardStats,
  ChartDataPoint,
  TaxSummary,
  FinancialHealthScore,
  CategoryBreakdown,
  AIInsight,
} from "../types/dashboard";
import type { Invoice } from "../types/invoice";
import type { Expense } from "../types/expense";
import { startOfMonth, format, subMonths } from "date-fns";

export function generateDashboardStats(
  invoices: Invoice[],
  expenses: Expense[]
): DashboardStats {
  const now = new Date();
  const currentMonthStart = startOfMonth(now);

  // Current month income (paid invoices)
  const currentMonthIncome = invoices
    .filter((inv) => inv.status === "PAID" && inv.issueDate >= currentMonthStart)
    .reduce((sum, inv) => sum + inv.total, 0);

  // Current month expenses
  const currentMonthExpenses = expenses
    .filter((exp) => exp.date >= currentMonthStart)
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Last month for comparison
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthIncome = invoices
    .filter(
      (inv) =>
        inv.status === "PAID" &&
        inv.issueDate >= lastMonthStart &&
        inv.issueDate < currentMonthStart
    )
    .reduce((sum, inv) => sum + inv.total, 0);

  const currentMonthProfit = currentMonthIncome - currentMonthExpenses;
  const lastMonthProfit = lastMonthIncome;

  // Calculate profit change percentage
  const profitChange =
    lastMonthProfit > 0
      ? ((currentMonthProfit - lastMonthProfit) / lastMonthProfit) * 100
      : 0;

  // Total income (all paid invoices)
  const totalIncome = invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((sum, inv) => sum + inv.total, 0);

  // Total expenses
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return {
    currentMonthProfit,
    totalIncome: currentMonthIncome,
    totalExpenses: currentMonthExpenses,
    balance: totalIncome - totalExpenses,
    profitChange,
  };
}

export function generateChartData(
  invoices: Invoice[],
  expenses: Expense[],
  months: number = 6
): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const nextMonthStart = startOfMonth(subMonths(now, i - 1));

    const monthIncome = invoices
      .filter(
        (inv) =>
          inv.status === "PAID" &&
          inv.issueDate >= monthStart &&
          inv.issueDate < nextMonthStart
      )
      .reduce((sum, inv) => sum + inv.total, 0);

    const monthExpenses = expenses
      .filter((exp) => exp.date >= monthStart && exp.date < nextMonthStart)
      .reduce((sum, exp) => sum + exp.amount, 0);

    data.push({
      date: format(monthStart, "MMM yyyy"),
      income: monthIncome,
      expenses: monthExpenses,
      profit: monthIncome - monthExpenses,
    });
  }

  return data;
}

export function generateTaxSummary(income: number): TaxSummary {
  const estimatedTaxRate = 0.25; // 25% estimated tax rate
  const estimatedTaxesDue = income * estimatedTaxRate;
  const amountSetAside = estimatedTaxesDue * 0.7; // 70% saved
  const progress = (amountSetAside / estimatedTaxesDue) * 100;

  return {
    estimatedTaxesDue,
    dueDate: new Date(new Date().getFullYear(), 11, 31), // Dec 31
    taxBracket: "24%",
    amountSetAside,
    recommendedAmount: estimatedTaxesDue,
    progress,
  };
}

export function generateFinancialHealthScore(
  stats: DashboardStats
): FinancialHealthScore {
  // Simple scoring algorithm
  let score = 50; // Base score

  // Positive cash flow
  if (stats.balance > 0) score += 20;

  // Good profit margin
  const profitMargin = stats.totalIncome > 0
    ? (stats.currentMonthProfit / stats.totalIncome) * 100
    : 0;
  if (profitMargin > 20) score += 15;
  if (profitMargin > 30) score += 10;

  // Positive growth
  if (stats.profitChange > 0) score += 15;

  const insights: string[] = [];

  if (stats.balance > 0) {
    insights.push("Strong cash position");
  }
  if (stats.profitChange > 0) {
    insights.push(`Revenue up ${stats.profitChange.toFixed(1)}% vs last month`);
  }
  if (profitMargin > 20) {
    insights.push("Healthy profit margins");
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    insights,
  };
}

export function generateCategoryBreakdown(
  expenses: Expense[],
  categories: any[]
): CategoryBreakdown[] {
  const categoryMap = new Map<string, number>();
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  expenses.forEach((expense) => {
    if (expense.categoryId) {
      const current = categoryMap.get(expense.categoryId) || 0;
      categoryMap.set(expense.categoryId, current + expense.amount);
    }
  });

  const breakdown: CategoryBreakdown[] = [];

  categoryMap.forEach((amount, categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      breakdown.push({
        categoryId,
        categoryName: category.name,
        amount,
        percentage: (amount / total) * 100,
        color: category.color,
        trend: Math.floor(Math.random() * 30) - 10, // Random trend
      });
    }
  });

  // Sort by amount descending
  return breakdown.sort((a, b) => b.amount - a.amount);
}

export function generateAIInsights(stats: DashboardStats): AIInsight[] {
  const insights: AIInsight[] = [];

  // Insight 1: Subscription savings
  insights.push({
    id: "insight-1",
    icon: "💰",
    headline: "Save $240/month on subscriptions",
    description: "You're paying for 3 overlapping tools with similar features.",
    detailedExplanation:
      "We detected that you're subscribed to Adobe Creative Cloud ($54.99), Canva Pro ($12.99), and Figma ($12). Consider consolidating to just one or two platforms based on your actual usage patterns.",
    ctaText: "Review subscriptions",
    ctaAction: "/expenses?category=subscriptions",
  });

  // Insight 2: Revenue growth
  if (stats.profitChange > 0) {
    insights.push({
      id: "insight-2",
      icon: "📊",
      headline: `Income up ${stats.profitChange.toFixed(0)}% vs last month`,
      description: "Your revenue is trending positively. Keep up the great work!",
      detailedExplanation:
        "Your income has grown steadily over the past 3 months. This growth rate suggests you could increase your pricing or take on additional clients.",
    });
  }

  // Insight 3: Tax planning
  insights.push({
    id: "insight-3",
    icon: "⚠️",
    headline: "Consider quarterly tax payments",
    description: "Your income suggests you should make quarterly estimated tax payments.",
    detailedExplanation:
      "Based on your current income trajectory, you may owe more than $1,000 in taxes this year. Making quarterly payments can help you avoid penalties and manage cash flow better.",
    ctaText: "Set up auto-transfer",
    ctaAction: "/settings#automation",
  });

  // Insight 4: Expense analysis
  insights.push({
    id: "insight-4",
    icon: "✈️",
    headline: "Travel expenses are high",
    description: "Travel accounts for 18% of your expenses this quarter.",
    detailedExplanation:
      "Your travel costs have increased 25% compared to last quarter. Consider whether all trips are necessary or if some meetings could be conducted remotely.",
    ctaText: "View travel expenses",
    ctaAction: "/expenses?category=travel",
  });

  return insights;
}
