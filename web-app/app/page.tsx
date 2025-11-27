'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth-context';
import {
  Receipt,
  FileText,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Receipt,
    title: 'Smart Receipt Scanning',
    description: 'Snap a photo and let AI extract merchant, amount, and category automatically.',
  },
  {
    icon: FileText,
    title: 'Professional Invoicing',
    description: 'Create and send beautiful invoices in seconds. Track payments effortlessly.',
  },
  {
    icon: TrendingUp,
    title: 'Tax Estimation',
    description: "Real-time quarterly tax estimates so you're never caught off guard.",
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your financial data is encrypted and protected with enterprise-grade security.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Freelance Designer',
    quote: 'Agility saved me 10+ hours a month on bookkeeping. The receipt scanner is magic!',
    avatar: 'S',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Independent Consultant',
    quote: "Finally, an app that understands freelancer finances. Tax season is no longer stressful.",
    avatar: 'M',
  },
  {
    name: 'Nina Patel',
    role: 'Content Creator',
    quote: 'The invoicing feature helped me get paid faster. My clients love the professional look.',
    avatar: 'N',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--primary-mid)] border-r-transparent"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render landing page if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]">
        <div className="container-app flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)]">Agility</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container-app text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-mid)]/10 px-4 py-2 text-sm text-[var(--primary-mid)] mb-6">
              <Star className="h-4 w-4" />
              <span>Trusted by 10,000+ freelancers</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Your Financial{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-mid)] to-[var(--primary-light)]">
                Command Center
              </span>
            </h1>
            <p className="mt-6 text-lg text-[var(--text-secondary)] sm:text-xl">
              Manage your freelance finances with AI-powered expense tracking, professional invoicing, and real-time
              tax estimates. Spend less time on paperwork, more time doing what you love.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Sign In
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container-app">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '40+', label: 'Hours saved per year' },
              { value: '95%', label: 'Accuracy rate' },
              { value: '$9.99', label: 'Per month' },
              { value: '4.9/5', label: 'App Store rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[var(--primary-mid)] sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Everything you need to manage your finances
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Built specifically for freelancers, contractors, and self-employed professionals
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:shadow-[var(--shadow-lg)] transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-mid)]/10">
                  <feature.icon className="h-6 w-6 text-[var(--primary-mid)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                <p className="mt-2 text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Loved by freelancers everywhere
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <div className="flex items-center gap-1 text-[var(--warning)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-[var(--text-primary)]">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-mid)] text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">Start free, upgrade when you're ready</p>
          </div>
          <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Free</h3>
              <p className="mt-2 text-[var(--text-secondary)]">Perfect for getting started</p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-[var(--text-primary)]">$0</span>
                <span className="text-[var(--text-muted)]">/month</span>
              </p>
              <ul className="mt-8 space-y-4">
                {['10 receipts/month', 'Basic invoicing', 'Tax estimate', 'Email support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block mt-8">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
            {/* Pro Plan */}
            <div className="rounded-2xl border-2 border-[var(--primary-mid)] bg-[var(--background)] p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary-mid)] px-4 py-1 text-sm text-white font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Pro</h3>
              <p className="mt-2 text-[var(--text-secondary)]">For serious freelancers</p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-[var(--text-primary)]">$9.99</span>
                <span className="text-[var(--text-muted)]">/month</span>
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Unlimited receipts',
                  'Advanced invoicing',
                  'Real-time tax estimates',
                  'Bank connections',
                  'Priority support',
                  'Export reports',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <CheckCircle className="h-5 w-5 text-[var(--success)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block mt-8">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[var(--surface)]">
        <div className="container-app">
          <div className="rounded-3xl gradient-primary p-12 text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to take control of your finances?</h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of freelancers who have simplified their financial management with Agility.
            </p>
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="mt-8 bg-white text-[var(--primary-dark)] hover:bg-white/90">
                Start Your Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 px-4">
        <div className="container-app">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="font-semibold text-[var(--text-primary)]">Agility</span>
            </div>
            <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
              <Link href="#" className="hover:text-[var(--text-primary)]">
                Privacy
              </Link>
              <Link href="#" className="hover:text-[var(--text-primary)]">
                Terms
              </Link>
              <Link href="#" className="hover:text-[var(--text-primary)]">
                Contact
              </Link>
            </div>
            <p className="text-sm text-[var(--text-muted)]">&copy; 2024 Agility. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
