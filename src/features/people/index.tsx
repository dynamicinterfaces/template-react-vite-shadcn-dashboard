import { TrendingUp, TrendingDown, Users, UserPlus, Briefcase, UserMinus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const kpis = [
  { label: 'Total Headcount', value: '142',   delta: '+8 QTD',  up: true,  icon: Users },
  { label: 'New Hires',       value: '12',    delta: 'Q2 2025', up: true,  icon: UserPlus },
  { label: 'Open Roles',      value: '19',    delta: '+4 new',  up: false, icon: Briefcase },
  { label: 'Attrition',       value: '4.2%',  delta: '-1.1%',   up: true,  icon: UserMinus },
];

const departments = [
  { name: 'Engineering',  headcount: 48, open: 7,  avg_tenure: '2.4y', budget: '$6.8M' },
  { name: 'Sales',        headcount: 31, open: 4,  avg_tenure: '1.8y', budget: '$4.1M' },
  { name: 'Marketing',    headcount: 18, open: 2,  avg_tenure: '2.1y', budget: '$2.2M' },
  { name: 'Operations',   headcount: 22, open: 3,  avg_tenure: '3.2y', budget: '$2.8M' },
  { name: 'Finance',      headcount: 11, open: 1,  avg_tenure: '4.1y', budget: '$1.6M' },
  { name: 'People & HR',  headcount: 7,  open: 1,  avg_tenure: '2.9y', budget: '$0.9M' },
  { name: 'Legal',        headcount: 5,  open: 1,  avg_tenure: '5.3y', budget: '$0.8M' },
];

const recentHires = [
  { name: 'Priya Nair',     role: 'Senior Engineer',      dept: 'Engineering', start: 'Mar 3' },
  { name: 'Marcus Webb',    role: 'Account Executive',    dept: 'Sales',       start: 'Mar 10' },
  { name: 'Sofia Reyes',    role: 'Product Designer',     dept: 'Engineering', start: 'Mar 17' },
  { name: 'James Okafor',   role: 'Data Analyst',         dept: 'Operations',  start: 'Mar 24' },
  { name: 'Lena Holt',      role: 'Content Strategist',   dept: 'Marketing',   start: 'Apr 1' },
];

const openRoles = [
  { title: 'Staff Engineer',         dept: 'Engineering', level: 'Senior',  status: 'Interviewing' },
  { title: 'Head of Growth',         dept: 'Marketing',   level: 'Director', status: 'Sourcing' },
  { title: 'Enterprise AE',          dept: 'Sales',       level: 'Senior',  status: 'Offer Out' },
  { title: 'DevOps Engineer',        dept: 'Engineering', level: 'Mid',     status: 'Interviewing' },
  { title: 'FP&A Analyst',           dept: 'Finance',     level: 'Mid',     status: 'Sourcing' },
];

const statusColor: Record<string, string> = {
  Sourcing:      'bg-muted text-muted-foreground',
  Interviewing:  'bg-info/15 text-info',
  'Offer Out':   'bg-success/15 text-success',
};

const maxHC = Math.max(...departments.map(d => d.headcount));

export default function PeoplePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">People & HR</h1>
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
                {delta}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Department breakdown */}
        <Card>
          <CardHeader><CardTitle className="text-base">Headcount by Department</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {departments.map(({ name, headcount, open, budget }) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{name}</span>
                  <span className="text-muted-foreground">{headcount} <span className="text-xs text-warning">+{open} open</span></span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(headcount / maxHC) * 100}%`, background: 'hsl(var(--primary))' }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">{budget} budget</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Open roles */}
        <Card>
          <CardHeader><CardTitle className="text-base">Open Roles</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Role</th>
                  <th className="text-left pb-2 font-medium">Dept</th>
                  <th className="text-right pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {openRoles.map(({ title, dept, status }) => (
                  <tr key={title} className="border-b border-border last:border-0">
                    <td className="py-2 font-medium">{title}</td>
                    <td className="py-2 text-muted-foreground">{dept}</td>
                    <td className="py-2 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[status] ?? ''}`}>{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Recent hires */}
      <Card>
        <CardHeader><CardTitle className="text-base">Recent Hires</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left pb-2 font-medium">Name</th>
                <th className="text-left pb-2 font-medium">Role</th>
                <th className="text-left pb-2 font-medium">Department</th>
                <th className="text-right pb-2 font-medium">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {recentHires.map(({ name, role, dept, start }) => (
                <tr key={name} className="border-b border-border last:border-0">
                  <td className="py-2 font-medium">{name}</td>
                  <td className="py-2 text-muted-foreground">{role}</td>
                  <td className="py-2 text-muted-foreground">{dept}</td>
                  <td className="py-2 text-right">{start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
