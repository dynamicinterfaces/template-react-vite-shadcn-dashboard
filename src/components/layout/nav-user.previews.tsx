import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/context/auth/authContext'
import { NavUser } from './nav-user'

const mockUser = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  avatar: '',
}

function Preview() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div style={{ padding: 16, width: 260 }}>
          <NavUser user={mockUser} />
        </div>
      </SidebarProvider>
    </AuthProvider>
  )
}

const meta = { title: 'Nav User', component: Preview }
export default meta
export const Default = {}
