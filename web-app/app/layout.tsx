import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/auth-context";
import { AppInitializer } from "@/components/app-initializer";

export const metadata: Metadata = {
  title: "Agility - Financial Command Center for Freelancers",
  description: "Track income, manage expenses, stay tax-ready with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <AppInitializer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
