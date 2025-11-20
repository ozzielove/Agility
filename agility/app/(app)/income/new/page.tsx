"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInvoices } from "@/lib/hooks/use-invoices";
import { formatCurrency } from "@/lib/utils/format";
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";
import type { LineItem } from "@/lib/types/invoice";

export default function NewInvoicePage() {
  const router = useRouter();
  const { createInvoice } = useInvoices();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lineItems: [
      { description: "", quantity: 1, rate: 0, amount: 0 },
    ] as LineItem[],
    notes: "",
    taxRate: 0,
  });

  const calculateTotals = () => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (formData.taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const handleAddLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [
        ...formData.lineItems,
        { description: "", quantity: 1, rate: 0, amount: 0 },
      ],
    });
  };

  const handleRemoveLineItem = (index: number) => {
    setFormData({
      ...formData,
      lineItems: formData.lineItems.filter((_, i) => i !== index),
    });
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedItems = [...formData.lineItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    // Recalculate amount
    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
    }

    setFormData({ ...formData, lineItems: updatedItems });
  };

  const handleSubmit = (asDraft: boolean = false) => {
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    createInvoice({
      userId: "mock-user-id",
      invoiceNumber,
      status: asDraft ? "DRAFT" : "SENT",
      clientName: formData.clientName,
      clientEmail: formData.clientEmail || undefined,
      clientAddress: formData.clientAddress || undefined,
      issueDate: new Date(formData.issueDate),
      dueDate: new Date(formData.dueDate),
      subtotal,
      tax,
      total,
      lineItems: formData.lineItems,
      notes: formData.notes || undefined,
    });

    router.push("/income");
  };

  const canProceedStep1 = formData.clientName.trim() !== "";
  const canProceedStep2 = formData.lineItems.some(item => item.description && item.amount > 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/income")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-agility-text-muted">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s <= step
                      ? "bg-gradient-to-r from-agility-mid to-agility-light text-white"
                      : "bg-agility-surface text-agility-text-muted"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && <div className="w-12 h-0.5 bg-agility-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="p-8">
        {/* Step 1: Client Information */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-agility-text mb-2">
              Client Information
            </h2>
            <p className="text-agility-text-muted mb-6">
              Enter your client's details
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  placeholder="Acme Corporation"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="client@example.com"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea
                  id="clientAddress"
                  placeholder="123 Main St&#10;New York, NY 10001"
                  rows={3}
                  value={formData.clientAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, clientAddress: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, issueDate: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              >
                Continue to Line Items
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Line Items */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-agility-text mb-2">
              Line Items
            </h2>
            <p className="text-agility-text-muted mb-6">
              Add items or services to this invoice
            </p>

            <div className="space-y-4">
              {formData.lineItems.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-agility-border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <Input
                        placeholder="Description of service or product"
                        value={item.description}
                        onChange={(e) =>
                          handleLineItemChange(index, "description", e.target.value)
                        }
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleLineItemChange(index, "quantity", Number(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Rate</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) =>
                              handleLineItemChange(index, "rate", Number(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Amount</Label>
                          <div className="h-10 flex items-center px-3 bg-agility-surface-hover rounded-md text-agility-text font-semibold">
                            {formatCurrency(item.amount)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {formData.lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveLineItem(index)}
                      >
                        <Trash2 className="h-4 w-4 text-agility-error" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={handleAddLineItem}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Line Item
              </Button>

              {/* Totals */}
              <div className="mt-6 p-4 bg-agility-surface-hover rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between text-agility-text">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-agility-text">
                    <div className="flex items-center gap-2">
                      <span>Tax:</span>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={formData.taxRate}
                        onChange={(e) =>
                          setFormData({ ...formData, taxRate: Number(e.target.value) })
                        }
                        className="w-20 h-8"
                      />
                      <span>%</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t border-agility-border pt-2">
                    <span className="font-semibold text-agility-text">Total:</span>
                    <span className="font-bold text-agility-text">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex-1 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              >
                Review Invoice
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-agility-text mb-2">
              Review & Send
            </h2>
            <p className="text-agility-text-muted mb-6">
              Review your invoice before sending
            </p>

            <div className="space-y-6">
              {/* Preview */}
              <div className="border border-agility-border rounded-lg p-6 bg-agility-surface-hover">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-agility-text-muted mb-1">
                      TO
                    </p>
                    <p className="font-semibold text-agility-text">
                      {formData.clientName}
                    </p>
                    {formData.clientEmail && (
                      <p className="text-sm text-agility-text-muted">
                        {formData.clientEmail}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-agility-text-muted">Total Amount</p>
                    <p className="text-3xl font-bold text-agility-text">
                      {formatCurrency(total)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {formData.lineItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-agility-text">{item.description}</span>
                      <span className="font-semibold text-agility-text">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Payment terms, thank you message, etc."
                  rows={4}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                className="flex-1"
              >
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                className="flex-1 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              >
                Send Invoice
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
