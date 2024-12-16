import { useQuery } from "@tanstack/react-query";

interface Report {
  totalProducts: number;
  lowStock: Array<{
    id: number;
    name: string;
    sku: string;
    quantity: number;
    minStockLevel: number;
  }>;
  expiringProducts: Array<{
    id: number;
    name: string;
    sku: string;
    expiryDate: string;
    daysUntilExpiry: number;
  }>;
}

const fetchReports = async (): Promise<Report> => {
  const [lowStockRes, expiringRes, statsRes] = await Promise.all([
    fetch("/api/reports/low-stock").then((res) => res.json()),
    fetch("/api/reports/expiring-soon").then((res) => res.json()),
    fetch("/api/reports/inventory-status").then((res) => res.json()),
  ]);

  return {
    lowStock: lowStockRes,
    expiringProducts: expiringRes,
    totalProducts: statsRes.totalProducts,
  };
};

export const useReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });
};
