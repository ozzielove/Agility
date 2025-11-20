"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/context/auth-context";
import { getInitials } from "@/lib/utils/format";
import {
  User,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  Upload,
  Check,
  Smartphone,
  Mail,
  Globe,
  Lock,
  Trash2,
  Crown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    invoicePayments: { email: true, push: true, inApp: true },
    expenseReminders: { email: true, push: false, inApp: true },
    taxDeadlines: { email: true, push: true, inApp: true },
    weeklySummaries: { email: true, push: false, inApp: false },
    aiInsights: { email: false, push: false, inApp: true },
    securityAlerts: { email: true, push: true, inApp: true },
  });

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    businessName: "",
    phone: "",
    country: "United States",
    currency: "USD",
    taxYearMonth: "January",
  });

  const handleSaveProfile = () => {
    alert("Profile updated successfully! (Demo mode)");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-agility-text">Settings</h1>
        <p className="mt-2 text-agility-text-muted">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="help">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Profile */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-agility-text mb-6">
              Profile Information
            </h3>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-xs text-agility-text-muted mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Form */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Optional"
                    value={profile.businessName}
                    onChange={(e) =>
                      setProfile({ ...profile, businessName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Optional"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <h4 className="font-semibold text-agility-text mb-4">
                Business Settings
              </h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                    value={profile.country}
                    onChange={(e) =>
                      setProfile({ ...profile, country: e.target.value })
                    }
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                    value={profile.currency}
                    onChange={(e) =>
                      setProfile({ ...profile, currency: e.target.value })
                    }
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CAD</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxYear">Tax Year Start</Label>
                  <select
                    id="taxYear"
                    className="flex h-10 w-full rounded-md border border-agility-border bg-agility-surface px-3 py-2 text-sm text-agility-text focus:outline-none focus:ring-2 focus:ring-agility-primary"
                    value={profile.taxYearMonth}
                    onChange={(e) =>
                      setProfile({ ...profile, taxYearMonth: e.target.value })
                    }
                  >
                    <option>January</option>
                    <option>April</option>
                    <option>July</option>
                    <option>October</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 2: Subscription & Billing */}
        <TabsContent value="subscription" className="space-y-6">
          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-agility-text">
                    Current Plan
                  </h3>
                  <Badge>FREE</Badge>
                </div>
                <p className="text-sm text-agility-text-muted">
                  Upgrade to Pro for unlimited invoices and AI features
                </p>
              </div>
              <Button className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <div className="p-6 border-2 border-agility-border rounded-lg">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-agility-text">Free</h4>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-bold text-agility-text">
                      $0
                    </span>
                    <span className="text-agility-text-muted">/month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">10 invoices/month</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">50 expenses/month</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">Basic reports</span>
                  </li>
                </ul>
                <Badge className="mt-4 bg-agility-success/20 text-agility-success">
                  Current Plan
                </Badge>
              </div>

              {/* Pro Plan */}
              <div className="p-6 border-2 border-agility-primary rounded-lg bg-gradient-to-br from-agility-dark/5 to-agility-light/5 relative">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-agility-mid to-agility-light text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-agility-text">Pro</h4>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-bold text-agility-text">
                      $9.99
                    </span>
                    <span className="text-agility-text-muted">/month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">Unlimited invoices</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">Unlimited expenses</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">AI receipt scanning</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">AI financial assistant</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-agility-success" />
                    <span className="text-agility-text">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 3: Security & Privacy */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-agility-text mb-6">
              Security Settings
            </h3>

            <div className="space-y-6">
              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-agility-text">Password</p>
                    <p className="text-sm text-agility-text-muted">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>

              <Separator />

              {/* Two-Factor Auth */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-agility-text">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-agility-text-muted">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              {/* Active Sessions */}
              <div>
                <h4 className="font-medium text-agility-text mb-4">
                  Active Sessions
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start justify-between p-4 bg-agility-surface-hover rounded-lg">
                    <div className="flex gap-3">
                      <Smartphone className="h-5 w-5 text-agility-text-muted mt-1" />
                      <div>
                        <p className="font-medium text-agility-text">
                          MacBook Pro - Chrome
                        </p>
                        <p className="text-sm text-agility-text-muted">
                          San Francisco, CA • Active now
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-agility-success/20 text-agility-success">
                      Current
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Data & Privacy */}
              <div>
                <h4 className="font-medium text-agility-text mb-4">
                  Data & Privacy
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Export My Data</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Download Account Report</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Danger Zone */}
              <div className="p-4 border-2 border-agility-error rounded-lg bg-agility-error/5">
                <h4 className="font-medium text-agility-error mb-2">
                  Danger Zone
                </h4>
                <p className="text-sm text-agility-text-muted mb-4">
                  Once you delete your account, there is no going back.
                </p>
                <Button variant="outline" className="border-agility-error text-agility-error hover:bg-agility-error/10">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 4: Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-agility-text mb-6">
              Notification Preferences
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-agility-border">
                    <th className="text-left py-3 text-sm font-semibold text-agility-text">
                      Category
                    </th>
                    <th className="text-center py-3 text-sm font-semibold text-agility-text">
                      Email
                    </th>
                    <th className="text-center py-3 text-sm font-semibold text-agility-text">
                      Push
                    </th>
                    <th className="text-center py-3 text-sm font-semibold text-agility-text">
                      In-App
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(notifications).map(([key, values]) => (
                    <tr key={key} className="border-b border-agility-border/50">
                      <td className="py-4 text-agility-text">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </td>
                      <td className="py-4 text-center">
                        <Switch
                          checked={values.email}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              [key]: { ...values, email: checked },
                            })
                          }
                        />
                      </td>
                      <td className="py-4 text-center">
                        <Switch
                          checked={values.push}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              [key]: { ...values, push: checked },
                            })
                          }
                        />
                      </td>
                      <td className="py-4 text-center">
                        <Switch
                          checked={values.inApp}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              [key]: { ...values, inApp: checked },
                            })
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-6">
              <Button className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110">
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 5: Help & Support */}
        <TabsContent value="help" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-agility-text mb-6">
              Help & Support
            </h3>

            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search help articles..."
                className="max-w-md"
              />
            </div>

            {/* Common Questions */}
            <div className="space-y-3 mb-8">
              <h4 className="font-medium text-agility-text mb-4">
                Common Questions
              </h4>
              {[
                "How do I create an invoice?",
                "How are taxes calculated?",
                "Can I export my data?",
                "How do I scan receipts?",
                "What's included in the free plan?",
              ].map((question, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-4 text-left bg-agility-surface-hover rounded-lg hover:bg-agility-border/50 transition-colors"
                >
                  <span className="text-agility-text">{question}</span>
                  <ChevronRight className="h-5 w-5 text-agility-text-muted" />
                </button>
              ))}
            </div>

            <Separator />

            {/* Support Options */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Button variant="outline" className="h-auto py-4 justify-start">
                <Mail className="h-5 w-5 mr-3 text-agility-primary" />
                <div className="text-left">
                  <p className="font-semibold">Contact Support</p>
                  <p className="text-xs text-agility-text-muted">
                    Get help via email
                  </p>
                </div>
              </Button>
              <Button variant="outline" className="h-auto py-4 justify-start">
                <Globe className="h-5 w-5 mr-3 text-agility-primary" />
                <div className="text-left">
                  <p className="font-semibold">Documentation</p>
                  <p className="text-xs text-agility-text-muted">
                    Browse our guides
                  </p>
                </div>
              </Button>
            </div>

            <Separator className="my-6" />

            {/* About */}
            <div className="text-sm text-agility-text-muted">
              <p className="mb-2">App Version: v1.0.0</p>
              <div className="flex gap-4">
                <a href="#" className="text-agility-primary hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-agility-primary hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
