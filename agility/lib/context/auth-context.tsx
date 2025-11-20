"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem, removeItem, STORAGE_KEYS } from "../storage/local-storage";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.Node }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = getItem<AuthUser>(STORAGE_KEYS.USER);
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock authentication - accept any credentials
    const mockUser: AuthUser = {
      id: "user-1",
      email,
      name: email.split("@")[0],
      businessName: undefined,
      avatar: undefined,
    };

    setUser(mockUser);
    setItem(STORAGE_KEYS.USER, mockUser);
    setItem(STORAGE_KEYS.AUTH_TOKEN, "mock-jwt-token");
  };

  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create new mock user
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      businessName: undefined,
      avatar: undefined,
    };

    setUser(newUser);
    setItem(STORAGE_KEYS.USER, newUser);
    setItem(STORAGE_KEYS.AUTH_TOKEN, "mock-jwt-token");
  };

  const signOut = () => {
    setUser(null);
    removeItem(STORAGE_KEYS.USER);
    removeItem(STORAGE_KEYS.AUTH_TOKEN);
    removeItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setItem(STORAGE_KEYS.USER, updatedUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
