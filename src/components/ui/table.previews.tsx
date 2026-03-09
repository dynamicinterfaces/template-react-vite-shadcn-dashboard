import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableHeadSort, TableRow } from './table'

type SortDirection = 'asc' | 'desc' | null

const data = [
  { invoice: 'INV001', status: 'Paid',    method: 'Credit Card', amount: 250 },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal',      amount: 150 },
  { invoice: 'INV003', status: 'Paid',    method: 'Bank Transfer',amount: 980 },
  { invoice: 'INV004', status: 'Failed',  method: 'Credit Card', amount: 75  },
  { invoice: 'INV005', status: 'Paid',    method: 'PayPal',      amount: 420 },
]

function Preview() {
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)

  const handleSort = (col: string) => (dir: SortDirection) => {
    setSortCol(dir ? col : null)
    setSortDir(dir)
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortCol || !sortDir) return 0
    const av = a[sortCol as keyof typeof a]
    const bv = b[sortCol as keyof typeof b]
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === 'asc' ? cmp : -cmp
  })

  const dir = (col: string): SortDirection => sortCol === col ? sortDir : null

  return (
    <div className='p-6'>
      <Table>
        <TableCaption>Click column headers to sort.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeadSort onSort={handleSort('invoice')} sortDirection={dir('invoice')}>Invoice</TableHeadSort>
            <TableHeadSort onSort={handleSort('status')}  sortDirection={dir('status')}>Status</TableHeadSort>
            <TableHeadSort onSort={handleSort('method')}  sortDirection={dir('method')}>Method</TableHeadSort>
            <TableHeadSort onSort={handleSort('amount')}  sortDirection={dir('amount')}>Amount</TableHeadSort>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(row => (
            <TableRow key={row.invoice}>
              <TableCell>{row.invoice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>${row.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const meta = { title: 'Table', component: Preview }
export default meta
export const Default = {}
