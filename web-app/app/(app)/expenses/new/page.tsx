'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Receipt,
  DollarSign,
  Building2,
  Calendar,
  Tag,
  FileText,
  Save,
  Camera,
} from 'lucide-react';
import { categories } from '@/lib/mock/data';
import Link from 'next/link';

export default function NewExpensePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Office Supplies',
    notes: '',
    isTaxDeductible: true,
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save expense logic
    router.push('/expenses');
  };

  const expenseCategories = categories.filter(
    (c) => c.type === 'expense' || c.type === 'both'
  );

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/expenses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Add Expense</h1>
          <p className="text-[var(--text-secondary)]">Record a new business expense</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-[var(--primary-mid)]" />
                  Expense Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Merchant / Vendor *
                    </label>
                    <Input
                      required
                      placeholder="e.g., Amazon, Staples, etc."
                      value={formData.merchant}
                      onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                      icon={<Building2 className="h-5 w-5" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Amount *
                    </label>
                    <Input
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      icon={<DollarSign className="h-5 w-5" />}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Date *
                    </label>
                    <Input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      icon={<Calendar className="h-5 w-5" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-12 pr-4 text-[var(--text-primary)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary-mid)]/20 appearance-none"
                      >
                        {expenseCategories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any additional details..."
                    className="w-full min-h-[100px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary-mid)]/20 resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                    Tags
                  </label>
                  <Input
                    placeholder="Add tags separated by commas"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    icon={<Tag className="h-5 w-5" />}
                  />
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    e.g., project-name, client-name, Q4
                  </p>
                </div>

                {/* Tax Deductible Toggle */}
                <label className="flex items-center justify-between rounded-xl bg-[var(--surface-elevated)] p-4 cursor-pointer">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Tax Deductible</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Mark this as a business expense for tax purposes
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isTaxDeductible}
                    onChange={(e) => setFormData({ ...formData, isTaxDeductible: e.target.checked })}
                    className="h-5 w-5 rounded border-[var(--border)] text-[var(--primary-mid)] focus:ring-[var(--primary-mid)]"
                  />
                </label>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
                  <Link href="/expenses" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4" />
                    Save Expense
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Receipt Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-[var(--primary-mid)]" />
                Receipt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border-2 border-dashed border-[var(--border)] p-6 text-center hover:border-[var(--primary-mid)] hover:bg-[var(--primary-mid)]/5 transition-colors cursor-pointer">
                <Camera className="h-10 w-10 mx-auto text-[var(--text-muted)]" />
                <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                  Attach Receipt
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  PNG, JPG up to 10MB
                </p>
              </div>
              <Link href="/scan">
                <Button variant="outline" className="w-full mt-4">
                  <Camera className="h-4 w-4" />
                  Scan with AI
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Category Info */}
          <Card>
            <CardHeader>
              <CardTitle>Category Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {expenseCategories.slice(0, 5).map((cat) => (
                  <div
                    key={cat.id}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      formData.category === cat.name ? 'bg-[var(--primary-mid)]/10' : ''
                    }`}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] truncate">{cat.name}</p>
                      {cat.irsCategory && (
                        <p className="text-xs text-[var(--text-muted)]">{cat.irsCategory}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="rounded-xl bg-[var(--surface-elevated)] p-4">
                <p className="text-sm text-[var(--text-secondary)]">This Month's Expenses</p>
                <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">$1,234.56</p>
                <p className="text-xs text-[var(--success)] mt-1">12% under budget</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
