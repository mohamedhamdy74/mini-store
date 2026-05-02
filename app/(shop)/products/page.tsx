import { getProducts, getCategories, getBrands } from "@/lib/api/products";
import { ProductList } from "@/components/product-list";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";

export const metadata = {
    title: "All Products | MiniStore",
    description: "Browse our extensive collection of premium tech and lifestyle products.",
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; categoryId?: string; brandId?: string; keyword?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const categoryId = params.categoryId;
    const brandId = params.brandId;
    const keyword = params.keyword;

    const [productsData, categoriesData, brandsData] = await Promise.all([
        getProducts(page, categoryId, brandId, keyword),
        getCategories(),
        getBrands()
    ]);

    const totalPages = productsData?.metadata?.numberOfPages || 1;
    const categories = categoriesData?.data || [];
    const brands = brandsData?.data || [];

    return (
        <main className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
            <header className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 lg:text-5xl dark:text-zinc-100">
                    Our Collection
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                    Discover premium quality products curated just for you. From high-end electronics to daily essentials.
                </p>
                <div className="mt-8 flex justify-center">
                    <div className="h-1.5 w-24 rounded-full bg-primary/20" />
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 shrink-0 space-y-8">
                    <div className="sticky top-28 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/products"
                                        className={`block px-3 py-2 rounded-xl transition-colors ${!categoryId ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                                    >
                                        All Categories
                                    </Link>
                                </li>
                                {categories.map((cat: any) => (
                                    <li key={cat._id}>
                                        <Link
                                            href={`/products?categoryId=${cat._id}`}
                                            className={`block px-3 py-2 rounded-xl transition-colors ${categoryId === cat._id ? 'bg-zinc-100 dark:bg-zinc-800 font-semibold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {brands.map((brand: any) => (
                                    <Link
                                        key={brand._id}
                                        href={`/products?brandId=${brand._id}`}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${brandId === brand._id ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700'}`}
                                    >
                                        {brand.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Area */}
                <div className="flex-1 space-y-12">
                    <Suspense fallback={<ProductCardSkeleton />}>
                        <ProductList products={productsData?.data || []} />
                    </Suspense>

                    {productsData?.data?.length === 0 && (
                        <div className="text-center py-24 text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            <p className="text-lg font-medium">No products found for this filter.</p>
                            <Link href="/products" className="mt-4 inline-block text-zinc-900 underline dark:text-zinc-100 font-semibold">Clear Filters</Link>
                        </div>
                    )}

                    {productsData?.data?.length > 0 && (
                        <div className="flex flex-col items-center gap-4 py-8 border-t border-zinc-100 dark:border-zinc-800 mt-12">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href={`/products?page=${Math.max(1, page - 1)}${categoryId ? `&categoryId=${categoryId}` : ''}${brandId ? `&brandId=${brandId}` : ''}`}
                                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
                                        .map((p, i, arr) => {
                                            const items = [];
                                            if (i > 0 && p !== arr[i - 1] + 1) {
                                                items.push(
                                                    <PaginationItem key={`ellipsis-${p}`}>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                );
                                            }
                                            items.push(
                                                <PaginationItem key={p}>
                                                    <PaginationLink
                                                        href={`/products?page=${p}${categoryId ? `&categoryId=${categoryId}` : ''}${brandId ? `&brandId=${brandId}` : ''}`}
                                                        isActive={page === p}
                                                    >
                                                        {p}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                            return items;
                                        })}

                                    <PaginationItem>
                                        <PaginationNext
                                            href={`/products?page=${Math.min(totalPages, page + 1)}${categoryId ? `&categoryId=${categoryId}` : ''}${brandId ? `&brandId=${brandId}` : ''}`}
                                            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <div className="text-sm text-zinc-500 font-medium">
                                Showing page {page} of {totalPages}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}