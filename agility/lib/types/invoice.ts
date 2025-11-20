/**
 * Invoice type definitions
 */

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

export interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  tax: number;
  taxPercentage?: number;
  total: number;
  lineItems: LineItem[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceFormData {
  clientName: string;
  clientEmail?: string;
  clientAddress?: string;
  issueDate: Date;
  dueDate: Date;
  lineItems: LineItem[];
  notes?: string;
  taxPercentage?: number;
}
