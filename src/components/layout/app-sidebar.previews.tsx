import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/context/auth/authContext'
import { MemoryRouter } from 'react-router'
import { AppSidebar } from './app-sidebar'

function Preview() {
  return (
    <MemoryRouter>
      <AuthProvider>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

const meta = { title: 'App Sidebar', component: Preview }
export default meta
export const Default = {}
