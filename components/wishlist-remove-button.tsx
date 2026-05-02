'use client'

import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { delFromWishlist } from '@/lib/actions/wishlist'
import { useState } from 'react'
import { useStore } from '@/lib/store'

export function WishlistRemoveButton({ productId }: { productId: string }) {
    const [loading, setLoading] = useState(false)
    const { fetchCounts } = useStore()

    async function handleRemove() {
        setLoading(true)
        await delFromWishlist(productId)
        fetchCounts()
        setLoading(false)
    }

    return (
        <Button
            size="sm"
            variant="outline"
            className="rounded-full px-3 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950/30"
            onClick={handleRemove}
            disabled={loading}
        >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
        </Button>
    )
}
