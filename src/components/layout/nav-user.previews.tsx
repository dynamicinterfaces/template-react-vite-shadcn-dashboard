import { ChevronsUpDown } from 'lucide-react';

const meta = {
  title: 'NavUser',
};
export default meta;

export const Default = {
  render: () => (
    <div style={{ width: 240, padding: 8, background: 'var(--sidebar-background, hsl(0 0% 98%))', borderRadius: 8, border: '1px solid hsl(0 0% 90%)', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px', borderRadius: 6, cursor: 'pointer' }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: 'hsl(0 0% 85%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: 'hsl(0 0% 30%)' }}>JD</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: 'hsl(0 0% 10%)' }}>John Doe</span>
          <span style={{ fontSize: 11, color: 'hsl(0 0% 50%)' }}>john@example.com</span>
        </div>
        <ChevronsUpDown style={{ width: 14, height: 14, color: 'hsl(0 0% 50%)' }} />
      </div>
    </div>
  ),
};
