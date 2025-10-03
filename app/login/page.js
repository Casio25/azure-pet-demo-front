'use client'
import { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [ok, setOk] = useState(false)
    const [error, setError] = useState('')

    const API = process.env.NEXT_PUBLIC_API_BASE
    console.log('API_BASE =', process.env.NEXT_PUBLIC_API_BASE);


    async function submit(e) {
        e.preventDefault()
        setLoading(true); setOk(false); setError('')
        try {
            const r = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify({ email, password }),
            })
            if (!r.ok) {
                const t = await r.text().catch(() => '')
                throw new Error(t || `Login failed: ${r.status}`)
            }
            setOk(true)
            
            setTimeout(() => { window.location.href = '/photos' }, 800)
        } catch (e) {
            setError(e.message || 'Login error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 360, margin: '40px auto', padding: 16, fontFamily: 'system-ui' }}>
            <h2 style={{ marginBottom: 16 }}>Log in</h2>
            <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
                <input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ padding: 8, border: '1px solid #ccc', borderRadius: 8 }}
                />
                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{ padding: 8, border: '1px solid #ccc', borderRadius: 8 }}
                />
                <button type="submit" disabled={loading}
                    style={{ padding: 10, borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff' }}>
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            {/* индикатор успеха */}
            {ok && (
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a' }}>
                    <span style={{
                        display: 'inline-block', width: 18, height: 18, borderRadius: '50%',
                        background: '#16a34a', color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: '18px'
                    }}>✓</span>
                    <span>Успешный вход</span>
                </div>
            )}

            {/* ошибка */}
            {error && (
                <div style={{ marginTop: 12, color: '#dc2626' }}>
                    {error}
                </div>
            )}
        </div>
    )
}
