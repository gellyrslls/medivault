"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./product-form";
import { useAddProduct } from "@/hooks/useProducts";
import { Plus } from "lucide-react";

// Product type from useProducts hook
type Product = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minStockLevel: number;
  price: number;
  category: "OTC" | "PRESCRIPTION";
  expiryDate: Date;
  description?: string;
  supplierId: string;
};

// Form data type
type ProductFormData = Omit<Product, "id">;

interface ProductDialogProps {
  suppliers: { id: string; name: string }[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddProductDialog({
  suppliers,
  open,
  onOpenChange,
}: ProductDialogProps) {
  const { mutateAsync: addProduct, isPending } = useAddProduct();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await addProduct(data);
      onOpenChange?.(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!open && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="z-0">
          <ProductForm
            suppliers={suppliers}
            onSubmit={handleSubmit}
            isLoading={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface EditProductDialogProps {
  product: Product;
  suppliers: { id: string; name: string }[];
  onSubmit: (data: ProductFormData) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditProductDialog({
  product,
  suppliers,
  onSubmit,
  trigger,
  isLoading,
  open,
  onOpenChange,
}: EditProductDialogProps) {
  const handleSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
      onOpenChange?.(false);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ProductForm
            initialData={product}
            suppliers={suppliers}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
