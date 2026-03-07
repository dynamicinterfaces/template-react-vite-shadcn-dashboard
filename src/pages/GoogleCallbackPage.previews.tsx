import { MemoryRouter } from 'react-router'
import { AuthProvider } from '@/context/auth/authContext'
import GoogleCallbackPage from './GoogleCallbackPage'

export default function GoogleCallbackPagePreview() {
  return (
    <AuthProvider>
      <MemoryRouter initialEntries={['/auth/google/callback']}>
        <GoogleCallbackPage />
      </MemoryRouter>
    </AuthProvider>
  )
}
