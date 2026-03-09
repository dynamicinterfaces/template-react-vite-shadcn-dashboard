import * as React from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className='relative w-full overflow-x-auto rounded-lg border bg-background'>
    <table
      ref={ref}
      className={cn(
        'w-full caption-bottom text-sm',
        'border-separate border-spacing-0',
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-muted/40',
      '[&_tr]:border-b [&_tr]:border-border',
      '[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-muted/60',
      className
    )}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      '[&_tr:last-child]:border-0',
      '[&_tr:nth-child(odd)]:bg-background',
      '[&_tr:nth-child(even)]:bg-muted/30',
      className
    )}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-border bg-muted/50 font-medium',
      '[&>tr]:last:border-b-0',
      '[&_td]:py-4',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-border transition-colors',
      'hover:bg-muted/40',
      'data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-11 px-3 text-left align-middle font-medium text-muted-foreground',
      'border-b border-border',
      'whitespace-nowrap',
      '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-3 align-middle',
      'border-b border-border',
      '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-3 px-1 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

type SortDirection = 'asc' | 'desc' | null

interface TableHeadSortProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  onSort?: (direction: SortDirection) => void
  sortDirection?: SortDirection
}

const TableHeadSort = React.forwardRef<
  HTMLTableCellElement,
  TableHeadSortProps
>(({ className, children, onSort, sortDirection, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const handleClick = () => {
    if (!onSort) return
    
    // Cycle through: null -> asc -> desc -> null
    const nextDirection: SortDirection = 
      sortDirection === null ? 'asc' :
      sortDirection === 'asc' ? 'desc' : null
    
    onSort(nextDirection)
  }
  
  const getSortIcon = () => {
    if (sortDirection === 'asc') return <ArrowUp className="h-4 w-4" />
    if (sortDirection === 'desc') return <ArrowDown className="h-4 w-4" />
    return <ArrowUpDown className="h-4 w-4" />
  }
  
  return (
    <th
      ref={ref}
      className={cn(
        'h-11 px-3 text-left align-middle font-medium text-muted-foreground',
        'border-b border-border',
        'whitespace-nowrap',
        '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        onSort && 'cursor-pointer select-none',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div 
        className="flex items-center gap-2"
        onClick={handleClick}
      >
        <span>{children}</span>
        {onSort && (
          <span className={cn(
            'inline-flex transition-opacity',
            sortDirection || isHovered ? 'opacity-100' : 'opacity-0'
          )}>
            {getSortIcon()}
          </span>
        )}
      </div>
    </th>
  )
})
TableHeadSort.displayName = 'TableHeadSort'

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableHeadSort
}