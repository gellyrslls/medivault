import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  AlertTriangle,
  CalendarClock,
  ArrowUpDown,
} from "lucide-react";
import { useRecentActivity } from "@/hooks/useRecentActivity";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "stock_update" | "new_product" | "low_stock" | "expired";
  description: string;
  timestamp: Date;
  status?: string;
}

interface RecentActivityProps {
  className?: string;
}

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "stock_update":
      return <ArrowUpDown className="h-4 w-4" />;
    case "new_product":
      return <Package className="h-4 w-4" />;
    case "low_stock":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "expired":
      return <CalendarClock className="h-4 w-4 text-destructive" />;
  }
};

function ActivitySkeleton() {
  return (
    <div className="flex items-center">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="ml-auto h-4 w-16" />
    </div>
  );
}

export function RecentActivity({ className }: RecentActivityProps) {
  const { data: activities, isLoading, error } = useRecentActivity();

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>
          {isLoading ? <Skeleton className="h-6 w-32" /> : "Recent Activity"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {isLoading ? (
            <>
              <ActivitySkeleton />
              <ActivitySkeleton />
              <ActivitySkeleton />
              <ActivitySkeleton />
            </>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-6">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <p className="mt-2 text-sm text-destructive">
                Failed to load recent activity
              </p>
              <p className="text-xs text-muted-foreground">
                Please try again later
              </p>
            </div>
          ) : activities?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <Package className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No recent activity
              </p>
            </div>
          ) : (
            activities?.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    <p className="text-sm font-medium leading-none">
                      {activity.description}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                {activity.status && (
                  <div className="ml-auto font-medium">{activity.status}</div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}