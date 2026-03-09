import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/context/auth/authContext'
import { ThemeProvider } from '@/context/theme-context'
import { MemoryRouter, Route, Routes } from 'react-router'
import Layout from './index'

function Preview() {
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme='light' storageKey='preview-theme'>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<div style={{ padding: 16, color: '#888' }}>Page content</div>} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

const meta = { title: 'Layout', component: Preview }
export default meta
export const Default = {}
