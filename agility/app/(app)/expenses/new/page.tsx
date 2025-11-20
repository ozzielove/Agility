"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useExpenses } from "@/lib/hooks/use-expenses";
import { getItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Category } from "@/lib/types/expense";
import { ArrowLeft, Upload } from "lucide-react";

export default function NewExpensePage() {
  const router = useRouter();
  const { createExpense } = useExpenses();
  const categories = getItem<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

  const [formData, setFormData] = useState({
    amount: "",
    merchant: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    notes: "",
    isDeductible: true,
    receiptUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    createExpense({
      userId: "mock-user-id",
      amount: Number(formData.amount),
      merchant: formData.merchant || undefined,
      categoryId: formData.categoryId || undefined,
      date: new Date(formData.date),
      description: formData.description || undefined,
      notes: formData.notes || undefined,
      isDeductible: formData.isDeductible,
      receiptUrl: formData.receiptUrl || undefined,
      currency: "USD",
    });

    router.push("/expenses");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/expenses")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </Button>
      </div>

      <Card className="p-8">
        <h1 className="text-2xl font-bold text-agility-text mb-2">
          Add New Expense
        </h1>
        <p className="text-agility-text-muted mb-8">
          Enter the details of your business expense
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-agility-text-muted">
                $
              </span>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="pl-8 text-2xl font-bold h-14"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Merchant */}
          <div className="space-y-2">
            <Label htmlFor="merchant">Merchant/Vendor</Label>
            <Input
              id="merchant"
              placeholder="e.g., Office Depot, Uber, Adobe"
              value={formData.merchant}
              onChange={(e) =>
                setFormData({ ...formData, merchant: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of the expense"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Receipt Upload */}
          <div className="space-y-2">
            <Label>Receipt</Label>
            <div className="border-2 border-dashed border-agility-border rounded-lg p-8 text-center hover:border-agility-primary transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-agility-text-muted mx-auto mb-2" />
              <p className="text-sm text-agility-text-muted mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-agility-text-muted">
                PNG, JPG, PDF up to 10MB
              </p>
              <p className="text-xs text-agility-info mt-2">
                (Demo mode - upload is simulated)
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes about this expense"
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          {/* Tax Deductible */}
          <div className="flex items-center justify-between p-4 bg-agility-surface-hover rounded-lg">
            <div className="flex-1">
              <Label htmlFor="deductible" className="text-base font-semibold">
                Tax Deductible
              </Label>
              <p className="text-sm text-agility-text-muted mt-1">
                Mark this expense as tax deductible
              </p>
            </div>
            <Switch
              id="deductible"
              checked={formData.isDeductible}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isDeductible: checked })
              }
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/expenses")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
            >
              Save Expense
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
