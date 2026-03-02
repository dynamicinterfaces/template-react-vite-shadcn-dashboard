import { KanbanContainer } from './kanban.container';
import { KanbanProvider, useKanban } from '@/context/kanban/kanbanContext';
import { mockData } from './mock-data';
import React from 'react';
import { MemoryRouter } from 'react-router';

// Seed mock data into the real KanbanProvider on mount
function KanbanSeeder({ children }: { children: React.ReactNode }) {
  const { dispatch } = useKanban();
  const seeded = React.useRef(false);
  React.useEffect(() => {
    if (!seeded.current) {
      seeded.current = true;
      dispatch({ type: 'update-kanban', payload: mockData });
    }
  }, [dispatch]);
  return <>{children}</>;
}

const meta = {
  component: KanbanContainer,
};
export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <KanbanProvider>
        <KanbanSeeder>
          <div style={{ padding: 16, overflow: 'auto' }}>
            <KanbanContainer />
          </div>
        </KanbanSeeder>
      </KanbanProvider>
    </MemoryRouter>
  ),
};
