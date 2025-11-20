import { useState, useCallback, useMemo } from "react";
import { getItem, setItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Invoice, InvoiceStatus } from "@/lib/types/invoice";
import { generateId } from "@/lib/utils/format";

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    return getItem<Invoice[]>(STORAGE_KEYS.INVOICES) || [];
  });

  const createInvoice = useCallback((data: Omit<Invoice, "id" | "createdAt" | "updatedAt">) => {
    const newInvoice: Invoice = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = [...invoices, newInvoice];
    setInvoices(updated);
    setItem(STORAGE_KEYS.INVOICES, updated);

    return newInvoice;
  }, [invoices]);

  const updateInvoice = useCallback((id: string, data: Partial<Invoice>) => {
    const updated = invoices.map((invoice) =>
      invoice.id === id
        ? { ...invoice, ...data, updatedAt: new Date() }
        : invoice
    );
    setInvoices(updated);
    setItem(STORAGE_KEYS.INVOICES, updated);
  }, [invoices]);

  const deleteInvoice = useCallback((id: string) => {
    const updated = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updated);
    setItem(STORAGE_KEYS.INVOICES, updated);
  }, [invoices]);

  const getInvoiceById = useCallback((id: string) => {
    return invoices.find((invoice) => invoice.id === id);
  }, [invoices]);

  const stats = useMemo(() => {
    const total = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const paid = invoices.filter((inv) => inv.status === "PAID").reduce((sum, inv) => sum + inv.total, 0);
    const unpaid = invoices.filter((inv) => inv.status === "SENT" || inv.status === "OVERDUE").reduce((sum, inv) => sum + inv.total, 0);
    const overdue = invoices.filter((inv) => inv.status === "OVERDUE").length;

    return {
      total,
      paid,
      unpaid,
      count: invoices.length,
      overdueCount: overdue,
    };
  }, [invoices]);

  return {
    invoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceById,
    stats,
  };
}
