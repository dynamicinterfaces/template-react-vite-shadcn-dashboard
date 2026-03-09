import * as React from 'react'
import { ArrowDownIcon, ArrowUpIcon, BuildingIcon, CreditCardIcon, ScaleIcon, BookOpenIcon } from 'lucide-react'
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

// Balance Sheet
const assets = [
  { account: 'Cash & Cash Equivalents', code: '1000', amount: 482300 },
  { account: 'Accounts Receivable', code: '1100', amount: 318750 },
  { account: 'Prepaid Expenses', code: '1200', amount: 42100 },
  { account: 'Inventory', code: '1300', amount: 189400 },
  { account: 'Property & Equipment', code: '1500', amount: 640000 },
  { account: 'Accumulated Depreciation', code: '1510', amount: -128000 },
  { account: 'Intangible Assets', code: '1600', amount: 95000 },
]

const liabilities = [
  { account: 'Accounts Payable', code: '2000', amount: 214600 },
  { account: 'Accrued Liabilities', code: '2100', amount: 87300 },
  { account: 'Deferred Revenue', code: '2200', amount: 54800 },
  { account: 'Short-term Debt', code: '2300', amount: 100000 },
  { account: 'Long-term Debt', code: '2500', amount: 350000 },
]

const equity = [
  { account: "Common Stock", code: '3000', amount: 500000 },
  { account: 'Retained Earnings', code: '3100', amount: 232850 },
  { account: 'Current Period Net Income', code: '3200', amount: 100000 },
]

// AP Aging
const apAging = [
  { vendor: 'AWS', invoiceId: 'INV-4821', amount: 24800, current: 24800, d30: 0, d60: 0, d90: 0, dueDate: '2025-02-15' },
  { vendor: 'Salesforce', invoiceId: 'INV-4798', amount: 18500, current: 0, d30: 18500, d60: 0, d90: 0, dueDate: '2025-01-20' },
  { vendor: 'WeWork', invoiceId: 'INV-4756', amount: 7800, current: 0, d30: 0, d60: 7800, d90: 0, dueDate: '2024-12-01' },
  { vendor: 'Adobe', invoiceId: 'INV-4702', amount: 4200, current: 0, d30: 0, d60: 0, d90: 4200, dueDate: '2024-11-02' },
  { vendor: 'Google Ads', invoiceId: 'INV-4841', amount: 31600, current: 31600, d30: 0, d60: 0, d90: 0, dueDate: '2025-02-28' },
  { vendor: 'Stripe Fees', invoiceId: 'INV-4835', amount: 9200, current: 9200, d30: 0, d60: 0, d90: 0, dueDate: '2025-02-20' },
]

// Journal Entries
const journalEntries = [
  { date: '2025-01-31', ref: 'JE-1042', description: 'Payroll — January 2025', debit: 142000, credit: 142000, account: 'Salaries Expense / Cash', status: 'Posted' },
  { date: '2025-01-31', ref: 'JE-1041', description: 'Depreciation — Jan 2025', debit: 8000, credit: 8000, account: 'Depreciation Expense / Accum. Depr.', status: 'Posted' },
  { date: '2025-01-28', ref: 'JE-1040', description: 'Revenue recognition — Q4 deferred', debit: 54800, credit: 54800, account: 'Deferred Revenue / Revenue', status: 'Posted' },
  { date: '2025-01-25', ref: 'JE-1039', description: 'Prepaid insurance amortization', debit: 3500, credit: 3500, account: 'Insurance Expense / Prepaid Expenses', status: 'Posted' },
  { date: '2025-01-22', ref: 'JE-1038', description: 'AWS invoice accrual', debit: 24800, credit: 24800, account: 'IT Expense / Accounts Payable', status: 'Posted' },
  { date: '2025-01-15', ref: 'JE-1037', description: 'Customer payment received', debit: 89400, credit: 89400, account: 'Cash / Accounts Receivable', status: 'Posted' },
  { date: '2025-01-10', ref: 'JE-1036', description: 'Loan interest accrual', debit: 4375, credit: 4375, account: 'Interest Expense / Accrued Liabilities', status: 'Draft' },
]

const fmt = (n: number, showNeg = false) => {
  const abs = Math.abs(n)
  const str = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(abs)
  if (showNeg && n < 0) return `(${str})`
  return str
}

const totalAssets = assets.reduce((s, a) => s + a.amount, 0)
const totalLiabilities = liabilities.reduce((s, l) => s + l.amount, 0)
const totalEquity = equity.reduce((s, e) => s + e.amount, 0)
const totalAP = apAging.reduce((s, r) => s + r.amount, 0)
const overdueAP = apAging.reduce((s, r) => s + r.d60 + r.d90, 0)

const kpiData = [
  { label: 'Total Assets', value: fmt(totalAssets), sub: 'Balance sheet total', icon: BuildingIcon, positive: true },
  { label: 'Total Liabilities', value: fmt(totalLiabilities), sub: 'Debt & obligations', icon: CreditCardIcon, positive: false },
  { label: "Stockholders' Equity", value: fmt(totalEquity), sub: 'Assets minus liabilities', icon: ScaleIcon, positive: true },
  { label: 'Accounts Payable', value: fmt(totalAP), sub: `${fmt(overdueAP)} overdue 60+ days`, icon: BookOpenIcon, positive: overdueAP === 0 },
]

function BalanceSheet() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/* Assets */}
      <div>
        <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Assets</div>
        <div className='space-y-1'>
          {assets.map((a) => (
            <div key={a.code} className='flex items-center justify-between py-1 border-b border-border/50 last:border-0'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground font-mono w-10 shrink-0'>{a.code}</span>
                <span className='text-sm'>{a.account}</span>
              </div>
              <span className={`text-sm font-medium tabular-nums ${a.amount < 0 ? 'text-destructive' : ''}`}>
                {fmt(a.amount, true)}
              </span>
            </div>
          ))}
          <div className='flex items-center justify-between pt-2 mt-1'>
            <span className='text-sm font-semibold'>Total Assets</span>
            <span className='text-sm font-semibold tabular-nums'>{fmt(totalAssets)}</span>
          </div>
        </div>
      </div>

      {/* Liabilities & Equity */}
      <div>
        <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Liabilities</div>
        <div className='space-y-1 mb-4'>
          {liabilities.map((l) => (
            <div key={l.code} className='flex items-center justify-between py-1 border-b border-border/50 last:border-0'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground font-mono w-10 shrink-0'>{l.code}</span>
                <span className='text-sm'>{l.account}</span>
              </div>
              <span className='text-sm font-medium tabular-nums'>{fmt(l.amount)}</span>
            </div>
          ))}
          <div className='flex items-center justify-between pt-2 mt-1 border-t border-border'>
            <span className='text-sm font-semibold'>Total Liabilities</span>
            <span className='text-sm font-semibold tabular-nums'>{fmt(totalLiabilities)}</span>
          </div>
        </div>

        <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4'>Equity</div>
        <div className='space-y-1'>
          {equity.map((e) => (
            <div key={e.code} className='flex items-center justify-between py-1 border-b border-border/50 last:border-0'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground font-mono w-10 shrink-0'>{e.code}</span>
                <span className='text-sm'>{e.account}</span>
              </div>
              <span className='text-sm font-medium tabular-nums'>{fmt(e.amount)}</span>
            </div>
          ))}
          <div className='flex items-center justify-between pt-2 mt-1 border-t border-border'>
            <span className='text-sm font-semibold'>Total Equity</span>
            <span className='text-sm font-semibold tabular-nums'>{fmt(totalEquity)}</span>
          </div>
          <div className='flex items-center justify-between pt-2 mt-1 border-t-2 border-foreground'>
            <span className='text-sm font-bold'>Total Liabilities & Equity</span>
            <span className='text-sm font-bold tabular-nums'>{fmt(totalLiabilities + totalEquity)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function APAgingTable() {
  const cols = ['Current', '1–30 Days', '31–60 Days', '61–90+ Days']
  const totals = {
    current: apAging.reduce((s, r) => s + r.current, 0),
    d30: apAging.reduce((s, r) => s + r.d30, 0),
    d60: apAging.reduce((s, r) => s + r.d60, 0),
    d90: apAging.reduce((s, r) => s + r.d90, 0),
  }
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Invoice</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className='text-right'>Total</TableHead>
            {cols.map(c => <TableHead key={c} className='text-right'>{c}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {apAging.map((row) => (
            <TableRow key={row.invoiceId}>
              <TableCell className='font-medium'>{row.vendor}</TableCell>
              <TableCell className='font-mono text-xs text-muted-foreground'>{row.invoiceId}</TableCell>
              <TableCell className='text-muted-foreground'>{row.dueDate}</TableCell>
              <TableCell className='text-right font-medium tabular-nums'>{fmt(row.amount)}</TableCell>
              <TableCell className='text-right tabular-nums text-muted-foreground'>{row.current ? fmt(row.current) : '—'}</TableCell>
              <TableCell className='text-right tabular-nums text-muted-foreground'>{row.d30 ? fmt(row.d30) : '—'}</TableCell>
              <TableCell className={`text-right tabular-nums ${row.d60 ? 'text-warning font-medium' : 'text-muted-foreground'}`}>{row.d60 ? fmt(row.d60) : '—'}</TableCell>
              <TableCell className={`text-right tabular-nums ${row.d90 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>{row.d90 ? fmt(row.d90) : '—'}</TableCell>
            </TableRow>
          ))}
          <TableRow className='bg-muted/40 font-semibold'>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right tabular-nums'>{fmt(totalAP)}</TableCell>
            <TableCell className='text-right tabular-nums'>{fmt(totals.current)}</TableCell>
            <TableCell className='text-right tabular-nums'>{fmt(totals.d30)}</TableCell>
            <TableCell className='text-right tabular-nums text-warning'>{fmt(totals.d60)}</TableCell>
            <TableCell className='text-right tabular-nums text-destructive'>{fmt(totals.d90)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export function AccountingDashboard() {
  const [search, setSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('All')

  const balanced = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 1

  const filteredEntries = journalEntries.filter(je => {
    const matchesSearch =
      search === '' ||
      je.description.toLowerCase().includes(search.toLowerCase()) ||
      je.ref.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || je.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)

  return (
    <div className='space-y-6 p-1'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Accounting</h1>
          <p className='text-sm text-muted-foreground mt-0.5'>General ledger · Period ending January 31, 2025</p>
        </div>
        <Badge variant={balanced ? 'default' : 'destructive'} className='gap-1.5'>
          <ScaleIcon className='w-3 h-3' />
          {balanced ? 'Balanced' : 'Out of Balance'}
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
                <div className='text-2xl font-bold tabular-nums'>{kpi.value}</div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${kpi.positive ? 'text-primary' : 'text-destructive'}`}>
                  {kpi.positive ? <ArrowUpIcon className='h-3 w-3' /> : <ArrowDownIcon className='h-3 w-3' />}
                  {kpi.sub}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Balance Sheet */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Balance Sheet</CardTitle>
          <p className='text-xs text-muted-foreground'>As of January 31, 2025</p>
        </CardHeader>
        <CardContent>
          <BalanceSheet />
        </CardContent>
      </Card>

      {/* AP Aging */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Accounts Payable Aging</CardTitle>
          <p className='text-xs text-muted-foreground'>Outstanding vendor balances by age</p>
        </CardHeader>
        <CardContent>
          <APAgingTable />
        </CardContent>
      </Card>

      {/* Journal Entries */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <div>
              <CardTitle className='text-base'>Journal Entries</CardTitle>
              <p className='text-xs text-muted-foreground mt-0.5'>General ledger entries for current period</p>
            </div>
            <div className='flex items-center gap-2'>
              <Input
                placeholder='Search description, ref...'
                value={search}
                onChange={handleSearchChange}
                className='h-8 w-48'
              />
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className='h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              >
                {['All', 'Posted', 'Draft'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Accounts</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Debit</TableHead>
                  <TableHead className='text-right'>Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className='text-center text-muted-foreground py-8'>
                      No entries match your filters
                    </TableCell>
                  </TableRow>
                ) : filteredEntries.map((je) => (
                  <TableRow key={je.ref}>
                    <TableCell className='text-muted-foreground'>{je.date}</TableCell>
                    <TableCell className='font-mono text-xs text-muted-foreground'>{je.ref}</TableCell>
                    <TableCell className='font-medium max-w-[180px] truncate'>{je.description}</TableCell>
                    <TableCell className='text-xs text-muted-foreground max-w-[200px] truncate'>{je.account}</TableCell>
                    <TableCell>
                      <Badge variant={je.status === 'Posted' ? 'default' : 'secondary'}>{je.status}</Badge>
                    </TableCell>
                    <TableCell className='text-right tabular-nums'>{fmt(je.debit)}</TableCell>
                    <TableCell className='text-right tabular-nums'>{fmt(je.credit)}</TableCell>
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
