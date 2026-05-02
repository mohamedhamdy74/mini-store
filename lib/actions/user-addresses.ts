'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { API_BASE_URL } from "@/lib/constants"
import type { ActionResult } from "@/lib/types"

async function getToken() {
    const cookieStore = await cookies()
    return cookieStore.get('token')?.value
}

export async function addUserAddress(formData: FormData): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const data = Object.fromEntries(formData.entries())

        const res = await fetch(`${API_BASE_URL}/addresses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/addresses')
            return { success: true, message: 'Address added successfully', data: result.data }
        }
        return { success: false, message: result.message || 'Failed to add address' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function deleteAddress(addressId: string): Promise<ActionResult> {
    try {
        const token = await getToken()
        if (!token) return { success: false, message: 'Please login first' }

        const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })
        const result = await res.json()

        if (result.status === 'success') {
            revalidatePath('/addresses')
            return { success: true, message: 'Address removed', data: result.data }
        }
        return { success: false, message: result.message || 'Failed to remove address' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}