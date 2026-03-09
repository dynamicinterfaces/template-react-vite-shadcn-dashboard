import { MemoryRouter, Route, Routes } from 'react-router';
import PostDetail from './index';

function Preview() {
  return (
    <MemoryRouter initialEntries={['/posts/1']}>
      <Routes>
        <Route path='/posts/:postId' element={<PostDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

const meta = { title: 'PostDetail', component: Preview };
export default meta;
export const Default = {};
