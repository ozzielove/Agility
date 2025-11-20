"use client";

import { useState } from "react";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { BottomNav } from "./bottom-nav";

interface MainShellProps {
  children: React.ReactNode;
}

export function MainShell({ children }: MainShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-agility-bg">
      {/* Desktop Sidebar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1">
        <TopNav onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        {/* Page Content */}
        <main className="flex-1 pb-20 md:pb-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Mobile Menu Overlay (future enhancement) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
