import { useAuth } from "@/context/auth";
import { useBusiness } from "@/context/business";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireBusinessSetup?: boolean;
}

export function ProtectedRoute({
  children,
  requireBusinessSetup = true,
}: ProtectedRouteProps) {
  const { user, isLoading: authLoading } = useAuth();
  const { isBusinessSetup, isLoading: businessLoading } = useBusiness();
  const location = useLocation();

  // Show loading state while checking auth or business status
  if (authLoading || businessLoading) {
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

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle business setup requirement
  if (
    requireBusinessSetup &&
    !isBusinessSetup &&
    location.pathname !== "/business-setup"
  ) {
    return <Navigate to="/business-setup" state={{ from: location }} replace />;
  }

  // Redirect to dashboard if trying to access business setup when already set up
  if (isBusinessSetup && location.pathname === "/business-setup") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
