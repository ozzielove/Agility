import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Receipt,
  FileText,
  BarChart3,
  DollarSign,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Receipt,
      title: "Smart Receipt Scanning",
      description:
        "Scan receipts with your camera and let AI automatically categorize and extract data.",
    },
    {
      icon: FileText,
      title: "Easy Invoicing",
      description:
        "Create professional invoices in minutes and track payments effortlessly.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Get instant insights into your income, expenses, and financial health.",
    },
    {
      icon: DollarSign,
      title: "Tax Ready",
      description:
        "Automatically track deductions and generate quarterly tax estimates.",
    },
    {
      icon: Shield,
      title: "Bank-level Security",
      description:
        "Your financial data is encrypted and protected with industry-standard security.",
    },
    {
      icon: Zap,
      title: "AI Assistant",
      description:
        "Get personalized financial recommendations and insights powered by AI.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4">
                <div className="text-6xl font-bold text-agility-text">
                  A
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-bold tracking-tight text-agility-text sm:text-6xl md:text-7xl">
              Financial Command Center
              <br />
              for Freelancers
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-agility-text/90 sm:text-xl">
              Track income, manage expenses, and stay tax-ready. Built for
              independent creators who want to focus on their craft, not their
              spreadsheets.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-agility-dark hover:bg-white/90 text-lg px-8 py-6 h-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <p className="mt-8 text-sm text-agility-text/70">
              Trusted by 10,000+ freelancers and independent creators
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-agility-text sm:text-4xl">
            Everything you need to manage your finances
          </h2>
          <p className="mt-4 text-lg text-agility-text-muted max-w-2xl mx-auto">
            Powerful features designed specifically for freelancers and
            independent professionals.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-3 w-fit mb-4">
                  <Icon className="h-6 w-6 text-agility-text" />
                </div>
                <h3 className="text-xl font-semibold text-agility-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-agility-text-muted">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="bg-agility-surface py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-agility-text sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-agility-text-muted">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-agility-text">Free</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold text-agility-text">
                    $0
                  </span>
                  <span className="ml-2 text-agility-text-muted">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Up to 10 invoices/month
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Up to 50 expenses/month
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Basic reports
                </li>
                <li className="flex items-center text-agility-text-muted">
                  <span className="mr-2">✗</span>
                  Receipt scanning
                </li>
                <li className="flex items-center text-agility-text-muted">
                  <span className="mr-2">✗</span>
                  AI Assistant
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 border-2 border-agility-primary relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-agility-mid to-agility-light text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-agility-text">Pro</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-5xl font-bold text-agility-text">
                    $9.99
                  </span>
                  <span className="ml-2 text-agility-text-muted">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Unlimited invoices
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Unlimited expenses
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Advanced reports & analytics
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  AI-powered receipt scanning
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  AI Financial Assistant
                </li>
                <li className="flex items-center text-agility-text">
                  <span className="mr-2 text-agility-success">✓</span>
                  Priority support
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110">
                  Start Free Trial
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light p-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to take control of your finances?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Join thousands of freelancers who trust Agility to manage their
            financial command center.
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-white text-agility-dark hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
