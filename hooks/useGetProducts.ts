// src/features/products/hooks/useGetProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api/products';

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
    });
};