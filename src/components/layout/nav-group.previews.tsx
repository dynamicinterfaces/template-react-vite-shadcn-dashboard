import { NavGroup } from './nav-group';
import { SidebarProvider, Sidebar, SidebarContent } from '../../components/ui/sidebar';
import { MemoryRouter } from 'react-router';
import { LayoutDashboard, Users, Settings, Bell, Shield } from 'lucide-react';

const sampleGroup = {
  title: 'Main Navigation',
  children: [
    { title: 'Dashboard', path: '/', icon: LayoutDashboard },
    { title: 'Users', path: '/users', icon: Users, badge: '12' },
    {
      title: 'Settings',
      icon: Settings,
      children: [
        { title: 'General', path: '/settings/general' },
        { title: 'Notifications', path: '/settings/notifications', icon: Bell },
        { title: 'Security', path: '/settings/security', icon: Shield },
      ],
    },
  ],
};

function NavGroupPreview() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <SidebarProvider defaultOpen={true}>
        <Sidebar>
          <SidebarContent>
            <NavGroup {...sampleGroup} />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: NavGroupPreview,
};

export default meta;

export const Default = {};
