import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!res.ok) {
        return NextResponse.json({ message: 'failed to fetch users' }, { status: 500 })
    }
    const result: any = await res.json()
    return NextResponse.json(result)
}