import Image from "next/image";
import { Product } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`}>
            <Card className="group cursor-pointer overflow-hidden border-zinc-200 transition-all hover:shadow-xl dark:border-zinc-800">
                <CardHeader className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                        <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className="absolute top-3 left-3 bg-zinc-900/80 text-white backdrop-blur-md hover:bg-zinc-900">
                            {product.category.name}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-zinc-500 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{product.ratingsAverage}</span>
                        </div>
                    </div>
                    <h3 className="line-clamp-1 font-medium text-zinc-900 transition-colors group-hover:text-primary dark:text-zinc-100">
                        {product.title}
                    </h3>
                    <p className="line-clamp-2 text-zinc-500 text-xs leading-relaxed">
                        {product.description}
                    </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-zinc-100 p-4 dark:border-zinc-800">
                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        ${product.price}
                    </span>
                    <Button size="sm" className="gap-2 rounded-full px-4">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800">
            <CardHeader className="p-0">
                <div className="aspect-square animate-pulse bg-zinc-100 dark:bg-zinc-900" />
            </CardHeader>
            <CardContent className="space-y-4 p-4">
                <div className="h-4 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4">
                <div className="h-8 w-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-10 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
            </CardFooter>
        </Card>
    );
}
