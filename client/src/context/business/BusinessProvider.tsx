import React from "react";
import { useBusinessSetupStatus } from "@/hooks/useBusinessProfile";
import { BusinessContext } from "./BusinessContext";
import { useAuth } from "@/context/auth";

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  // Only fetch business status if user is authenticated
  const { data: setupStatus, isLoading, error } = useBusinessSetupStatus({
    enabled: isAuthenticated // Only run query if authenticated
  });

  const value = {
    isBusinessSetup: setupStatus?.isSetup ?? false,
    businessProfile: setupStatus?.profile ?? null,
    isLoading: isAuthenticated && isLoading, // Only show loading if authenticated
    error: isAuthenticated ? (error as Error | null) : null,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}
