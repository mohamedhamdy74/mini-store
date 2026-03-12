'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
export async function createOrder(cartId: string, addressDetails: { details: string, phone: string, city: string }) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
            body: JSON.stringify({ shippingAddress: addressDetails })
        })
        const result: any = await res.json()
        console.log(result);
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function createCheckoutSession(cartId: string, shippingAddress: { details: string, phone: string, city: string }) {
    let sessionUrl = "";

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('userToken')?.value;


        // نبعت الـ URL بتاع الـ localhost أو الـ domain بتاعك كـ Query Parameter
        const baseUrl = "http://localhost:3000";
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token || ""
            },
            body: JSON.stringify({ shippingAddress })
        });

        const data = await res.json();

        if (data.status === "success") {
            // الـ API ده بيرجع الـ URL في خاصية اسمها session.url
            sessionUrl = data.session.url;
        } else {
            return { error: data.message || "Failed to create session" };
        }
    } catch (error) {
        return { error: "Internal Server Error" };
    }

    // الـ redirect لازم يحصل بره الـ try/catch في Next.js Actions
    if (sessionUrl) {
        redirect(sessionUrl);
    }
}