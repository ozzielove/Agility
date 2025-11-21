'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { invoices, clients } from '@/lib/mock/data';
import { formatCurrency, formatDate, daysUntilDue } from '@/lib/utils';
import { Plus, Search, Filter, FileText, MoreVertical, Send, Eye, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';
import type { Invoice } from '@/lib/types';

const statusConfig = {
  draft: { label: 'Draft', class: 'badge-draft' },
  sent: { label: 'Sent', class: 'badge-sent' },
  viewed: { label: 'Viewed', class: 'badge-sent' },
  paid: { label: 'Paid', class: 'badge-paid' },
  overdue: { label: 'Overdue', class: 'badge-overdue' },
};

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = invoices
    .filter((i) => i.status === 'sent' || i.status === 'viewed')
    .reduce((sum, i) => sum + i.total, 0);

  const totalOverdue = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + i.total, 0);

  const totalPaid = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Invoices</h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Create and manage your invoices
          </p>
        </div>
        <Link href="/invoices/new">
          <Button>
            <Plus className="h-5 w-5" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Pending</p>
                <p className="text-2xl font-bold text-[var(--warning)]">{formatCurrency(totalPending)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[var(--warning)]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[var(--warning)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Overdue</p>
                <p className="text-2xl font-bold text-[var(--error)]">{formatCurrency(totalOverdue)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[var(--error)]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[var(--error)]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Paid (This Month)</p>
                <p className="text-2xl font-bold text-[var(--success)]">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[var(--success)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'draft', 'sent', 'paid', 'overdue'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-[var(--primary-mid)] text-white'
                      : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--border)]">
            {filteredInvoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-[var(--text-muted)]" />
                <p className="mt-4 text-[var(--text-secondary)]">No invoices found</p>
                <Link href="/invoices/new" className="mt-4">
                  <Button>Create your first invoice</Button>
                </Link>
              </div>
            ) : (
              filteredInvoices.map((invoice) => (
                <InvoiceRow key={invoice.id} invoice={invoice} />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  const days = daysUntilDue(invoice.dueDate);
  const status = statusConfig[invoice.status];

  return (
    <div className="flex items-center justify-between p-4 hover:bg-[var(--surface-elevated)] transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-mid)]/10">
          <FileText className="h-6 w-6 text-[var(--primary-mid)]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-[var(--text-primary)]">{invoice.client.name}</p>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.class}`}>
              {status.label}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {invoice.invoiceNumber} • {formatDate(invoice.issueDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-[var(--text-primary)]">{formatCurrency(invoice.total)}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {invoice.status === 'paid' ? 'Paid' : days < 0 ? `${Math.abs(days)}d overdue` : `Due in ${days}d`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Send className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
