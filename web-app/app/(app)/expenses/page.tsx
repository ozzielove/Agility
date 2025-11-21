'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { transactions, categories } from '@/lib/mock/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus, Search, Camera, Receipt, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const expenses = transactions.filter((t) => t.type === 'expense');
  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate category totals for pie chart
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryTotals).map(([name, value]) => {
    const cat = categories.find((c) => c.name === name);
    return { name, value, color: cat?.color || '#6B7280' };
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const taxDeductible = expenses.filter((e) => e.isBusinessExpense).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Expenses</h1>
          <p className="mt-1 text-[var(--text-secondary)]">Track and categorize your business expenses</p>
        </div>
        <div className="flex gap-3">
          <Link href="/scan">
            <Button variant="outline">
              <Camera className="h-5 w-5" />
              Scan Receipt
            </Button>
          </Link>
          <Link href="/expenses/new">
            <Button>
              <Plus className="h-5 w-5" />
              Add Expense
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--error)]/10">
                <TrendingDown className="h-6 w-6 text-[var(--error)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Expenses</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{formatCurrency(totalExpenses)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--success)]/10">
                <Receipt className="h-6 w-6 text-[var(--success)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Tax Deductible</p>
                <p className="text-2xl font-bold text-[var(--success)]">{formatCurrency(taxDeductible)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-mid)]/10">
                <Camera className="h-6 w-6 text-[var(--primary-mid)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Receipts Scanned</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{expenses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expense Breakdown Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>By Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {pieData.slice(0, 5).map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[var(--text-secondary)]">{item.name}</span>
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Expenses</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-9 text-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[var(--border)]">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-xl">
                      {expense.categoryIcon}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{expense.merchant}</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {expense.category} • {formatDate(expense.date, 'short')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--text-primary)]">-{formatCurrency(expense.amount)}</p>
                    {expense.isBusinessExpense && (
                      <span className="inline-flex items-center rounded-full bg-[var(--success)]/10 px-2 py-0.5 text-xs font-medium text-[var(--success)]">
                        Deductible
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
