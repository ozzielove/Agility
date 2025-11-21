// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}

// Transaction Types
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'pending' | 'cleared' | 'reconciled';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  merchant: string;
  category: string;
  categoryIcon: string;
  date: Date;
  description?: string;
  status: TransactionStatus;
  isBusinessExpense: boolean;
  receiptId?: string;
  accountId?: string;
  tags: string[];
}

// Invoice Types
export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue';

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  address?: string;
  phone?: string;
}

export interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  client: Client;
  lineItems: InvoiceLineItem[];
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  pdfUrl?: string;
}

// Expense Types
export interface Expense {
  id: string;
  userId: string;
  amount: number;
  merchant: string;
  category: string;
  date: Date;
  receiptUrl?: string;
  notes?: string;
  isTaxDeductible: boolean;
  tags: string[];
}

// Receipt Types
export interface Receipt {
  id: string;
  userId: string;
  imageUrl: string;
  merchant?: string;
  amount?: number;
  date?: Date;
  category?: string;
  ocrConfidence: number;
  isVerified: boolean;
  transactionId?: string;
  uploadedAt: Date;
}

// Dashboard Types
export interface DashboardMetrics {
  currentMonthProfit: number;
  previousMonthProfit: number;
  profitChange: number;
  totalIncome: number;
  totalExpenses: number;
  pendingInvoices: number;
  pendingAmount: number;
  taxEstimate: number;
}

export interface ChartDataPoint {
  date: string;
  income: number;
  expenses: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense' | 'both';
  irsCategory?: string;
}

// Bank Account Types
export interface BankAccount {
  id: string;
  userId: string;
  institutionName: string;
  accountName: string;
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  lastSynced: Date;
  isConnected: boolean;
}

// Settings Types
export interface UserSettings {
  currency: string;
  taxRate: number;
  fiscalYearStart: 'january' | 'april';
  defaultCategory: string;
  notifications: {
    invoiceReminders: boolean;
    taxDeadlines: boolean;
    weeklyReports: boolean;
    unusualActivity: boolean;
  };
  appearance: 'light' | 'dark' | 'system';
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
