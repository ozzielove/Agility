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
  Sparkles,
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
      <div className="min-h-screen flex items-center justify-center bg-[#F5FAFF]">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#007C91] border-r-transparent"></div>
          <p className="mt-4 text-[#7A8B96]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render landing page if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5FAFF]">
      {/* Navigation - Sticky with backdrop blur */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00354A] via-[#007C91] to-[#35C4E0] shadow-lg">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="text-xl font-bold text-[#00354A]">Agility</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-[#00354A] hover:text-[#007C91] hover:bg-[#35C4E0]/10 transition-colors">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-[#00354A] via-[#007C91] to-[#35C4E0] text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Gradient Background */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00354A] via-[#007C91] to-[#35C4E0] opacity-5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwNzZhMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mx-auto max-w-4xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#007C91]/10 to-[#35C4E0]/10 border border-[#35C4E0]/30 px-6 py-2 mb-8 backdrop-blur-sm shadow-sm">
              <Sparkles className="h-4 w-4 text-[#007C91]" />
              <span className="text-sm font-semibold text-[#00354A]">Trusted by 10,000+ freelancers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#00354A] mb-6">
              Your Financial{' '}
              <span className="bg-gradient-to-r from-[#00354A] via-[#007C91] to-[#35C4E0] bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-[#7A8B96] max-w-3xl mx-auto leading-relaxed">
              Manage your freelance finances with AI-powered expense tracking, professional invoicing, and real-time
              tax estimates. Spend less time on paperwork, more time doing what you love.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-[#00354A] via-[#007C91] to-[#35C4E0] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-2 border-[#007C91] text-[#007C91] hover:bg-[#007C91] hover:text-white transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust Indicator */}
            <p className="mt-6 text-sm text-[#7A8B96]">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '40+', label: 'Hours saved per year' },
              { value: '95%', label: 'Accuracy rate' },
              { value: '$9.99', label: 'Per month' },
              { value: '4.9/5', label: 'App Store rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group cursor-default">
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#007C91] to-[#35C4E0] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[#7A8B96]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#F5FAFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#00354A] mb-4">
              Everything you need to manage your finances
            </h2>
            <p className="mt-4 text-lg text-[#7A8B96] max-w-2xl mx-auto">
              Built specifically for freelancers, contractors, and self-employed professionals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Background with Gradient */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#007C91]/10 to-[#35C4E0]/10 group-hover:from-[#007C91] group-hover:to-[#35C4E0] transition-all duration-300 mb-6">
                  <feature.icon className="h-7 w-7 text-[#007C91] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-semibold text-[#00354A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#7A8B96] leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007C91] to-[#35C4E0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#00354A] mb-4">
              Loved by freelancers everywhere
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-[#F5FAFF] p-8 shadow-md hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-[#FFC857] fill-[#FFC857]" />
                  ))}
                </div>

                <p className="text-[#00354A] text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#007C91] to-[#35C4E0] text-white font-bold text-lg shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#00354A]">{testimonial.name}</p>
                    <p className="text-sm text-[#7A8B96]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-[#F5FAFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#00354A] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-[#7A8B96]">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#00354A]">Free</h3>
              <p className="mt-2 text-[#7A8B96]">Perfect for getting started</p>

              <div className="mt-8 mb-8">
                <span className="text-5xl font-bold text-[#00354A]">$0</span>
                <span className="text-[#7A8B96]">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {['10 receipts/month', 'Basic invoicing', 'Tax estimate', 'Email support'].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#29CC97] flex-shrink-0 mt-0.5" />
                    <span className="text-[#00354A]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/sign-up" className="block">
                <Button variant="outline" className="w-full border-2 border-[#007C91] text-[#007C91] hover:bg-[#007C91] hover:text-white transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative rounded-2xl border-4 border-transparent bg-gradient-to-br from-[#00354A] via-[#007C91] to-[#35C4E0] p-1 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#007C91] to-[#35C4E0] px-6 py-2 text-sm text-white font-bold shadow-lg">
                Most Popular
              </div>

              <div className="rounded-xl bg-white p-8 h-full">
                <h3 className="text-2xl font-bold text-[#00354A]">Pro</h3>
                <p className="mt-2 text-[#7A8B96]">For serious freelancers</p>

                <div className="mt-8 mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#007C91] to-[#35C4E0] bg-clip-text text-transparent">
                    $9.99
                  </span>
                  <span className="text-[#7A8B96]">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    'Unlimited receipts',
                    'Advanced invoicing',
                    'Real-time tax estimates',
                    'Bank connections',
                    'Priority support',
                    'Export reports',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#29CC97] flex-shrink-0 mt-0.5" />
                      <span className="text-[#00354A]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-up" className="block">
                  <Button className="w-full bg-gradient-to-r from-[#00354A] via-[#007C91] to-[#35C4E0] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Full Gradient */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-[#00354A] via-[#007C91] to-[#35C4E0] p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to take control of your finances?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands of freelancers who have simplified their financial management with Agility.
              </p>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-white text-[#00354A] hover:bg-gray-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg px-10 py-6"
                >
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00354A] via-[#007C91] to-[#35C4E0] shadow-md">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <span className="font-bold text-[#00354A] text-lg">Agility</span>
            </div>

            <div className="flex gap-8 text-sm">
              <Link href="#" className="text-[#7A8B96] hover:text-[#007C91] transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-[#7A8B96] hover:text-[#007C91] transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-[#7A8B96] hover:text-[#007C91] transition-colors">
                Contact
              </Link>
            </div>

            <p className="text-sm text-[#7A8B96]">
              &copy; 2024 Agility. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
