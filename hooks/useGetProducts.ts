// src/features/products/hooks/useGetProducts.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api/products';

export const useGetProducts = () => {
    return useSuspenseQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),

    });
};