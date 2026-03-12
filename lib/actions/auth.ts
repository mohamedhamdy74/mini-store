'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/login')
    }
    return result
}
export async function signIn(formData: FormData) {
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        const cookieStore = await cookies()
        cookieStore.set('token', result.token, {
            httpOnly: true,
            secure: true,
            path: '/',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
        })
        redirect('/')
    }
    return result
}
export async function forgotPassword(formData: FormData) {
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotpassword',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/verify-code')
    }
    return result
}
export async function verifyCode(formData: FormData) {
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/reset-password')
    }
    return result
}
export async function resetPassword(formData: FormData) {
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/login')
    }
    return result
}
export async function updateLoggedUserPassword(formData: FormData) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ""
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/login')
    }
    return result
}
export async function resetLoggedUserPassword(formData: FormData) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/resetPassword',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/login')
    }
    return result
}
export async function updateLoggedUserData(formData: FormData) {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    //translate data to object
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ""
            },
            body: JSON.stringify(data)
        }
    )
    const result: any = await res.json()
    if (result.message === 'success') {
        redirect('/profile')
    }
    return result
}