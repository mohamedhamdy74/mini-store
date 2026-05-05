'use client'

import { ShoppingBag, Search, Heart, ShoppingCart, Menu, X, LogOut, User, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/brands', label: 'Brands' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { cartCount, wishlistCount, fetchCounts } = useStore()

    useEffect(() => {
        fetch('/api/verifytoken')
            .then(res => res.json())
            .then(data => {
                if (data.authenticated === true) {
                    setIsAuthenticated(true)
                    fetchCounts()
                } else {
                    setIsAuthenticated(false)
                }
            })
            .catch(() => setIsAuthenticated(false))
    }, [pathname, fetchCounts])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-50 border-b transition-all duration-300",
                    scrolled
                        ? "border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80"
                        : "border-transparent bg-white/60 backdrop-blur-md dark:bg-zinc-950/60"
                )}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white shadow-lg dark:from-white dark:to-zinc-300 dark:text-zinc-900">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                MiniStore
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                                        pathname === link.href
                                            ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800"
                                            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/50"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Search */}
                        <div className="relative hidden max-w-xs flex-1 lg:block">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <Input
                                placeholder="Search products..."
                                className="rounded-full border-zinc-200 bg-zinc-100/50 pl-10 text-sm focus-visible:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50"
                            />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {isAuthenticated ? (
                                <>
                                    <div className="hidden sm:flex items-center gap-1">
                                        <Link href="/wishlist">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={cn(
                                                    "rounded-full relative transition-colors",
                                                    pathname === '/wishlist' && "bg-zinc-100 dark:bg-zinc-800"
                                                )}
                                            >
                                            <Heart className="h-5 w-5" />
                                            {wishlistCount > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                                    {wishlistCount}
                                                </span>
                                            )}
                                        </Button>
                                    </Link>
                                    <Link href="/cart">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                "rounded-full relative transition-colors",
                                                pathname === '/cart' && "bg-zinc-100 dark:bg-zinc-800"
                                            )}
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                            {cartCount > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 dark:bg-white dark:text-zinc-900 text-[10px] font-bold text-white">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </Button>
                                    </Link>
                                    <Link href="/orders">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                "rounded-full transition-colors",
                                                pathname === '/orders' && "bg-zinc-100 dark:bg-zinc-800"
                                            )}
                                        >
                                            <Package className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/profile">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={cn(
                                                "rounded-full transition-colors",
                                                pathname === '/profile' && "bg-zinc-100 dark:bg-zinc-800"
                                            )}
                                        >
                                            <User className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <form action="/api/auth/signout" method="POST">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full text-zinc-500 hover:text-red-500"
                                            type="button"
                                            onClick={async () => {
                                                const { signOut } = await import('@/lib/actions/auth')
                                                await signOut()
                                            }}
                                        >
                                            <LogOut className="h-5 w-5" />
                                        </Button>
                                    </form>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="hidden sm:flex gap-2 rounded-full text-sm">
                                            <User className="h-4 w-4" />
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button className="rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:shadow-white/10 dark:hover:bg-zinc-200">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}

                            {/* Mobile Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full md:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "md:hidden overflow-hidden transition-all duration-300 border-t border-zinc-100 dark:border-zinc-800",
                        mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
                    )}
                >
                    <nav className="container mx-auto px-4 py-4 space-y-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                    pathname === link.href
                                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isAuthenticated && (
                            <>
                                <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />
                                <Link
                                    href="/wishlist"
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "flex justify-between items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                        pathname === '/wishlist'
                                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                                    )}
                                >
                                    <span>Wishlist</span>
                                    {wishlistCount > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">{wishlistCount}</span>}
                                </Link>
                                <Link
                                    href="/orders"
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                        pathname === '/orders'
                                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                                    )}
                                >
                                    My Orders
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                        pathname === '/profile'
                                            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                                    )}
                                >
                                    My Profile
                                </Link>
                                <form action="/api/auth/signout" method="POST">
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            const { signOut } = await import('@/lib/actions/auth')
                                            await signOut()
                                        }}
                                        className="w-full text-left rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </form>
                            </>
                        )}
                        <div className="pt-3">
                            <div className="relative">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <Input
                                    placeholder="Search products..."
                                    className="rounded-full border-zinc-200 bg-zinc-100/50 pl-10 text-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}