'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Receipt,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  DollarSign,
  Building2,
  Calendar,
  Tag,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { categories } from '@/lib/mock/data';

interface ExtractedData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  confidence: number;
}

export default function ScanPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        processReceipt();
      };
      reader.readAsDataURL(file);
    }
  };

  const processReceipt = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setExtractedData({
        merchant: 'Starbucks Coffee',
        amount: 12.45,
        date: new Date().toISOString().split('T')[0],
        category: 'Meals & Entertainment',
        confidence: 94,
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setSelectedImage(null);
      setExtractedData(null);
      setShowSuccess(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setExtractedData(null);
    setShowSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--success)]/10 mb-6">
          <CheckCircle className="h-10 w-10 text-[var(--success)]" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Receipt Saved!</h2>
        <p className="mt-2 text-[var(--text-secondary)]">Your expense has been recorded successfully.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Scan Receipt</h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Capture or upload a receipt for AI-powered extraction
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-[var(--primary-mid)]" />
              Receipt Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Receipt"
                  className="w-full rounded-xl border border-[var(--border)] object-contain max-h-[400px]"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-md hover:bg-[var(--surface-elevated)]"
                >
                  <X className="h-4 w-4" />
                </button>
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/80 rounded-xl">
                    <div className="text-center">
                      <Loader2 className="h-10 w-10 animate-spin text-[var(--primary-mid)] mx-auto" />
                      <p className="mt-4 text-[var(--text-primary)] font-medium">Analyzing receipt...</p>
                      <p className="text-sm text-[var(--text-secondary)]">AI is extracting information</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-[var(--border)] p-12 text-center hover:border-[var(--primary-mid)] hover:bg-[var(--primary-mid)]/5 transition-colors"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-mid)]/10">
                  <Upload className="h-8 w-8 text-[var(--primary-mid)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                  Upload Receipt
                </h3>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Click to browse or drag and drop
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  PNG, JPG, or PDF up to 10MB
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Quick Actions */}
            {!selectedImage && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-5 w-5" />
                  Choose File
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-5 w-5" />
                  Take Photo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Extracted Data Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[var(--warning)]" />
              Extracted Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {extractedData ? (
              <div className="space-y-6">
                {/* Confidence Indicator */}
                <div className="flex items-center gap-3 rounded-xl bg-[var(--success)]/10 p-4">
                  <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">
                      {extractedData.confidence}% Confidence
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      AI successfully extracted receipt data
                    </p>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Merchant
                    </label>
                    <Input
                      value={extractedData.merchant}
                      onChange={(e) =>
                        setExtractedData({ ...extractedData, merchant: e.target.value })
                      }
                      icon={<Building2 className="h-5 w-5" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Amount
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={extractedData.amount}
                      onChange={(e) =>
                        setExtractedData({ ...extractedData, amount: parseFloat(e.target.value) })
                      }
                      icon={<DollarSign className="h-5 w-5" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={extractedData.date}
                      onChange={(e) =>
                        setExtractedData({ ...extractedData, date: e.target.value })
                      }
                      icon={<Calendar className="h-5 w-5" />}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--text-secondary)]">
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={extractedData.category}
                        onChange={(e) =>
                          setExtractedData({ ...extractedData, category: e.target.value })
                        }
                        className="w-full h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-12 pr-4 text-[var(--text-primary)] focus:border-[var(--primary-mid)] focus:ring-2 focus:ring-[var(--primary-mid)]/20 appearance-none"
                      >
                        {categories
                          .filter((c) => c.type === 'expense' || c.type === 'both')
                          .map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                    </div>
                  </div>
                </div>

                {/* Tax Deductible Toggle */}
                <label className="flex items-center justify-between rounded-xl bg-[var(--surface-elevated)] p-4">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Tax Deductible</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Mark as business expense
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-[var(--border)] text-[var(--primary-mid)] focus:ring-[var(--primary-mid)]"
                  />
                </label>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleReset}>
                    Discard
                  </Button>
                  <Button className="flex-1" onClick={handleSave}>
                    <CheckCircle className="h-5 w-5" />
                    Save Expense
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-elevated)]">
                  <Receipt className="h-8 w-8 text-[var(--text-muted)]" />
                </div>
                <h3 className="mt-4 font-semibold text-[var(--text-primary)]">No Receipt Selected</h3>
                <p className="mt-2 text-[var(--text-secondary)] max-w-xs">
                  Upload or capture a receipt image to automatically extract merchant, amount, and category
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--info)]/10">
              <AlertCircle className="h-5 w-5 text-[var(--info)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Tips for Best Results</h3>
              <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
                <li>• Ensure the receipt is well-lit and flat</li>
                <li>• Include the full receipt in the frame</li>
                <li>• Avoid shadows and glare on the receipt</li>
                <li>• For faded receipts, try increasing contrast before uploading</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
