import Login from './login';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '@/context/auth/authContext';

const meta = {
  component: Login,
  decorators: [(Story: any) => (
    <MemoryRouter>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </MemoryRouter>
  )],
};
export default meta;

export const Default = {};
