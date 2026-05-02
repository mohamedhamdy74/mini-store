import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 })
        }

        return NextResponse.json({ authenticated: true }, { status: 200 })
    } catch {
        return NextResponse.json(
            { authenticated: false, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}