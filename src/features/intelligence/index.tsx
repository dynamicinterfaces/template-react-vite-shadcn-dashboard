import { Brain, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const insights = [
  {
    type: 'opportunity',
    title: 'Revenue acceleration signal',
    body: 'BlueWave Capital has opened 3 support tickets this week — historically correlated with upsell readiness. Recommend AE outreach within 48h.',
    impact: '+$310K potential',
    confidence: 91,
  },
  {
    type: 'risk',
    title: 'Churn risk: Orion Logistics',
    body: 'Login frequency dropped 74% over 30 days and 2 key champions have left the account. Probability of churn in next 90 days: 68%.',
    impact: '-$195K ARR at risk',
    confidence: 84,
  },
  {
    type: 'anomaly',
    title: 'AR aging spike detected',
    body: 'Accounts receivable >60 days overdue increased 40% this week. 4 accounts account for 82% of exposure. Automated dunning sequences triggered.',
    impact: '$148K at risk',
    confidence: 97,
  },
  {
    type: 'opportunity',
    title: 'Engineering velocity trend',
    body: 'PR cycle time decreased 22% this sprint and deploy frequency is up 3×. Team is operating above baseline — good window to ship roadmap items.',
    impact: 'Velocity +22%',
    confidence: 88,
  },
];

const typeStyle: Record<string, { icon: React.ReactNode; badge: string; border: string }> = {
  opportunity: { icon: <Lightbulb className="h-4 w-4 text-success" />, badge: 'bg-success/15 text-success', border: 'border-l-success' },
  risk:        { icon: <ShieldAlert className="h-4 w-4 text-destructive" />, badge: 'bg-destructive/15 text-destructive', border: 'border-l-destructive' },
  anomaly:     { icon: <AlertTriangle className="h-4 w-4 text-warning" />, badge: 'bg-warning/15 text-warning', border: 'border-l-warning' },
};

const forecast = [
  { month: 'Jan', actual: 380, forecast: null },
  { month: 'Feb', actual: 410, forecast: null },
  { month: 'Mar', actual: 445, forecast: null },
  { month: 'Apr', actual: null, forecast: 478 },
  { month: 'May', actual: null, forecast: 512 },
  { month: 'Jun', actual: null, forecast: 551 },
];

const maxVal = 560;
const BAR_H = 100;

const risks = [
  { signal: 'CAC increasing QoQ',         severity: 'Medium', trend: 'up' },
  { signal: 'Support ticket volume +34%', severity: 'Low',    trend: 'up' },
  { signal: 'Gross margin compression',   severity: 'High',   trend: 'up' },
  { signal: 'Sales cycle lengthening',    severity: 'Medium', trend: 'up' },
  { signal: 'NPS score improving',        severity: 'Low',    trend: 'down' },
];

const severityColor: Record<string, string> = {
  High:   'bg-destructive/15 text-destructive',
  Medium: 'bg-warning/15 text-warning',
  Low:    'bg-info/15 text-info',
};

export default function IntelligencePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">Intelligence</h1>
          <p className="text-muted-foreground text-sm mt-0.5">AI-generated insights — updated hourly</p>
        </div>
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map(({ type, title, body, impact, confidence }) => {
          const style = typeStyle[type];
          return (
            <Card key={title} className={`border-l-4 ${style.border}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {style.icon}
                    <CardTitle className="text-sm font-semibold">{title}</CardTitle>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 capitalize ${style.badge}`}>{type}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{impact}</span>
                  <span className="text-muted-foreground">Confidence: <span className="text-foreground font-medium">{confidence}%</span></span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${confidence}%` }} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue forecast */}
        <Card>
          <CardHeader><CardTitle className="text-base">Revenue Forecast (MRR $K)</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-28 pt-2">
              {forecast.map(({ month, actual, forecast: fc }) => {
                const val = actual ?? fc ?? 0;
                const h = (val / maxVal) * BAR_H;
                const isFC = fc !== null;
                return (
                  <div key={month} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[10px] text-muted-foreground">{val}K</span>
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: h,
                        background: isFC ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--primary))',
                        border: isFC ? '1px dashed hsl(var(--primary))' : 'none',
                      }}
                    />
                    <span className="text-[11px] text-muted-foreground">{month}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-primary inline-block" /> Actual</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-primary/40 border border-dashed border-primary inline-block" /> Forecast</span>
            </div>
          </CardContent>
        </Card>

        {/* Risk signals */}
        <Card>
          <CardHeader><CardTitle className="text-base">Risk Signals</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Signal</th>
                  <th className="text-right pb-2 font-medium">Severity</th>
                  <th className="text-right pb-2 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {risks.map(({ signal, severity, trend }) => (
                  <tr key={signal} className="border-b border-border last:border-0">
                    <td className="py-2">{signal}</td>
                    <td className="py-2 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${severityColor[severity]}`}>{severity}</span>
                    </td>
                    <td className="py-2 text-right">
                      {trend === 'up'
                        ? <TrendingUp className="h-4 w-4 text-destructive inline" />
                        : <TrendingDown className="h-4 w-4 text-success inline" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
