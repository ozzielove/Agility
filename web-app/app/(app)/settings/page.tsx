'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/context/auth-context';
import {
  User,
  Building2,
  CreditCard,
  DollarSign,
  Receipt,
  Bell,
  Shield,
  Fingerprint,
  Lock,
  Smartphone,
  HelpCircle,
  Mail,
  Star,
  FileText,
  ChevronRight,
  Check,
  Building,
  Download,
  Upload,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';

interface SettingsItemProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  value?: string;
  action?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

function SettingsItem({ icon: Icon, title, description, value, action, onClick, danger }: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--surface-elevated)] transition-colors ${
        danger ? 'text-[var(--error)]' : ''
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          danger ? 'bg-[var(--error)]/10' : 'bg-[var(--primary-mid)]/10'
        }`}
      >
        <Icon className={`h-5 w-5 ${danger ? 'text-[var(--error)]' : 'text-[var(--primary-mid)]'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${danger ? 'text-[var(--error)]' : 'text-[var(--text-primary)]'}`}>{title}</p>
        {description && <p className="text-sm text-[var(--text-secondary)] truncate">{description}</p>}
      </div>
      {value && <span className="text-sm text-[var(--text-secondary)]">{value}</span>}
      {action || <ChevronRight className="h-5 w-5 text-[var(--text-muted)]" />}
    </button>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{title}</h3>
      <Card>
        <CardContent className="p-0 divide-y divide-[var(--border)]">{children}</CardContent>
      </Card>
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!enabled);
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[var(--primary-mid)]' : 'bg-[var(--border)]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    invoiceReminders: true,
    taxDeadlines: true,
    weeklyReports: false,
    unusualActivity: true,
  });
  const [appearance, setAppearance] = useState<'light' | 'dark' | 'system'>('system');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Settings</h1>
        <p className="mt-1 text-[var(--text-secondary)]">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden">
        <div className="gradient-primary p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-white text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">{user?.name || 'User Name'}</h2>
              <p className="text-white/80">{user?.email || 'user@example.com'}</p>
              <span className="mt-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-sm">
                {user?.subscription === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </span>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <Button variant="outline" className="w-full">
            <User className="h-4 w-4" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Account Section */}
          <SettingsSection title="Account">
            <SettingsItem icon={User} title="Profile" description="Name, email, photo" />
            <SettingsItem icon={Building2} title="Business Details" description="Business name, address, tax ID" />
            <SettingsItem
              icon={CreditCard}
              title="Subscription"
              description={user?.subscription === 'pro' ? 'Pro Plan - $9.99/month' : 'Free Plan'}
              action={
                user?.subscription !== 'pro' ? (
                  <Button size="sm" onClick={(e) => e.stopPropagation()}>
                    Upgrade
                  </Button>
                ) : undefined
              }
            />
          </SettingsSection>

          {/* Preferences Section */}
          <SettingsSection title="Preferences">
            <SettingsItem icon={DollarSign} title="Currency" value="USD ($)" />
            <SettingsItem icon={Receipt} title="Tax Settings" description="Tax rate, fiscal year" value="25%" />
            <SettingsItem icon={Building} title="Categories" description="Manage expense categories" />
          </SettingsSection>

          {/* Appearance Section */}
          <SettingsSection title="Appearance">
            <div className="p-4 space-y-4">
              <p className="font-medium text-[var(--text-primary)]">Theme</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'light', icon: Sun, label: 'Light' },
                  { value: 'dark', icon: Moon, label: 'Dark' },
                  { value: 'system', icon: Monitor, label: 'System' },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setAppearance(theme.value as typeof appearance)}
                    className={`flex flex-col items-center gap-2 rounded-xl p-4 border-2 transition-colors ${
                      appearance === theme.value
                        ? 'border-[var(--primary-mid)] bg-[var(--primary-mid)]/5'
                        : 'border-[var(--border)] hover:border-[var(--primary-mid)]/50'
                    }`}
                  >
                    <theme.icon
                      className={`h-6 w-6 ${
                        appearance === theme.value ? 'text-[var(--primary-mid)]' : 'text-[var(--text-secondary)]'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        appearance === theme.value ? 'text-[var(--primary-mid)] font-medium' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </SettingsSection>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications Section */}
          <SettingsSection title="Notifications">
            <SettingsItem
              icon={Bell}
              title="Invoice Reminders"
              description="Get notified about overdue invoices"
              action={
                <Toggle
                  enabled={notifications.invoiceReminders}
                  onChange={(v) => setNotifications({ ...notifications, invoiceReminders: v })}
                />
              }
            />
            <SettingsItem
              icon={Receipt}
              title="Tax Deadlines"
              description="Quarterly tax payment reminders"
              action={
                <Toggle
                  enabled={notifications.taxDeadlines}
                  onChange={(v) => setNotifications({ ...notifications, taxDeadlines: v })}
                />
              }
            />
            <SettingsItem
              icon={FileText}
              title="Weekly Reports"
              description="Weekly financial summary emails"
              action={
                <Toggle
                  enabled={notifications.weeklyReports}
                  onChange={(v) => setNotifications({ ...notifications, weeklyReports: v })}
                />
              }
            />
            <SettingsItem
              icon={Shield}
              title="Unusual Activity"
              description="Alerts for suspicious transactions"
              action={
                <Toggle
                  enabled={notifications.unusualActivity}
                  onChange={(v) => setNotifications({ ...notifications, unusualActivity: v })}
                />
              }
            />
          </SettingsSection>

          {/* Security Section */}
          <SettingsSection title="Security">
            <SettingsItem
              icon={Fingerprint}
              title="Biometric Login"
              description="Use Face ID or Touch ID"
              action={<Toggle enabled={biometricEnabled} onChange={setBiometricEnabled} />}
            />
            <SettingsItem icon={Lock} title="Change Password" description="Update your password" />
            <SettingsItem
              icon={Smartphone}
              title="Two-Factor Authentication"
              description={twoFactorEnabled ? 'Enabled' : 'Add extra security'}
              action={<Toggle enabled={twoFactorEnabled} onChange={setTwoFactorEnabled} />}
            />
          </SettingsSection>

          {/* Data Section */}
          <SettingsSection title="Data">
            <SettingsItem icon={Building} title="Connected Banks" description="Manage bank connections" value="2 banks" />
            <SettingsItem icon={Download} title="Export Data" description="Download your data as CSV" />
            <SettingsItem icon={Upload} title="Import Data" description="Import from other apps" />
          </SettingsSection>
        </div>
      </div>

      {/* Support Section */}
      <SettingsSection title="Support">
        <SettingsItem icon={HelpCircle} title="Help Center" description="FAQs and guides" />
        <SettingsItem icon={Mail} title="Contact Support" description="Get help from our team" />
        <SettingsItem icon={Star} title="Rate Agility" description="Love the app? Leave a review!" />
        <SettingsItem icon={FileText} title="Terms & Privacy" description="Legal documents" />
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection title="Account Actions">
        <SettingsItem icon={LogOut} title="Sign Out" description="Sign out of your account" onClick={handleLogout} />
        <SettingsItem icon={Trash2} title="Delete Account" description="Permanently delete your account and data" danger />
      </SettingsSection>

      {/* App Version */}
      <div className="text-center text-sm text-[var(--text-muted)]">
        <p>Agility v1.0.0</p>
        <p className="mt-1">Made with ❤️ for freelancers</p>
      </div>
    </div>
  );
}
