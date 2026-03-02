import { Button } from './ui/button';
import { SearchIcon } from 'lucide-react';

const meta = {
  title: 'Search',
};
export default meta;

export const Default = {
  render: () => (
    <div style={{ width: 300, padding: 16 }}>
      <Button
        variant="outline"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          justifyContent: 'flex-start',
          height: 32,
          fontSize: 14,
          color: '#64748b',
        }}
      >
        <SearchIcon style={{ width: 16, height: 16 }} />
        <span>Search</span>
        <kbd style={{ marginLeft: 'auto', fontSize: 10, padding: '2px 6px', border: '1px solid #e2e8f0', borderRadius: 4 }}>⌘K</kbd>
      </Button>
    </div>
  ),
};
