import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./use-toast";

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
  const { toast } = useToast();

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await api.get<ProductsResponse>("/products");
        return response.products;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch products. Please try again.",
        });
        throw error;
      }
    },
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: AddProductDTO) => {
      const response = await api.post<ApiResponse<Product>>("/products", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add product. Please try again.",
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Product) => {
      const response = await api.put<ApiResponse<Product>>(
        `/products/${data.id}`,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product. Please try again.",
      });
    },
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpdateStockDTO) => {
      const response = await api.patch<ApiResponse<Product>>(
        `/products/${data.productId}/stock`,
        { quantity: data.quantity }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Success",
        description: "Stock updated successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update stock. Please try again.",
      });
    },
  });
}
