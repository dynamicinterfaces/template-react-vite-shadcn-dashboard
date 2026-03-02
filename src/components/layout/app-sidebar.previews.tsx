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
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  ),
};

export const Collapsed = {
  render: () => (
    <MemoryRouter>
      <AuthProvider>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  ),
};
