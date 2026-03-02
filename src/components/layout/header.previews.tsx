import { Header } from './header';
import { SidebarProvider } from '../../components/ui/sidebar';
import { MemoryRouter } from 'react-router';

function HeaderPreview(args: { fixed?: boolean }) {
  return (
    <MemoryRouter>
      <SidebarProvider defaultOpen={true}>
        <div style={{ width: 600 }}>
          <Header {...args}>
            <h1 style={{ fontSize: 16, fontWeight: 600 }}>Dashboard</h1>
          </Header>
        </div>
      </SidebarProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: HeaderPreview,
  args: {
    fixed: false,
  },
};

export default meta;

export const Default = {};

export const Fixed = {
  args: { fixed: true },
};
