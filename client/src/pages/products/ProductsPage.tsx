"use client"

import { useProducts } from "@/hooks/useProducts"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddProductDialog } from "./components/product-dialog"
import { Skeleton } from "@/components/ui/skeleton"

// Mock suppliers until we implement supplier management
const mockSuppliers = [
  { id: "1", name: "Supplier A" },
  { id: "2", name: "Supplier B" },
]

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts()

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6">
          <div className="text-center text-red-500">
            Error loading products. Please try again later.
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-4">
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
            <DataTable columns={columns} data={products || []} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}