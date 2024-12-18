import { Plus, Package, Truck, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ActionItem {
  title: string;
  icon: React.ReactNode;
  color?: string;
  onClick: () => void;
}

export function QuickActions() {
  const navigate = useNavigate();

  const actions: ActionItem[] = [
    {
      title: "Add Product",
      icon: <Plus className="h-4 w-4" />,
      color: "default",
      onClick: () =>
        navigate("/products", { state: { action: "openAddProduct" } }),
    },
    {
      title: "Update Stock",
      icon: <Package className="h-4 w-4" />,
      color: "default",
      onClick: () =>
        navigate("/products", { state: { action: "openStockUpdate" } }),
    },
    {
      title: "Add Supplier",
      icon: <Truck className="h-4 w-4" />,
      onClick: () =>
        navigate("/suppliers", { state: { action: "openAddSupplier" } }),
    },
    {
      title: "Generate Report",
      icon: <FileText className="h-4 w-4" />,
      onClick: () =>
        navigate("/reports", { state: { action: "openNewReport" } }),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="w-full justify-start"
              onClick={action.onClick}
            >
              {action.icon}
              <span className="ml-2">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
