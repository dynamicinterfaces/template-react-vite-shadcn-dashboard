import { Column } from './column.component';
import { MemoryRouter } from 'react-router';

const meta = {
  component: Column,
};
export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <div style={{ padding: 16 }}>
        <Column
          columnId={1}
          name="To Do"
          content={[
            { id: 1, title: 'Design system', description: 'Set up design tokens and base components', assignTo: ['Alice'] },
            { id: 2, title: 'API integration', description: 'Connect frontend to REST API endpoints', assignTo: ['Bob', 'Charlie'] },
            { id: 3, title: 'Write tests', description: 'Unit tests for core business logic', assignTo: ['Alice'] },
          ]}
        />
      </div>
    </MemoryRouter>
  ),
};
