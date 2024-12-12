import { Package, AlertTriangle, CalendarClock, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export function StatsCards() {
  const { data, isLoading, error } = useDashboardStats();

  const stats = [
    {
      title: "Total Products",
      value: data?.totalProducts ?? 0,
      description: "Total items in inventory",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Low Stock Items",
      value: data?.lowStockCount ?? 0,
      description: "Products below minimum level",
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
    },
    {
      title: "Expiring Soon",
      value: data?.expiringCount ?? 0,
      description: "Products expiring in 30 days",
      icon: <CalendarClock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Suppliers",
      value: data?.suppliersCount ?? 0,
      description: "Active suppliers",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  if (error) {
    // You might want to add error UI here
    console.error("Failed to fetch dashboard stats:", error);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} loading={isLoading} />
      ))}
    </div>
  );
}
