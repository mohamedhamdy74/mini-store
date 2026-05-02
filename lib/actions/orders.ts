'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API_BASE_URL, BASE_URL } from "@/lib/constants"
import type { ActionResult } from "@/lib/types"

async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export async function createOrder(
    cartId: string,
    addressDetails: { details: string; phone: string; city: string }
): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/orders/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ shippingAddress: addressDetails })
        })
        const result = await res.json()

        if (result.status === 'success') {
            return { success: true, message: 'Order placed successfully', data: result }
        }
        return { success: false, message: result.message || 'Failed to place order' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function createCheckoutSession(
    cartId: string,
    shippingAddress: { details: string; phone: string; city: string }
): Promise<ActionResult> {
    let sessionUrl = ""

    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(
            `${API_BASE_URL}/orders/checkout-session/${cartId}?url=${BASE_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ shippingAddress })
            }
        )
        const data = await res.json()

        if (data.status === "success") {
            sessionUrl = data.session.url
        } else {
            return { success: false, message: data.message || "Failed to create checkout session" }
        }
    } catch {
        return { success: false, message: "Network error. Please try again." }
    }

    if (sessionUrl) {
        redirect(sessionUrl)
    }
    return { success: false, message: 'Failed to get checkout URL' }
}