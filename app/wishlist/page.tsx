import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { API_BASE_URL } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star, Trash2, ArrowRight } from 'lucide-react'
import { WishlistRemoveButton } from '@/components/wishlist-remove-button'

export const metadata = {
    title: 'Wishlist | MiniStore',
    description: 'Your saved items — products you love.',
}

async function getWishlist() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) return null

    const res = await fetch(`${API_BASE_URL}/wishlist`, {
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        cache: 'no-store',
    })

    if (!res.ok) return null
    return res.json()
}

export default async function Wishlist() {
    const result = await getWishlist()

    if (!result) {
        return (
            <main className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="text-center space-y-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                        <Heart className="h-10 w-10 text-zinc-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Please login first</h2>
                        <p className="mt-2 text-zinc-500">Sign in to see your wishlist</p>
                    </div>
                    <Link href="/login">
                        <Button className="rounded-full px-8 h-12">
                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </main>
        )
    }

    const products: Product[] = result.data || []

    return (
        <main className="min-h-[calc(100vh-72px)] bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30">
                            <Heart className="h-6 w-6 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                                My Wishlist
                            </h1>
                            <p className="text-sm text-zinc-500">{products.length} items saved</p>
                        </div>
                    </div>
                    <div className="h-1 w-16 rounded-full bg-red-500/20" />
                </header>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                            <Heart className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Your wishlist is empty</h2>
                            <p className="mt-2 text-zinc-500">Start adding products you love!</p>
                        </div>
                        <Link href="/products">
                            <Button className="rounded-full px-8 h-12">
                                Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((item: Product, index: number) => (
                            <Card
                                key={item._id || item.id}
                                className="group overflow-hidden border-zinc-200 bg-white transition-all duration-300 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
                                    <Link href={`/products/${item.id}`}>
                                        <Image
                                            src={item.imageCover}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </Link>
                                    {item.category && (
                                        <Badge className="absolute top-3 left-3 bg-zinc-900/80 text-white backdrop-blur-md text-xs">
                                            {item.category.name}
                                        </Badge>
                                    )}
                                </div>
                                <div className="p-4 space-y-3">
                                    <div className="flex items-center gap-1 text-xs">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.ratingsAverage}</span>
                                    </div>
                                    <Link href={`/products/${item.id}`}>
                                        <h3 className="line-clamp-1 font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        EGP {item.price.toLocaleString()}
                                    </p>
                                    <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                        <Link href={`/products/${item.id}`} className="flex-1">
                                            <Button size="sm" className="w-full gap-2 rounded-full text-xs">
                                                <ShoppingCart className="h-3.5 w-3.5" />
                                                View & Add
                                            </Button>
                                        </Link>
                                        <WishlistRemoveButton productId={item.id || item._id} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
