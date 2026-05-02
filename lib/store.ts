import { create } from 'zustand'

interface StoreState {
    cartCount: number
    wishlistCount: number
    setCartCount: (count: number) => void
    setWishlistCount: (count: number) => void
    fetchCounts: () => Promise<void>
}

export const useStore = create<StoreState>((set) => ({
    cartCount: 0,
    wishlistCount: 0,
    setCartCount: (count) => set({ cartCount: count }),
    setWishlistCount: (count) => set({ wishlistCount: count }),
    fetchCounts: async () => {
        try {
            const [cartRes, wishRes] = await Promise.all([
                fetch('/api/cart', { cache: 'no-store' }),
                fetch('/api/wishlist', { cache: 'no-store' })
            ])
            if (cartRes.ok) {
                const cartData = await cartRes.json()
                set({ cartCount: cartData.numOfCartItems || 0 })
            }
            if (wishRes.ok) {
                const wishData = await wishRes.json()
                set({ wishlistCount: wishData.count || wishData.data?.length || 0 })
            }
        } catch (error) {
            console.error('Failed to fetch counts', error)
        }
    }
}))
