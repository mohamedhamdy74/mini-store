import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API_BASE_URL } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { User, MapPin, Shield } from "lucide-react"

async function fetchAddresses(token: string) {
    const res = await fetch(`${API_BASE_URL}/addresses`, {
        headers: { 'token': token },
        cache: 'no-store'
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
}

export default async function ProfilePage() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) redirect('/login')

    let user = null
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        user = { id: payload.id, name: payload.name, role: payload.role }
    } catch {
        redirect('/login')
    }

    const addresses = await fetchAddresses(token)

    return (
        <main className="container mx-auto px-4 py-12 md:px-8 lg:px-12 min-h-[calc(100vh-72px)]">
            <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                My Profile
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="lg:col-span-1 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-8 rounded-3xl shadow-sm h-fit">
                    <div className="flex flex-col items-center text-center">
                        <div className="h-32 w-32 rounded-full bg-linear-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 flex items-center justify-center shrink-0 mb-6 shadow-xl">
                            <User className="h-16 w-16 text-white dark:text-zinc-900" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 capitalize mb-2">{user?.name || 'User'}</h2>
                        <div className="flex items-center justify-center gap-2 mb-6 text-zinc-500 font-medium">
                            <Shield className="h-4 w-4 text-emerald-500" />
                            <span className="capitalize">{user?.role || 'user'} Account</span>
                        </div>
                        <div className="w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 text-left border border-zinc-100 dark:border-zinc-800">
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Account ID</p>
                            <p className="font-mono text-sm text-zinc-900 dark:text-zinc-300 truncate" title={user?.id}>{user?.id}</p>
                        </div>
                    </div>
                </Card>

                {/* Addresses Card */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Saved Addresses
                    </h2>
                    
                    {addresses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            <MapPin className="h-12 w-12 mb-4 text-zinc-300 dark:text-zinc-700" />
                            <p className="text-lg font-medium">No saved addresses found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {addresses.map((address: any) => (
                                <Card key={address._id} className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 hover:border-zinc-300 transition-colors">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                                <MapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{address.name || 'Address'}</h3>
                                                <p className="text-sm text-zinc-500 leading-relaxed mb-2 line-clamp-2">
                                                    {address.details}
                                                </p>
                                                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
                                                    {address.city} • {address.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
