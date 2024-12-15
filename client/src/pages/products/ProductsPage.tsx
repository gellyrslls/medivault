"use client";

import { useProducts } from "@/hooks/useProducts";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProductDialog } from "./components/product-dialog";
import { LowStockAlert } from "./components/low-stock-alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetails } from "./components/product-details";
import { EditProductDialog } from "./components/edit-product-dialog";
import { StockDialog } from "./components/stock-dialog";
import { DeleteProductDialog } from "./components/delete-product-dialog";
import { useState } from "react";
import { Product } from "./columns";

// Mock suppliers until we implement supplier management
const mockSuppliers = [
  { id: "1", name: "Supplier A" },
  { id: "2", name: "Supplier B" },
];

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  // Dialog states
  const [detailsDialog, setDetailsDialog] = useState<{
    open: boolean;
    product: Product | null;
  }>({
    open: false,
    product: null,
  });
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    product: Product | null;
  }>({
    open: false,
    product: null,
  });
  const [stockDialog, setStockDialog] = useState<{
    open: boolean;
    product: Product | null;
  }>({
    open: false,
    product: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    product: Product | null;
  }>({
    open: false,
    product: null,
  });

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6">
          <div className="text-center text-red-500">
            Error loading products. Please try again later.
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
      <LowStockAlert />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Products</CardTitle>
          <AddProductDialog suppliers={mockSuppliers} />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <DataTable
              columns={columns({
                onViewDetails: (product) =>
                  setDetailsDialog({ open: true, product }),
                onEdit: (product) => setEditDialog({ open: true, product }),
                onUpdateStock: (product) =>
                  setStockDialog({ open: true, product }),
                onDelete: (product) => setDeleteDialog({ open: true, product }),
              })}
              data={products || []}
            />
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      {detailsDialog.product && (
        <ProductDetails
          open={detailsDialog.open}
          onOpenChange={(open) =>
            setDetailsDialog((prev) => ({ ...prev, open }))
          }
          product={detailsDialog.product}
          onEdit={() => {
            setDetailsDialog({ open: false, product: null });
            setEditDialog({ open: true, product: detailsDialog.product });
          }}
          onDelete={() => {
            setDetailsDialog({ open: false, product: null });
            setDeleteDialog({ open: true, product: detailsDialog.product });
          }}
        />
      )}

      {editDialog.product && (
        <EditProductDialog
          open={editDialog.open}
          onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, open }))}
          product={editDialog.product}
          suppliers={mockSuppliers}
        />
      )}

      {stockDialog.product && (
        <StockDialog
          open={stockDialog.open}
          onOpenChange={(open) => setStockDialog((prev) => ({ ...prev, open }))}
          product={stockDialog.product}
        />
      )}

      {deleteDialog.product && (
        <DeleteProductDialog
          open={deleteDialog.open}
          onOpenChange={(open) =>
            setDeleteDialog((prev) => ({ ...prev, open }))
          }
          product={deleteDialog.product}
        />
      )}
    </div>
  );
}
