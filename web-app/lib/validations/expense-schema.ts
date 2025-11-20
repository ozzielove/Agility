/**
 * Expense form validation schemas
 */

import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  merchant: z.string().optional(),
  categoryId: z.string().optional(),
  date: z.date(),
  notes: z.string().optional(),
  receiptUrl: z.string().optional(),
  isDeductible: z.boolean().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: z.string().optional(),
  icon: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
