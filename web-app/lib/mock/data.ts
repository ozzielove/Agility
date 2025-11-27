import type { Transaction, Invoice, Category, DashboardMetrics, ChartDataPoint, Client, BankAccount } from '@/lib/types';

// Categories
export const categories: Category[] = [
  { id: 'cat-1', name: 'Meals & Entertainment', icon: '🍽️', color: '#FF8C42', type: 'expense', irsCategory: 'Meals' },
  { id: 'cat-2', name: 'Transportation', icon: '🚗', color: '#4F46E5', type: 'expense', irsCategory: 'Car & Truck' },
  { id: 'cat-3', name: 'Office Supplies', icon: '📎', color: '#0EA5E9', type: 'expense', irsCategory: 'Office' },
  { id: 'cat-4', name: 'Software & Tech', icon: '💻', color: '#8B5CF6', type: 'expense', irsCategory: 'Supplies' },
  { id: 'cat-5', name: 'Marketing', icon: '📢', color: '#EC4899', type: 'expense', irsCategory: 'Advertising' },
  { id: 'cat-6', name: 'Utilities', icon: '💡', color: '#14B8A6', type: 'expense', irsCategory: 'Utilities' },
  { id: 'cat-7', name: 'Professional Services', icon: '👔', color: '#F59E0B', type: 'expense', irsCategory: 'Legal & Professional' },
  { id: 'cat-8', name: 'Travel', icon: '✈️', color: '#6366F1', type: 'expense', irsCategory: 'Travel' },
  { id: 'cat-9', name: 'Client Projects', icon: '💼', color: '#29CC97', type: 'income' },
  { id: 'cat-10', name: 'Consulting', icon: '🎯', color: '#007C91', type: 'income' },
  { id: 'cat-11', name: 'Other Income', icon: '💰', color: '#22C55E', type: 'income' },
  { id: 'cat-12', name: 'Other Expense', icon: '📦', color: '#6B7280', type: 'expense' },
];

// Clients
export const clients: Client[] = [
  { id: 'client-1', name: 'Acme Corporation', email: 'billing@acme.com', company: 'Acme Corp', address: '123 Business Ave, NY 10001' },
  { id: 'client-2', name: 'TechStart Inc', email: 'ap@techstart.io', company: 'TechStart', address: '456 Innovation Blvd, SF 94102' },
  { id: 'client-3', name: 'Global Media Group', email: 'finance@gmg.com', company: 'GMG', address: '789 Media Lane, LA 90001' },
  { id: 'client-4', name: 'Sarah Mitchell', email: 'sarah@mitchell.design', company: undefined, address: undefined },
  { id: 'client-5', name: 'DataFlow Systems', email: 'accounts@dataflow.co', company: 'DataFlow', address: '321 Tech Park, Austin 78701' },
];

// Transactions (last 30 days)
export const transactions: Transaction[] = [
  { id: 'txn-1', userId: 'user-1', type: 'expense', amount: 23.50, merchant: 'Uber', category: 'Transportation', categoryIcon: '🚗', date: new Date(Date.now() - 86400000 * 0), status: 'cleared', isBusinessExpense: true, tags: ['client-meeting'] },
  { id: 'txn-2', userId: 'user-1', type: 'income', amount: 2500, merchant: 'Acme Corp', category: 'Client Projects', categoryIcon: '💼', date: new Date(Date.now() - 86400000 * 1), status: 'cleared', isBusinessExpense: false, tags: ['project-alpha'] },
  { id: 'txn-3', userId: 'user-1', type: 'expense', amount: 156.99, merchant: 'Adobe', category: 'Software & Tech', categoryIcon: '💻', date: new Date(Date.now() - 86400000 * 2), status: 'cleared', isBusinessExpense: true, tags: ['subscription'] },
  { id: 'txn-4', userId: 'user-1', type: 'expense', amount: 42.30, merchant: 'Starbucks', category: 'Meals & Entertainment', categoryIcon: '🍽️', date: new Date(Date.now() - 86400000 * 2), status: 'cleared', isBusinessExpense: true, tags: ['client-meeting'] },
  { id: 'txn-5', userId: 'user-1', type: 'income', amount: 1800, merchant: 'TechStart Inc', category: 'Consulting', categoryIcon: '🎯', date: new Date(Date.now() - 86400000 * 3), status: 'cleared', isBusinessExpense: false, tags: [] },
  { id: 'txn-6', userId: 'user-1', type: 'expense', amount: 89.99, merchant: 'Amazon', category: 'Office Supplies', categoryIcon: '📎', date: new Date(Date.now() - 86400000 * 4), status: 'cleared', isBusinessExpense: true, tags: [] },
  { id: 'txn-7', userId: 'user-1', type: 'expense', amount: 299.00, merchant: 'Google Ads', category: 'Marketing', categoryIcon: '📢', date: new Date(Date.now() - 86400000 * 5), status: 'cleared', isBusinessExpense: true, tags: ['q4-campaign'] },
  { id: 'txn-8', userId: 'user-1', type: 'income', amount: 3200, merchant: 'Global Media Group', category: 'Client Projects', categoryIcon: '💼', date: new Date(Date.now() - 86400000 * 7), status: 'cleared', isBusinessExpense: false, tags: ['video-project'] },
  { id: 'txn-9', userId: 'user-1', type: 'expense', amount: 65.00, merchant: 'Zoom', category: 'Software & Tech', categoryIcon: '💻', date: new Date(Date.now() - 86400000 * 8), status: 'cleared', isBusinessExpense: true, tags: ['subscription'] },
  { id: 'txn-10', userId: 'user-1', type: 'expense', amount: 127.50, merchant: 'Office Depot', category: 'Office Supplies', categoryIcon: '📎', date: new Date(Date.now() - 86400000 * 10), status: 'cleared', isBusinessExpense: true, tags: [] },
  { id: 'txn-11', userId: 'user-1', type: 'income', amount: 950, merchant: 'Sarah Mitchell', category: 'Consulting', categoryIcon: '🎯', date: new Date(Date.now() - 86400000 * 12), status: 'cleared', isBusinessExpense: false, tags: [] },
  { id: 'txn-12', userId: 'user-1', type: 'expense', amount: 450.00, merchant: 'Delta Airlines', category: 'Travel', categoryIcon: '✈️', date: new Date(Date.now() - 86400000 * 14), status: 'cleared', isBusinessExpense: true, tags: ['conference'] },
];

// Invoices
export const invoices: Invoice[] = [
  {
    id: 'inv-1',
    userId: 'user-1',
    invoiceNumber: 'INV-2024-0015',
    client: clients[0],
    lineItems: [
      { id: 'li-1', description: 'Website Redesign - Phase 1', quantity: 40, rate: 150, amount: 6000 },
      { id: 'li-2', description: 'UI/UX Consultation', quantity: 8, rate: 175, amount: 1400 },
    ],
    status: 'sent',
    issueDate: new Date(Date.now() - 86400000 * 5),
    dueDate: new Date(Date.now() + 86400000 * 25),
    subtotal: 7400,
    tax: 0,
    total: 7400,
    notes: 'Thank you for your business!',
  },
  {
    id: 'inv-2',
    userId: 'user-1',
    invoiceNumber: 'INV-2024-0014',
    client: clients[1],
    lineItems: [
      { id: 'li-3', description: 'API Integration Development', quantity: 24, rate: 200, amount: 4800 },
    ],
    status: 'paid',
    issueDate: new Date(Date.now() - 86400000 * 30),
    dueDate: new Date(Date.now() - 86400000 * 0),
    subtotal: 4800,
    tax: 0,
    total: 4800,
  },
  {
    id: 'inv-3',
    userId: 'user-1',
    invoiceNumber: 'INV-2024-0013',
    client: clients[2],
    lineItems: [
      { id: 'li-4', description: 'Video Production - Corporate', quantity: 1, rate: 3200, amount: 3200 },
    ],
    status: 'overdue',
    issueDate: new Date(Date.now() - 86400000 * 45),
    dueDate: new Date(Date.now() - 86400000 * 15),
    subtotal: 3200,
    tax: 0,
    total: 3200,
  },
  {
    id: 'inv-4',
    userId: 'user-1',
    invoiceNumber: 'INV-2024-0016',
    client: clients[4],
    lineItems: [
      { id: 'li-5', description: 'Data Analytics Dashboard', quantity: 1, rate: 5500, amount: 5500 },
    ],
    status: 'draft',
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 86400000 * 30),
    subtotal: 5500,
    tax: 0,
    total: 5500,
  },
];

// Bank Accounts
export const bankAccounts: BankAccount[] = [
  { id: 'bank-1', userId: 'user-1', institutionName: 'Chase', accountName: 'Business Checking', accountType: 'checking', balance: 12450.67, lastSynced: new Date(Date.now() - 3600000), isConnected: true },
  { id: 'bank-2', userId: 'user-1', institutionName: 'Chase', accountName: 'Business Savings', accountType: 'savings', balance: 25000.00, lastSynced: new Date(Date.now() - 3600000), isConnected: true },
  { id: 'bank-3', userId: 'user-1', institutionName: 'American Express', accountName: 'Business Card', accountType: 'credit', balance: -1234.56, lastSynced: new Date(Date.now() - 7200000), isConnected: true },
];

// Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  currentMonthProfit: 5234.50,
  previousMonthProfit: 4670.25,
  profitChange: 12.1,
  totalIncome: 8450.00,
  totalExpenses: 3215.50,
  pendingInvoices: 2,
  pendingAmount: 10600.00,
  taxEstimate: 2450.00,
};

// Chart Data (last 6 months)
export const chartData: ChartDataPoint[] = [
  { date: 'Jun', income: 6200, expenses: 2100 },
  { date: 'Jul', income: 7800, expenses: 2800 },
  { date: 'Aug', income: 5400, expenses: 2200 },
  { date: 'Sep', income: 8900, expenses: 3100 },
  { date: 'Oct', income: 7200, expenses: 2600 },
  { date: 'Nov', income: 8450, expenses: 3215 },
];

// Helper functions
export function getTransactionsByType(type: 'income' | 'expense'): Transaction[] {
  return transactions.filter((t) => t.type === type);
}

export function getInvoicesByStatus(status: Invoice['status']): Invoice[] {
  return invoices.filter((i) => i.status === status);
}

export function getTotalByCategory(): { category: string; amount: number; color: string }[] {
  const totals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(totals).map(([category, amount]) => {
    const cat = categories.find((c) => c.name === category);
    return { category, amount, color: cat?.color || '#6B7280' };
  });
}
