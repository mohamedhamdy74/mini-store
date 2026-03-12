import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result: any = await res.json()
        console.log(result);
        return NextResponse.json(result)
    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}