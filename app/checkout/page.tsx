'use client'

import { useState, useTransition, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createCheckoutSession, createOrder } from "@/lib/actions/orders"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Building, Loader2, ArrowRight } from "lucide-react"

function CheckoutForm() {
    const searchParams = useSearchParams()
    const cartId = searchParams.get('cartId')
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState('')
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('card')

    async function handleSubmit(formData: FormData) {
        if (!cartId) {
            setError("No cart ID found. Please go back to cart.")
            return
        }

        setError('')
        const details = formData.get('details') as string
        const phone = formData.get('phone') as string
        const city = formData.get('city') as string

        const address = { details, phone, city }

        startTransition(async () => {
            if (paymentMethod === 'card') {
                const result = await createCheckoutSession(cartId, address)
                if (!result.success) {
                    setError(result.message || 'Failed to create checkout session')
                }
            } else {
                const result = await createOrder(cartId, address)
                if (result.success) {
                    router.push('/products?order_success=true')
                } else {
                    setError(result.message || 'Failed to place order')
                }
            }
        })
    }

    return (
        <Card className="max-w-md w-full mx-auto border-zinc-200 bg-white/80 backdrop-blur-xl shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/80">
            <CardHeader>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Shipping Details
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Please enter your delivery information below.
                </p>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400">
                        {error}
                    </div>
                )}
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Detailed Address</Label>
                        <div className="relative">
                            <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <Input
                                name="details"
                                placeholder="123 Main St, Apt 4B"
                                required
                                className="pl-10 h-12 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <Input
                                name="phone"
                                type="tel"
                                placeholder="+20 1234567890"
                                required
                                className="pl-10 h-12 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>City</Label>
                        <div className="relative">
                            <Building className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <Input
                                name="city"
                                placeholder="Cairo"
                                required
                                className="pl-10 h-12 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/50"
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <Label>Payment Method</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <Button
                                type="button"
                                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                                className={paymentMethod === 'card' ? 'bg-zinc-900 text-white' : ''}
                                onClick={() => setPaymentMethod('card')}
                            >
                                Credit Card
                            </Button>
                            <Button
                                type="button"
                                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                                className={paymentMethod === 'cash' ? 'bg-zinc-900 text-white' : ''}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Cash on Delivery
                            </Button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending || !cartId}
                        className="h-12 w-full mt-4 rounded-xl bg-zinc-900 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                {paymentMethod === 'card' ? 'Pay Securely' : 'Place Order'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default function CheckoutPage() {
    return (
        <main className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-zinc-400" />}>
                <CheckoutForm />
            </Suspense>
        </main>
    )
}
