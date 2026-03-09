import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(n))

const revenue = [
  { label: 'SaaS Subscriptions',   amount: 842000 },
  { label: 'Professional Services', amount: 148000 },
  { label: 'Marketplace Fees',      amount: 63000 },
]
const cogs = [
  { label: 'Hosting & Infrastructure', amount: 94000 },
  { label: 'Support Staff',            amount: 112000 },
  { label: 'Third-party Licenses',     amount: 31000 },
]
const opex = [
  { label: 'Sales & Marketing',   amount: 218000 },
  { label: 'Research & Development', amount: 187000 },
  { label: 'General & Administrative', amount: 96000 },
  { label: 'Depreciation',         amount: 8000 },
]

const totalRevenue  = revenue.reduce((s, r) => s + r.amount, 0)
const totalCOGS     = cogs.reduce((s, r) => s + r.amount, 0)
const grossProfit   = totalRevenue - totalCOGS
const grossMargin   = ((grossProfit / totalRevenue) * 100).toFixed(1)
const totalOpex     = opex.reduce((s, r) => s + r.amount, 0)
const operatingIncome = grossProfit - totalOpex
const interestExpense = 4375
const taxExpense    = Math.max(0, (operatingIncome - interestExpense) * 0.21)
const netIncome     = operatingIncome - interestExpense - taxExpense
const netMargin     = ((netIncome / totalRevenue) * 100).toFixed(1)

// Prior period for comparison (mock)
const priorRevenue  = 976000
const priorNet      = 78000
const revGrowth     = (((totalRevenue - priorRevenue) / priorRevenue) * 100).toFixed(1)
const netGrowth     = (((netIncome - priorNet) / priorNet) * 100).toFixed(1)

function LineGroup({ title, rows, total, totalLabel, highlight }: {
  title: string
  rows: { label: string; amount: number }[]
  total: number
  totalLabel: string
  highlight?: 'positive' | 'negative'
}) {
  return (
    <div className='mb-5'>
      <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1'>{title}</div>
      {rows.map(r => (
        <div key={r.label} className='flex justify-between py-1 border-b border-border/40 last:border-0 text-sm'>
          <span className='pl-3 text-muted-foreground'>{r.label}</span>
          <span className='tabular-nums'>{fmt(r.amount)}</span>
        </div>
      ))}
      <div className={`flex justify-between pt-2 text-sm font-semibold ${
        highlight === 'positive' ? 'text-success' : highlight === 'negative' ? 'text-destructive' : ''
      }`}>
        <span>{totalLabel}</span>
        <span className='tabular-nums'>{fmt(total)}</span>
      </div>
    </div>
  )
}

export default function IncomeStatement() {
  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Income Statement</h1>
          <p className='text-sm text-muted-foreground mt-0.5'>Period ending January 31, 2025</p>
        </div>
        <Badge variant='outline' className='text-xs'>YTD</Badge>
      </div>

      {/* KPIs */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          { label: 'Total Revenue',  value: fmt(totalRevenue), delta: `${revGrowth}%`, up: Number(revGrowth) >= 0 },
          { label: 'Gross Profit',   value: fmt(grossProfit),  delta: `${grossMargin}% margin`, up: true },
          { label: 'Operating Income', value: fmt(operatingIncome), delta: `${((operatingIncome/totalRevenue)*100).toFixed(1)}% margin`, up: operatingIncome > 0 },
          { label: 'Net Income',     value: fmt(netIncome),    delta: `${netMargin}% margin · ${netGrowth}% YoY`, up: Number(netGrowth) >= 0 },
        ].map(k => (
          <Card key={k.label}>
            <CardHeader className='pb-1'>
              <CardTitle className='text-xs font-medium text-muted-foreground'>{k.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xl font-bold tabular-nums'>{k.value}</div>
              <div className={`flex items-center gap-1 text-xs mt-1 ${k.up ? 'text-success' : 'text-destructive'}`}>
                {k.up ? <TrendingUp className='h-3 w-3' /> : <TrendingDown className='h-3 w-3' />}
                {k.delta}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* P&L */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Profit & Loss Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <LineGroup title='Revenue' rows={revenue} total={totalRevenue} totalLabel='Total Revenue' />
          <LineGroup title='Cost of Goods Sold' rows={cogs} total={totalCOGS} totalLabel='Total COGS' />

          <div className='flex justify-between py-2 border-t-2 border-foreground text-sm font-bold mb-5'>
            <span>Gross Profit</span>
            <span className='tabular-nums text-success'>{fmt(grossProfit)} <span className='font-normal text-muted-foreground text-xs'>({grossMargin}%)</span></span>
          </div>

          <LineGroup title='Operating Expenses' rows={opex} total={totalOpex} totalLabel='Total OpEx' />

          <div className='flex justify-between py-2 border-t border-border text-sm font-semibold mb-2'>
            <span>Operating Income (EBIT)</span>
            <span className={`tabular-nums ${operatingIncome >= 0 ? 'text-success' : 'text-destructive'}`}>{fmt(operatingIncome)}</span>
          </div>

          {[
            { label: 'Interest Expense', amount: interestExpense },
            { label: 'Income Tax (21%)', amount: taxExpense },
          ].map(r => (
            <div key={r.label} className='flex justify-between py-1 text-sm text-muted-foreground'>
              <span className='pl-3'>{r.label}</span>
              <span className='tabular-nums'>({fmt(r.amount)})</span>
            </div>
          ))}

          <div className='flex justify-between pt-3 border-t-2 border-foreground text-base font-bold mt-2'>
            <span>Net Income</span>
            <span className={`tabular-nums ${netIncome >= 0 ? 'text-success' : 'text-destructive'}`}>{fmt(netIncome)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
