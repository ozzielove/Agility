import { useMemo } from "react";
import { getItem } from "@/lib/storage/local-storage";
import { STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Transaction } from "@/lib/types/transaction";
import type { Invoice } from "@/lib/types/invoice";
import type { Expense } from "@/lib/types/expense";
import { startOfMonth, endOfMonth, subMonths, format } from "date-fns";

export function useDashboardData() {
  const transactions = getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
  const invoices = getItem<Invoice[]>(STORAGE_KEYS.INVOICES) || [];
  const expenses = getItem<Expense[]>(STORAGE_KEYS.EXPENSES) || [];

  const data = useMemo(() => {
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    // Current month transactions
    const currentMonthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return date >= currentMonthStart && date <= currentMonthEnd;
    });

    const currentMonthIncome = currentMonthTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpenses = currentMonthTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthProfit = currentMonthIncome - currentMonthExpenses;

    // Previous month for trend calculation
    const prevMonthStart = startOfMonth(subMonths(now, 1));
    const prevMonthEnd = endOfMonth(subMonths(now, 1));

    const prevMonthTransactions = transactions.filter((t) => {
      const date = new Date(t.date);
      return date >= prevMonthStart && date <= prevMonthEnd;
    });

    const prevMonthIncome = prevMonthTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    const prevMonthExpenses = prevMonthTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    const prevMonthProfit = prevMonthIncome - prevMonthExpenses;

    // Calculate trends
    const profitTrend = prevMonthProfit
      ? ((currentMonthProfit - prevMonthProfit) / prevMonthProfit) * 100
      : 0;

    const incomeTrend = prevMonthIncome
      ? ((currentMonthIncome - prevMonthIncome) / prevMonthIncome) * 100
      : 0;

    const expensesTrend = prevMonthExpenses
      ? ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100
      : 0;

    // Chart data (last 6 months)
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));

      const monthTransactions = transactions.filter((t) => {
        const date = new Date(t.date);
        return date >= monthStart && date <= monthEnd;
      });

      const income = monthTransactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + t.amount, 0);

      chartData.push({
        name: format(monthStart, "MMM"),
        income,
        expenses,
      });
    }

    // Recent transactions (last 5)
    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Calculate AI health score (simplified algorithm)
    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    const profitMargin = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;
    const healthScore = Math.round(Math.max(0, Math.min(100, profitMargin * 100 + 20)));

    // Tax estimate (simplified: 25% of profit)
    const estimatedTax = Math.max(0, currentMonthProfit * 0.25);

    return {
      currentMonth: {
        income: currentMonthIncome,
        expenses: currentMonthExpenses,
        profit: currentMonthProfit,
      },
      trends: {
        profit: profitTrend,
        income: incomeTrend,
        expenses: expensesTrend,
      },
      chartData,
      recentTransactions,
      healthScore,
      estimatedTax,
      stats: {
        totalInvoices: invoices.length,
        paidInvoices: invoices.filter((i) => i.status === "PAID").length,
        totalExpenses: expenses.length,
        deductibleExpenses: expenses.filter((e) => e.isDeductible).length,
      },
    };
  }, [transactions, invoices, expenses]);

  return data;
}
