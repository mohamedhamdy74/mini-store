import { Search, ShoppingBag } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/70">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            MiniStore
                        </span>
                    </div>

                    <div className="relative hidden max-w-md flex-1 md:block">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Search premium products..."
                            className="rounded-full border-zinc-200 bg-zinc-100/50 pl-10 focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50"

                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="hidden sm:flex">Login</Button>
                        <Button className="rounded-full bg-zinc-900 px-6 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}