import { Header } from './header';
import { SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  component: Header,
};
export default meta;

export const Default = {
  render: () => (
    <SidebarProvider>
      <Header>
        <span style={{ marginRight: 8, fontWeight: 600 }}>Dashboard</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <span>Search</span>
          <span>Theme</span>
        </div>
      </Header>
    </SidebarProvider>
  ),
};

export const Fixed = {
  render: () => (
    <SidebarProvider>
      <Header fixed>
        <span style={{ fontWeight: 600 }}>Fixed Header</span>
      </Header>
    </SidebarProvider>
  ),
};
