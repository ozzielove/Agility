"use client";

import { useRouter } from "next/navigation";
import { StatCard } from "@/components/dashboard/stat-card";
import { LineChart } from "@/components/charts/line-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Receipt,
  Camera,
  MessageSquare,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useDashboardData } from "@/lib/hooks/use-dashboard-data";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const {
    currentMonth,
    trends,
    chartData,
    recentTransactions,
    healthScore,
    estimatedTax,
  } = useDashboardData();

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-agility-success";
    if (score >= 60) return "text-agility-warning";
    return "text-agility-error";
  };

  const getHealthStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-agility-text">Dashboard</h1>
        <p className="mt-2 text-agility-text-muted">
          Welcome to your financial command center
        </p>
      </div>

      {/* Hero Card: Current Month Profit */}
      <Card className="p-8 bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light border-0">
        <div className="text-center">
          <p className="text-white/80 text-lg mb-2">Current Month Profit</p>
          <h2 className="text-5xl font-bold text-white mb-6">
            {formatCurrency(currentMonth.profit)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(currentMonth.income)}
              </p>
              {trends.income !== 0 && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  {trends.income > 0 ? (
                    <TrendingUp className="h-4 w-4 text-agility-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-agility-error" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      trends.income > 0 ? "text-agility-success" : "text-agility-error"
                    )}
                  >
                    {Math.abs(trends.income).toFixed(1)}%
                  </span>
                  <span className="text-white/70 text-sm">vs last month</span>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(currentMonth.expenses)}
              </p>
              {trends.expenses !== 0 && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  {trends.expenses > 0 ? (
                    <TrendingUp className="h-4 w-4 text-agility-error" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-agility-success" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      trends.expenses > 0 ? "text-agility-error" : "text-agility-success"
                    )}
                  >
                    {Math.abs(trends.expenses).toFixed(1)}%
                  </span>
                  <span className="text-white/70 text-sm">vs last month</span>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-white/70 text-sm mb-1">Balance</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(currentMonth.profit)}
              </p>
              {trends.profit !== 0 && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  {trends.profit > 0 ? (
                    <TrendingUp className="h-4 w-4 text-agility-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-agility-error" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      trends.profit > 0 ? "text-agility-success" : "text-agility-error"
                    )}
                  >
                    {Math.abs(trends.profit).toFixed(1)}%
                  </span>
                  <span className="text-white/70 text-sm">vs last month</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Chart + Side Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-agility-text">
                Income vs Expenses
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Month
                </Button>
                <Button variant="ghost" size="sm">
                  Quarter
                </Button>
                <Button variant="ghost" size="sm">
                  Year
                </Button>
              </div>
            </div>
            <LineChart
              data={chartData}
              lines={[
                {
                  dataKey: "income",
                  name: "Income",
                  color: "var(--agility-success)",
                },
                {
                  dataKey: "expenses",
                  name: "Expenses",
                  color: "var(--agility-error)",
                },
              ]}
              height={300}
            />
          </Card>
        </div>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Tax Summary Card */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-agility-text">
                  Estimated Q4 Taxes
                </h3>
                <p className="text-xs text-agility-text-muted mt-1">
                  Due: December 31, 2025
                </p>
              </div>
            </div>

            <p className="text-3xl font-bold text-agility-text mb-3">
              {formatCurrency(estimatedTax * 4)}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-agility-text-muted">Saved</span>
                <span className="text-agility-text font-medium">
                  {formatCurrency(estimatedTax * 2)}
                </span>
              </div>
              <div className="h-2 bg-agility-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-agility-mid to-agility-light"
                  style={{ width: "50%" }}
                />
              </div>
              <p className="text-xs text-agility-text-muted">50% of recommended</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => router.push("/insights")}
            >
              View Full Tax Report
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>

          {/* AI Health Score Card */}
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-agility-text">
                  Financial Health Score
                </h3>
                <Badge
                  className={cn(
                    "mt-1",
                    healthScore >= 80
                      ? "bg-agility-success/20 text-agility-success"
                      : healthScore >= 60
                      ? "bg-agility-warning/20 text-agility-warning"
                      : "bg-agility-error/20 text-agility-error"
                  )}
                >
                  {getHealthStatus(healthScore)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="var(--agility-border)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(healthScore / 100) * 352} 352`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--agility-mid)" />
                      <stop offset="100%" stopColor="var(--agility-light)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn("text-4xl font-bold", getHealthColor(healthScore))}>
                    {healthScore}
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-start gap-2">
                <span className="text-agility-success mt-0.5">✓</span>
                <span className="text-agility-text-muted">Consistent income growth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-agility-success mt-0.5">✓</span>
                <span className="text-agility-text-muted">Good expense management</span>
              </li>
            </ul>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => router.push("/insights")}
            >
              Get AI Recommendations
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Transactions + Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-agility-text">
                Recent Transactions
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/income")}
              >
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-agility-surface-hover transition-colors cursor-pointer"
                  onClick={() => {
                    if (transaction.type === "INCOME") {
                      router.push(`/income/${transaction.id}`);
                    } else {
                      router.push(`/expenses/${transaction.id}`);
                    }
                  }}
                >
                  <div
                    className={cn(
                      "rounded-full p-2",
                      transaction.type === "INCOME"
                        ? "bg-agility-success/20"
                        : "bg-agility-error/20"
                    )}
                  >
                    {transaction.type === "INCOME" ? (
                      <TrendingUp
                        className={cn(
                          "h-5 w-5",
                          transaction.type === "INCOME"
                            ? "text-agility-success"
                            : "text-agility-error"
                        )}
                      />
                    ) : (
                      <TrendingDown
                        className={cn(
                          "h-5 w-5",
                          transaction.type === "INCOME"
                            ? "text-agility-success"
                            : "text-agility-error"
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-agility-text">
                      {transaction.description || transaction.merchant || "Transaction"}
                    </p>
                    <p className="text-sm text-agility-text-muted">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      transaction.type === "INCOME"
                        ? "text-agility-success"
                        : "text-agility-error"
                    )}
                  >
                    {transaction.type === "INCOME" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))}

              {recentTransactions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-agility-text-muted">No transactions yet</p>
                  <p className="text-sm text-agility-text-muted mt-1">
                    Start by creating an invoice or adding an expense
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-agility-text mb-6">
            Quick Actions
          </h3>

          <div className="space-y-3">
            <Button
              className="w-full justify-start bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              onClick={() => router.push("/income")}
            >
              <FileText className="h-5 w-5 mr-3" />
              Create Invoice
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/expenses")}
            >
              <Receipt className="h-5 w-5 mr-3" />
              Add Expense
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/expenses")}
            >
              <Camera className="h-5 w-5 mr-3" />
              Scan Receipt
            </Button>

            <Separator className="my-4" />

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push("/insights")}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Ask AI Assistant
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
