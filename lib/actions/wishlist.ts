'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { API_BASE_URL } from "@/lib/constants"
import type { ActionResult } from "@/lib/types"

async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export async function addToWishlist(productId: string): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ productId })
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/wishlist')
            return { success: true, message: result.message || 'Added to wishlist', data: result.data }
        }
        return { success: false, message: result.message || 'Failed to add to wishlist' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function delFromWishlist(productId: string): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/wishlist')
            return { success: true, message: result.message || 'Removed from wishlist', data: result.data }
        }
        return { success: false, message: result.message || 'Failed to remove from wishlist' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}