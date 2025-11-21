'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Receipt,
  FileText,
  Camera,
  PieChart,
  Settings,
  LogOut,
  ChevronLeft,
  Wallet,
} from 'lucide-react';
import { useAuth } from '@/lib/context/auth-context';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Invoices', href: '/invoices', icon: FileText, badge: 2 },
  { label: 'Expenses', href: '/expenses', icon: Wallet },
  { label: 'Insights', href: '/insights', icon: PieChart },
];

const bottomNavItems: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <span className="text-xl font-bold text-white">A</span>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-[var(--text-primary)]">Agility</span>
          )}
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]"
          >
            <ChevronLeft className={cn('h-5 w-5 transition-transform', isCollapsed && 'rotate-180')} />
          </button>
        )}
      </div>

      {/* Scan Button */}
      <div className="p-4">
        <Link
          href="/scan"
          className={cn(
            'flex items-center justify-center gap-2 rounded-xl gradient-primary py-3 text-white shadow-md hover:shadow-lg transition-all',
            isCollapsed ? 'px-3' : 'px-4'
          )}
        >
          <Camera className="h-5 w-5" />
          {!isCollapsed && <span className="font-semibold">Scan Receipt</span>}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-[var(--primary-mid)]/10 text-[var(--primary-mid)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]',
                isCollapsed && 'justify-center px-3'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-[var(--primary-mid)]')} />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary-mid)] px-1.5 text-xs font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-[var(--border)] px-3 py-2">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-[var(--primary-mid)]/10 text-[var(--primary-mid)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]',
                isCollapsed && 'justify-center px-3'
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="border-t border-[var(--border)] p-4">
        <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-mid)]/20 text-[var(--primary-mid)]">
            <span className="text-sm font-semibold">
              {user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-[var(--text-secondary)]">
                {user?.subscription === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={logout}
              className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--error)]/10 hover:text-[var(--error)]"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
