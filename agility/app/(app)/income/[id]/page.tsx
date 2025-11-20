"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useInvoices } from "@/lib/hooks/use-invoices";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Download,
  Copy,
  Trash2,
  Mail,
  CheckCircle2,
  Edit,
  MoreVertical,
} from "lucide-react";
import { useParams } from "next/navigation";
import type { InvoiceStatus } from "@/lib/types/invoice";

const STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT: "bg-agility-disabled/20 text-agility-disabled",
  SENT: "bg-agility-info/20 text-agility-info",
  PAID: "bg-agility-success/20 text-agility-success",
  OVERDUE: "bg-agility-error/20 text-agility-error",
  CANCELLED: "bg-agility-text-muted/20 text-agility-text-muted",
};

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getInvoiceById, updateInvoice, deleteInvoice } = useInvoices();

  const invoice = getInvoiceById(params.id as string);

  if (!invoice) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/income")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Button>
        <Card className="p-12 text-center">
          <p className="text-agility-text-muted">Invoice not found</p>
        </Card>
      </div>
    );
  }

  const handleMarkAsPaid = () => {
    updateInvoice(invoice.id, { status: "PAID" });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(invoice.id);
      router.push("/income");
    }
  };

  const handleSendInvoice = () => {
    updateInvoice(invoice.id, { status: "SENT" });
    alert("Invoice sent successfully! (This is a demo)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/income")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/income/${invoice.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2 text-agility-error" />
            Delete
          </Button>
        </div>
      </div>

      {/* Invoice Header Card */}
      <Card className="p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-agility-text">
                Invoice #{invoice.invoiceNumber}
              </h1>
              <Badge className={cn("text-sm", STATUS_COLORS[invoice.status])}>
                {invoice.status}
              </Badge>
            </div>
            <p className="text-agility-text-muted">
              Issued: {formatDate(invoice.issueDate)} • Due: {formatDate(invoice.dueDate)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-agility-text-muted mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-agility-text">
              {formatCurrency(invoice.total)}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* From Section */}
          <div>
            <p className="text-sm font-semibold text-agility-text-muted mb-2">FROM</p>
            <div className="text-agility-text">
              <p className="font-semibold">Your Business</p>
              <p className="text-sm text-agility-text-muted mt-1">
                your@business.com
              </p>
            </div>
          </div>

          {/* To Section */}
          <div>
            <p className="text-sm font-semibold text-agility-text-muted mb-2">TO</p>
            <div className="text-agility-text">
              <p className="font-semibold">{invoice.clientName}</p>
              {invoice.clientEmail && (
                <p className="text-sm text-agility-text-muted mt-1">
                  {invoice.clientEmail}
                </p>
              )}
              {invoice.clientAddress && (
                <p className="text-sm text-agility-text-muted mt-1 whitespace-pre-line">
                  {invoice.clientAddress}
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-agility-border">
                <th className="text-left py-3 text-sm font-semibold text-agility-text-muted">
                  Description
                </th>
                <th className="text-right py-3 text-sm font-semibold text-agility-text-muted">
                  Qty
                </th>
                <th className="text-right py-3 text-sm font-semibold text-agility-text-muted">
                  Rate
                </th>
                <th className="text-right py-3 text-sm font-semibold text-agility-text-muted">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item, index) => (
                <tr key={index} className="border-b border-agility-border/50">
                  <td className="py-4 text-agility-text">{item.description}</td>
                  <td className="py-4 text-right text-agility-text">{item.quantity}</td>
                  <td className="py-4 text-right text-agility-text">
                    {formatCurrency(item.rate)}
                  </td>
                  <td className="py-4 text-right font-semibold text-agility-text">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-agility-text">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex justify-between text-agility-text">
                <span>Tax:</span>
                <span className="font-semibold">{formatCurrency(invoice.tax)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-agility-text">Total:</span>
              <span className="font-bold text-agility-text">
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-8 p-4 bg-agility-surface-hover rounded-lg">
            <p className="text-sm font-semibold text-agility-text mb-2">Notes</p>
            <p className="text-sm text-agility-text-muted whitespace-pre-line">
              {invoice.notes}
            </p>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {invoice.status !== "PAID" && (
          <Button
            className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
            onClick={handleSendInvoice}
          >
            <Mail className="h-5 w-5 mr-2" />
            Send Invoice
          </Button>
        )}

        {invoice.status !== "PAID" && (
          <Button variant="outline" onClick={handleMarkAsPaid}>
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Mark as Paid
          </Button>
        )}

        <Button variant="outline">
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </Button>

        <Button variant="outline">
          <Copy className="h-5 w-5 mr-2" />
          Duplicate Invoice
        </Button>
      </div>
    </div>
  );
}
