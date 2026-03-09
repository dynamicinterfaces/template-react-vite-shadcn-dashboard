import { TrendingUp, TrendingDown, Users, Eye, MousePointerClick, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ── Mock data ──────────────────────────────────────────────────────────────

const kpis = [
  { label: 'Total Visitors',    value: '48,291',  delta: '+12.4%', up: true,  icon: Users },
  { label: 'Page Views',        value: '182,640', delta: '+8.1%',  up: true,  icon: Eye },
  { label: 'Avg. Session',      value: '3m 42s',  delta: '-4.2%',  up: false, icon: Clock },
  { label: 'Click-through',     value: '6.8%',    delta: '+1.9%',  up: true,  icon: MousePointerClick },
];

const weeklyViews = [
  { day: 'Mon', views: 5200 },
  { day: 'Tue', views: 7400 },
  { day: 'Wed', views: 6800 },
  { day: 'Thu', views: 9100 },
  { day: 'Fri', views: 8300 },
  { day: 'Sat', views: 4700 },
  { day: 'Sun', views: 3900 },
];

const trafficSources = [
  { source: 'Organic Search', pct: 43 },
  { source: 'Direct',         pct: 27 },
  { source: 'Referral',       pct: 16 },
  { source: 'Social',         pct: 10 },
  { source: 'Email',          pct: 4  },
];

const topPages = [
  { page: '/dashboard',    views: 24310, bounce: '28%' },
  { page: '/pricing',      views: 18540, bounce: '41%' },
  { page: '/features',     views: 13290, bounce: '35%' },
  { page: '/blog/getting-started', views: 9870, bounce: '52%' },
  { page: '/docs',         views: 7620,  bounce: '19%' },
];

// ── Chart helpers ──────────────────────────────────────────────────────────

const maxViews = Math.max(...weeklyViews.map((d) => d.views));
const BAR_H = 120;

function BarChart() {
  return (
    <div className="flex items-end gap-3 h-36 pt-2">
      {weeklyViews.map(({ day, views }) => {
        const pct = (views / maxViews) * BAR_H;
        return (
          <div key={day} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[10px] text-muted-foreground">{views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}</span>
            <div
              className="w-full rounded-t-sm"
              style={{
                height: pct,
                background: 'hsl(var(--primary))',
                opacity: 0.85,
              }}
            />
            <span className="text-[11px] text-muted-foreground">{day}</span>
          </div>
        );
      })}
    </div>
  );
}

function SourceBar({ source, pct }: { source: string; pct: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 text-sm text-muted-foreground truncate">{source}</span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: 'hsl(var(--primary))' }}
        />
      </div>
      <span className="w-8 text-right text-sm font-medium">{pct}%</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Last 7 days — mock data</p>
      </div>

      {/* KPI cards */}
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
                {delta} vs last week
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly views + Traffic sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trafficSources.map((s) => (
              <SourceBar key={s.source} {...s} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left pb-2 font-medium">Page</th>
                <th className="text-right pb-2 font-medium">Views</th>
                <th className="text-right pb-2 font-medium">Bounce</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map(({ page, views, bounce }) => (
                <tr key={page} className="border-b border-border last:border-0">
                  <td className="py-2 font-mono text-xs">{page}</td>
                  <td className="py-2 text-right">{views.toLocaleString()}</td>
                  <td className="py-2 text-right text-muted-foreground">{bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
