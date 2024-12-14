import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Using dynamic imports with type annotations for proper lazy loading
const Layout = lazy(() =>
  import("@/components/layout/Layout").then((mod) => ({
    default: mod.Layout,
  }))
);

const DashboardPage = lazy(() =>
  import("@/pages/dashboard/DashboardPage").then((mod) => ({
    default: mod.default,
  }))
);

const ProductsPage = lazy(() =>
  import("@/pages/products/ProductsPage").then((mod) => ({
    default: mod.default,
  }))
);

const SuppliersPage = lazy(() =>
  import("@/pages/suppliers/SuppliersPage").then((mod) => ({
    default: mod.default,
  }))
);

export function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}