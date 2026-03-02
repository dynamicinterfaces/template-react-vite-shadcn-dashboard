import type { Meta, StoryObj } from '@storybook/react';
import { NavUser } from './nav-user';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter } from '../../components/ui/sidebar';
import { MemoryRouter } from 'react-router';
import React from 'react';

import * as authModule from '../../context/auth/authContext';
const originalUseAuth = authModule.useAuth;

function MockAuthProvider({ children }: { children: React.ReactNode }) {
  // @ts-expect-error patching module for preview
  authModule.useAuth = () => ({
    state: { authInfo: { user: { username: 'John Doe' } } },
    dispatch: () => {},
  });
  React.useEffect(() => {
    return () => { authModule.useAuth = originalUseAuth; };
  }, []);
  return <>{children}</>;
}

function NavUserPreview() {
  return (
    <MemoryRouter>
      <MockAuthProvider>
        <SidebarProvider defaultOpen={true}>
          <Sidebar>
            <SidebarContent />
            <SidebarFooter>
              <NavUser user={{ name: 'John Doe', email: 'john@example.com', avatar: '' }} />
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </MockAuthProvider>
    </MemoryRouter>
  );
}

const meta: Meta<typeof NavUserPreview> = {
  component: NavUserPreview,
};

export default meta;
type Story = StoryObj<typeof NavUserPreview>;

export const Default: Story = {};
