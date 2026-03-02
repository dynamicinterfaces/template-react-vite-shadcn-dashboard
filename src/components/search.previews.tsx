import { Search } from './search';
import { SearchProvider } from '../context/search-context';
import { ThemeProvider } from '../context/theme-context';
import { AuthProvider } from '../context/auth/authContext';
import { MemoryRouter } from 'react-router';

function SearchPreview() {
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <SearchProvider>
            <div style={{ padding: 24, maxWidth: 400 }}>
              <Search placeholder="Search commands..." />
            </div>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: SearchPreview,
};

export default meta;

export const Default = {};
