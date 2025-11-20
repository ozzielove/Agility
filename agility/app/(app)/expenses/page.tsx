"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useExpenses } from "@/lib/hooks/use-expenses";
import { getItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Category } from "@/lib/types/expense";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  MoreVertical,
  Receipt,
  Camera,
  Eye,
  Trash2,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function ExpensesPage() {
  const router = useRouter();
  const { expenses, deleteExpense, stats } = useExpenses();
  const categories = getItem<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" ||
      (categoryFilter === "UNCATEGORIZED" && !expense.categoryId) ||
      expense.categoryId === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Uncategorized";
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const getCategoryColor = (categoryId?: string) => {
    if (!categoryId) return "#5C6C79";
    return categories.find((c) => c.id === categoryId)?.color || "#007C91";
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-agility-text">Expenses</h1>
          <p className="mt-2 text-agility-text-muted">
            Track your business expenses and receipts
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/expenses/scan")}
          >
            <Camera className="h-5 w-5 mr-2" />
            Scan Receipt
          </Button>
          <Button
            className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
            onClick={() => router.push("/expenses/new")}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-3">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">Total Expenses</p>
              <p className="text-2xl font-bold text-agility-text">
                {formatCurrency(stats.total)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-agility-success/20 p-3">
              <CheckCircle2 className="h-6 w-6 text-agility-success" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">Tax Deductible</p>
              <p className="text-2xl font-bold text-agility-success">
                {formatCurrency(stats.deductible)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-agility-info/20 p-3">
              <FileText className="h-6 w-6 text-agility-info" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">Total Count</p>
              <p className="text-2xl font-bold text-agility-text">
                {stats.count}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-agility-warning/20 p-3">
              <Receipt className="h-6 w-6 text-agility-warning" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">With Receipts</p>
              <p className="text-2xl font-bold text-agility-text">
                {stats.withReceipts}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs & Filters */}
      <Card className="p-6">
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setCategoryFilter("ALL")}>
                All
              </TabsTrigger>
              <TabsTrigger
                value="uncategorized"
                onClick={() => setCategoryFilter("UNCATEGORIZED")}
              >
                Uncategorized
              </TabsTrigger>
              <TabsTrigger value="deductible">
                Tax Deductible
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 w-full sm:w-auto">
              <select
                className="flex h-10 rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                <option value="UNCATEGORIZED">Uncategorized</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-agility-text-muted" />
                <Input
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-agility-text-muted mx-auto mb-4" />
                <p className="text-agility-text font-medium mb-2">No expenses found</p>
                <p className="text-sm text-agility-text-muted mb-6">
                  Start tracking your business expenses
                </p>
                <Button
                  onClick={() => router.push("/expenses/new")}
                  className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Expense
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-agility-border hover:border-agility-primary hover:bg-agility-surface-hover transition-all cursor-pointer"
                    onClick={() => router.push(`/expenses/${expense.id}`)}
                  >
                    <div
                      className="w-3 h-12 rounded-full"
                      style={{
                        backgroundColor: getCategoryColor(expense.categoryId),
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-agility-text truncate">
                          {expense.merchant || "Expense"}
                        </p>
                        {expense.isDeductible && (
                          <Badge className="bg-agility-success/20 text-agility-success text-xs">
                            Tax Deductible
                          </Badge>
                        )}
                        {expense.receiptUrl && (
                          <Receipt className="h-4 w-4 text-agility-info" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-agility-text-muted">
                        <span>{getCategoryName(expense.categoryId)}</span>
                        <span>•</span>
                        <span>{formatDate(expense.date)}</span>
                        {expense.description && (
                          <>
                            <span>•</span>
                            <span className="truncate">{expense.description}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-agility-text">
                        {formatCurrency(expense.amount)}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/expenses/${expense.id}`);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-agility-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(expense.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="uncategorized">
            {/* Same as all, pre-filtered */}
          </TabsContent>
          <TabsContent value="deductible">
            {/* Same as all, pre-filtered for deductible */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
