import { getBrands } from '@/lib/api/products'
import { Brand } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Award } from 'lucide-react'

export const metadata = {
    title: 'Brands | MiniStore',
    description: 'Discover world-class brands at MiniStore.',
}

export default async function BrandsPage() {
    const data = await getBrands()
    const brands: Brand[] = data?.data || []

    return (
        <main className="min-h-[calc(100vh-72px)] bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
                <header className="mb-12 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <Award className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 lg:text-5xl dark:text-zinc-100">
                        Top Brands
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                        Discover premium products from the world&apos;s most trusted brands.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="h-1.5 w-24 rounded-full bg-primary/20" />
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {brands.map((brand, index) => (
                        <Link
                            key={brand._id}
                            href={`/products?brand=${brand._id}`}
                        >
                            <Card
                                className="group flex flex-col items-center justify-center overflow-hidden border-zinc-200 bg-white p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-900/50 cursor-pointer animate-in fade-in zoom-in-90 duration-500 fill-mode-both"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 transition-transform duration-500 group-hover:scale-105">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        fill
                                        sizes="112px"
                                        className="object-contain p-3"
                                    />
                                </div>
                                <h2 className="mt-4 text-sm font-semibold text-center text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-1">
                                    {brand.name}
                                </h2>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
