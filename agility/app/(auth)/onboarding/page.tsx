"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/context/auth-context";
import {
  CheckCircle2,
  Briefcase,
  DollarSign,
  TrendingUp,
  Brain,
} from "lucide-react";
import { CURRENCIES } from "@/lib/utils/currency";

const INCOME_SOURCES = [
  "Freelance/Consulting",
  "Products/E-commerce",
  "Services",
  "Investments",
  "Rental Income",
  "Other",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    country: "United States",
    currency: "USD",
    taxYearMonth: "January",
    incomeSources: [] as string[],
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    // Save onboarding data to localStorage
    localStorage.setItem("agility-onboarding", JSON.stringify(formData));
    router.push("/dashboard");
  };

  const toggleIncomeSource = (source: string) => {
    setFormData((prev) => ({
      ...prev,
      incomeSources: prev.incomeSources.includes(source)
        ? prev.incomeSources.filter((s) => s !== source)
        : [...prev.incomeSources, source],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="flex items-center flex-1"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    i + 1 <= step
                      ? "bg-white border-white text-agility-dark"
                      : "bg-transparent border-white/30 text-white/50"
                  }`}
                >
                  {i + 1 < step ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <span className="font-semibold">{i + 1}</span>
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      i + 1 < step ? "bg-white" : "bg-white/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-white/90 text-sm text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card className="p-8">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-agility-mid to-agility-light p-4 mb-6">
                <Briefcase className="h-12 w-12 text-agility-text" />
              </div>
              <h1 className="text-3xl font-bold text-agility-text mb-4">
                Welcome to Agility, {user?.name || "there"}!
              </h1>
              <p className="text-agility-text-muted text-lg mb-8">
                Let's set up your financial command center in just a few steps.
              </p>

              <div className="grid gap-4 text-left max-w-md mx-auto mb-8">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-2 mt-1">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-agility-text">Track Everything</h3>
                    <p className="text-sm text-agility-text-muted">
                      Automatically track income, expenses, and receipts
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-2 mt-1">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-agility-text">Stay Tax-Ready</h3>
                    <p className="text-sm text-agility-text-muted">
                      Get quarterly tax estimates and track deductions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-2 mt-1">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-agility-text">AI-Powered Insights</h3>
                    <p className="text-sm text-agility-text-muted">
                      Get personalized recommendations to optimize your finances
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              >
                Let's Get Started
              </Button>
            </div>
          )}

          {/* Step 2: Business Profile */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-agility-text mb-2">
                Tell us about your business
              </h2>
              <p className="text-agility-text-muted mb-6">
                This helps us customize your experience
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business Name <span className="text-agility-text-muted">(optional)</span>
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Acme Freelancing"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Primary Currency</Label>
                  <select
                    id="currency"
                    className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                  >
                    {CURRENCIES.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxYearMonth">Tax Year Start</Label>
                  <select
                    id="taxYearMonth"
                    className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                    value={formData.taxYearMonth}
                    onChange={(e) =>
                      setFormData({ ...formData, taxYearMonth: e.target.value })
                    }
                  >
                    {MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Income Sources */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-agility-text mb-2">
                What are your main income sources?
              </h2>
              <p className="text-agility-text-muted mb-6">
                Select all that apply
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {INCOME_SOURCES.map((source) => (
                  <button
                    key={source}
                    onClick={() => toggleIncomeSource(source)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                      formData.incomeSources.includes(source)
                        ? "border-agility-primary bg-agility-primary/10"
                        : "border-agility-border hover:border-agility-primary/50"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-all ${
                        formData.incomeSources.includes(source)
                          ? "border-agility-primary bg-agility-primary"
                          : "border-agility-border"
                      }`}
                    >
                      {formData.incomeSources.includes(source) && (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-agility-text font-medium">
                      {source}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
                  disabled={formData.incomeSources.length === 0}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Setup Complete */}
          {step === 4 && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-6 mb-6">
                <CheckCircle2 className="h-16 w-16 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-agility-text mb-4">
                You're all set!
              </h1>
              <p className="text-agility-text-muted text-lg mb-8 max-w-md mx-auto">
                Your financial command center is ready. Let's dive in and start
                tracking your finances like a pro.
              </p>

              <div className="bg-agility-surface-hover rounded-lg p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-semibold text-agility-text mb-3">
                  What happens next?
                </h3>
                <ul className="text-left text-sm text-agility-text-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-agility-success mt-0.5">✓</span>
                    <span>We've generated sample data so you can explore the app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-agility-success mt-0.5">✓</span>
                    <span>Start by creating your first invoice or expense</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-agility-success mt-0.5">✓</span>
                    <span>Explore the dashboard and analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-agility-success mt-0.5">✓</span>
                    <span>Try asking the AI assistant for insights</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleFinish}
                size="lg"
                className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
