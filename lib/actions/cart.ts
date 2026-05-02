'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { API_BASE_URL } from "@/lib/constants"
import type { ActionResult } from "@/lib/types"

async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export async function addToCart(productId: string): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ productId })
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/cart')
            return { success: true, message: result.message || 'Added to cart', data: result }
        }
        return { success: false, message: result.message || 'Failed to add to cart' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function updateCartProductQuantity(productId: string, quantity: number): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/cart/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ count: quantity.toString() })
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/cart')
            return { success: true, message: 'Cart updated', data: result }
        }
        return { success: false, message: result.message || 'Failed to update cart' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function deleteCartProduct(productId: string): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/cart')
            return { success: true, message: 'Item removed from cart', data: result }
        }
        return { success: false, message: result.message || 'Failed to remove item' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function clearCart(): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/cart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        const result = await res.json()

        revalidatePath('/cart')
        return { success: true, message: result.message || 'Cart cleared' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}