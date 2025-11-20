/**
 * Invoice form validation schemas
 */

import { z } from "zod";

export const lineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  rate: z.number().min(0, "Rate must be positive"),
  amount: z.number().min(0),
});

export const invoiceClientSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  clientAddress: z.string().optional(),
});

export const invoiceItemsSchema = z.object({
  lineItems: z.array(lineItemSchema).min(1, "Add at least one line item"),
  notes: z.string().optional(),
  taxPercentage: z.number().min(0).max(100).optional(),
});

export const invoiceReviewSchema = z.object({
  issueDate: z.date(),
  dueDate: z.date(),
});

export const invoiceFormSchema = invoiceClientSchema
  .merge(invoiceItemsSchema)
  .merge(invoiceReviewSchema);

export type LineItemData = z.infer<typeof lineItemSchema>;
export type InvoiceClientData = z.infer<typeof invoiceClientSchema>;
export type InvoiceItemsData = z.infer<typeof invoiceItemsSchema>;
export type InvoiceReviewData = z.infer<typeof invoiceReviewSchema>;
export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
