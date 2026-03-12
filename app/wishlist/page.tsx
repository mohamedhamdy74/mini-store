import React from 'react'
import { GET } from '../api/wishlist/route'
import { Product } from '@/lib/types'
import Image from 'next/image'
export default async function Wishlist() {
    const res = await GET()
    const result = await res.json()
    if (!result) return <div>Not Found</div>
    const data = result.data
    console.log(data)
    return (
        <main>
            <h1>Wishlist</h1>
            <div>
                {
                    data.map((item: Product) => (
                        <div key={item.id} className='flex gap-2'>
                            <Image src={item.imageCover} alt={item.title} width={100} height={100} />
                            <div>
                                <h2>{item.title}</h2>
                                <p>{item.price}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}
