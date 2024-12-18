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
  const { user, isLoading: authLoading } = useAuth();
  const {
    isBusinessSetup,
    businessProfile,
    isLoading: businessLoading,
  } = useBusiness();
  const location = useLocation();

  // Don't check business status until we have a logged-in user
  if (!user && location.pathname !== "/login" && location.pathname !== "/register") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authLoading) {
    return <LoadingState />;
  }

  // Only check business setup if we have a logged-in user
  if (user) {
    if (businessLoading) {
      return <LoadingState />;
    }

    if (
      requireBusinessSetup &&
      !isBusinessSetup &&
      location.pathname !== "/business-setup"
    ) {
      return <Navigate to="/business-setup" state={{ from: location }} replace />;
    }

    if (
      location.pathname === "/business-setup" &&
      isBusinessSetup &&
      businessProfile
    ) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
