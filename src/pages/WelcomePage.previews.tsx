import { MemoryRouter } from 'react-router'
import { AuthProvider } from '@/context/auth/authContext'
import WelcomePage from './WelcomePage'

export default function WelcomePagePreview() {
  return (
    <AuthProvider>
      <MemoryRouter initialEntries={['/welcome']}>
        <WelcomePage />
      </MemoryRouter>
    </AuthProvider>
  )
}
