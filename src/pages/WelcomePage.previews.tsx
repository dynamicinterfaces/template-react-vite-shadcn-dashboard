import { MemoryRouter } from 'react-router'
import { AuthProvider } from '@/context/auth/authContext'
import WelcomePage from './WelcomePage'

const meta = {
  component: WelcomePage,
  decorators: [(Story: any) => (
    <MemoryRouter initialEntries={['/welcome']}>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </MemoryRouter>
  )],
}
export default meta

export const Default = {}
