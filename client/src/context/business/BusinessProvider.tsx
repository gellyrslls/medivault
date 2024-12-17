import React from "react";
import { useBusinessSetupStatus } from "@/hooks/useBusinessProfile";
import { BusinessContext } from "./BusinessContext";

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const { data: setupStatus, isLoading, error } = useBusinessSetupStatus();

  const value = {
    isBusinessSetup: setupStatus?.isSetup ?? false,
    businessProfile: setupStatus?.profile ?? null,
    isLoading,
    error: error as Error | null,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}
