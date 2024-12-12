import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  loading?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  loading = false,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {loading ? <Skeleton className="h-4 w-20" /> : title}
        </CardTitle>
        {loading ? <Skeleton className="h-4 w-4 rounded-full" /> : icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <Skeleton className="h-8 w-24" /> : value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {loading ? <Skeleton className="h-4 w-32" /> : description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
