/**
 * Expense and Category type definitions
 */

export interface Category {
  id: string;
  userId: string;
  name: string;
  color?: string;
  icon?: string;
  isDefault: boolean;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  merchant?: string;
  vendor?: string;
  description?: string;
  date: Date;
  categoryId?: string;
  category?: Category;
  receiptUrl?: string;
  notes?: string;
  isDeductible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseFormData {
  amount: number;
  merchant?: string;
  categoryId?: string;
  date: Date;
  notes?: string;
  receiptUrl?: string;
  isDeductible: boolean;
}
