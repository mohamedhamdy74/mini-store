import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ShoppingBag,
    Sparkles,
    ArrowRight,
    Truck,
    ShieldCheck,
    RotateCcw,
    Star
} from "lucide-react"
import ProductsSection from "@/components/products-section"

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <main>
                {/* Hero Section */}
                <section className="relative px-4 py-8 md:py-12">
                    <div className="container mx-auto overflow-hidden rounded-[2.5rem] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                        <div className="grid items-center gap-8 md:grid-cols-2">
                            <div className="p-8 md:p-12 lg:p-16">
                                <Badge variant="secondary" className="mb-6 gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    New Collection 2026
                                </Badge>
                                <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
                                    Redefining Your <br />
                                    <span className="text-zinc-400 dark:text-zinc-500">Lifestyle.</span>
                                </h1>
                                <p className="mb-10 max-w-md text-lg text-zinc-400 dark:text-zinc-500 md:text-xl">
                                    Curated selection of the world&apos;s most premium tech and luxury accessories.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/products">
                                        <Button size="lg" className="h-14 rounded-full px-8 text-lg font-semibold shadow-lg shadow-white/10">
                                            Shop Now
                                        </Button>
                                    </Link>
                                    <Link href="/categories">
                                        <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-lg font-semibold border-zinc-700 bg-transparent text-white hover:bg-zinc-800 dark:border-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-200">
                                            Categories
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative h-[400px] w-full md:h-[700px]">
                                <Image
                                    src="/hero.png"
                                    alt="MiniStore Hero - Premium Products"
                                    fill
                                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent dark:from-zinc-100/40" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Bar */}
                <section className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-4 justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                <Truck className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Free Shipping</p>
                                <p className="text-xs text-zinc-500">On orders over EGP 500</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center border-y sm:border-y-0 sm:border-x border-zinc-100 dark:border-zinc-800 py-4 sm:py-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                <ShieldCheck className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Secure Payment</p>
                                <p className="text-xs text-zinc-500">100% secure checkout</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                <RotateCcw className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Easy Returns</p>
                                <p className="text-xs text-zinc-500">7 days return policy</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products Carousel */}
                <Suspense fallback={
                    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                    </div>
                }>
                    <ProductsSection />
                </Suspense>
            </main>

            {/* Footer */}
            <footer className="mt-12 border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="col-span-2">
                            <Link href="/" className="mb-6 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                                    <ShoppingBag className="h-4 w-4" />
                                </div>
                                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">MiniStore</span>
                            </Link>
                            <p className="max-w-xs text-zinc-500">
                                The leading platform for high-end tech accessories and premium lifestyle goods. We focus on quality and design.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-6 font-bold uppercase tracking-widest text-zinc-400 text-xs">Navigation</h4>
                            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                                <li><Link href="/" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Home</Link></li>
                                <li><Link href="/products" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Products</Link></li>
                                <li><Link href="/categories" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Categories</Link></li>
                                <li><Link href="/brands" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Brands</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-6 font-bold uppercase tracking-widest text-zinc-400 text-xs">Account</h4>
                            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                                <li><Link href="/cart" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Cart</Link></li>
                                <li><Link href="/wishlist" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Wishlist</Link></li>
                                <li><Link href="/login" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Login</Link></li>
                                <li><Link href="/signup" className="hover:text-zinc-900 transition-colors dark:hover:text-white">Sign Up</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-zinc-100 pt-8 text-center text-zinc-500 text-sm dark:border-zinc-900">
                        © {new Date().getFullYear()} MiniStore. All rights reserved. Made with ❤️ by Mohamed Hamdy.
                    </div>
                </div>
            </footer>
        </div>
    )
}
