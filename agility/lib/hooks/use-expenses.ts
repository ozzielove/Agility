import { useState, useCallback, useMemo } from "react";
import { getItem, setItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Expense } from "@/lib/types/expense";
import { generateId } from "@/lib/utils/format";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    return getItem<Expense[]>(STORAGE_KEYS.EXPENSES) || [];
  });

  const createExpense = useCallback((data: Omit<Expense, "id" | "createdAt" | "updatedAt">) => {
    const newExpense: Expense = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...expenses, newExpense];
    setExpenses(updated);
    setItem(STORAGE_KEYS.EXPENSES, updated);

    return newExpense;
  }, [expenses]);

  const updateExpense = useCallback((id: string, data: Partial<Expense>) => {
    const updated = expenses.map((expense) =>
      expense.id === id
        ? { ...expense, ...data, updatedAt: new Date() }
        : expense
    );
    setExpenses(updated);
    setItem(STORAGE_KEYS.EXPENSES, updated);
  }, [expenses]);

  const deleteExpense = useCallback((id: string) => {
    const updated = expenses.filter((expense) => expense.id !== id);
    setExpenses(updated);
    setItem(STORAGE_KEYS.EXPENSES, updated);
  }, [expenses]);

  const getExpenseById = useCallback((id: string) => {
    return expenses.find((expense) => expense.id === id);
  }, [expenses]);

  const stats = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const deductible = expenses
      .filter((exp) => exp.isDeductible)
      .reduce((sum, exp) => sum + exp.amount, 0);

    // Group by category
    const byCategory = expenses.reduce((acc, exp) => {
      const categoryId = exp.categoryId || "uncategorized";
      if (!acc[categoryId]) {
        acc[categoryId] = { count: 0, total: 0 };
      }
      acc[categoryId].count++;
      acc[categoryId].total += exp.amount;
      return acc;
    }, {} as Record<string, { count: number; total: number }>);

    return {
      total,
      deductible,
      count: expenses.length,
      withReceipts: expenses.filter((e) => e.receiptUrl).length,
      byCategory,
    };
  }, [expenses]);

  return {
    expenses,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenseById,
    stats,
  };
}
