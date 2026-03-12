'use server'
import { cookies } from "next/headers";
export async function addUserAddress(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
            body: JSON.stringify(data)
        })

        const result: any = await res.json()
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function deleteAddress(addressId: string) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
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