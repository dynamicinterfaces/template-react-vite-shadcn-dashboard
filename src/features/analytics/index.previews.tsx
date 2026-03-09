import { MemoryRouter, Route, Routes } from 'react-router';
import AnalyticsPage from './index';

function Preview() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<AnalyticsPage />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}

const meta = { title: 'Analytics', component: Preview };
export default meta;
export const Default = {};
