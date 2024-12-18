import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface LowStockProduct {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  minStockLevel: number;
}

interface ExpiringProduct {
  id: number;
  name: string;
  sku: string;
  expiryDate: string;
  daysUntilExpiry: number;
  status: "expired" | "expiring" | "valid";
}

// Low Stock Report Columns
export const lowStockColumns: ColumnDef<LowStockProduct>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "quantity",
    header: "Current Stock",
  },
  {
    accessorKey: "minStockLevel",
    header: "Min Stock Level",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      const minStock = row.original.minStockLevel;
      return (
        <Badge variant={quantity <= minStock ? "destructive" : "default"}>
          Low Stock
        </Badge>
      );
    },
  },
];

// Expiring Products Report Columns
export const expiringColumns: ColumnDef<ExpiringProduct>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      return format(new Date(row.original.expiryDate), "PP");
    },
  },
  {
    accessorKey: "daysUntilExpiry",
    header: "Days Until Expiry",
    cell: ({ row }) => {
      const days = row.original.daysUntilExpiry;
      return days < 0 ? "Expired" : `${days} days`;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "expired" ? "destructive" : "secondary"}>
          {status === "expired" ? "Expired" : "Expiring Soon"}
        </Badge>
      );
    },
  },
];
