import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/context/auth/authContext'
import { MemoryRouter } from 'react-router'
import { AppSidebar } from './app-sidebar'

function Preview() {
  return (
    <MemoryRouter>
      <AuthProvider>
        <SidebarProvider defaultOpen style={{ minHeight: 500, width: 260 }}>
          <AppSidebar />
          <SidebarInset />
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

const meta = { title: 'App Sidebar', component: Preview }
export default meta
export const Default = {}
