import { CommandMenu } from './command-menu';
import { ThemeProvider } from '../context/theme-context';
import { MemoryRouter } from 'react-router';
import React from 'react';

import * as searchModule from '../context/search-context';
const originalUseSearch = searchModule.useSearch;

function MockSearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);
  // @ts-expect-error patching module for preview
  searchModule.useSearch = () => ({ open, setOpen });
  React.useEffect(() => {
    return () => { searchModule.useSearch = originalUseSearch; };
  }, []);
  return <>{children}</>;
}

function CommandMenuPreview() {
  return (
    <MemoryRouter>
      <ThemeProvider defaultTheme="light">
        <MockSearchProvider>
          <div style={{ minHeight: 400 }}>
            <CommandMenu />
          </div>
        </MockSearchProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

const meta = {
  component: CommandMenuPreview,
};

export default meta;

export const Default = {};
