/**
 * User profile validation schemas
 */

import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  businessName: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  taxYearStart: z.number().min(1).max(12).optional(),
  fiscalYearType: z.enum(["calendar", "custom"]).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
