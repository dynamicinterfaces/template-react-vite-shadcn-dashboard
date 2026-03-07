import { MemoryRouter } from 'react-router'
import { AuthProvider } from '@/context/auth/authContext'
import GoogleCallbackPage from './GoogleCallbackPage'

const meta = {
  component: GoogleCallbackPage,
  decorators: [(Story: any) => (
    <MemoryRouter initialEntries={['/auth/google/callback']}>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </MemoryRouter>
  )],
}
export default meta

export const Default = {}
