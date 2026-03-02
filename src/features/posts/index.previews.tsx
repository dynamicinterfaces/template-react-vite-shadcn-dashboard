import Posts from './index';
import { MemoryRouter } from 'react-router';

const meta = {
  component: Posts,
  decorators: [(Story: any) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  )],
};
export default meta;

export const Default = {};
