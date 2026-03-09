import { CheckCircle2, AlertTriangle, XCircle, Activity, Clock, Zap, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const systems = [
  { name: 'HubSpot CRM',       status: 'operational', latency: '42ms',  uptime: '99.98%', synced: '2m ago' },
  { name: 'QuickBooks',         status: 'operational', latency: '88ms',  uptime: '99.91%', synced: '5m ago' },
  { name: 'Rippling HR',        status: 'degraded',    latency: '340ms', uptime: '98.70%', synced: '12m ago' },
  { name: 'Stripe Payments',    status: 'operational', latency: '61ms',  uptime: '99.99%', synced: '1m ago' },
  { name: 'Salesforce',         status: 'operational', latency: '95ms',  uptime: '99.85%', synced: '3m ago' },
  { name: 'Snowflake DW',       status: 'operational', latency: '210ms', uptime: '99.93%', synced: '8m ago' },
  { name: 'Jira',               status: 'outage',      latency: '—',     uptime: '97.20%', synced: '41m ago' },
  { name: 'Slack',              status: 'operational', latency: '38ms',  uptime: '99.96%', synced: '1m ago' },
];

const statusIcon = {
  operational: <CheckCircle2 className="h-4 w-4 text-success" />,
  degraded:    <AlertTriangle className="h-4 w-4 text-warning" />,
  outage:      <XCircle className="h-4 w-4 text-destructive" />,
};

const statusLabel = {
  operational: 'bg-success/15 text-success',
  degraded:    'bg-warning/15 text-warning',
  outage:      'bg-destructive/15 text-destructive',
};

const metrics = [
  { label: 'Active Workflows',  value: '34',    sub: '3 paused', icon: Zap },
  { label: 'Avg Response Time', value: '118ms', sub: '+12ms WoW', icon: Activity },
  { label: 'Sync Jobs Today',   value: '1,284', sub: '2 failed', icon: Server },
  { label: 'Uptime (30d avg)',   value: '99.6%', sub: 'SLA: 99.5%', icon: Clock },
];

const events = [
  { time: '09:41',  level: 'error',   msg: 'Jira webhook timeout — retrying (3/5)',        system: 'Jira' },
  { time: '09:38',  level: 'warning', msg: 'Rippling sync latency elevated (340ms)',        system: 'Rippling HR' },
  { time: '09:21',  level: 'info',    msg: 'QuickBooks ledger sync completed — 842 records',system: 'QuickBooks' },
  { time: '09:14',  level: 'info',    msg: 'Stripe payout batch processed — $284,100',      system: 'Stripe' },
  { time: '08:55',  level: 'info',    msg: 'Snowflake DW nightly refresh finished',          system: 'Snowflake DW' },
  { time: '08:30',  level: 'warning', msg: 'HubSpot API rate limit at 78% — throttling',    system: 'HubSpot CRM' },
  { time: '08:12',  level: 'info',    msg: 'Salesforce opportunity sync — 121 records',      system: 'Salesforce' },
  { time: '07:59',  level: 'error',   msg: 'Jira auth token expired — auto-refreshed',      system: 'Jira' },
];

const levelColor: Record<string, string> = {
  error:   'text-destructive',
  warning: 'text-warning',
  info:    'text-muted-foreground',
};

const levelDot: Record<string, string> = {
  error:   'bg-destructive',
  warning: 'bg-warning',
  info:    'bg-muted-foreground',
};

export default function OperationsPage() {
  const operational = systems.filter(s => s.status === 'operational').length;
  const degraded    = systems.filter(s => s.status === 'degraded').length;
  const outage      = systems.filter(s => s.status === 'outage').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Operations Center</h1>
          <p className="text-muted-foreground text-sm mt-1">Live system status — mock data</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-success"><CheckCircle2 className="h-4 w-4" />{operational} operational</span>
          <span className="flex items-center gap-1.5 text-warning"><AlertTriangle className="h-4 w-4" />{degraded} degraded</span>
          <span className="flex items-center gap-1.5 text-destructive"><XCircle className="h-4 w-4" />{outage} outage</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, sub, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* System status grid */}
        <Card>
          <CardHeader><CardTitle className="text-base">Integration Health</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">System</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                  <th className="text-right pb-2 font-medium">Latency</th>
                  <th className="text-right pb-2 font-medium">Uptime</th>
                </tr>
              </thead>
              <tbody>
                {systems.map(({ name, status, latency, uptime }) => (
                  <tr key={name} className="border-b border-border last:border-0">
                    <td className="py-2 flex items-center gap-2">
                      {statusIcon[status as keyof typeof statusIcon]}
                      {name}
                    </td>
                    <td className="py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusLabel[status as keyof typeof statusLabel]}`}>{status}</span>
                    </td>
                    <td className="py-2 text-right font-mono text-xs">{latency}</td>
                    <td className="py-2 text-right text-muted-foreground">{uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Event log */}
        <Card>
          <CardHeader><CardTitle className="text-base">Event Log</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {events.map(({ time, level, msg, system }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${levelDot[level]}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${levelColor[level]}`}>{msg}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{system} · {time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
