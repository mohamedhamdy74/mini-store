import { getProducts } from "@/lib/api/products";
import { ProductList } from "@/components/product-list";
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
import { ProductCardSkeleton } from "@/components/product-card";

export const metadata = {
    title: "All Products | MiniStore",
    description: "Browse our extensive collection of premium tech and lifestyle products.",
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const productsData = await getProducts(page);
    const totalPages = productsData?.metadata?.numberOfPages || 1;

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

            <div className="space-y-12">
                <Suspense fallback={<ProductCardSkeleton />}>
                    <ProductList products={productsData?.data || []} />
                </Suspense>

                <div className="flex flex-col items-center gap-4 py-8">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={`/products?page=${Math.max(1, page - 1)}`}
                                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {/* Render pagination items server-side */}
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
                                                href={`/products?page=${p}`}
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
                                    href={`/products?page=${Math.min(totalPages, page + 1)}`}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <div className="text-sm text-zinc-500">
                        Showing page {page} of {totalPages}
                    </div>
                </div>
            </div>
        </main>
    );
}