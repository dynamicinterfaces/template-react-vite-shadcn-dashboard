import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from '../../components/ui/sidebar';
import { AuthProvider } from '../../context/auth/authContext';
import { MemoryRouter } from 'react-router';

function AppSidebarPreview() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <SidebarProvider defaultOpen={true}>
          <div style={{ width: 280, height: 600, position: 'relative' }}>
            <AppSidebar />
          </div>
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: AppSidebarPreview,
};
export default meta;

export const Default = {};
