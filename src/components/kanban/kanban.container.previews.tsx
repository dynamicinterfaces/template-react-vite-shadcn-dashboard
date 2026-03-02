import { KanbanProvider, useKanban } from '../../context/kanban/kanbanContext';
import { KanbanContainer } from './kanban.container';
import { mockData } from './mock-data';
import { MemoryRouter } from 'react-router';
import { useEffect, useState } from 'react';

/**
 * Composed preview: KanbanBoard
 * Renders the full kanban board with real components (Column → Card → Badge, etc.)
 * wrapped in required providers: KanbanProvider, MemoryRouter.
 *
 * KanbanSeeder dispatches mock data into context on mount so the board renders populated.
 */

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

function KanbanBoardPreview() {
  return (
    <MemoryRouter>
      <KanbanProvider>
        <KanbanSeeder>
          <div style={{ padding: 16, minWidth: 900, overflow: 'auto' }}>
            <KanbanContainer />
          </div>
        </KanbanSeeder>
      </KanbanProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: KanbanBoardPreview,
};
export default meta;

export const Default = {};
