'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Send,
  Save,
  FileText,
  User,
  Mail,
  Building2,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { clients } from '@/lib/mock/data';
import Link from 'next/link';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0 },
  ]);
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(0);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', quantity: 1, rate: 0 },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const handleSaveDraft = () => {
    // Save as draft logic
    router.push('/invoices');
  };

  const handleSend = () => {
    // Send invoice logic
    router.push('/invoices');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/invoices">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create Invoice</h1>
          <p className="text-[var(--text-secondary)]">Create and send professional invoices</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
            Send Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[var(--primary-mid)]" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                  Select Client
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text-primary)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary-mid)]/20"
                >
                  <option value="">Choose a client...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} - {client.company || client.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center py-4">
                <Button variant="link">
                  <Plus className="h-4 w-4" />
                  Add New Client
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[var(--primary-mid)]" />
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Invoice Number
                  </label>
                  <Input
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    icon={<FileText className="h-5 w-5" />}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Issue Date
                  </label>
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    icon={<Calendar className="h-5 w-5" />}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    icon={<Calendar className="h-5 w-5" />}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[var(--primary-mid)]" />
                Line Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Header */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-4 text-sm font-medium text-[var(--text-secondary)] pb-2 border-b border-[var(--border)]">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-center">Rate</div>
                  <div className="col-span-2 text-right">Amount</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Items */}
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-5">
                      <Input
                        placeholder="Service description..."
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        className="text-center"
                      />
                    </div>
                    <div className="sm:col-span-2 text-right font-medium text-[var(--text-primary)]">
                      {formatCurrency(item.quantity * item.rate)}
                    </div>
                    <div className="sm:col-span-1 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(item.id)}
                        disabled={lineItems.length === 1}
                        className="text-[var(--text-muted)] hover:text-[var(--error)]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" onClick={addLineItem} className="w-full mt-4">
                  <Plus className="h-4 w-4" />
                  Add Line Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes or payment instructions..."
                className="w-full min-h-[100px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary-mid)]/20 resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span>Tax</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-16 h-8 text-center text-sm"
                  />
                  <span>%</span>
                </div>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Tax Amount</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t border-[var(--border)] pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-[var(--text-primary)]">Total</span>
                  <span className="text-2xl font-bold text-[var(--primary-mid)]">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Card */}
          <Card>
            <CardContent className="p-4">
              <div className="rounded-xl bg-[var(--surface-elevated)] p-4 text-center">
                <FileText className="h-12 w-12 mx-auto text-[var(--text-muted)]" />
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Preview will appear here once you add line items
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
