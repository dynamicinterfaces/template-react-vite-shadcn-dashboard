import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/context/auth/authContext'
import { ThemeProvider } from '@/context/theme-context'
import { MemoryRouter } from 'react-router'
import { Search } from './search'

// Minimal search context mock — avoids pulling in CommandMenu + its deps
import React from 'react'
const SearchContext = React.createContext<{ open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> } | null>(null)

function Preview() {
  const [open, setOpen] = React.useState(false)
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme='light' storageKey='preview-theme'>
        <AuthProvider>
          <SidebarProvider>
            <SearchContext.Provider value={{ open, setOpen }}>
              <div style={{ padding: 16, width: 280 }}>
                <Search />
              </div>
            </SearchContext.Provider>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

const meta = { title: 'Search', component: Preview }
export default meta
export const Default = {}
