/**
 * Authentication form validation schemas
 */

import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const onboardingProfileSchema = z.object({
  businessName: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  currency: z.string().min(1, "Please select a currency"),
  taxYearStart: z.number().min(1).max(12).optional(),
  fiscalYearType: z.enum(["calendar", "custom"]).default("calendar"),
});

export const onboardingIncomeSourcesSchema = z.object({
  sources: z.array(z.string()).min(1, "Select at least one income source"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type OnboardingProfileData = z.infer<typeof onboardingProfileSchema>;
export type OnboardingIncomeSourcesData = z.infer<typeof onboardingIncomeSourcesSchema>;
