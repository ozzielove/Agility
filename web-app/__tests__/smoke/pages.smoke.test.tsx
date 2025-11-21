/**
 * SMOKE TESTS - Page Rendering
 *
 * Test Strategy: Verify all pages render without throwing errors.
 * These are the most basic tests to ensure the application can start.
 *
 * Expected Behavior: Each page should render without crashing.
 * Risks: Missing dependencies, import errors, runtime exceptions.
 */

import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/lib/context/auth-context';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Recharts to avoid canvas issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  PieChart: ({ children }: { children: React.ReactNode }) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Legend: () => <div data-testid="legend" />,
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
}));

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('Smoke Tests - Page Rendering', () => {
  beforeEach(() => {
    // Reset localStorage mock
    window.localStorage.getItem.mockReturnValue(null);
    window.localStorage.setItem.mockClear();
  });

  describe('Landing Page', () => {
    it('should render without crashing', async () => {
      const LandingPage = (await import('@/app/page')).default;

      const { container } = render(
        <TestWrapper>
          <LandingPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });

    it('should display the Agility brand name', async () => {
      const LandingPage = (await import('@/app/page')).default;

      render(
        <TestWrapper>
          <LandingPage />
        </TestWrapper>
      );

      expect(screen.getAllByText(/Agility/i).length).toBeGreaterThan(0);
    });

    it('should have navigation links', async () => {
      const LandingPage = (await import('@/app/page')).default;

      render(
        <TestWrapper>
          <LandingPage />
        </TestWrapper>
      );

      expect(screen.getAllByText(/Sign In/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Get Started/i).length).toBeGreaterThan(0);
    });
  });

  describe('Login Page', () => {
    it('should render without crashing', async () => {
      const LoginPage = (await import('@/app/(auth)/login/page')).default;

      const { container } = render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });

    it('should display login form elements', async () => {
      const LoginPage = (await import('@/app/(auth)/login/page')).default;

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });
  });

  describe('Signup Page', () => {
    it('should render without crashing', async () => {
      const SignupPage = (await import('@/app/(auth)/signup/page')).default;

      const { container } = render(
        <TestWrapper>
          <SignupPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });

    it('should display signup form elements', async () => {
      const SignupPage = (await import('@/app/(auth)/signup/page')).default;

      render(
        <TestWrapper>
          <SignupPage />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    });
  });

  describe('Dashboard Page', () => {
    const mockAuthData = JSON.stringify({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        subscription: 'pro',
        createdAt: new Date('2024-01-15').toISOString(),
      },
    });

    it('should render without crashing', async () => {
      // Mock authenticated user with proper structure
      window.localStorage.getItem.mockReturnValue(mockAuthData);

      const DashboardPage = (await import('@/app/(app)/dashboard/page')).default;

      const { container } = render(
        <TestWrapper>
          <DashboardPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });

    it('should display dashboard elements', async () => {
      window.localStorage.getItem.mockReturnValue(mockAuthData);

      const DashboardPage = (await import('@/app/(app)/dashboard/page')).default;

      render(
        <TestWrapper>
          <DashboardPage />
        </TestWrapper>
      );

      // Should have key dashboard elements
      expect(screen.getByText(/Scan Receipt/i)).toBeInTheDocument();
    });
  });

  describe('Invoices Page', () => {
    it('should render without crashing', async () => {
      const InvoicesPage = (await import('@/app/(app)/invoices/page')).default;

      const { container } = render(
        <TestWrapper>
          <InvoicesPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });

    it('should display invoices page title', async () => {
      const InvoicesPage = (await import('@/app/(app)/invoices/page')).default;

      render(
        <TestWrapper>
          <InvoicesPage />
        </TestWrapper>
      );

      // Multiple "Invoices" elements may exist (title, nav, stats)
      const invoicesElements = screen.getAllByText(/Invoices/i);
      expect(invoicesElements.length).toBeGreaterThan(0);
    });
  });

  describe('Expenses Page', () => {
    it('should render without crashing', async () => {
      const ExpensesPage = (await import('@/app/(app)/expenses/page')).default;

      const { container } = render(
        <TestWrapper>
          <ExpensesPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('Transactions Page', () => {
    it('should render without crashing', async () => {
      const TransactionsPage = (await import('@/app/(app)/transactions/page')).default;

      const { container } = render(
        <TestWrapper>
          <TransactionsPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('Insights Page', () => {
    it('should render without crashing', async () => {
      const InsightsPage = (await import('@/app/(app)/insights/page')).default;

      const { container } = render(
        <TestWrapper>
          <InsightsPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('Settings Page', () => {
    it('should render without crashing', async () => {
      const SettingsPage = (await import('@/app/(app)/settings/page')).default;

      const { container } = render(
        <TestWrapper>
          <SettingsPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });

    it('should display settings sections', async () => {
      const SettingsPage = (await import('@/app/(app)/settings/page')).default;

      render(
        <TestWrapper>
          <SettingsPage />
        </TestWrapper>
      );

      // Multiple "Settings" elements exist on the page (title, etc.)
      const settingsElements = screen.getAllByText(/Settings/i);
      expect(settingsElements.length).toBeGreaterThan(0);
    });
  });

  describe('Scan Page', () => {
    it('should render without crashing', async () => {
      const ScanPage = (await import('@/app/(app)/scan/page')).default;

      const { container } = render(
        <TestWrapper>
          <ScanPage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('New Invoice Page', () => {
    it('should render without crashing', async () => {
      const NewInvoicePage = (await import('@/app/(app)/invoices/new/page')).default;

      const { container } = render(
        <TestWrapper>
          <NewInvoicePage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe('New Expense Page', () => {
    it('should render without crashing', async () => {
      const NewExpensePage = (await import('@/app/(app)/expenses/new/page')).default;

      const { container } = render(
        <TestWrapper>
          <NewExpensePage />
        </TestWrapper>
      );

      expect(container).toBeInTheDocument();
    });
  });
});
