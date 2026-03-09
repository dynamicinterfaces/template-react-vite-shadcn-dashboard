import { TrendingUp, TrendingDown, DollarSign, Target, Users, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const kpis = [
  { label: 'Total Pipeline',    value: '$4.2M',   delta: '+18.3%', up: true,  icon: DollarSign },
  { label: 'Deals Closing Q2',  value: '34',      delta: '+7',     up: true,  icon: Target },
  { label: 'Avg Deal Size',     value: '$124K',   delta: '-3.1%',  up: false, icon: Briefcase },
  { label: 'Win Rate',          value: '38%',     delta: '+4.2%',  up: true,  icon: Users },
];

const stages = [
  {
    label: 'Prospecting', color: 'hsl(var(--muted-foreground))', deals: [
      { name: 'Acme Corp', value: '$80K', owner: 'Sarah K.' },
      { name: 'Globex Inc', value: '$210K', owner: 'Mike T.' },
      { name: 'Initech', value: '$55K', owner: 'Laura P.' },
    ]
  },
  {
    label: 'Qualified', color: 'hsl(var(--info))', deals: [
      { name: 'Umbrella Co', value: '$340K', owner: 'James R.' },
      { name: 'Hooli', value: '$125K', owner: 'Sarah K.' },
    ]
  },
  {
    label: 'Proposal', color: 'hsl(var(--warning))', deals: [
      { name: 'Pied Piper', value: '$490K', owner: 'Mike T.' },
      { name: 'Vandelay Ind', value: '$185K', owner: 'James R.' },
      { name: 'Soylent Corp', value: '$72K', owner: 'Laura P.' },
    ]
  },
  {
    label: 'Negotiation', color: 'hsl(var(--primary))', deals: [
      { name: 'Massive Dyn', value: '$620K', owner: 'Sarah K.' },
      { name: 'Bluth Co', value: '$88K', owner: 'Mike T.' },
    ]
  },
  {
    label: 'Closed Won', color: 'hsl(var(--success))', deals: [
      { name: 'Dunder Mifflin', value: '$310K', owner: 'Laura P.' },
      { name: 'Sterling Cooper', value: '$440K', owner: 'James R.' },
    ]
  },
];

const activity = [
  { action: 'Deal moved to Negotiation', detail: 'Massive Dynamics — $620K', time: '2h ago', up: true },
  { action: 'New contact added', detail: 'Jennifer Walsh @ Hooli', time: '4h ago', up: true },
  { action: 'Proposal sent', detail: 'Pied Piper — $490K', time: '6h ago', up: true },
  { action: 'Deal lost', detail: 'Initrode — $95K', time: '1d ago', up: false },
  { action: 'Meeting scheduled', detail: 'Bluth Co — discovery call', time: '1d ago', up: true },
];

export default function SalesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Sales Pipeline</h1>
        <p className="text-muted-foreground text-sm mt-1">Q2 2025 — synced from HubSpot CRM</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, delta, up, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <div className={`flex items-center gap-1 text-xs mt-1 ${up ? 'text-success' : 'text-destructive'}`}>
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {delta} vs last quarter
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline board */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pipeline Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-3 min-w-0">
            {stages.map(({ label, color, deals }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs font-medium truncate">{label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{deals.length}</span>
                </div>
                {deals.map((deal) => (
                  <div key={deal.name} className="rounded-md border border-border bg-muted/30 p-2 space-y-1">
                    <div className="text-xs font-medium leading-tight">{deal.name}</div>
                    <div className="text-xs font-bold" style={{ color }}>{deal.value}</div>
                    <div className="text-[10px] text-muted-foreground">{deal.owner}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activity.map((a, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.up ? 'bg-success' : 'bg-destructive'}`} />
              <div className="flex-1 min-w-0">
                <span className="font-medium">{a.action}</span>
                <span className="text-muted-foreground"> — {a.detail}</span>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
