import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
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