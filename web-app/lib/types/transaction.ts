/**
 * Transaction type definitions
 */

import type { Category } from "./expense";
import type { Invoice } from "./invoice";

export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description?: string;
  merchant?: string;
  date: Date;
  categoryId?: string;
  category?: Category;
  invoiceId?: string;
  invoice?: Invoice;
  receiptUrl?: string;
  notes?: string;
  isDeductible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
