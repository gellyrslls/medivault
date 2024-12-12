import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, CalendarClock, ArrowUpDown } from "lucide-react";

interface Activity {
  id: string;
  type: 'stock_update' | 'new_product' | 'low_stock' | 'expired';
  description: string;
  timestamp: Date;
  status?: string;
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'stock_update':
      return <ArrowUpDown className="h-4 w-4" />;
    case 'new_product':
      return <Package className="h-4 w-4" />;
    case 'low_stock':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case 'expired':
      return <CalendarClock className="h-4 w-4 text-destructive" />;
  }
};

export function RecentActivity() {
  // Mock data - will be replaced with real data from API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'stock_update',
      description: 'Updated stock for Paracetamol 500mg',
      timestamp: new Date(),
      status: '+50 units'
    },
    {
      id: '2',
      type: 'low_stock',
      description: 'Low stock alert: Amoxicillin 250mg',
      timestamp: new Date(Date.now() - 3600000),
      status: '5 remaining'
    },
    {
      id: '3',
      type: 'new_product',
      description: 'Added new product: Vitamin C 1000mg',
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: '4',
      type: 'expired',
      description: 'Product expired: Cough Syrup 120ml',
      timestamp: new Date(Date.now() - 86400000),
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
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
                <div className="ml-auto font-medium">
                  {activity.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}