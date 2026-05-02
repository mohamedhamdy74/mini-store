import { cookies } from 'next/headers'
import { API_BASE_URL } from '@/lib/constants'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CartItemsList } from '@/components/cart-items-list'

export const metadata = {
    title: 'Shopping Cart | MiniStore',
    description: 'Review your cart and proceed to checkout.',
}

async function getCart() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) return null

    const res = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        cache: 'no-store',
    })

    if (!res.ok) return null
    return res.json()
}

export default async function CartPage() {
    const result = await getCart()

    if (!result) {
        return (
            <main className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="text-center space-y-6">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                        <ShoppingCart className="h-10 w-10 text-zinc-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Please login first</h2>
                        <p className="mt-2 text-zinc-500">Sign in to see your cart</p>
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

    return (
        <main className="min-h-[calc(100vh-72px)] bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                            <ShoppingCart className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                                Shopping Cart
                            </h1>
                            <p className="text-sm text-zinc-500">{result.numOfCartItems || 0} items</p>
                        </div>
                    </div>
                    <div className="h-1 w-16 rounded-full bg-zinc-900/10 dark:bg-white/10" />
                </header>

                <CartItemsList
                    products={result.data?.products || []}
                    totalPrice={result.data?.totalCartPrice || 0}
                    cartId={result.data?._id || ''}
                />
            </div>
        </main>
    )
}
