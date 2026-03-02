import { Column } from './column.component';
import { MemoryRouter } from 'react-router';
import type { CardContent } from '../../model';

const mockCards: CardContent[] = [
  { id: 1, title: 'Design homepage', description: 'Create wireframes', assignTo: ['Alice'] },
  { id: 2, title: 'Setup CI/CD', description: 'Configure GitHub Actions', assignTo: ['Bob'] },
  { id: 3, title: 'Write tests', description: 'Unit + integration tests', assignTo: ['Alice', 'Charlie'] },
];

function Wrapper(props: { columnId: number; name: string; content: CardContent[] }) {
  return (
    <MemoryRouter>
      <Column {...props} />
    </MemoryRouter>
  );
}

const meta = {
  component: Wrapper,
  args: {
    columnId: 1,
    name: 'To Do',
    content: mockCards,
  },
};
export default meta;

export const Default = {};

export const Empty = {
  args: {
    columnId: 2,
    name: 'Done',
    content: [],
  },
};
