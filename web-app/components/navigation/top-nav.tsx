"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/auth-context";
import { getInitials } from "@/lib/utils/format";

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-agility-surface/95 backdrop-blur-sm border-b border-agility-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light" />
            <span className="text-lg font-bold text-agility-text">
              Agility
            </span>
          </div>
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-agility-text-muted" />
            <input
              type="text"
              placeholder="Search transactions, invoices..."
              className="w-full pl-10 pr-4 py-2 bg-agility-bg border border-agility-border rounded-lg text-sm text-agility-text placeholder:text-agility-text-muted focus:outline-none focus:ring-2 focus:ring-agility-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: Actions + User */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-agility-surface-hover"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-agility-error rounded-full" />
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-agility-border">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-agility-text">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-agility-text-muted">
                {user?.businessName || user?.email}
              </p>
            </div>
            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-agility-mid to-agility-light text-white font-semibold text-sm hover:brightness-110 transition-all">
              {user ? getInitials(user.name) : "U"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
