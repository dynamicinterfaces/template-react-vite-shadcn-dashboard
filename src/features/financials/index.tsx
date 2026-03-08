import * as React from 'react'
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, UsersIcon, TargetIcon, ActivityIcon } from 'lucide-react'
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

const monthlyRevenue = [
  { month: 'Jan', revenue: 148000, target: 140000 },
  { month: 'Feb', revenue: 162000, target: 155000 },
  { month: 'Mar', revenue: 175000, target: 165000 },
  { month: 'Apr', revenue: 158000, target: 170000 },
  { month: 'May', revenue: 192000, target: 180000 },
  { month: 'Jun', revenue: 210000, target: 195000 },
  { month: 'Jul', revenue: 198000, target: 200000 },
  { month: 'Aug', revenue: 225000, target: 210000 },
  { month: 'Sep', revenue: 241000, target: 225000 },
  { month: 'Oct', revenue: 237000, target: 235000 },
  { month: 'Nov', revenue: 268000, target: 250000 },
  { month: 'Dec', revenue: 295000, target: 270000 },
]

const dealPipeline = [
  { stage: 'Prospecting', count: 42, value: 1240000 },
  { stage: 'Qualification', count: 28, value: 890000 },
  { stage: 'Proposal Sent', count: 19, value: 720000 },
  { stage: 'Negotiation', count: 11, value: 480000 },
  { stage: 'Closed Won', count: 34, value: 2150000 },
  { stage: 'Closed Lost', count: 16, value: 380000 },
]

const topDeals = [
  { id: 'hs-001', company: 'Acme Corp', contact: 'Sarah Chen', stage: 'Closed Won', amount: 285000, closeDate: '2024-12-15', owner: 'Michael Torres' },
  { id: 'hs-002', company: 'TechFlow Inc', contact: 'David Park', stage: 'Negotiation', amount: 198000, closeDate: '2025-01-30', owner: 'Jessica Liu' },
  { id: 'hs-003', company: 'GlobalEdge Ltd', contact: 'Amanda Reyes', stage: 'Proposal Sent', amount: 172000, closeDate: '2025-02-14', owner: 'Michael Torres' },
  { id: 'hs-004', company: 'Nexus Systems', contact: 'Brian Walsh', stage: 'Closed Won', amount: 154000, closeDate: '2024-11-28', owner: 'Carlos Mendez' },
  { id: 'hs-005', company: 'Vertex AI', contact: 'Lisa Thompson', stage: 'Qualification', amount: 142000, closeDate: '2025-03-01', owner: 'Jessica Liu' },
  { id: 'hs-006', company: 'OmniTech', contact: 'James Rivera', stage: 'Closed Won', amount: 128000, closeDate: '2024-12-03', owner: 'Carlos Mendez' },
  { id: 'hs-007', company: 'Pinnacle Group', contact: 'Emily Zhou', stage: 'Prospecting', amount: 115000, closeDate: '2025-04-15', owner: 'Michael Torres' },
]

const kpiData = [
  { label: 'Total Revenue', value: '$2.51M', change: '+18.4%', trend: 'up', icon: DollarSignIcon },
  { label: 'Deals Closed', value: '34', change: '+12.1%', trend: 'up', icon: TargetIcon },
  { label: 'Active Deals', value: '100', change: '+5.3%', trend: 'up', icon: ActivityIcon },
  { label: 'Avg Deal Size', value: '$73.9K', change: '-3.2%', trend: 'down', icon: UsersIcon },
]

const ALL_STAGES = ['All', ...Array.from(new Set(topDeals.map(d => d.stage)))]
const ALL_OWNERS = ['All', ...Array.from(new Set(topDeals.map(d => d.owner)))]

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const stageBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'Closed Won': 'default',
  'Closed Lost': 'destructive',
  'Negotiation': 'secondary',
  'Proposal Sent': 'outline',
  'Qualification': 'secondary',
  'Prospecting': 'outline',
}

const pipelineBg: Record<string, string> = {
  'Prospecting': 'bg-muted-foreground/20',
  'Qualification': 'bg-muted-foreground/35',
  'Proposal Sent': 'bg-secondary',
  'Negotiation': 'bg-primary/60',
  'Closed Won': 'bg-primary',
  'Closed Lost': 'bg-destructive',
}

function RevenueBarChart() {
  const maxRevenue = Math.max(...monthlyRevenue.map(d => Math.max(d.revenue, d.target)))
  const chartHeight = 180

  return (
    <div className='w-full'>
      <div className='flex items-end gap-1' style={{ height: chartHeight }}>
        {monthlyRevenue.map((d) => {
          const revenueH = (d.revenue / maxRevenue) * chartHeight
          const targetH = (d.target / maxRevenue) * chartHeight
          return (
            <div key={d.month} className='flex-1 flex flex-col items-center gap-0.5'>
              <div className='w-full flex items-end gap-0.5' style={{ height: chartHeight }}>
                <div
                  className='flex-1 rounded-t bg-primary opacity-90 hover:opacity-100 transition-opacity cursor-pointer'
                  style={{ height: revenueH }}
                  title={`Revenue: ${fmt(d.revenue)}`}
                />
                <div
                  className='flex-1 rounded-t bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors cursor-pointer'
                  style={{ height: targetH }}
                  title={`Target: ${fmt(d.target)}`}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex items-center gap-1 mt-1'>
        {monthlyRevenue.map((d) => (
          <div key={d.month} className='flex-1 text-center text-xs text-muted-foreground'>{d.month}</div>
        ))}
      </div>
      <div className='flex items-center gap-4 mt-3'>
        <div className='flex items-center gap-1.5'>
          <div className='w-3 h-3 rounded bg-primary' />
          <span className='text-xs text-muted-foreground'>Revenue</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <div className='w-3 h-3 rounded bg-muted-foreground/30' />
          <span className='text-xs text-muted-foreground'>Target</span>
        </div>
      </div>
    </div>
  )
}

function PipelineFunnel() {
  const maxValue = Math.max(...dealPipeline.map(d => d.value))
  return (
    <div className='space-y-2'>
      {dealPipeline.map((stage) => {
        const pct = (stage.value / maxValue) * 100
        const bg = pipelineBg[stage.stage] ?? 'bg-muted'
        return (
          <div key={stage.stage} className='flex items-center gap-3'>
            <div className='w-28 text-xs text-right text-muted-foreground shrink-0'>{stage.stage}</div>
            <div className='flex-1 bg-muted rounded-full h-5 overflow-hidden'>
              <div
                className={`h-full rounded-full flex items-center pl-2 transition-all ${bg}`}
                style={{ width: `${pct}%` }}
              >
                <span className='text-xs font-medium whitespace-nowrap text-primary-foreground'>
                  {stage.count} deals
                </span>
              </div>
            </div>
            <div className='w-24 text-xs text-right font-medium shrink-0'>{fmt(stage.value)}</div>
          </div>
        )
      })}
    </div>
  )
}

export function FinancialsDashboard() {
  const [search, setSearch] = React.useState('')
  const [stageFilter, setStageFilter] = React.useState('All')
  const [ownerFilter, setOwnerFilter] = React.useState('All')

  const totalPipelineValue = dealPipeline.reduce((acc, d) => acc + d.value, 0)
  const closedWonValue = dealPipeline.find(d => d.stage === 'Closed Won')?.value ?? 0
  const winRate = (
    (dealPipeline.find(d => d.stage === 'Closed Won')!.count /
      (dealPipeline.find(d => d.stage === 'Closed Won')!.count +
        dealPipeline.find(d => d.stage === 'Closed Lost')!.count)) *
    100
  ).toFixed(1)

  const filteredDeals = topDeals.filter(deal => {
    const matchesSearch =
      search === '' ||
      deal.company.toLowerCase().includes(search.toLowerCase()) ||
      deal.contact.toLowerCase().includes(search.toLowerCase())
    const matchesStage = stageFilter === 'All' || deal.stage === stageFilter
    const matchesOwner = ownerFilter === 'All' || deal.owner === ownerFilter
    return matchesSearch && matchesStage && matchesOwner
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStageFilter(e.target.value)
  const handleOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => setOwnerFilter(e.target.value)

  return (
    <div className='space-y-6 p-1'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>HubSpot Financials</h1>
          <p className='text-sm text-muted-foreground mt-0.5'>Connected via HubSpot CRM · Last synced just now</p>
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
            <CardTitle className='text-base'>Monthly Revenue vs Target</CardTitle>
            <p className='text-xs text-muted-foreground'>Full year 2024 performance</p>
          </CardHeader>
          <CardContent>
            <RevenueBarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Deal Pipeline</CardTitle>
            <div className='flex gap-4 text-xs text-muted-foreground mt-0.5'>
              <span>Total: {fmt(totalPipelineValue)}</span>
              <span>Closed Won: {fmt(closedWonValue)}</span>
              <span>Win Rate: {winRate}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <PipelineFunnel />
          </CardContent>
        </Card>
      </div>

      {/* Top Deals Table */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <div>
              <CardTitle className='text-base'>Top Deals</CardTitle>
              <p className='text-xs text-muted-foreground mt-0.5'>Highest value opportunities from HubSpot CRM</p>
            </div>
            <div className='flex items-center gap-2'>
              <Input
                placeholder='Search company, contact...'
                value={search}
                onChange={handleSearchChange}
                className='h-8 w-44'
              />
              <select
                value={stageFilter}
                onChange={handleStageChange}
                className='h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              >
                {ALL_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={ownerFilter}
                onChange={handleOwnerChange}
                className='h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              >
                {ALL_OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='text-center text-muted-foreground py-8'>
                      No deals match your filters
                    </TableCell>
                  </TableRow>
                ) : filteredDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className='font-medium'>{deal.company}</TableCell>
                    <TableCell className='text-muted-foreground'>{deal.contact}</TableCell>
                    <TableCell>
                      <Badge variant={stageBadgeVariant[deal.stage] ?? 'outline'}>{deal.stage}</Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>{deal.owner}</TableCell>
                    <TableCell className='text-muted-foreground'>{deal.closeDate}</TableCell>
                    <TableCell className='text-right font-medium'>{fmt(deal.amount)}</TableCell>
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

export default FinancialsDashboard
