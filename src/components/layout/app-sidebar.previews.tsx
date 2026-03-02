import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '@/context/auth/authContext';

const meta = {
  component: AppSidebar,
};
export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <AuthProvider>
        <SidebarProvider defaultOpen={true} style={{ minHeight: 500 }}>
          <AppSidebar />
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  ),
};
