'use client'
import { useState } from 'react'
export default function Register() {
    const [email, setEmail] = useState(''); const [password, setPassword] = useState('')
    const submit = async e => {
        e.preventDefault()
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/register`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        window.location.href = '/login'
    }
    return (
        <form onSubmit={submit}>
            <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Sign up</button>
        </form>
    )
}
