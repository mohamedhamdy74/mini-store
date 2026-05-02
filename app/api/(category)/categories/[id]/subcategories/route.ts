import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/constants"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const res = await fetch(`${API_BASE_URL}/categories/${id}/subcategories`)

        if (!res.ok) {
            return NextResponse.json(
                { message: 'Failed to fetch subcategories' },
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