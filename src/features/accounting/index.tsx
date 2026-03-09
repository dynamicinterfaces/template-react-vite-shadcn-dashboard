import * as React from 'react'
import { TrendingUpIcon, TrendingDownIcon, ReceiptIcon, WalletIcon, FileTextIcon, PiggyBankIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const monthlyExpenses = [
  { month: 'Jan', expenses: 92000, budget: 100000 },
  { month: 'Feb', expenses: 88000, budget: 100000 },
  { month: 'Mar', expenses: 105000, budget: 100000 },
  { month: 'Apr', expenses: 97000, budget: 105000 },
  { month: 'May', expenses: 112000, budget: 110000 },
  { month: 'Jun', expenses: 98000, budget: 110000 },
  { month: 'Jul', expenses: 103000, budget: 115000 },
  { month: 'Aug', expenses: 118000, budget: 115000 },
  { month: 'Sep', expenses: 109000, budget: 120000 },
  { month: 'Oct', expenses: 124000, budget: 120000 },
  { month: 'Nov', expenses: 131000, budget: 130000 },
  { month: 'Dec', expenses: 143000, budget: 140000 },
]

const expenseCategories = [
  { category: 'Payroll', amount: 680000, budget: 700000 },
  { category: 'Software & Tools', amount: 92000, budget: 90000 },
  { category: 'Marketing', amount: 148000, budget: 150000 },
  { category: 'Infrastructure', amount: 74000, budget: 80000 },
  { category: 'Travel & Events', amount: 38000, budget: 50000 },
  { category: 'Office & Admin', amount: 21000, budget: 25000 },
]

const invoices = [
  { id: 'INV-2024-087', vendor: 'AWS', category: 'Infrastructure', amount: 24800, dueDate: '2025-01-15', status: 'Paid', approver: 'Sarah Chen' },
  { id: 'INV-2024-088', vendor: 'Salesforce', category: 'Software & Tools', amount: 18500, dueDate: '2025-01-20', status: 'Pending', approver: 'David Park' },
  { id: 'INV-2024-089', vendor: 'HubSpot', category: 'Marketing', amount: 12400, dueDate: '2025-01-22', status: 'Pending', approver: 'Jessica Liu' },
  { id: 'INV-2024-090', vendor: 'Stripe', category: 'Software & Tools', amount: 9200, dueDate: '2025-01-28', status: 'Paid', approver: 'Sarah Chen' },
  { id: 'INV-2024-091', vendor: 'WeWork', category: 'Office & Admin', amount: 7800, dueDate: '2025-02-01', status: 'Overdue', approver: 'Carlos Mendez' },
  { id: 'INV-2024-092', vendor: 'Google Ads', category: 'Marketing', amount: 31600, dueDate: '2025-02-05', status: 'Pending', approver: 'Jessica Liu' },
  { id: 'INV-2024-093', vendor: 'Figma', category: 'Software & Tools', amount: 4800, dueDate: '2025-02-10', status: 'Paid', approver: 'David Park' },
]

const kpiData = [
  { label: 'Total Expenses', value: '$1.32M', change: '+8.2%', trend: 'down', icon: WalletIcon },
  { label: 'Budget Remaining', value: '$148K', change: '+12.4%', trend: 'up', icon: PiggyBankIcon },
  { label: 'Open Invoices', value: '3', change: '-25.0%', trend: 'up', icon: FileTextIcon },
  { label: 'Overdue Invoices', value: '1', change: '+100%', trend: 'down', icon: ReceiptIcon },
]

const ALL_CATEGORIES = ['All', ...Array.from(new Set(invoices.map(i => i.category)))]
const ALL_STATUSES = ['All', ...Array.from(new Set(invoices.map(i => i.status)))]

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const statusBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  Paid: 'default',
  Pending: 'secondary',
  Overdue: 'destructive',
}

const categoryBg: Record<string, string> = {
  Payroll: 'bg-primary',
  'Software & Tools': 'bg-primary/70',
  Marketing: 'bg-primary/55',
  Infrastructure: 'bg-muted-foreground/50',
  'Travel & Events': 'bg-muted-foreground/35',
  'Office & Admin': 'bg-muted-foreground/20',
}

function ExpenseBarChart() {
  const maxVal = Math.max(...monthlyExpenses.map(d => Math.max(d.expenses, d.budget)))
  const chartHeight = 180

  return (
    <div className='w-full'>
      <div className='flex items-end gap-1' style={{ height: chartHeight }}>
        {monthlyExpenses.map((d) => {
          const expH = (d.expenses / maxVal) * chartHeight
          const budH = (d.budget / maxVal) * chartHeight
          const over = d.expenses > d.budget
          return (
            <div key={d.month} className='flex-1 flex flex-col items-center gap-0.5'>
              <div className='w-full flex items-end gap-0.5' style={{ height: chartHeight }}>
                <div
                  className={`flex-1 rounded-t transition-opacity hover:opacity-100 opacity-90 cursor-pointer ${over ? 'bg-destructive' : 'bg-primary'}`}
                  style={{ height: expH }}
                  title={`Expenses: ${fmt(d.expenses)}`}
                />
                <div
                  className='flex-1 rounded-t bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors cursor-pointer'
                  style={{ height: budH }}
                  title={`Budget: ${fmt(d.budget)}`}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex items-center gap-1 mt-1'>
        {monthlyExpenses.map((d) => (
          <div key={d.month} className='flex-1 text-center text-xs text-muted-foreground'>{d.month}</div>
        ))}
      </div>
      <div className='flex items-center gap-4 mt-3'>
        <div className='flex items-center gap-1.5'>
          <div className='w-3 h-3 rounded bg-primary' />
          <span className='text-xs text-muted-foreground'>Expenses</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='w-3 h-3 rounded bg-destructive' />
          <span className='text-xs text-muted-foreground'>Over budget</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='w-3 h-3 rounded bg-muted-foreground/30' />
          <span className='text-xs text-muted-foreground'>Budget</span>
        </div>
      </div>
    </div>
  )
}

function CategoryBreakdown() {
  const maxAmount = Math.max(...expenseCategories.map(c => c.budget))
  return (
    <div className='space-y-2'>
      {expenseCategories.map((cat) => {
        const pct = (cat.amount / maxAmount) * 100
        const over = cat.amount > cat.budget
        const bg = over ? 'bg-destructive' : (categoryBg[cat.category] ?? 'bg-muted')
        return (
          <div key={cat.category} className='flex items-center gap-3'>
            <div className='w-32 text-xs text-right text-muted-foreground shrink-0'>{cat.category}</div>
            <div className='flex-1 bg-muted rounded-full h-5 overflow-hidden'>
              <div
                className={`h-full rounded-full flex items-center pl-2 transition-all ${bg}`}
                style={{ width: `${pct}%` }}
              >
                <span className='text-xs font-medium whitespace-nowrap text-primary-foreground'>
                  {fmt(cat.amount)}
                </span>
              </div>
            </div>
            <div className={`w-20 text-xs text-right shrink-0 ${over ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
              {over ? '+' : ''}{fmt(cat.amount - cat.budget)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function AccountingDashboard() {
  const [search, setSearch] = React.useState('')
  const [categoryFilter, setCategoryFilter] = React.useState('All')
  const [statusFilter, setStatusFilter] = React.useState('All')

  const totalExpenses = monthlyExpenses.reduce((acc, d) => acc + d.expenses, 0)
  const totalBudget = monthlyExpenses.reduce((acc, d) => acc + d.budget, 0)
  const budgetUtilization = ((totalExpenses / totalBudget) * 100).toFixed(1)

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      search === '' ||
      inv.vendor.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || inv.category === categoryFilter
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)

  return (
    <div className='space-y-6 p-1'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Accounting</h1>
          <p className='text-sm text-muted-foreground mt-0.5'>Budget tracking & invoice management · FY 2024</p>
        </div>
        <Badge variant='outline' className='gap-1.5'>
          <span className='w-2 h-2 rounded-full bg-primary inline-block' />
          Live Data
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label}>
              <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium text-muted-foreground'>{kpi.label}</CardTitle>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{kpi.value}</div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${kpi.trend === 'up' ? 'text-primary' : 'text-destructive'}`}>
                  {kpi.trend === 'up' ? <TrendingUpIcon className='h-3 w-3' /> : <TrendingDownIcon className='h-3 w-3' />}
                  {kpi.change} vs last quarter
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Monthly Expenses vs Budget</CardTitle>
            <p className='text-xs text-muted-foreground'>Red bars indicate over-budget months</p>
          </CardHeader>
          <CardContent>
            <ExpenseBarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Expense Categories</CardTitle>
            <div className='flex gap-4 text-xs text-muted-foreground mt-0.5'>
              <span>Total: {fmt(totalExpenses)}</span>
              <span>Budget: {fmt(totalBudget)}</span>
              <span>Utilization: {budgetUtilization}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <CategoryBreakdown />
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <div>
              <CardTitle className='text-base'>Invoices</CardTitle>
              <p className='text-xs text-muted-foreground mt-0.5'>Vendor invoices and approval status</p>
            </div>
            <div className='flex items-center gap-2'>
              <Input
                placeholder='Search vendor, invoice...'
                value={search}
                onChange={handleSearchChange}
                className='h-8 w-44'
              />
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className='h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              >
                {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className='h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              >
                {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Approver</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center text-muted-foreground py-8'>
                      No invoices match your filters
                    </TableCell>
                  </TableRow>
                ) : filteredInvoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className='font-mono text-xs text-muted-foreground'>{inv.id}</TableCell>
                    <TableCell className='font-medium'>{inv.vendor}</TableCell>
                    <TableCell className='text-muted-foreground'>{inv.category}</TableCell>
                    <TableCell className='text-muted-foreground'>{inv.approver}</TableCell>
                    <TableCell className='text-muted-foreground'>{inv.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={statusBadgeVariant[inv.status] ?? 'outline'}>{inv.status}</Badge>
                    </TableCell>
                    <TableCell className='text-right font-medium'>{fmt(inv.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountingDashboard
