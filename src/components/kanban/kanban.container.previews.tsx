import { KanbanContainer } from './kanban.container';
import { mockData } from './mock-data';
import React from 'react';
import { MemoryRouter } from 'react-router';

// Inline KanbanContext provider with mock data pre-loaded
const KanbanContext = React.createContext<any>(undefined);

function MockKanbanProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(
    (s: any, a: any) => (a.type === 'update-kanban' ? a.payload : s),
    mockData,
  );
  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
}

const meta = {
  component: KanbanContainer,
};
export default meta;

export const Default = {
  render: () => (
    <MemoryRouter>
      <MockKanbanProvider>
        <div style={{ padding: 16, overflow: 'auto' }}>
          <KanbanContainer />
        </div>
      </MockKanbanProvider>
    </MemoryRouter>
  ),
};
