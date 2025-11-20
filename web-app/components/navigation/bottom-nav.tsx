"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, DollarSign, Receipt, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Income", href: "/income", icon: DollarSign },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Insights", href: "/insights", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-agility-surface border-t border-agility-border safe-area-bottom">
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 px-1 transition-colors duration-200",
                isActive
                  ? "text-agility-primary"
                  : "text-agility-text-muted active:text-agility-text"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive && "drop-shadow-[0_0_8px_rgba(53,196,224,0.5)]"
                )}
              />
              <span className="text-[10px] mt-1 font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
