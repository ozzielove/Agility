"use client";

import { useEffect } from "react";
import { initializeAppData } from "@/lib/init/initialize-app";

/**
 * Client component that initializes app data on mount
 * This runs once when the app loads and sets up mock data in localStorage
 */
export function AppInitializer() {
  useEffect(() => {
    initializeAppData();
  }, []);

  return null;
}
