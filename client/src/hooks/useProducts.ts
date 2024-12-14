import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: 'OTC' | 'PRESCRIPTION';
  minStockLevel: number;
  expiryDate: Date;
  description?: string;
  supplierId: string;
}

interface AddProductDTO {
  name: string;
  sku: string;
  quantity: number;
  price: number;
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
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Product[]>>('/api/products');
      return response.data;
    }
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: AddProductDTO) => {
      const response = await api.post<ApiResponse<Product>>('/api/products', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentActivity'] });
    }
  });
}

export function useUpdateStock() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: UpdateStockDTO) => {
      const response = await api.patch<ApiResponse<Product>>(`/api/products/${data.productId}/stock`, {
        quantity: data.quantity
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      queryClient.invalidateQueries({ queryKey: ['recentActivity'] });
    }
  });
}