/**
 * Mock transaction data generator
 * Combines invoices and expenses into unified transaction list
 */

import type { Transaction } from "../types/transaction";
import type { Invoice } from "../types/invoice";
import type { Expense } from "../types/expense";

export function generateTransactionsFromInvoicesAndExpenses(
  invoices: Invoice[],
  expenses: Expense[]
): Transaction[] {
  const transactions: Transaction[] = [];

  // Convert paid invoices to income transactions
  invoices
    .filter((inv) => inv.status === "PAID")
    .forEach((invoice) => {
      transactions.push({
        id: `txn-inv-${invoice.id}`,
        userId: invoice.userId,
        type: "INCOME",
        amount: invoice.total,
        currency: "USD",
        description: `Invoice ${invoice.invoiceNumber} - ${invoice.clientName}`,
        merchant: invoice.clientName,
        date: invoice.issueDate,
        invoiceId: invoice.id,
        invoice,
        isDeductible: false,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      });
    });

  // Convert expenses to expense transactions
  expenses.forEach((expense) => {
    transactions.push({
      id: `txn-exp-${expense.id}`,
      userId: expense.userId,
      type: "EXPENSE",
      amount: expense.amount,
      currency: expense.currency,
      description: expense.description,
      merchant: expense.merchant,
      date: expense.date,
      categoryId: expense.categoryId,
      category: expense.category,
      receiptUrl: expense.receiptUrl,
      notes: expense.notes,
      isDeductible: expense.isDeductible,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    });
  });

  // Sort by date descending
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}
