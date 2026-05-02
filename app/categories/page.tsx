import { getCategories } from '@/lib/api/products'
import { Category } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Grid3x3, ArrowRight } from 'lucide-react'

export const metadata = {
    title: 'Categories | MiniStore',
    description: 'Browse all product categories.',
}

export default async function CategoriesPage() {
    const data = await getCategories()
    const categories: Category[] = data?.data || []

    return (
        <main className="min-h-[calc(100vh-72px)] bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
                <header className="mb-12 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <Grid3x3 className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 lg:text-5xl dark:text-zinc-100">
                        Shop by Category
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                        Explore our curated collection of premium products across all categories.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <div className="h-1.5 w-24 rounded-full bg-primary/20" />
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <Link
                            key={category._id}
                            href={`/products?category=${category._id}`}
                        >
                            <Card
                                className="group relative overflow-hidden border-zinc-200 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-900/50 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                                            {category.name}
                                        </h2>
                                        <div className="flex items-center gap-2 text-white/80 text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                            <span>Explore Collection</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}
