/**
 * Mock category data generator
 */

import type { Category } from "../types/expense";

export function generateDefaultCategories(userId: string): Category[] {
  return [
    {
      id: "cat-1",
      userId,
      name: "Travel",
      color: "#35C4E0",
      icon: "Plane",
      isDefault: true,
    },
    {
      id: "cat-2",
      userId,
      name: "Meals & Entertainment",
      color: "#29CC97",
      icon: "Utensils",
      isDefault: true,
    },
    {
      id: "cat-3",
      userId,
      name: "Software & Tools",
      color: "#007C91",
      icon: "Code",
      isDefault: true,
    },
    {
      id: "cat-4",
      userId,
      name: "Equipment",
      color: "#FFC857",
      icon: "Monitor",
      isDefault: true,
    },
    {
      id: "cat-5",
      userId,
      name: "Marketing & Advertising",
      color: "#FF5171",
      icon: "Megaphone",
      isDefault: true,
    },
    {
      id: "cat-6",
      userId,
      name: "Office Supplies",
      color: "#A3B7C5",
      icon: "Package",
      isDefault: true,
    },
    {
      id: "cat-7",
      userId,
      name: "Professional Services",
      color: "#00354A",
      icon: "Briefcase",
      isDefault: true,
    },
    {
      id: "cat-8",
      userId,
      name: "Education & Training",
      color: "#8B5CF6",
      icon: "GraduationCap",
      isDefault: true,
    },
    {
      id: "cat-9",
      userId,
      name: "Internet & Phone",
      color: "#10B981",
      icon: "Wifi",
      isDefault: true,
    },
    {
      id: "cat-10",
      userId,
      name: "Subscriptions",
      color: "#F59E0B",
      icon: "CreditCard",
      isDefault: true,
    },
  ];
}
