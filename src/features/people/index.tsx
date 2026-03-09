import { TrendingUp, TrendingDown, Users, UserPlus, UserMinus, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const kpis = [
  { label: 'Total Headcount',  value: '247',  delta: '+12',   up: true,  icon: Users },
  { label: 'New Hires (Q2)',   value: '18',   delta: '+6',    up: true,  icon: UserPlus },
  { label: 'Open Roles',       value: '23',   delta: '+5',    up: false, icon: Briefcase },
  { label: 'Attrition Rate',   value: '8.2%', delta: '-1.1%', up: true,  icon: UserMinus },
];

const departments = [
  { name: 'Engineering',  headcount: 82, budget: '$9.8M',  openRoles: 8  },
  { name: 'Sales',        headcount: 54, budget: '$6.2M',  openRoles: 7  },
  { name: 'Marketing',    headcount: 31, budget: '$3.7M',  openRoles: 3  },
  { name: 'Operations',   headcount: 28, budget: '$3.1M',  openRoles: 2  },
  { name: 'Finance',      headcount: 19, budget: '$2.4M',  openRoles: 1  },
  { name: 'HR',           headcount: 14, budget: '$1.8M',  openRoles: 1  },
  { name: 'Legal',        headcount: 11, budget: '$1.6M',  openRoles: 0  },
  { name: 'Product',      headcount: 8,  budget: '$1.1M',  openRoles: 1  },
];

const recentHires = [
  { name: 'Alexandra Chen',  role: 'Senior SWE',          dept: 'Engineering', start: 'May 1' },
  { name: 'Marcus Johnson',  role: 'Account Executive',   dept: 'Sales',       start: 'May 6' },
  { name: 'Priya Sharma',    role: 'Data Analyst',        dept: 'Operations',  start: 'May 8' },
  { name: 'Tom Weston',      role: 'Staff Engineer',      dept: 'Engineering', start: 'May 12' },
  { name: 'Diana Flores',    role: 'Growth Manager',      dept: 'Marketing',   start: 'May 15' },
];

const openRoles = [
  { title: 'Principal Engineer',     dept: 'Engineering', level: 'L6', posted: '14d ago' },
  { title: 'Enterprise AE',          dept: 'Sales',       level: 'IC4', posted: '8d ago'  },
  { title: 'Head of Data',           dept: 'Operations',  level: 'M3', posted: '21d ago' },
  { title: 'Senior Product Manager', dept: 'Product',     level: 'IC5', posted: '5d ago'  },
  { title: 'Marketing Engineer',     dept: 'Marketing',   level: 'IC3', posted: '11d ago' },
];

const maxHC = Math.max(...departments.map((d) => d.headcount));

export default function PeoplePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">People & HR</h1>
        <p className="text-muted-foreground text-sm mt-1">Q2 2025 — synced from Rippling</p>
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

      {/* Department breakdown + Open roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Headcount by Department</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {departments.map(({ name, headcount, budget, openRoles }) => (
              <div key={name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{name}</span>
                  <div className="flex items-center gap-4 text-muted-foreground text-xs">
                    <span>{budget}</span>
                    {openRoles > 0 && <span className="text-warning">+{openRoles} open</span>}
                    <span className="font-semibold text-foreground w-6 text-right">{headcount}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(headcount / maxHC) * 100}%`, background: 'hsl(var(--primary))' }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Open Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Role</th>
                  <th className="text-left pb-2 font-medium">Dept</th>
                  <th className="text-right pb-2 font-medium">Posted</th>
                </tr>
              </thead>
              <tbody>
                {openRoles.map(({ title, dept, level, posted }) => (
                  <tr key={title} className="border-b border-border last:border-0">
                    <td className="py-2">
                      <div className="font-medium leading-tight">{title}</div>
                      <div className="text-xs text-muted-foreground">{level}</div>
                    </td>
                    <td className="py-2 text-muted-foreground">{dept}</td>
                    <td className="py-2 text-right text-muted-foreground text-xs">{posted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Recent hires */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Hires</CardTitle>
        </CardHeader>
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
                  <td className="py-2 text-right text-muted-foreground">{start}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
