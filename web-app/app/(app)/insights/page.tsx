'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboardMetrics, chartData, transactions, categories } from '@/lib/mock/data';
import { formatCurrency, formatPercentage, calculateTax } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Download,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  PiggyBank,
  FileText,
  Calendar,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';

export default function InsightsPage() {
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const estimatedTax = calculateTax(totalIncome, totalExpenses);

  // Category breakdown for expenses
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory)
    .map(([name, value]) => {
      const cat = categories.find((c) => c.name === name);
      return { name, value, color: cat?.color || '#6B7280' };
    })
    .sort((a, b) => b.value - a.value);

  // AI Insights (mock)
  const insights = [
    {
      type: 'saving',
      icon: PiggyBank,
      title: 'Potential Tax Savings',
      description: 'You have $1,234 in business expenses that may be tax deductible.',
      action: 'Review Deductions',
      color: 'var(--success)',
    },
    {
      type: 'alert',
      icon: AlertCircle,
      title: 'Quarterly Tax Due',
      description: 'Q4 estimated tax payment of $2,450 is due January 15th.',
      action: 'View Tax Estimate',
      color: 'var(--warning)',
    },
    {
      type: 'trend',
      icon: TrendingUp,
      title: 'Revenue Growing',
      description: 'Your income is up 23% compared to last quarter.',
      action: 'View Trends',
      color: 'var(--primary-mid)',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Insights & Analytics</h1>
          <p className="mt-1 text-[var(--text-secondary)]">Understand your financial performance</p>
        </div>
        <Button variant="outline">
          <Download className="h-5 w-5" />
          Export Reports
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">Total Revenue</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{formatCurrency(totalIncome)}</p>
                <p className="text-sm text-[var(--success)]">
                  <TrendingUp className="inline h-4 w-4" /> +12.5% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Expenses</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{formatCurrency(totalExpenses)}</p>
              <p className="text-sm text-[var(--error)]">
                <TrendingDown className="inline h-4 w-4" /> +8.3% vs last month
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Net Profit</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                {formatCurrency(netProfit)}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {((netProfit / totalIncome) * 100).toFixed(1)}% profit margin
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Est. Tax (Q4)</p>
              <p className="text-2xl font-bold text-[var(--warning)]">{formatCurrency(estimatedTax)}</p>
              <p className="text-sm text-[var(--text-muted)]">Due Jan 15, 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[var(--warning)]" />
            <CardTitle>AI Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--border)] p-4 hover:shadow-[var(--shadow-md)] transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${insight.color}20` }}
                  >
                    <insight.icon className="h-5 w-5" style={{ color: insight.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text-primary)]">{insight.title}</h4>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{insight.description}</p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-[var(--primary-mid)]">
                      {insight.action} →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007C91" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#007C91" stopOpacity={0} />
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
                  <Area type="monotone" dataKey="income" stroke="#007C91" fill="url(#revenueGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
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
            <div className="mt-4 grid grid-cols-2 gap-2">
              {pieData.slice(0, 6).map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate text-[var(--text-secondary)]">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--primary-mid)]" />
              <CardTitle>Tax Summary</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4" />
              2024 Tax Year
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-[var(--surface-elevated)] p-4">
              <p className="text-sm text-[var(--text-secondary)]">Gross Income</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">{formatCurrency(totalIncome * 4)}</p>
            </div>
            <div className="rounded-xl bg-[var(--surface-elevated)] p-4">
              <p className="text-sm text-[var(--text-secondary)]">Business Expenses</p>
              <p className="text-xl font-bold text-[var(--text-primary)]">{formatCurrency(totalExpenses * 4)}</p>
            </div>
            <div className="rounded-xl bg-[var(--surface-elevated)] p-4">
              <p className="text-sm text-[var(--text-secondary)]">Net Self-Employment</p>
              <p className="text-xl font-bold text-[var(--success)]">{formatCurrency((totalIncome - totalExpenses) * 4)}</p>
            </div>
            <div className="rounded-xl bg-[var(--warning)]/10 p-4">
              <p className="text-sm text-[var(--text-secondary)]">Estimated Tax Due</p>
              <p className="text-xl font-bold text-[var(--warning)]">{formatCurrency(estimatedTax * 4)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
