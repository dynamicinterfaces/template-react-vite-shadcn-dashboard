import { KanbanContainer } from './kanban.container';
import { KanbanProvider } from '@/context/kanban/kanbanContext';

const meta = {
  component: KanbanContainer,
};
export default meta;

export const Default = {
  render: () => (
    <KanbanProvider>
      <div style={{ padding: 16, overflow: 'auto' }}>
        <KanbanContainer />
      </div>
    </KanbanProvider>
  ),
};
