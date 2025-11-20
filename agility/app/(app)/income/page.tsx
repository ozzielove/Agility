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
import { useInvoices } from "@/lib/hooks/use-invoices";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  MoreVertical,
  FileText,
  Download,
  Copy,
  Trash2,
  Eye,
  CheckCircle2,
} from "lucide-react";
import type { InvoiceStatus } from "@/lib/types/invoice";

const STATUS_COLORS: Record<InvoiceStatus, string> = {
  DRAFT: "bg-agility-disabled/20 text-agility-disabled",
  SENT: "bg-agility-info/20 text-agility-info",
  PAID: "bg-agility-success/20 text-agility-success",
  OVERDUE: "bg-agility-error/20 text-agility-error",
  CANCELLED: "bg-agility-text-muted/20 text-agility-text-muted",
};

export default function IncomePage() {
  const router = useRouter();
  const { invoices, updateInvoice, deleteInvoice, stats } = useInvoices();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "ALL">("ALL");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleMarkAsPaid = (id: string) => {
    updateInvoice(id, { status: "PAID" });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-agility-text">Income & Invoices</h1>
          <p className="mt-2 text-agility-text-muted">
            Manage your invoices and track payments
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
          onClick={() => router.push("/income/new")}
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-3">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">Total Income</p>
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
              <p className="text-sm text-agility-text-muted">Paid</p>
              <p className="text-2xl font-bold text-agility-success">
                {formatCurrency(stats.paid)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-agility-warning/20 p-3">
              <FileText className="h-6 w-6 text-agility-warning" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">Unpaid</p>
              <p className="text-2xl font-bold text-agility-warning">
                {formatCurrency(stats.unpaid)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-agility-error/20 p-3">
              <FileText className="h-6 w-6 text-agility-error" />
            </div>
            <div>
              <p className="text-sm text-agility-text-muted">Overdue</p>
              <p className="text-2xl font-bold text-agility-error">
                {stats.overdueCount}
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
              <TabsTrigger value="all" onClick={() => setStatusFilter("ALL")}>
                All Invoices
              </TabsTrigger>
              <TabsTrigger value="unpaid" onClick={() => setStatusFilter("SENT")}>
                Unpaid
              </TabsTrigger>
              <TabsTrigger value="paid" onClick={() => setStatusFilter("PAID")}>
                Paid
              </TabsTrigger>
              <TabsTrigger value="overdue" onClick={() => setStatusFilter("OVERDUE")}>
                Overdue
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-agility-text-muted" />
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-agility-text-muted mx-auto mb-4" />
                <p className="text-agility-text font-medium mb-2">No invoices found</p>
                <p className="text-sm text-agility-text-muted mb-6">
                  Create your first invoice to get started
                </p>
                <Button
                  onClick={() => router.push("/income/new")}
                  className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Invoice
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-agility-border hover:border-agility-primary hover:bg-agility-surface-hover transition-all cursor-pointer"
                    onClick={() => router.push(`/income/${invoice.id}`)}
                  >
                    <Badge className={cn("shrink-0", STATUS_COLORS[invoice.status])}>
                      {invoice.status}
                    </Badge>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-agility-text truncate">
                          {invoice.clientName}
                        </p>
                        <span className="text-sm text-agility-text-muted">
                          #{invoice.invoiceNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-agility-text-muted">
                        <span>Issued: {formatDate(invoice.issueDate)}</span>
                        <span>Due: {formatDate(invoice.dueDate)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-agility-text">
                        {formatCurrency(invoice.total)}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/income/${invoice.id}`);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {invoice.status !== "PAID" && (
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsPaid(invoice.id);
                          }}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-agility-error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(invoice.id);
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
          <TabsContent value="unpaid">
            {/* Same content as "all" but pre-filtered */}
          </TabsContent>
          <TabsContent value="paid">
            {/* Same content as "all" but pre-filtered */}
          </TabsContent>
          <TabsContent value="overdue">
            {/* Same content as "all" but pre-filtered */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
