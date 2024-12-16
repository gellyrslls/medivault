import { StatsCards } from "./components/StatsCards";
import { RecentActivity } from "./components/RecentActivity";
import { QuickActions } from "./components/QuickActions";

export default function DashboardPage() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="space-y-4">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <QuickActions />
          <RecentActivity className="col-span-2" />
        </div>
      </div>
    </div>
  );
}
