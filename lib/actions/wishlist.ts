'use server'
import { log } from "console";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
export async function addToWishlist(productId: string) {
    const cookieStore = await cookies()
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': cookieStore.get('token')?.value || ''
        },
        body: JSON.stringify({ productId })
    })
    const result = await res.json()
    console.log(result);
    revalidatePath('/wishlist')
    return result
}
export async function delFromWishlist(productId: string) {
    const cookieStore = await cookies()
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': cookieStore.get('token')?.value || ''
        },
    })
    const result = await res.json()
    console.log(result);
    revalidatePath('/wishlist')
    return result
}