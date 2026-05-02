'use client'

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { addToCart } from "@/lib/actions/cart"
import { addToWishlist } from "@/lib/actions/wishlist"
import { useState } from "react"
import { useStore } from "@/lib/store"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [cartLoading, setCartLoading] = useState(false)
    const [wishLoading, setWishLoading] = useState(false)
    const [wishActive, setWishActive] = useState(false)
    const { fetchCounts } = useStore()

    async function handleAddToCart() {
        setCartLoading(true)
        try {
            await addToCart(product.id)
            fetchCounts()
        } finally {
            setCartLoading(false)
        }
    }

    async function handleAddToWishlist() {
        setWishLoading(true)
        try {
            await addToWishlist(product.id)
            setWishActive(true)
            fetchCounts()
        } finally {
            setWishLoading(false)
        }
    }

    return (
        <Card className="group cursor-pointer overflow-hidden border-zinc-200 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-900/50">
            <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
                    <Link href={`/products/${product.id}`} className="block h-full w-full">
                        <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        />
                    </Link>
                    <Badge className="absolute top-3 left-3 bg-zinc-900/80 text-white backdrop-blur-md hover:bg-zinc-900 text-xs">
                        {product.category.name}
                    </Badge>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleAddToWishlist}
                        disabled={wishLoading}
                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:bg-white hover:text-red-500 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                        <Heart className={`h-4 w-4 transition-colors ${wishActive ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{product.ratingsAverage}</span>
                        <span className="text-zinc-400">({product.ratingsQuantity})</span>
                    </div>
                    {product.brand && (
                        <span className="text-xs text-zinc-400 font-medium">{product.brand.name}</span>
                    )}
                </div>
                <Link href={`/products/${product.id}`}>
                    <h3 className="line-clamp-1 font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                        {product.title}
                    </h3>
                </Link>
                <p className="line-clamp-2 text-zinc-500 text-xs leading-relaxed dark:text-zinc-400">
                    {product.description}
                </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t border-zinc-100 p-4 dark:border-zinc-800">
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        EGP {product.price.toLocaleString()}
                    </span>
                </div>
                <Button
                    size="sm"
                    className="gap-2 rounded-full px-4 bg-zinc-900 text-white shadow-md shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:shadow-white/10 dark:hover:bg-zinc-200 transition-all duration-200"
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                >
                    <ShoppingCart className="h-4 w-4" />
                    {cartLoading ? 'Adding...' : 'Add'}
                </Button>
            </CardFooter>
        </Card>
    )
}
