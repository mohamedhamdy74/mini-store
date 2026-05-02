'use client'

import { useGetProducts } from "@/hooks/useGetProducts"
import { ProductCard } from "./product-card"
import { Product } from "@/lib/types"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function ProductsSection() {
    const { data: products } = useGetProducts()

    return (
        <section className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-5 w-5 text-zinc-400" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Featured</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Trending Products
                    </h2>
                </div>
                <Link href="/products">
                    <Button variant="outline" className="rounded-full gap-2 px-6">
                        View All
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-4">
                    {products.data.map((product: Product) => (
                        <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-4" />
                <CarouselNext className="hidden sm:flex -right-4" />
            </Carousel>
        </section>
    )
}