import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_BASE_URL } from "@/lib/constants"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const res = await fetch(`${API_BASE_URL}/addresses/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        })

        if (!res.ok) {
            return NextResponse.json(
                { message: 'Failed to fetch address' },
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