import { KanbanProvider } from '../../context/kanban/kanbanContext';
import { KanbanContainer } from './kanban.container';
import { mockData } from './mock-data';
import { MemoryRouter } from 'react-router';
import { useEffect } from 'react';

/**
 * Composed preview: KanbanBoard
 * Renders the full kanban board with real components (Column → Card → Badge, etc.)
 * wrapped in required providers: KanbanProvider, MemoryRouter.
 *
 * Seeds localStorage with mock data so the reducer picks it up on init.
 */

function KanbanBoardPreview() {
  useEffect(() => {
    localStorage.setItem('mockData', JSON.stringify(mockData));
  }, []);

  return (
    <MemoryRouter>
      <KanbanProvider>
        <div style={{ padding: 16, minWidth: 900, overflow: 'auto' }}>
          <KanbanContainer />
        </div>
      </KanbanProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: KanbanBoardPreview,
};
export default meta;

export const Default = {};
