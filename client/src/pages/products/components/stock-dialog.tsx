"use client";

import { useState } from "react";
import { useUpdateStock, useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Product } from "../columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function StockDialog({ open, onOpenChange, product }: StockDialogProps) {
  // Fetch products for dropdown when no specific product is selected
  const { data: products } = useProducts();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    product?.id || null
  );
  const [quantity, setQuantity] = useState<number>(product?.quantity || 0);
  const updateStock = useUpdateStock();

  // Find the currently selected product
  const selectedProduct =
    product || products?.find((p) => p.id === selectedProductId) || null;

  const handleSubmit = async () => {
    try {
      if (!selectedProduct?.id) {
        toast({
          title: "Error",
          description: "Please select a product",
          variant: "destructive",
        });
        return;
      }

      if (quantity < 0) {
        toast({
          title: "Invalid Quantity",
          description: "Quantity cannot be negative",
          variant: "destructive",
        });
        return;
      }

      await updateStock.mutateAsync({
        productId: selectedProduct.id,
        quantity: Number(quantity),
      });

      toast({
        title: "Stock Updated",
        description: `Successfully updated stock for ${selectedProduct.name}`,
      });

      // Wait a small delay before closing to ensure state is updated
      setTimeout(() => {
        onOpenChange(false);
        setSelectedProductId(null);
        setQuantity(0);
      }, 100);
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update stock level",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        // Only allow dialog close if not in pending state
        if (!updateStock.isPending) {
          onOpenChange(value);
          // Reset states when dialog closes
          if (!value) {
            setSelectedProductId(null);
            setQuantity(product?.quantity || 0);
          }
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Stock Level</DialogTitle>
          <DialogDescription>
            {product
              ? `Update the stock quantity for ${product.name}`
              : "Select a product and update its stock quantity"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!product && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Product
              </Label>
              <Select
                value={selectedProductId || ""}
                onValueChange={(value) => {
                  setSelectedProductId(value);
                  const newProduct = products?.find((p) => p.id === value);
                  if (newProduct) {
                    setQuantity(newProduct.quantity);
                  }
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products?.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(product || selectedProduct) && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="col-span-3"
                  min={0}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Current Stock</Label>
                <div className="col-span-3 text-sm">
                  {selectedProduct?.quantity || product?.quantity} units
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Min Level</Label>
                <div className="col-span-3 text-sm text-muted-foreground">
                  {selectedProduct?.minStockLevel || product?.minStockLevel}{" "}
                  units
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              updateStock.isPending ||
              !selectedProduct ||
              quantity === selectedProduct.quantity
            }
          >
            {updateStock.isPending ? "Updating..." : "Update Stock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
