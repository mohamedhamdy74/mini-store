import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/constants"

export async function GET() {
    try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            headers: { 'Content-Type': 'application/json' },
        })

        if (!res.ok) {
            return NextResponse.json(
                { message: 'Failed to fetch orders' },
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