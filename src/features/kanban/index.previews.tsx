import { KanbanProvider, useKanban } from '@/context/kanban/kanbanContext';
import { MemoryRouter } from 'react-router';
import { useEffect, useState } from 'react';
import { mockData } from '@/components/kanban/mock-data';
import Kanban from './index';

function KanbanSeeder({ children }: { children: React.ReactNode }) {
  const { dispatch } = useKanban();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch({ type: 'update-kanban', payload: mockData });
    setReady(true);
  }, [dispatch]);

  if (!ready) return null;
  return <>{children}</>;
}

function KanbanPagePreview() {
  return (
    <MemoryRouter initialEntries={['/kanban']}>
      <KanbanProvider>
        <KanbanSeeder>
          <div style={{ padding: 16, minWidth: 900, overflow: 'auto' }}>
            <Kanban />
          </div>
        </KanbanSeeder>
      </KanbanProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: KanbanPagePreview,
};
export default meta;

export const Default = {};
