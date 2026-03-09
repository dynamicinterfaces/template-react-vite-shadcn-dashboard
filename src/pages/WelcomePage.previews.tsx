import { MemoryRouter, Route, Routes } from 'react-router';
import { AuthProvider } from '@/context/auth/authContext';
import WelcomePage from './WelcomePage';

function Preview() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <MemoryRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<WelcomePage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    </div>
  );
}

const meta = { title: 'WelcomePage', component: Preview };
export default meta;
export const Default = {};
