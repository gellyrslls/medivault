import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { logout, user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.email}</span>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </div>
      <p>Dashboard content will go here...</p>
    </div>
  );
}
