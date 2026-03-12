import React from 'react'
import { signUp } from '@/lib/actions/auth'

export default function Signup() {
    return (
        <div className='container'>
            <form action={signUp}>
                <input type="text" placeholder='name' name='name' />
                <input type="email" placeholder='email' name='email' />
                <input type="password" placeholder='password' name='password' />
                <input type="password" placeholder='rePassword' name='rePassword' />
                <input type="text" placeholder='phone' name='phone' />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
