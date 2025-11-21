'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth-context';
import { dashboardMetrics, chartData, transactions, invoices } from '@/lib/mock/data';
import { formatCurrency, formatPercentage, formatDate, getGreeting, daysUntilDue } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Camera,
  FileText,
  Plus,
  PieChart,
  Bell,
  DollarSign,
  CreditCard,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  const recentTransactions = transactions.slice(0, 5);
  const pendingInvoices = invoices.filter((i) => i.status === 'sent' || i.status === 'overdue');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Here&apos;s your financial overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profit Hero Card */}
      <Card className="overflow-hidden">
        <div className="gradient-primary p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Current Month Profit</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-bold sm:text-5xl">
                  {formatCurrency(dashboardMetrics.currentMonthProfit)}
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${
                    dashboardMetrics.profitChange >= 0
                      ? 'bg-white/20 text-white'
                      : 'bg-red-500/30 text-white'
                  }`}
                >
                  {dashboardMetrics.profitChange >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {formatPercentage(dashboardMetrics.profitChange)}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                vs {formatCurrency(dashboardMetrics.previousMonthProfit)} last month
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-sm text-white/70">Income</p>
                <p className="text-2xl font-semibold">{formatCurrency(dashboardMetrics.totalIncome)}</p>
              </div>
              <div>
                <p className="text-sm text-white/70">Expenses</p>
                <p className="text-2xl font-semibold">{formatCurrency(dashboardMetrics.totalExpenses)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--success)]/10">
                <DollarSign className="h-6 w-6 text-[var(--success)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Income</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">
                  {formatCurrency(dashboardMetrics.totalIncome)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--error)]/10">
                <CreditCard className="h-6 w-6 text-[var(--error)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Expenses</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">
                  {formatCurrency(dashboardMetrics.totalExpenses)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--warning)]/10">
                <Clock className="h-6 w-6 text-[var(--warning)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Pending Invoices</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">
                  {dashboardMetrics.pendingInvoices} ({formatCurrency(dashboardMetrics.pendingAmount)})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--info)]/10">
                <AlertTriangle className="h-6 w-6 text-[var(--info)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Tax Estimate (Q4)</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">
                  {formatCurrency(dashboardMetrics.taxEstimate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/scan">
          <Card className="cursor-pointer transition-all hover:shadow-[var(--shadow-md)] hover:scale-[1.02]">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Scan Receipt</p>
                <p className="text-sm text-[var(--text-secondary)]">Capture expenses</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/invoices/new">
          <Card className="cursor-pointer transition-all hover:shadow-[var(--shadow-md)] hover:scale-[1.02]">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-mid)]/10">
                <FileText className="h-6 w-6 text-[var(--primary-mid)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Create Invoice</p>
                <p className="text-sm text-[var(--text-secondary)]">Bill your clients</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/expenses/new">
          <Card className="cursor-pointer transition-all hover:shadow-[var(--shadow-md)] hover:scale-[1.02]">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--warning)]/10">
                <Plus className="h-6 w-6 text-[var(--warning)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Add Expense</p>
                <p className="text-sm text-[var(--text-secondary)]">Track spending</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/insights">
          <Card className="cursor-pointer transition-all hover:shadow-[var(--shadow-md)] hover:scale-[1.02]">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--success)]/10">
                <PieChart className="h-6 w-6 text-[var(--success)]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">View Reports</p>
                <p className="text-sm text-[var(--text-secondary)]">Analyze finances</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Charts and Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Income vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#35C4E0" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#35C4E0" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5171" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF5171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#35C4E0"
                    fill="url(#incomeGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#FF5171"
                    fill="url(#expenseGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Link href="/transactions">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-lg">
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
                    <p className="text-xs text-[var(--text-muted)]">{formatDate(txn.date, 'relative')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Invoices</CardTitle>
            <Link href="/invoices">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingInvoices.map((invoice) => {
                const days = daysUntilDue(invoice.dueDate);
                const isOverdue = days < 0;
                return (
                  <div key={invoice.id} className="flex items-center justify-between rounded-xl bg-[var(--surface-elevated)] p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-mid)]/10">
                        <FileText className="h-6 w-6 text-[var(--primary-mid)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{invoice.client.name}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{invoice.invoiceNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--text-primary)]">{formatCurrency(invoice.total)}</p>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          isOverdue ? 'badge-overdue' : 'badge-pending'
                        }`}
                      >
                        {isOverdue ? `${Math.abs(days)} days overdue` : `Due in ${days} days`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
