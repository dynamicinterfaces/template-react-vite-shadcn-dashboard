import { useNavigate } from 'react-router'
import { useAuth } from '@/context/auth/authContext'

export default function WelcomePage() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()

  const handleContinue = () => navigate('/')
  const handleLogout = () => {
    dispatch({ type: 'logout' })
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        {state.authInfo?.user.email && (
          <p className="text-muted-foreground mt-1 text-sm">{state.authInfo.user.email}</p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleContinue}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
        >
          Go to dashboard
        </button>
        <button
          onClick={handleLogout}
          className="border-input bg-background hover:bg-accent rounded-md border px-4 py-2 text-sm font-medium"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
