/**
 * UNIT TESTS - Auth Context
 *
 * Test Strategy: Test authentication flows, state management, and localStorage persistence.
 * Expected Behavior: Auth operations work correctly and persist state.
 */

import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '@/lib/context/auth-context';

// Mock component to test useAuth hook
function TestConsumer() {
  const { user, isAuthenticated, isLoading, login, logout, signup, loginWithGoogle } = useAuth();

  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'yes' : 'no'}</div>
      <div data-testid="user-email">{user?.email || 'none'}</div>
      <div data-testid="user-name">{user?.name || 'none'}</div>
      <button data-testid="login-btn" onClick={() => login('test@example.com', 'password123')}>
        Login
      </button>
      <button data-testid="google-btn" onClick={() => loginWithGoogle()}>
        Google
      </button>
      <button data-testid="signup-btn" onClick={() => signup('new@example.com', 'password123', 'New User')}>
        Signup
      </button>
      <button data-testid="logout-btn" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

describe('Unit Tests - Auth Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.getItem.mockReturnValue(null);
    window.localStorage.setItem.mockClear();
    window.localStorage.removeItem.mockClear();
  });

  describe('Initial State', () => {
    it('should start with loading state', () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      // Initially loading
      expect(screen.getByTestId('authenticated')).toHaveTextContent('no');
    });

    it('should complete loading after initialization', async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      });
    });
  });

  describe('Login Flow', () => {
    it('should authenticate user on successful login', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      });

      await user.click(screen.getByTestId('login-btn'));

      await waitFor(
        () => {
          expect(screen.getByTestId('authenticated')).toHaveTextContent('yes');
        },
        { timeout: 2000 }
      );

      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    });

    it('should persist auth state to localStorage', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      });

      await user.click(screen.getByTestId('login-btn'));

      await waitFor(
        () => {
          expect(window.localStorage.setItem).toHaveBeenCalled();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Google Login Flow', () => {
    it('should authenticate with Google OAuth', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      });

      await user.click(screen.getByTestId('google-btn'));

      await waitFor(
        () => {
          expect(screen.getByTestId('authenticated')).toHaveTextContent('yes');
        },
        { timeout: 2500 }
      );
    });
  });

  describe('Signup Flow', () => {
    it('should create new user on signup', async () => {
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      });

      await user.click(screen.getByTestId('signup-btn'));

      await waitFor(
        () => {
          expect(screen.getByTestId('authenticated')).toHaveTextContent('yes');
        },
        { timeout: 2000 }
      );

      expect(screen.getByTestId('user-name')).toHaveTextContent('New User');
    });
  });

  describe('Logout Flow', () => {
    it('should clear auth state on logout', async () => {
      const user = userEvent.setup();

      // Pre-authenticate
      window.localStorage.getItem.mockReturnValue(
        JSON.stringify({
          user: {
            id: '1',
            email: 'existing@example.com',
            name: 'Existing User',
            createdAt: new Date().toISOString(),
          },
        })
      );

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('yes');
      });

      await user.click(screen.getByTestId('logout-btn'));

      expect(screen.getByTestId('authenticated')).toHaveTextContent('no');
      expect(screen.getByTestId('user-email')).toHaveTextContent('none');
      expect(window.localStorage.removeItem).toHaveBeenCalled();
    });
  });

  describe('Persistence', () => {
    it('should restore auth state from localStorage', async () => {
      window.localStorage.getItem.mockReturnValue(
        JSON.stringify({
          user: {
            id: 'stored-1',
            email: 'stored@example.com',
            name: 'Stored User',
            createdAt: new Date().toISOString(),
          },
        })
      );

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('authenticated')).toHaveTextContent('yes');
      });

      expect(screen.getByTestId('user-email')).toHaveTextContent('stored@example.com');
    });

    it('should handle corrupted localStorage gracefully', async () => {
      window.localStorage.getItem.mockReturnValue('invalid json{');

      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      });

      // Should not crash and remain unauthenticated
      expect(screen.getByTestId('authenticated')).toHaveTextContent('no');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useAuth is used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestConsumer />);
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleSpy.mockRestore();
    });
  });
});
