import { SearchProvider } from '../context/search-context';
import { ThemeProvider } from '../context/theme-context';
import { AuthProvider } from '../context/auth/authContext';
import { MemoryRouter } from 'react-router';

function CommandMenuPreview() {
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <SearchProvider>
            <div style={{ minHeight: 400 }}>
              <p style={{ fontSize: 14, color: 'var(--muted-foreground)', padding: 16 }}>
                Press Cmd+K to open the command menu
              </p>
            </div>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: CommandMenuPreview,
};

export default meta;

export const Default = {};
