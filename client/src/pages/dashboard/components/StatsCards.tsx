import { Package, AlertTriangle, CalendarClock, Users } from "lucide-react";
import { StatsCard } from "./StatsCard";

export function StatsCards() {
  // Mock data - will be replaced with real data from API
  const stats = [
    {
      title: "Total Products",
      value: "124",
      description: "Total items in inventory",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Low Stock Items",
      value: "7",
      description: "Products below minimum level",
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
    },
    {
      title: "Expiring Soon",
      value: "12",
      description: "Products expiring in 30 days",
      icon: <CalendarClock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Suppliers",
      value: "8",
      description: "Active suppliers",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}