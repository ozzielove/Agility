"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { MainShell } from "@/components/navigation/main-shell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agility-bg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light animate-pulse" />
          <p className="mt-4 text-agility-text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <MainShell>{children}</MainShell>;
}
