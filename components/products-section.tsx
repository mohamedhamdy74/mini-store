'use client'

import { useGetProducts } from "@/hooks/useGetProducts";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import { Button } from "./ui/button";

export default function ProductsSection() {
    const { data: products, isLoading } = useGetProducts()
    return (
        <section className="container mx-auto my-5 px-15 md:px-15 lg:px-30">
            <Link href="/products" > <Button className="my-5 cursor-pointer">Show All Products</Button></Link>
            <Carousel
                opts={{
                    align: "start",
                }}
                className=""
            >
                <CarouselContent>
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, i) => (
                            <CarouselItem>
                                <ProductCardSkeleton key={i} />
                            </CarouselItem>
                        ))
                        : products.data.map((product: Product) => (
                            <CarouselItem key={product.id} className="basis lg:basis-1/3">

                                <ProductCard key={product.id} product={product} />


                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}