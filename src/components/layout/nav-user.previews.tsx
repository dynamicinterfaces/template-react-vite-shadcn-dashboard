import { NavUser } from './nav-user';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter } from '../../components/ui/sidebar';
import { AuthProvider } from '../../context/auth/authContext';
import { MemoryRouter } from 'react-router';

function NavUserPreview() {
  return (
    <MemoryRouter>
      <AuthProvider>
        <SidebarProvider defaultOpen={true}>
          <Sidebar>
            <SidebarContent />
            <SidebarFooter>
              <NavUser user={{ name: 'John Doe', email: 'john@example.com', avatar: '' }} />
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: NavUserPreview,
};

export default meta;

export const Default = {};
