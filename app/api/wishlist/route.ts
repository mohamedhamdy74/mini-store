import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/constants"

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const res = await fetch(`${API_BASE_URL}/wishlist`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })

        if (!res.ok) {
            return NextResponse.json(
                { message: 'Failed to fetch wishlist' },
                { status: res.status }
            )
        }

        const result = await res.json()
        return NextResponse.json(result)
    } catch {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}