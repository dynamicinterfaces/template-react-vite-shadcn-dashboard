import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.abs(n))

const operating = [
  { label: 'Net Income',                    amount:  100000 },
  { label: 'Depreciation & Amortization',   amount:   8000 },
  { label: '(Increase) in Accounts Receivable', amount: -42000 },
  { label: 'Decrease in Prepaid Expenses',  amount:   6200 },
  { label: 'Increase in Accounts Payable',  amount:  18400 },
  { label: 'Increase in Deferred Revenue',  amount:  12500 },
]

const investing = [
  { label: 'Purchase of Equipment',         amount: -85000 },
  { label: 'Purchase of Intangible Assets', amount: -15000 },
  { label: 'Proceeds from Asset Sale',      amount:   4500 },
]

const financing = [
  { label: 'Repayment of Short-term Debt',  amount: -25000 },
  { label: 'Proceeds from Long-term Loan',  amount:  50000 },
  { label: 'Dividends Paid',                amount:      0 },
]

const totalOp  = operating.reduce((s, r) => s + r.amount, 0)
const totalInv = investing.reduce((s, r) => s + r.amount, 0)
const totalFin = financing.reduce((s, r) => s + r.amount, 0)
const netChange = totalOp + totalInv + totalFin
const openingCash = 379100
const closingCash = openingCash + netChange

function Section({ title, rows, total, color }: {
  title: string
  rows: { label: string; amount: number }[]
  total: number
  color: string
}) {
  return (
    <div className='mb-4'>
      <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1'>{title}</div>
      {rows.map(r => (
        <div key={r.label} className='flex justify-between py-1 border-b border-border/40 last:border-0 text-sm'>
          <span className='pl-3 text-muted-foreground'>{r.label}</span>
          <span className={`tabular-nums ${r.amount < 0 ? 'text-destructive' : r.amount > 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {r.amount < 0 ? `(${fmt(r.amount)})` : r.amount > 0 ? fmt(r.amount) : '—'}
          </span>
        </div>
      ))}
      <div className={`flex justify-between pt-2 text-sm font-semibold ${color}`}>
        <span>Net Cash from {title.split(' ').slice(-1)[0]}</span>
        <span className='tabular-nums'>{total < 0 ? `(${fmt(total)})` : fmt(total)}</span>
      </div>
    </div>
  )
}

export default function CashFlowStatement() {
  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-2xl font-bold'>Cash Flow Statement</h1>
        <p className='text-sm text-muted-foreground mt-0.5'>Period ending January 31, 2025</p>
      </div>

      {/* Summary KPIs */}
      <div className='grid grid-cols-3 gap-4'>
        {[
          { label: 'Operating',  value: totalOp,  icon: totalOp  >= 0 ? ArrowUpRight : ArrowDownRight },
          { label: 'Investing',  value: totalInv, icon: totalInv >= 0 ? ArrowUpRight : ArrowDownRight },
          { label: 'Financing',  value: totalFin, icon: totalFin >= 0 ? ArrowUpRight : ArrowDownRight },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className='pb-1 flex flex-row items-center justify-between'>
              <CardTitle className='text-xs font-medium text-muted-foreground'>{label}</CardTitle>
              <Icon className={`h-4 w-4 ${value >= 0 ? 'text-success' : 'text-destructive'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold tabular-nums ${value >= 0 ? 'text-success' : 'text-destructive'}`}>
                {value < 0 ? `(${fmt(value)})` : fmt(value)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Waterfall bar */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Cash Movement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {[
              { label: 'Opening Cash',     amount: openingCash, base: true },
              { label: 'Operating Activities', amount: totalOp },
              { label: 'Investing Activities', amount: totalInv },
              { label: 'Financing Activities', amount: totalFin },
              { label: 'Closing Cash',     amount: closingCash, base: true },
            ].map(({ label, amount, base }) => {
              const max = openingCash
              const pct = Math.min(100, (Math.abs(amount) / max) * 100)
              const isPos = amount >= 0
              return (
                <div key={label} className='flex items-center gap-3'>
                  <span className='w-44 text-sm truncate'>{label}</span>
                  <div className='flex-1 h-5 bg-muted rounded overflow-hidden'>
                    <div
                      className='h-full rounded transition-all'
                      style={{
                        width: `${pct}%`,
                        background: base
                          ? 'hsl(var(--primary))'
                          : isPos
                          ? 'hsl(var(--success))'
                          : 'hsl(var(--destructive))',
                      }}
                    />
                  </div>
                  <span className={`w-24 text-right text-sm font-medium tabular-nums ${
                    base ? '' : isPos ? 'text-success' : 'text-destructive'
                  }`}>
                    {amount < 0 ? `(${fmt(amount)})` : fmt(amount)}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detail */}
      <Card>
        <CardHeader><CardTitle className='text-base'>Detail</CardTitle></CardHeader>
        <CardContent>
          <Section title='Operating Activities'  rows={operating} total={totalOp}  color={totalOp  >= 0 ? 'text-success' : 'text-destructive'} />
          <Section title='Investing Activities'  rows={investing} total={totalInv} color={totalInv >= 0 ? 'text-success' : 'text-destructive'} />
          <Section title='Financing Activities'  rows={financing} total={totalFin} color={totalFin >= 0 ? 'text-success' : 'text-destructive'} />
          <div className='flex justify-between pt-3 border-t-2 border-foreground text-base font-bold'>
            <span>Net Change in Cash</span>
            <span className={netChange >= 0 ? 'text-success' : 'text-destructive'}>
              {netChange < 0 ? `(${fmt(netChange)})` : fmt(netChange)}
            </span>
          </div>
          <div className='flex justify-between pt-2 text-sm text-muted-foreground'>
            <span>Opening Cash</span><span className='tabular-nums'>{fmt(openingCash)}</span>
          </div>
          <div className='flex justify-between pt-1 text-sm font-semibold text-primary'>
            <span>Closing Cash</span><span className='tabular-nums'>{fmt(closingCash)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
