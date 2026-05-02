import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API_BASE_URL } from "@/lib/constants"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import Image from "next/image"

async function fetchUserOrders(userId: string, token: string) {
    const res = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
        headers: { 'token': token },
        cache: 'no-store'
    })
    if (!res.ok) return []
    return res.json()
}

export default async function OrdersPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) redirect('/login')

    let userId = ""
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        userId = payload.id
    } catch {
        redirect('/login')
    }

    const ordersData = await fetchUserOrders(userId, token)
    const orders = Array.isArray(ordersData) ? ordersData : []

    return (
        <main className="container mx-auto px-4 py-12 md:px-8 lg:px-12 min-h-[calc(100vh-72px)]">
            <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                My Orders
            </h1>
            {orders.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-24 text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <Package className="h-16 w-16 mb-4 text-zinc-300 dark:text-zinc-700" />
                    <p className="text-xl font-medium">You have no orders yet.</p>
                 </div>
            ) : (
                <div className="space-y-8 max-w-4xl">
                    {orders.map((order: any) => (
                        <Card key={order._id} className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-md">
                            <CardHeader className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-zinc-500 font-medium mb-1">Order #{order.id}</p>
                                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Badge className={order.isPaid ? 'bg-emerald-500 hover:bg-emerald-600 border-none text-white' : 'bg-amber-500 hover:bg-amber-600 border-none text-white'}>
                                        {order.isPaid ? 'Paid' : 'Unpaid'}
                                    </Badge>
                                    <Badge className={order.isDelivered ? 'bg-emerald-500 hover:bg-emerald-600 border-none text-white' : 'bg-blue-500 hover:bg-blue-600 border-none text-white'}>
                                        {order.isDelivered ? 'Delivered' : 'Processing'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {order.cartItems.map((item: any) => (
                                        <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className="relative h-20 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                                                {item.product?.imageCover ? (
                                                    <Image src={item.product.imageCover} alt={item.product.title} fill sizes="80px" className="object-contain p-2" />
                                                ) : (
                                                    <Package className="h-6 w-6 text-zinc-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 text-lg mb-1">{item.product?.title || 'Unknown Product'}</p>
                                                <p className="text-sm font-medium text-zinc-500">Qty: {item.count} × EGP {item.price}</p>
                                            </div>
                                            <div className="font-bold text-lg text-zinc-900 dark:text-zinc-100 sm:text-right">
                                                EGP {(item.count * item.price).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-sm text-zinc-500 font-medium">Payment Method</p>
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100 capitalize">{order.paymentMethodType}</p>
                                    </div>
                                    <div className="sm:text-right w-full sm:w-auto p-4 sm:p-0 bg-zinc-50 sm:bg-transparent rounded-xl dark:bg-zinc-900/50">
                                        <p className="text-sm text-zinc-500 font-medium">Total Amount</p>
                                        <p className="text-2xl font-black text-zinc-900 dark:text-white">EGP {order.totalOrderPrice.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    )
}
