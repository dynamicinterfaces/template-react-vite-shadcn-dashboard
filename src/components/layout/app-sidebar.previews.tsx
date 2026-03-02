import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from '../../components/ui/sidebar';
import { MemoryRouter } from 'react-router';
import React from 'react';

/**
 * Composed preview: AppSidebar
 * Full sidebar with navigation groups and user menu.
 * Mocks AuthContext and sidebar data to avoid external dependencies.
 */

const mockAuthContext = React.createContext({
  state: { authInfo: { user: { username: 'John Doe' } } },
  dispatch: () => {},
});

// Patch useAuth to use our mock
import * as authModule from '../../context/auth/authContext';
const originalUseAuth = authModule.useAuth;

function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const value = React.useContext(mockAuthContext);
  // @ts-expect-error patching module for preview
  authModule.useAuth = () => value;
  React.useEffect(() => {
    return () => { authModule.useAuth = originalUseAuth; };
  }, []);
  return <>{children}</>;
}

function AppSidebarPreview() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <MockAuthProvider>
        <SidebarProvider defaultOpen={true}>
          <div style={{ width: 280, height: 600, position: 'relative' }}>
            <AppSidebar />
          </div>
        </SidebarProvider>
      </MockAuthProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: AppSidebarPreview,
};
export default meta;

export const Default = {};
