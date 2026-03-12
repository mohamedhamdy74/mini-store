import { NextResponse } from "next/server"
export async function GET() {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
        if (!res.ok) {
            return NextResponse.json({ message: 'Failed to fetch brands' }, { status: 500 })
        }
        const result = await res.json()
        return NextResponse.json(result)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}