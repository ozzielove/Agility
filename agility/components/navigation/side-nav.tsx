"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, DollarSign, Receipt, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Income", href: "/income", icon: DollarSign },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Insights", href: "/insights", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-agility-surface border-r border-agility-border">
        <div className="flex items-center flex-shrink-0 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light" />
            <span className="text-xl font-bold text-agility-text">
              Agility
            </span>
          </div>
        </div>
        <nav className="mt-8 flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-agility-primary/10 to-agility-light/10 text-agility-primary border border-agility-primary/20"
                    : "text-agility-text-muted hover:bg-agility-surface-hover hover:text-agility-text"
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    isActive ? "text-agility-primary" : "text-agility-text-muted group-hover:text-agility-text"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex-shrink-0 p-4 border-t border-agility-border">
          <div className="text-xs text-agility-text-muted">
            <p>Agility Financial v1.0</p>
            <p className="mt-1">Build with mock data</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
