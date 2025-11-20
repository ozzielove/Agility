/**
 * Mock invoice data generator
 */

import type { Invoice, InvoiceStatus, LineItem } from "../types/invoice";
import { addDays, subDays, subMonths } from "date-fns";

const CLIENT_NAMES = [
  "Acme Corporation",
  "Tech Solutions Inc",
  "Creative Agency Co",
  "Global Enterprises",
  "Startup Ventures",
  "Digital Marketing Pro",
  "Cloud Services Ltd",
  "Innovation Labs",
  "Enterprise Systems",
  "Web Design Studio",
];

const SERVICE_DESCRIPTIONS = [
  "Website Design & Development",
  "Logo & Brand Identity",
  "Mobile App Development",
  "Social Media Campaign",
  "SEO Optimization",
  "Content Writing Services",
  "Graphic Design Package",
  "Consulting Services",
  "Video Production",
  "UI/UX Design",
];

function generateLineItems(): LineItem[] {
  const count = Math.floor(Math.random() * 3) + 1;
  const items: LineItem[] = [];

  for (let i = 0; i < count; i++) {
    const description = SERVICE_DESCRIPTIONS[Math.floor(Math.random() * SERVICE_DESCRIPTIONS.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    const rate = Math.floor(Math.random() * 150) + 50;
    const amount = quantity * rate;

    items.push({
      id: `item-${i}`,
      description,
      quantity,
      rate,
      amount,
    });
  }

  return items;
}

function calculateInvoiceTotals(lineItems: LineItem[], taxPercentage: number = 0) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = (subtotal * taxPercentage) / 100;
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

export function generateMockInvoices(userId: string, count: number = 30): Invoice[] {
  const invoices: Invoice[] = [];
  const statuses: InvoiceStatus[] = ["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"];

  for (let i = 0; i < count; i++) {
    const lineItems = generateLineItems();
    const taxPercentage = Math.random() > 0.5 ? 0 : Math.floor(Math.random() * 10) + 5;
    const { subtotal, tax, total } = calculateInvoiceTotals(lineItems, taxPercentage);

    // Random date in the past 6 months
    const daysAgo = Math.floor(Math.random() * 180);
    const issueDate = subDays(new Date(), daysAgo);
    const dueDate = addDays(issueDate, 30);

    // Determine status based on dates and randomness
    let status: InvoiceStatus;
    const now = new Date();

    if (Math.random() > 0.8) {
      status = "DRAFT";
    } else if (Math.random() > 0.9) {
      status = "CANCELLED";
    } else if (dueDate < now && Math.random() > 0.3) {
      status = "OVERDUE";
    } else if (Math.random() > 0.4) {
      status = "PAID";
    } else {
      status = "SENT";
    }

    invoices.push({
      id: `inv-${i + 1}`,
      userId,
      invoiceNumber: `INV-${String(i + 1).padStart(4, "0")}`,
      status,
      clientName: CLIENT_NAMES[Math.floor(Math.random() * CLIENT_NAMES.length)],
      clientEmail: `contact${i}@example.com`,
      clientAddress: `${Math.floor(Math.random() * 999) + 1} Business St, Suite ${Math.floor(Math.random() * 99) + 1}`,
      issueDate,
      dueDate,
      subtotal,
      tax,
      taxPercentage,
      total,
      lineItems,
      notes: Math.random() > 0.5 ? "Thank you for your business!" : undefined,
      createdAt: issueDate,
      updatedAt: new Date(),
    });
  }

  // Sort by issue date descending (newest first)
  return invoices.sort((a, b) => b.issueDate.getTime() - a.issueDate.getTime());
}
