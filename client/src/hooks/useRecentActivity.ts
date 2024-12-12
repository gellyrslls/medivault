import { useQuery } from "@tanstack/react-query";

export interface Activity {
  id: string;
  type: "stock_update" | "new_product" | "low_stock" | "expired";
  description: string;
  timestamp: Date;
  status?: string;
}

export function useRecentActivity() {
  return useQuery<Activity[]>({
    queryKey: ["recentActivity"],
    queryFn: () => client("/dashboard/activity"),
  });
}
