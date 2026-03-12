'use server'
import { cookies } from "next/headers";
export async function addToCart(productId: string) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
            body: JSON.stringify({ productId })
        })
        const result: any = await res.json()
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function updateCartProductQuantity(productId: string, quantity: number) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
            body: JSON.stringify({ quantity })
        })
        const result: any = await res.json()
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function deleteCartProduct(productId: string) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
        })
        const result: any = await res.json()
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function clearCart() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
        })
        const result: any = await res.json()
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}