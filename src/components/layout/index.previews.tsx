import Layout from './index';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '@/context/auth/authContext';
import { SearchProvider } from '@/context/search-context';
import { ThemeProvider } from '@/context/theme-context';

const meta = {
  component: Layout,
};
export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  ),
};
