import { MemoryRouter, Route, Routes } from 'react-router';
import { KanbanProvider } from '@/context/kanban/kanbanContext';
import EditKanban from './index';

function Preview() {
  return (
    <MemoryRouter initialEntries={['/kanban/edit/1']}>
      <KanbanProvider>
        <Routes>
          <Route path='/kanban/edit/:id' element={<EditKanban />} />
        </Routes>
      </KanbanProvider>
    </MemoryRouter>
  );
}

const meta = { title: 'EditKanban', component: Preview };
export default meta;
export const Default = {};
