import { TrendingUp, TrendingDown, DollarSign, Users, Target, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const kpis = [
  { label: 'Total Pipeline',  value: '$4.2M',   delta: '+18.3%', up: true,  icon: DollarSign },
  { label: 'Open Deals',      value: '84',      delta: '+6',     up: true,  icon: Target },
  { label: 'Avg Deal Size',   value: '$49,800', delta: '+11.2%', up: true,  icon: DollarSign },
  { label: 'Win Rate',        value: '38%',     delta: '-2.1%',  up: false, icon: Percent },
];

const stages = [
  { name: 'Prospecting',  count: 22, value: '$680K',  color: 'hsl(var(--muted-foreground))' },
  { name: 'Qualified',    count: 18, value: '$920K',  color: 'hsl(var(--info))' },
  { name: 'Proposal',     count: 14, value: '$1.1M',  color: 'hsl(var(--warning))' },
  { name: 'Negotiation',  count: 9,  value: '$840K',  color: 'hsl(var(--primary))' },
  { name: 'Closed Won',   count: 21, value: '$2.1M',  color: 'hsl(var(--success))' },
];

const deals = [
  { company: 'Acme Corp',        contact: 'Sarah Chen',    stage: 'Negotiation', value: '$220K', close: 'Mar 28', owner: 'J. Park' },
  { company: 'Meridian Health',  contact: 'Tom Russo',     stage: 'Proposal',    value: '$185K', close: 'Apr 5',  owner: 'A. Singh' },
  { company: 'BlueWave Capital', contact: 'Nina Patel',    stage: 'Qualified',   value: '$310K', close: 'Apr 12', owner: 'J. Park' },
  { company: 'Orion Logistics',  contact: 'Mark Delaney',  stage: 'Proposal',    value: '$95K',  close: 'Mar 31', owner: 'L. Kim' },
  { company: 'Vertex Systems',   contact: 'Dana Howell',   stage: 'Negotiation', value: '$440K', close: 'Apr 2',  owner: 'A. Singh' },
  { company: 'Pulse Analytics',  contact: 'Carlos Vega',   stage: 'Qualified',   value: '$130K', close: 'Apr 18', owner: 'L. Kim' },
];

const stageBadge: Record<string, string> = {
  Prospecting:  'bg-muted text-muted-foreground',
  Qualified:    'bg-info/15 text-info',
  Proposal:     'bg-warning/15 text-warning',
  Negotiation:  'bg-primary/15 text-primary',
  'Closed Won': 'bg-success/15 text-success',
};

const accounts = [
  { name: 'Acme Corp',        industry: 'Manufacturing', arr: '$420K', health: 'Healthy' },
  { name: 'Meridian Health',  industry: 'Healthcare',    arr: '$280K', health: 'At Risk' },
  { name: 'BlueWave Capital', industry: 'Finance',       arr: '$610K', health: 'Healthy' },
  { name: 'Orion Logistics',  industry: 'Logistics',     arr: '$195K', health: 'Churning' },
];

const healthColor: Record<string, string> = {
  Healthy:  'text-success',
  'At Risk': 'text-warning',
  Churning: 'text-destructive',
};

export default function SalesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Sales & CRM</h1>
        <p className="text-muted-foreground text-sm mt-1">Q2 2025 — mock data</p>
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

      {/* Pipeline funnel */}
      <Card>
        <CardHeader><CardTitle className="text-base">Pipeline by Stage</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {stages.map(({ name, count, value, color }) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-28 text-sm text-muted-foreground shrink-0">{name}</span>
              <div className="flex-1 h-7 rounded bg-muted overflow-hidden relative">
                <div
                  className="h-full rounded flex items-center px-2"
                  style={{ width: `${(count / 22) * 100}%`, background: color, opacity: 0.85 }}
                />
              </div>
              <span className="w-8 text-sm text-center">{count}</span>
              <span className="w-16 text-sm text-right font-medium">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Deals table */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Open Deals</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Company</th>
                  <th className="text-left pb-2 font-medium">Stage</th>
                  <th className="text-right pb-2 font-medium">Value</th>
                  <th className="text-right pb-2 font-medium">Close</th>
                  <th className="text-right pb-2 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody>
                {deals.map(({ company, stage, value, close, owner }) => (
                  <tr key={company} className="border-b border-border last:border-0">
                    <td className="py-2 font-medium">{company}</td>
                    <td className="py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stageBadge[stage] ?? ''}`}>{stage}</span>
                    </td>
                    <td className="py-2 text-right font-medium">{value}</td>
                    <td className="py-2 text-right text-muted-foreground">{close}</td>
                    <td className="py-2 text-right text-muted-foreground">{owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Top accounts */}
        <Card>
          <CardHeader><CardTitle className="text-base">Top Accounts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {accounts.map(({ name, industry, arr, health }) => (
              <div key={name} className="flex items-start justify-between border-b border-border last:border-0 pb-3 last:pb-0">
                <div>
                  <div className="font-medium text-sm">{name}</div>
                  <div className="text-xs text-muted-foreground">{industry}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{arr}</div>
                  <div className={`text-xs font-medium ${healthColor[health]}`}>{health}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
