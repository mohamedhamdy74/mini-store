'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart, Loader2, Check } from 'lucide-react'
import { addToCart } from '@/lib/actions/cart'
import { addToWishlist } from '@/lib/actions/wishlist'
import { useState } from 'react'
import { useStore } from '@/lib/store'

interface ProductActionsProps {
    productId: string
    inStock: boolean
}

export function ProductActions({ productId, inStock }: ProductActionsProps) {
    const [cartLoading, setCartLoading] = useState(false)
    const [cartAdded, setCartAdded] = useState(false)
    const [wishLoading, setWishLoading] = useState(false)
    const [wishAdded, setWishAdded] = useState(false)
    const { fetchCounts } = useStore()

    async function handleAddToCart() {
        setCartLoading(true)
        const result = await addToCart(productId)
        setCartLoading(false)
        if (result.success) {
            setCartAdded(true)
            fetchCounts()
            setTimeout(() => setCartAdded(false), 2000)
        }
    }

    async function handleAddToWishlist() {
        setWishLoading(true)
        const result = await addToWishlist(productId)
        setWishLoading(false)
        if (result.success) {
            setWishAdded(true)
            fetchCounts()
        }
    }

    return (
        <div className="flex flex-col gap-4 py-6">
            <Button
                size="lg"
                className="h-16 gap-3 rounded-full text-lg font-bold shadow-lg shadow-zinc-900/10 dark:shadow-none transition-all"
                onClick={handleAddToCart}
                disabled={!inStock || cartLoading}
            >
                {cartLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : cartAdded ? (
                    <>
                        <Check className="h-6 w-6" />
                        Added to Cart!
                    </>
                ) : (
                    <>
                        <ShoppingCart className="h-6 w-6" />
                        {inStock ? 'Add to Shopping Cart' : 'Out of Stock'}
                    </>
                )}
            </Button>
            <Button
                size="lg"
                variant="outline"
                className={`h-16 gap-3 rounded-full text-lg font-bold transition-all ${wishAdded ? 'border-red-300 text-red-500 bg-red-50 dark:border-red-900 dark:bg-red-950/30' : ''}`}
                onClick={handleAddToWishlist}
                disabled={wishLoading}
            >
                {wishLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                    <>
                        <Heart className={`h-6 w-6 ${wishAdded ? 'fill-red-500 text-red-500' : ''}`} />
                        {wishAdded ? 'Saved to Wishlist' : 'Add to Wishlist'}
                    </>
                )}
            </Button>
        </div>
    )
}
