import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const arData = [
  { customer: 'Acme Corp',        invoiceId: 'AR-2041', amount: 38400, current: 38400, d30: 0,     d60: 0,    d90: 0,    dueDate: '2025-02-20', risk: 'low' },
  { customer: 'Globex Inc',       invoiceId: 'AR-2035', amount: 22100, current: 0,     d30: 22100, d60: 0,    d90: 0,    dueDate: '2025-01-18', risk: 'low' },
  { customer: 'Initech LLC',      invoiceId: 'AR-2018', amount: 15600, current: 0,     d30: 0,     d60: 15600,d90: 0,    dueDate: '2024-12-05', risk: 'medium' },
  { customer: 'Umbrella Corp',    invoiceId: 'AR-1997', amount: 9800,  current: 0,     d30: 0,     d60: 0,    d90: 9800, dueDate: '2024-11-01', risk: 'high' },
  { customer: 'Stark Industries', invoiceId: 'AR-2038', amount: 67200, current: 67200, d30: 0,     d60: 0,    d90: 0,    dueDate: '2025-02-28', risk: 'low' },
  { customer: 'Hooli',            invoiceId: 'AR-2029', amount: 4400,  current: 0,     d30: 4400,  d60: 0,    d90: 0,    dueDate: '2025-01-22', risk: 'low' },
  { customer: 'Pied Piper',       invoiceId: 'AR-2011', amount: 8100,  current: 0,     d30: 0,     d60: 8100, d90: 0,    dueDate: '2024-12-10', risk: 'medium' },
]

const totals = {
  total:   arData.reduce((s, r) => s + r.amount, 0),
  current: arData.reduce((s, r) => s + r.current, 0),
  d30:     arData.reduce((s, r) => s + r.d30, 0),
  d60:     arData.reduce((s, r) => s + r.d60, 0),
  d90:     arData.reduce((s, r) => s + r.d90, 0),
}

const riskBadge = (risk: string) => {
  if (risk === 'high')   return <Badge variant='destructive'>High Risk</Badge>
  if (risk === 'medium') return <Badge variant='secondary' className='text-warning border-warning'>Overdue</Badge>
  return <Badge variant='outline'>Current</Badge>
}

export default function ARAgingPage() {
  const overdueAmt = totals.d60 + totals.d90
  const collectionRate = (((totals.current + totals.d30) / totals.total) * 100).toFixed(0)

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Accounts Receivable Aging</h1>
        <p className='text-sm text-muted-foreground mt-0.5'>Outstanding customer balances — January 31, 2025</p>
      </div>

      {/* KPIs */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          { label: 'Total AR',        value: fmt(totals.total),   sub: 'Outstanding',         ok: true },
          { label: 'Current (0–30)',  value: fmt(totals.current + totals.d30), sub: `${collectionRate}% of total`, ok: true },
          { label: 'Overdue 31–60+', value: fmt(overdueAmt),     sub: 'Needs follow-up',     ok: overdueAmt === 0 },
          { label: 'High Risk (90+)', value: fmt(totals.d90),     sub: 'Write-off risk',      ok: totals.d90 === 0 },
        ].map(k => (
          <Card key={k.label}>
            <CardHeader className='pb-1'>
              <CardTitle className='text-xs font-medium text-muted-foreground'>{k.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xl font-bold tabular-nums'>{k.value}</div>
              <p className={`text-xs mt-1 ${k.ok ? 'text-success' : 'text-destructive'}`}>{k.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aging bar */}
      <Card>
        <CardHeader><CardTitle className='text-base'>Aging Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className='flex h-6 rounded overflow-hidden gap-0.5'>
            {[
              { label: 'Current',   val: totals.current, color: 'hsl(var(--success))' },
              { label: '1–30 days', val: totals.d30,     color: 'hsl(var(--primary))' },
              { label: '31–60 days',val: totals.d60,     color: 'hsl(var(--warning))' },
              { label: '61–90+',   val: totals.d90,     color: 'hsl(var(--destructive))' },
            ].map(({ label, val, color }) => (
              <div
                key={label}
                title={`${label}: ${fmt(val)}`}
                style={{ width: `${(val / totals.total) * 100}%`, background: color }}
              />
            ))}
          </div>
          <div className='flex gap-4 mt-2 flex-wrap'>
            {[
              { label: 'Current',    color: 'hsl(var(--success))',     val: totals.current },
              { label: '1–30 days',  color: 'hsl(var(--primary))',     val: totals.d30 },
              { label: '31–60 days', color: 'hsl(var(--warning))',     val: totals.d60 },
              { label: '61–90+ days',color: 'hsl(var(--destructive))', val: totals.d90 },
            ].map(({ label, color, val }) => (
              <div key={label} className='flex items-center gap-1.5 text-xs'>
                <div className='w-2.5 h-2.5 rounded-sm' style={{ background: color }} />
                <span className='text-muted-foreground'>{label}</span>
                <span className='font-medium'>{fmt(val)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader><CardTitle className='text-base'>Invoice Detail</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Total</TableHead>
                <TableHead className='text-right'>Current</TableHead>
                <TableHead className='text-right'>1–30</TableHead>
                <TableHead className='text-right'>31–60</TableHead>
                <TableHead className='text-right'>61–90+</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {arData.map(row => (
                <TableRow key={row.invoiceId}>
                  <TableCell className='font-medium'>{row.customer}</TableCell>
                  <TableCell className='font-mono text-xs text-muted-foreground'>{row.invoiceId}</TableCell>
                  <TableCell className='text-muted-foreground'>{row.dueDate}</TableCell>
                  <TableCell>{riskBadge(row.risk)}</TableCell>
                  <TableCell className='text-right font-medium tabular-nums'>{fmt(row.amount)}</TableCell>
                  <TableCell className='text-right tabular-nums text-muted-foreground'>{row.current ? fmt(row.current) : '—'}</TableCell>
                  <TableCell className='text-right tabular-nums text-muted-foreground'>{row.d30 ? fmt(row.d30) : '—'}</TableCell>
                  <TableCell className={`text-right tabular-nums ${row.d60 ? 'text-warning font-medium' : 'text-muted-foreground'}`}>{row.d60 ? fmt(row.d60) : '—'}</TableCell>
                  <TableCell className={`text-right tabular-nums ${row.d90 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>{row.d90 ? fmt(row.d90) : '—'}</TableCell>
                </TableRow>
              ))}
              <TableRow className='bg-muted/40 font-semibold'>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className='text-right tabular-nums'>{fmt(totals.total)}</TableCell>
                <TableCell className='text-right tabular-nums'>{fmt(totals.current)}</TableCell>
                <TableCell className='text-right tabular-nums'>{fmt(totals.d30)}</TableCell>
                <TableCell className='text-right tabular-nums text-warning'>{fmt(totals.d60)}</TableCell>
                <TableCell className='text-right tabular-nums text-destructive'>{fmt(totals.d90)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
