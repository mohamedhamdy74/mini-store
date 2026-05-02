'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API_BASE_URL } from "@/lib/constants"
import type { ActionResult } from "@/lib/types"

export async function signUp(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())

    let shouldRedirect = false

    try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.message === 'success') {
            shouldRedirect = true
        } else {
            return { success: false, message: result.message || 'Signup failed' }
        }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }

    if (shouldRedirect) redirect('/login')
    return { success: false, message: 'Unknown error' }
}

export async function signIn(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())

    let shouldRedirect = false

    try {
        const res = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.message === 'success') {
            const cookieStore = await cookies()
            cookieStore.set('token', result.token, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
            shouldRedirect = true
        } else {
            return { success: false, message: result.message || 'Invalid credentials' }
        }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }

    if (shouldRedirect) redirect('/')
    return { success: false, message: 'Unknown error' }
}

export async function signOut(): Promise<ActionResult> {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('token')
    } catch {
        return { success: false, message: 'Failed to sign out' }
    }
    redirect('/login')
}

export async function forgotPassword(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())

    try {
        const res = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.statusMsg === 'success' || result.message === 'success') {
            return { success: true, message: 'Reset code sent to your email' }
        }
        return { success: false, message: result.message || 'Failed to send reset code' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function verifyCode(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())

    try {
        const res = await fetch(`${API_BASE_URL}/auth/verifyResetCode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.status === 'Success') {
            return { success: true, message: 'Code verified successfully' }
        }
        return { success: false, message: result.message || 'Invalid code' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function resetPassword(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())
    let shouldRedirect = false

    try {
        const res = await fetch(`${API_BASE_URL}/auth/resetPassword`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.token) {
            shouldRedirect = true
        } else {
            return { success: false, message: result.message || 'Failed to reset password' }
        }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }

    if (shouldRedirect) redirect('/login')
    return { success: false, message: 'Unknown error' }
}

export async function updateLoggedUserPassword(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())
    let shouldRedirect = false

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) return { success: false, message: 'Not authenticated' }

        const res = await fetch(`${API_BASE_URL}/users/changeMyPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.message === 'success' || result.token) {
            shouldRedirect = true
        } else {
            return { success: false, message: result.message || 'Failed to update password' }
        }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }

    if (shouldRedirect) redirect('/login')
    return { success: false, message: 'Unknown error' }
}

export async function updateLoggedUserData(formData: FormData): Promise<ActionResult> {
    const data = Object.fromEntries(formData.entries())

    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) return { success: false, message: 'Not authenticated' }

        const res = await fetch(`${API_BASE_URL}/users/updateMe`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.message === 'success') {
            return { success: true, message: 'Profile updated successfully', data: result.user }
        }
        return { success: false, message: result.message || 'Failed to update profile' }
    } catch {
        return { success: false, message: 'Network error. Please try again.' }
    }
}

export async function getAuthToken(): Promise<string | null> {
    try {
        const cookieStore = await cookies()
        return cookieStore.get('token')?.value || null
    } catch {
        return null
    }
}