"use client";

import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useExpenses } from "@/lib/hooks/use-expenses";
import { getItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Category } from "@/lib/types/expense";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { ArrowLeft, Trash2, Edit, Receipt as ReceiptIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExpenseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getExpenseById, updateExpense, deleteExpense } = useExpenses();
  const categories = getItem<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

  const expense = getExpenseById(params.id as string);

  if (!expense) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.push("/expenses")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </Button>
        <Card className="p-12 text-center">
          <p className="text-agility-text-muted">Expense not found</p>
        </Card>
      </div>
    );
  }

  const category = categories.find((c) => c.id === expense.categoryId);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(expense.id);
      router.push("/expenses");
    }
  };

  const handleToggleDeductible = () => {
    updateExpense(expense.id, { isDeductible: !expense.isDeductible });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/expenses")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/expenses/${expense.id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2 text-agility-error" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Card */}
      <Card className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-2 h-24 rounded-full"
              style={{ backgroundColor: category?.color || "#007C91" }}
            />
            <div>
              <h1 className="text-3xl font-bold text-agility-text mb-2">
                {expense.merchant || "Expense"}
              </h1>
              <div className="flex items-center gap-2">
                <Badge
                  className="bg-agility-surface-hover text-agility-text"
                  style={{
                    backgroundColor: `${category?.color}20`,
                    color: category?.color,
                  }}
                >
                  {category?.name || "Uncategorized"}
                </Badge>
                {expense.isDeductible && (
                  <Badge className="bg-agility-success/20 text-agility-success">
                    Tax Deductible
                  </Badge>
                )}
                {expense.receiptUrl && (
                  <Badge className="bg-agility-info/20 text-agility-info">
                    <ReceiptIcon className="h-3 w-3 mr-1" />
                    Receipt Attached
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-agility-text-muted mb-1">Amount</p>
            <p className="text-4xl font-bold text-agility-text">
              {formatCurrency(expense.amount)}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-agility-text-muted mb-1">
                Date
              </p>
              <p className="text-agility-text">{formatDate(expense.date)}</p>
            </div>

            {expense.merchant && (
              <div>
                <p className="text-sm font-semibold text-agility-text-muted mb-1">
                  Merchant/Vendor
                </p>
                <p className="text-agility-text">{expense.merchant}</p>
              </div>
            )}

            {expense.description && (
              <div>
                <p className="text-sm font-semibold text-agility-text-muted mb-1">
                  Description
                </p>
                <p className="text-agility-text">{expense.description}</p>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-agility-text-muted mb-1">
                Category
              </p>
              <p className="text-agility-text">{category?.name || "Uncategorized"}</p>
            </div>
          </div>

          {/* Tax & Receipt */}
          <div className="space-y-4">
            <div className="p-4 bg-agility-surface-hover rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-agility-text">
                    Tax Deductible
                  </p>
                  <p className="text-sm text-agility-text-muted">
                    {expense.isDeductible
                      ? "This expense is tax deductible"
                      : "This expense is not tax deductible"}
                  </p>
                </div>
                {expense.isDeductible ? (
                  <CheckCircle2 className="h-6 w-6 text-agility-success" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-agility-border" />
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleDeductible}
                className="w-full"
              >
                {expense.isDeductible ? "Remove Deduction" : "Mark as Deductible"}
              </Button>
            </div>

            {expense.receiptUrl && (
              <div className="p-4 bg-agility-surface-hover rounded-lg">
                <p className="font-semibold text-agility-text mb-2">
                  Receipt
                </p>
                <div className="aspect-video bg-agility-surface rounded-lg flex items-center justify-center border-2 border-dashed border-agility-border">
                  <div className="text-center">
                    <ReceiptIcon className="h-12 w-12 text-agility-text-muted mx-auto mb-2" />
                    <p className="text-sm text-agility-text-muted">
                      Receipt preview
                    </p>
                    <p className="text-xs text-agility-text-muted mt-1">
                      (Demo mode - no actual file)
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Full Size
                </Button>
              </div>
            )}

            {expense.notes && (
              <div className="p-4 bg-agility-surface-hover rounded-lg">
                <p className="font-semibold text-agility-text mb-2">Notes</p>
                <p className="text-sm text-agility-text-muted whitespace-pre-line">
                  {expense.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-agility-text-muted">
          <p>Created: {formatDate(expense.createdAt)}</p>
          <p>Last updated: {formatDate(expense.updatedAt)}</p>
        </div>
      </Card>
    </div>
  );
}
