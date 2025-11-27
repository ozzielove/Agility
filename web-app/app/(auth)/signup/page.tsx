'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/context/auth-context';
import { Mail, Lock, Eye, EyeOff, User, Building2, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(formData.email, formData.password, formData.name);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        router.push('/dashboard');
      }
    } catch {
      setError('An error occurred with Google signup.');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    'AI-powered receipt scanning',
    'Professional invoice templates',
    'Real-time tax estimates',
    'Bank account connections',
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-bold text-[var(--text-primary)]">Agility</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Create your account</h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl bg-[var(--error)]/10 p-4 text-sm text-[var(--error)]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              icon={<User className="h-5 w-5" />}
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={<Mail className="h-5 w-5" />}
              required
            />
            <Input
              type="text"
              placeholder="Business name (optional)"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              icon={<Building2 className="h-5 w-5" />}
            />
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (6+ characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                icon={<Lock className="h-5 w-5" />}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--primary-mid)] focus:ring-[var(--primary-mid)]"
              />
              <span className="text-sm text-[var(--text-secondary)]">
                I agree to the{' '}
                <Link href="#" className="text-[var(--primary-mid)] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-[var(--primary-mid)] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[var(--background)] px-4 text-[var(--text-muted)]">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Signup */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-[var(--primary-mid)] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className="hidden lg:flex lg:flex-1 gradient-primary items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold">Start managing your finances like a pro</h2>
          <p className="mt-4 text-lg text-white/80">
            Join thousands of freelancers who have simplified their financial management.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-[var(--success)]" />
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl bg-white/10 p-6">
            <p className="text-white/90 italic">
              "Agility changed the way I manage my freelance business. I save hours every week!"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                S
              </div>
              <div>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-white/70">Freelance Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
