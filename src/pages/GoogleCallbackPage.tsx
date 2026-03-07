import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/auth/authContext'
import { decodeIdToken, parseCallbackHash } from '@/lib/google-auth'

export default function GoogleCallbackPage() {
  const { dispatch } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const idToken = parseCallbackHash()
    if (!idToken) { navigate('/login', { replace: true }); return }
    try {
      const googleUser = decodeIdToken(idToken)
      const payload = { token: idToken, user: { email: googleUser.email, username: googleUser.name } }
      localStorage.setItem('auth', JSON.stringify(payload))
      dispatch({ type: 'login', payload })
      navigate('/', { replace: true })
    } catch {
      navigate('/login', { replace: true })
    }
  }, [dispatch, navigate])

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-muted-foreground text-sm">Signing in with Google…</div>
    </div>
  )
}
