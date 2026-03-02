import { NavUser } from './nav-user';
import { SidebarProvider, Sidebar, SidebarFooter } from '@/components/ui/sidebar';
import React from 'react';

// Mock AuthContext to avoid useAuth throwing
const AuthContext = React.createContext<any>({
  state: { authInfo: { user: { username: 'johndoe' } } },
  dispatch: () => {},
});

// Patch the module's useAuth by wrapping with provider
const meta = {
  component: NavUser,
  args: {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '',
    },
  },
};
export default meta;

export const Default = {
  render: () => (
    <SidebarProvider defaultOpen={true}>
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
  ),
};
