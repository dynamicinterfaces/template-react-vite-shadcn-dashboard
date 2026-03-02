import { Command, LayoutDashboard, CreditCard, Columns3, ChevronsUpDown } from 'lucide-react';

const meta = {
  title: 'AppSidebar',
};
export default meta;

export const Default = {
  render: () => (
    <div
      style={{
        width: 260,
        minHeight: 480,
        background: 'var(--sidebar-background, hsl(0 0% 98%))',
        borderRadius: 8,
        border: '1px solid hsl(0 0% 90%)',
        display: 'flex',
        flexDirection: 'column' as const,
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        color: 'hsl(0 0% 10%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: 'hsl(0 0% 10%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Command style={{ width: 16, height: 16 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Dashboard Starter Kit</span>
          <span style={{ fontSize: 11, opacity: 0.6 }}>Vite + ShadcnUI</span>
        </div>
      </div>
      <div style={{ flex: 1, padding: '4px 8px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.5, padding: '8px 8px 4px', textTransform: 'uppercase' as const }}>General</div>
        {[
          { icon: LayoutDashboard, label: 'Dashboard', active: true },
          { icon: CreditCard, label: 'Payment' },
          { icon: Columns3, label: 'Kanban Board' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, background: item.active ? 'hsl(0 0% 93%)' : 'transparent', fontWeight: item.active ? 500 : 400 }}>
            <item.icon style={{ width: 16, height: 16, opacity: 0.7 }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '12px', borderTop: '1px solid hsl(0 0% 90%)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: 'hsl(0 0% 85%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>JD</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>John Doe</span>
          <span style={{ fontSize: 11, opacity: 0.6 }}>john@example.com</span>
        </div>
        <ChevronsUpDown style={{ width: 14, height: 14, opacity: 0.5 }} />
      </div>
    </div>
  ),
};
