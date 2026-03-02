import { NavGroup } from './nav-group';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { MemoryRouter } from 'react-router';
import { LayoutDashboard, CreditCard, Columns3 } from 'lucide-react';

const meta = {
  component: NavGroup,
};
export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <SidebarProvider defaultOpen={true} style={{ minHeight: 400 }}>
        <Sidebar>
          <SidebarContent>
            <NavGroup
              title="Main Menu"
              children={[
                { title: 'Dashboard', path: '/', icon: LayoutDashboard },
                { title: 'Payment', path: '/payment', icon: CreditCard },
                {
                  title: 'Kanban',
                  icon: Columns3,
                  children: [
                    { title: 'Board', path: '/kanban' },
                    { title: 'Create', path: '/kanban/create' },
                  ],
                },
              ]}
            />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </MemoryRouter>
  ),
};
