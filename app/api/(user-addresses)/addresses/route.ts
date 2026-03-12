import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/addresses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token || ''
            },
        })
        const result: any = await res.json()
        console.log(result);
        return NextResponse.json(result)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 })
    }
}
