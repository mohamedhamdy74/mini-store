import React from 'react'
import { signIn } from '@/lib/actions/auth'

export default function Login() {
    return (
        <div className='container'>
            <form action={signIn}>
                <input type="email" placeholder='email' name='email' />
                <input type="password" placeholder='password' name='password' />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
