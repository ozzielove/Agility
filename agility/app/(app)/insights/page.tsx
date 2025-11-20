"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PieChart } from "@/components/charts/pie-chart";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { getItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Transaction } from "@/lib/types/transaction";
import type { Expense } from "@/lib/types/expense";
import type { Category } from "@/lib/types/expense";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Mail,
  FileText,
  Sparkles,
  Target,
  AlertCircle,
} from "lucide-react";
import { startOfMonth, endOfMonth, format, subMonths } from "date-fns";

export default function InsightsPage() {
  const transactions = getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
  const expenses = getItem<Expense[]>(STORAGE_KEYS.EXPENSES) || [];
  const categories = getItem<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

  // Calculate current month data
  const now = new Date();
  const currentMonthStart = startOfMonth(now);
  const currentMonthEnd = endOfMonth(now);

  const currentMonthIncome = transactions
    .filter(
      (t) =>
        t.type === "INCOME" &&
        new Date(t.date) >= currentMonthStart &&
        new Date(t.date) <= currentMonthEnd
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthExpenses = transactions
    .filter(
      (t) =>
        t.type === "EXPENSE" &&
        new Date(t.date) >= currentMonthStart &&
        new Date(t.date) <= currentMonthEnd
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const currentMonthProfit = currentMonthIncome - currentMonthExpenses;

  // Tax calculations
  const quarterlyIncome = currentMonthIncome * 3; // Simplified
  const estimatedTax = quarterlyIncome * 0.25;
  const taxSaved = estimatedTax * 0.5; // Assume 50% saved
  const taxProgress = (taxSaved / estimatedTax) * 100;

  // Category breakdown
  const categoryData = categories
    .map((cat) => {
      const catExpenses = expenses.filter((e) => e.categoryId === cat.id);
      const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
      return {
        name: cat.name,
        value: total,
        color: cat.color,
      };
    })
    .filter((c) => c.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Year-to-date chart (last 6 months)
  const chartData = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const monthEnd = endOfMonth(subMonths(now, i));

    const income = transactions
      .filter(
        (t) =>
          t.type === "INCOME" &&
          new Date(t.date) >= monthStart &&
          new Date(t.date) <= monthEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);

    chartData.push({
      name: format(monthStart, "MMM"),
      value: income,
    });
  }

  // Cash runway
  const avgMonthlyExpenses = currentMonthExpenses;
  const currentBalance = currentMonthProfit * 6; // Simplified
  const runwayMonths = avgMonthlyExpenses > 0 ? currentBalance / avgMonthlyExpenses : 12;

  // AI insights
  const insights = [
    {
      icon: DollarSign,
      type: "savings",
      title: "Save $240/month on subscriptions",
      description:
        "You're paying for 3 overlapping project management tools. Cancel Asana and Monday.com to keep only ClickUp.",
      amount: 240,
      action: "Review Subscriptions",
    },
    {
      icon: TrendingUp,
      type: "growth",
      title: "Income up 23% vs last year",
      description:
        "Your revenue is trending positively. Consider raising your rates by 10-15% for new clients.",
      percentage: 23,
      action: "See Breakdown",
    },
    {
      icon: Calendar,
      type: "tax",
      title: "Consider quarterly tax payments",
      description:
        "Your income suggests you should make quarterly estimated tax payments to avoid penalties.",
      action: "Set Up Auto-Transfer",
    },
    {
      icon: AlertCircle,
      type: "warning",
      title: "Travel expenses are high",
      description:
        "Travel is 18% of your expenses. Look for opportunities to negotiate better rates or reduce trips.",
      percentage: 18,
      action: "View Details",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-agility-text">
          Insights & Analytics
        </h1>
        <p className="mt-2 text-agility-text-muted">
          Financial insights and tax planning for your business
        </p>
      </div>

      {/* Tax Summary Card */}
      <Card className="p-8 bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light border-0">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 p-3">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">2025 Tax Summary</h2>
              <p className="text-white/80">
                Q4 Estimated Taxes • Due: December 31, 2025
              </p>
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-white/30">
            45 days left
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Estimated Taxes Due</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(estimatedTax)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Amount Saved</p>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(taxSaved)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/70 text-sm mb-1">Tax Bracket</p>
            <p className="text-3xl font-bold text-white">24%</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm text-white/90">
            <span>Progress toward savings goal</span>
            <span className="font-semibold">{taxProgress.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white"
              style={{ width: `${taxProgress}%` }}
            />
          </div>
          <p className="text-xs text-white/70">
            {taxProgress < 100
              ? `Save ${formatCurrency(estimatedTax - taxSaved)} more by December 31`
              : "You're on track! 🎉"}
          </p>
        </div>

        <Button
          size="lg"
          className="bg-white text-agility-dark hover:bg-white/90"
        >
          Transfer to Tax Savings
        </Button>
      </Card>

      {/* Year-to-Date Income Trend */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-agility-text">
            Year-to-Date Income Trend
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              6 Months
            </Button>
            <Button variant="ghost" size="sm">
              Year
            </Button>
            <Button variant="ghost" size="sm">
              All Time
            </Button>
          </div>
        </div>
        <AreaChart data={chartData} height={300} />
      </Card>

      {/* Category Breakdown + Top Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-agility-text mb-6">
            Expense Breakdown by Category
          </h3>
          <PieChart
            data={categoryData}
            height={300}
            innerRadius={60}
            showLegend={false}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-agility-text mb-6">
            Top Expense Categories
          </h3>
          <div className="space-y-4">
            {categoryData.map((cat, index) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-agility-text font-medium">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-agility-text font-semibold">
                    {formatCurrency(cat.value)}
                  </span>
                </div>
                <div className="h-2 bg-agility-surface rounded-full overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: cat.color,
                      width: `${(cat.value / categoryData[0].value) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-agility-primary" />
          <h3 className="text-xl font-semibold text-agility-text">
            AI Financial Insights
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg border border-agility-border hover:border-agility-primary hover:bg-agility-surface-hover transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-2">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-agility-text mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-agility-text-muted">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {insight.action}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Cash Runway */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-agility-text mb-4">
          💵 Cash Runway
        </h3>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-5xl font-bold text-agility-text">
              {runwayMonths.toFixed(1)}
            </p>
            <p className="text-sm text-agility-text-muted mt-1">
              months at current burn rate
            </p>
          </div>
          <div className="flex-1">
            <div className="h-4 bg-agility-surface rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full",
                  runwayMonths >= 6
                    ? "bg-agility-success"
                    : runwayMonths >= 3
                    ? "bg-agility-warning"
                    : "bg-agility-error"
                )}
                style={{ width: `${Math.min((runwayMonths / 12) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-agility-text-muted mt-2">
              {runwayMonths >= 6
                ? "✅ Healthy runway"
                : runwayMonths >= 3
                ? "⚠️ Monitor closely"
                : "🚨 Urgent: increase income or reduce expenses"}
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110">
          <Download className="h-5 w-5 mr-2" />
          Download Tax Report
        </Button>
        <Button variant="outline">
          <Mail className="h-5 w-5 mr-2" />
          Share with Accountant
        </Button>
        <Button variant="outline">
          <FileText className="h-5 w-5 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
}
