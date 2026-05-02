'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'
import { updateCartProductQuantity, deleteCartProduct, clearCart } from '@/lib/actions/cart'
import { useState, useTransition } from 'react'
import { useStore } from '@/lib/store'

interface CartProduct {
    count: number
    _id: string
    product: {
        _id: string
        id: string
        title: string
        imageCover: string
        price: number
        category: { name: string }
        brand: { name: string }
    }
    price: number
}

interface CartItemsListProps {
    products: CartProduct[]
    totalPrice: number
    cartId: string
}

export function CartItemsList({ products: initialProducts, totalPrice: initialTotal, cartId }: CartItemsListProps) {
    const [products, setProducts] = useState(initialProducts)
    const [totalPrice, setTotalPrice] = useState(initialTotal)
    const [isPending, startTransition] = useTransition()
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const { fetchCounts } = useStore()

    function handleUpdateQuantity(productId: string, newCount: number) {
        if (newCount < 1) return
        setLoadingId(productId)
        startTransition(async () => {
            const result = await updateCartProductQuantity(productId, newCount)
            if (result.success && result.data) {
                const data = result.data as { data: { products: CartProduct[]; totalCartPrice: number } }
                setProducts(data.data.products)
                setTotalPrice(data.data.totalCartPrice)
                fetchCounts()
            }
            setLoadingId(null)
        })
    }

    function handleRemove(productId: string) {
        setLoadingId(productId)
        startTransition(async () => {
            const result = await deleteCartProduct(productId)
            if (result.success && result.data) {
                const data = result.data as { data: { products: CartProduct[]; totalCartPrice: number } }
                setProducts(data.data.products)
                setTotalPrice(data.data.totalCartPrice)
                fetchCounts()
            }
            setLoadingId(null)
        })
    }

    function handleClear() {
        setLoadingId('clear')
        startTransition(async () => {
            await clearCart()
            setProducts([])
            setTotalPrice(0)
            fetchCounts()
            setLoadingId(null)
        })
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <ShoppingBag className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Your cart is empty</h2>
                    <p className="mt-2 text-zinc-500">Add some products to get started!</p>
                </div>
                <Link href="/products">
                    <Button className="rounded-full px-8 h-12">
                        Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                {products.map((item, index) => (
                    <Card
                        key={item._id}
                        className="overflow-hidden border-zinc-200 bg-white p-0 dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                        style={{ animationDelay: `${index * 80}ms` }}
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Image */}
                            <Link
                                href={`/products/${item.product.id || item.product._id}`}
                                className="relative aspect-square w-full sm:w-40 shrink-0 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900"
                            >
                                <Image
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    fill
                                    sizes="160px"
                                    className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                                />
                            </Link>

                            {/* Details */}
                            <div className="flex flex-1 flex-col justify-between p-5">
                                <div className="space-y-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs text-zinc-400 font-medium">{item.product.category?.name}</p>
                                            <Link href={`/products/${item.product.id || item.product._id}`}>
                                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                                                    {item.product.title}
                                                </h3>
                                            </Link>
                                            {item.product.brand && (
                                                <p className="text-xs text-zinc-400">{item.product.brand.name}</p>
                                            )}
                                        </div>
                                        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                            EGP {(item.price * item.count).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 rounded-full"
                                            onClick={() => handleUpdateQuantity(item.product.id || item.product._id, item.count - 1)}
                                            disabled={item.count <= 1 || loadingId === (item.product.id || item.product._id)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                                            {loadingId === (item.product.id || item.product._id) ? (
                                                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                                            ) : (
                                                item.count
                                            )}
                                        </span>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 rounded-full"
                                            onClick={() => handleUpdateQuantity(item.product.id || item.product._id, item.count + 1)}
                                            disabled={loadingId === (item.product.id || item.product._id)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full px-3 text-xs"
                                        onClick={() => handleRemove(item.product.id || item.product._id)}
                                        disabled={loadingId === (item.product.id || item.product._id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}

                <Button
                    variant="outline"
                    className="rounded-full text-sm text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950/30"
                    onClick={handleClear}
                    disabled={loadingId === 'clear'}
                >
                    {loadingId === 'clear' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                    Clear Cart
                </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <Card className="sticky top-28 border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500">Subtotal ({products.length} items)</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">EGP {totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-500">Shipping</span>
                            <span className="font-medium text-emerald-600">Free</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">Total</span>
                            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                EGP {totalPrice.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <Link href={`/checkout?cartId=${cartId}`} className="block mt-6">
                        <Button className="h-14 w-full rounded-xl bg-zinc-900 text-base font-bold text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:shadow-white/10 dark:hover:bg-zinc-200">
                            Proceed to Checkout
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>

                    <Link href="/products" className="block mt-4">
                        <Button variant="ghost" className="w-full rounded-xl text-sm text-zinc-500">
                            Continue Shopping
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    )
}
