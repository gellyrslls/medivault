import { useAuth } from "@/context/auth";
import { useBusiness } from "@/context/business";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireBusinessSetup?: boolean;
}

function LoadingState() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    </div>
  );
}

export function ProtectedRoute({
  children,
  requireBusinessSetup = true,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    isBusinessSetup,
    businessProfile,
    isLoading: businessLoading,
  } = useBusiness();
  const location = useLocation();

  // Show loading state while checking authentication
  if (authLoading) {
    return <LoadingState />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Now handle business setup checks
  if (requireBusinessSetup) {
    // Show loading while checking business setup
    if (businessLoading) {
      return <LoadingState />;
    }

    // Redirect to business setup if needed
    if (!isBusinessSetup && location.pathname !== "/business-setup") {
      return <Navigate to="/business-setup" state={{ from: location }} replace />;
    }

    // Redirect to dashboard if business is already set up but user is on setup page
    if (isBusinessSetup && businessProfile && location.pathname === "/business-setup") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
}
