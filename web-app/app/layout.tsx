import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/context/auth-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agility - Financial Command Center for Freelancers',
  description: 'Manage your freelance finances with AI-powered expense tracking, invoicing, and tax estimation.',
  keywords: ['freelance', 'finance', 'invoicing', 'expense tracking', 'tax estimation'],
  authors: [{ name: 'Agility' }],
  openGraph: {
    title: 'Agility - Financial Command Center for Freelancers',
    description: 'Manage your freelance finances with AI-powered expense tracking, invoicing, and tax estimation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
