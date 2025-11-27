'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { transactions, categories } from '@/lib/mock/data';
import { formatCurrency, formatDate, groupBy } from '@/lib/utils';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || txn.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Group by date
  const grouped = groupBy(filteredTransactions, 'date');
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Transactions</h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            View and manage all your transactions
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-5 w-5" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-[var(--success)]/5 border-[var(--success)]/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--success)]/20">
                <ArrowUpRight className="h-6 w-6 text-[var(--success)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Income</p>
                <p className="text-2xl font-bold text-[var(--success)]">{formatCurrency(totalIncome)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--error)]/5 border-[var(--error)]/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--error)]/20">
                <ArrowDownRight className="h-6 w-6 text-[var(--error)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Expenses</p>
                <p className="text-2xl font-bold text-[var(--error)]">{formatCurrency(totalExpenses)}</p>
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
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'income', 'expense'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-[var(--primary-mid)] text-white'
                      : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <div className="space-y-6">
        {sortedDates.map((dateStr) => {
          const dayTransactions = grouped[dateStr];
          return (
            <div key={dateStr}>
              <h3 className="mb-3 text-sm font-semibold text-[var(--text-secondary)]">
                {formatDate(new Date(dateStr), 'long')}
              </h3>
              <Card>
                <CardContent className="p-0 divide-y divide-[var(--border)]">
                  {dayTransactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center justify-between p-4 hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-2xl">
                          {txn.categoryIcon}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{txn.merchant}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{txn.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            txn.type === 'income' ? 'text-[var(--success)]' : 'text-[var(--text-primary)]'
                          }`}
                        >
                          {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                        </p>
                        {txn.isBusinessExpense && (
                          <span className="text-xs text-[var(--primary-mid)]">Business</span>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
