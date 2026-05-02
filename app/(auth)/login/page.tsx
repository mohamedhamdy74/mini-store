'use client'

import { signIn } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ShoppingBag, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError('')
        const result = await signIn(formData)
        if (result && !result.success) {
            setError(result.message)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 px-4 py-12 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent blur-3xl dark:from-zinc-800/20" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-zinc-200/40 to-transparent blur-3xl dark:from-zinc-800/20" />
            </div>

            <Card className="relative w-full max-w-md border-zinc-200/80 bg-white/80 shadow-2xl shadow-zinc-200/50 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:shadow-zinc-900/50">
                <CardHeader className="space-y-6 pb-2 text-center">
                    <Link href="/" className="mx-auto flex items-center gap-2.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-white shadow-lg shadow-zinc-900/30 dark:from-white dark:to-zinc-300 dark:text-zinc-900 dark:shadow-white/10">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            Welcome back
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Sign in to your MiniStore account
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 rounded-xl border-zinc-200 bg-zinc-50/50 pl-10 text-sm transition-all focus-visible:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/50"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    className="h-12 rounded-xl border-zinc-200 bg-zinc-50/50 pl-10 text-sm transition-all focus-visible:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/50"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 w-full rounded-xl bg-zinc-900 text-sm font-semibold text-white shadow-lg shadow-zinc-900/30 transition-all hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-zinc-900 dark:shadow-white/10 dark:hover:bg-zinc-200"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-semibold text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
                            Create one
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
