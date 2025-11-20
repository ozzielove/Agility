"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useExpenses } from "@/lib/hooks/use-expenses";
import { getItem, STORAGE_KEYS } from "@/lib/storage/local-storage";
import type { Category } from "@/lib/types/expense";
import { ArrowLeft, Camera, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

export default function ScanReceiptPage() {
  const router = useRouter();
  const { createExpense } = useExpenses();
  const categories = getItem<Category[]>(STORAGE_KEYS.CATEGORIES) || [];

  const [step, setStep] = useState<"scan" | "review">("scan");
  const [extractedData, setExtractedData] = useState({
    amount: "",
    merchant: "",
    date: new Date().toISOString().split("T")[0],
    categoryId: "",
  });

  const handleScan = () => {
    // Simulate AI extraction
    setTimeout(() => {
      setExtractedData({
        amount: "24.99",
        merchant: "Office Depot",
        date: new Date().toISOString().split("T")[0],
        categoryId: categories.find((c) => c.name === "Office Supplies")?.id || "",
      });
      setStep("review");
    }, 1500);
  };

  const handleSave = () => {
    createExpense({
      userId: "mock-user-id",
      amount: Number(extractedData.amount),
      merchant: extractedData.merchant,
      categoryId: extractedData.categoryId,
      date: new Date(extractedData.date),
      description: "Scanned from receipt",
      isDeductible: true,
      receiptUrl: "mock-receipt-url",
      currency: "USD",
    });

    router.push("/expenses");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/expenses")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Expenses
        </Button>
      </div>

      {step === "scan" && (
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-4 mb-4">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-agility-text mb-2">
              Scan Receipt
            </h1>
            <p className="text-agility-text-muted">
              AI will automatically extract and categorize the expense details
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Scan Area */}
            <div className="border-4 border-dashed border-agility-border rounded-2xl p-12 text-center mb-6 hover:border-agility-primary transition-colors">
              <div className="space-y-6">
                <div className="aspect-square max-w-xs mx-auto bg-agility-surface rounded-lg flex items-center justify-center">
                  <div>
                    <Camera className="h-16 w-16 text-agility-text-muted mx-auto mb-4" />
                    <p className="text-agility-text-muted">
                      Camera preview
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleScan}
                    size="lg"
                    className="w-full bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Capture Receipt
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-agility-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-agility-surface px-2 text-agility-text-muted">
                        or
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" size="lg" className="w-full">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload from Files
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-agility-info/10 border border-agility-info rounded-lg p-4">
              <div className="flex gap-3">
                <Sparkles className="h-5 w-5 text-agility-info flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-agility-text mb-1">
                    AI-Powered Extraction
                  </p>
                  <p className="text-xs text-agility-text-muted">
                    Our AI automatically reads receipts and extracts merchant,
                    amount, date, and suggests the best category. You can review
                    and edit before saving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === "review" && (
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center rounded-full bg-agility-success/20 p-4 mb-4">
              <CheckCircle2 className="h-12 w-12 text-agility-success" />
            </div>
            <h1 className="text-2xl font-bold text-agility-text mb-2">
              Receipt Scanned Successfully
            </h1>
            <p className="text-agility-text-muted">
              Review and edit the extracted details
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Receipt Preview */}
              <div>
                <Label className="mb-2">Receipt Preview</Label>
                <div className="aspect-[3/4] bg-agility-surface rounded-lg border-2 border-agility-border flex items-center justify-center">
                  <div className="text-center p-6">
                    <Camera className="h-16 w-16 text-agility-text-muted mx-auto mb-4" />
                    <p className="text-sm text-agility-text-muted">
                      Receipt image preview
                    </p>
                    <p className="text-xs text-agility-text-muted mt-2">
                      (Demo mode)
                    </p>
                  </div>
                </div>
              </div>

              {/* Extracted Data */}
              <div className="space-y-4">
                <div className="p-4 bg-agility-surface-hover rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-agility-info" />
                    <span className="text-sm font-semibold text-agility-text">
                      AI Extracted Data
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-agility-text-muted">
                          $
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={extractedData.amount}
                          onChange={(e) =>
                            setExtractedData({
                              ...extractedData,
                              amount: e.target.value,
                            })
                          }
                          className="pl-8 text-xl font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="merchant">Merchant</Label>
                      <Input
                        id="merchant"
                        value={extractedData.merchant}
                        onChange={(e) =>
                          setExtractedData({
                            ...extractedData,
                            merchant: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={extractedData.date}
                        onChange={(e) =>
                          setExtractedData({
                            ...extractedData,
                            date: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Suggested Category</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                        value={extractedData.categoryId}
                        onChange={(e) =>
                          setExtractedData({
                            ...extractedData,
                            categoryId: e.target.value,
                          })
                        }
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-agility-success/10 border border-agility-success rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">
                      Automatically marked as tax deductible
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep("scan")}
                className="flex-1"
              >
                Rescan
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              >
                Save Expense
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
