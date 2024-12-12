import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/api";

interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  expiringCount: number;
  suppliersCount: number;
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: () => client("/dashboard/stats"),
  });
}
