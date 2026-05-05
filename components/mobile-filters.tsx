'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

export function MobileFilters({ categories, brands, categoryId, brandId }: any) {
    const [open, setOpen] = useState(false)

    return (
        <div className="lg:hidden mb-8">
            <Button onClick={() => setOpen(true)} className="w-full flex items-center gap-2 h-14 rounded-xl border-zinc-200 dark:border-zinc-800 shadow-sm" variant="outline">
                <Filter className="h-5 w-5" />
                <span className="font-semibold text-base">Filter Products</span>
            </Button>

            {open && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-zinc-950 p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex justify-between items-center mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Filters</h2>
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="rounded-full bg-zinc-100 dark:bg-zinc-900">
                            <X className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
                        </Button>
                    </div>

                    <div className="space-y-10 flex-1">
                        {/* Categories */}
                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/products"
                                        onClick={() => setOpen(false)}
                                        className={`block px-4 py-3 rounded-xl transition-colors ${!categoryId ? 'bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                                    >
                                        All Categories
                                    </Link>
                                </li>
                                {categories.map((cat: any) => (
                                    <li key={cat._id}>
                                        <Link
                                            href={`/products?categoryId=${cat._id}`}
                                            onClick={() => setOpen(false)}
                                            className={`block px-4 py-3 rounded-xl transition-colors ${categoryId === cat._id ? 'bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                                        >
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Brands */}
                        <div className="pb-8">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {brands.map((brand: any) => (
                                    <Link
                                        key={brand._id}
                                        href={`/products?brandId=${brand._id}`}
                                        onClick={() => setOpen(false)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${brandId === brand._id ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700'}`}
                                    >
                                        {brand.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
