import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: "OTC" | "PRESCRIPTION";
  minStockLevel: number;
  expiryDate: Date;
  description?: string;
  supplierId: string;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  total: number;
}

interface AddProductDTO {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: "OTC" | "PRESCRIPTION";
  minStockLevel: number;
  expiryDate: Date;
  description?: string;
  supplierId: string;
}

interface UpdateStockDTO {
  productId: string;
  quantity: number;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await api.get<ProductsResponse>("/products");
        return response.products;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddProductDTO) => {
      try {
        console.log("Adding product:", data);
        const response = await api.post<ApiResponse<Product>>(
          "/products",
          data
        );
        console.log("Add product response:", response);
        return response;
      } catch (error) {
        console.error("Error adding product:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Product added successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["recentActivity"] });
    },
    onError: (error) => {
      console.error("Error in add product mutation:", error);
    },
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateStockDTO) => {
      try {
        console.log("Updating stock:", data);
        const response = await api.patch<ApiResponse<Product>>(
          `/products/${data.productId}/stock`,
          {
            quantity: data.quantity,
          }
        );
        console.log("Update stock response:", response);
        return response;
      } catch (error) {
        console.error("Error updating stock:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Stock updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["recentActivity"] });
    },
    onError: (error) => {
      console.error("Error in update stock mutation:", error);
    },
  });
}
