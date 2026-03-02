import { Search } from './search';
import React from 'react';

import * as searchModule from '../context/search-context';
const originalUseSearch = searchModule.useSearch;

function MockSearchProvider({ children }: { children: React.ReactNode }) {
  // @ts-expect-error patching module for preview
  searchModule.useSearch = () => ({ open: false, setOpen: () => {} });
  React.useEffect(() => {
    return () => { searchModule.useSearch = originalUseSearch; };
  }, []);
  return <>{children}</>;
}

function SearchPreview() {
  return (
    <MockSearchProvider>
      <div style={{ padding: 24, maxWidth: 400 }}>
        <Search placeholder="Search commands..." />
      </div>
    </MockSearchProvider>
  );
}

const meta = {
  component: SearchPreview,
};

export default meta;

export const Default = {};
