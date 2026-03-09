import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/context/auth/authContext'
import { SearchProvider } from '@/context/search-context'
import { ThemeProvider } from '@/context/theme-context'
import { MemoryRouter } from 'react-router'
import { Search } from './search'

function Preview() {
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme='light' storageKey='preview-theme'>
        <AuthProvider>
          <SidebarProvider>
            <SearchProvider>
              <div style={{ padding: 16, width: 280 }}>
                <Search />
              </div>
            </SearchProvider>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

const meta = { title: 'Search', component: Preview }
export default meta
export const Default = {}
