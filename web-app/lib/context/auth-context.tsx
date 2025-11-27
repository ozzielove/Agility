'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserSettings } from '@/lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  settings: UserSettings;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
}

const defaultSettings: UserSettings = {
  currency: 'USD',
  taxRate: 0.25,
  fiscalYearStart: 'january',
  defaultCategory: 'other',
  notifications: {
    invoiceReminders: true,
    taxDeadlines: true,
    weeklyReports: true,
    unusualActivity: true,
  },
  appearance: 'system',
};

const mockUser: User = {
  id: 'user-1',
  email: 'demo@agility.app',
  name: 'Alex Johnson',
  businessName: 'Alex Johnson Consulting',
  avatar: undefined,
  subscription: 'pro',
  createdAt: new Date('2024-01-15'),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'agility_auth';
const SETTINGS_STORAGE_KEY = 'agility_settings';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    settings: defaultSettings,
  });

  // Load auth state from localStorage
  useEffect(() => {
    const loadAuth = () => {
      try {
        const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          setState((prev) => ({
            ...prev,
            user: { ...parsed.user, createdAt: new Date(parsed.user.createdAt) },
            isAuthenticated: true,
            isLoading: false,
            settings: savedSettings ? JSON.parse(savedSettings) : defaultSettings,
          }));
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadAuth();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation - accept any email/password for demo
    if (email && password.length >= 6) {
      const user: User = {
        ...mockUser,
        email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));

      setState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
      }));

      return true;
    }

    return false;
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: mockUser }));

    setState((prev) => ({
      ...prev,
      user: mockUser,
      isAuthenticated: true,
    }));

    return true;
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string): Promise<boolean> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email && password.length >= 6 && name) {
        const user: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          subscription: 'free',
          createdAt: new Date(),
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));

        setState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
        }));

        return true;
      }

      return false;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      settings: defaultSettings,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedUser = { ...prev.user, ...updates };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: updatedUser }));
      return { ...prev, user: updatedUser };
    });
  }, []);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setState((prev) => {
      const updatedSettings = { ...prev.settings, ...updates };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
      return { ...prev, settings: updatedSettings };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateUser,
        updateSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
