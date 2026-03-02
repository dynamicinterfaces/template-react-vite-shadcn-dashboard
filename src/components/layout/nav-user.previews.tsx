import { NavUser } from './nav-user';
import { SidebarProvider, Sidebar, SidebarFooter } from '@/components/ui/sidebar';
import { AuthProvider } from '@/context/auth/authContext';

const meta = {
  component: NavUser,
};
export default meta;

export const Default = {
  render: () => (
    <AuthProvider>
      <SidebarProvider defaultOpen={true} style={{ minHeight: 120 }}>
        <Sidebar>
          <SidebarFooter>
            <NavUser
              user={{
                name: 'John Doe',
                email: 'john@example.com',
                avatar: '',
              }}
            />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </AuthProvider>
  ),
};
