import { StatsCards } from "./components/StatsCards";
import { RecentActivity } from "./components/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="space-y-4">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <RecentActivity />
          {/* We can add more cards/widgets here later */}
        </div>
      </div>
    </div>
  );
}