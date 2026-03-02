import * as React from 'react'

import { cn } from '@/lib/utils'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className='relative w-full overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'>
    {/* subtle “liquid metal” sheen */}
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(255,255,255,0.10),transparent_60%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.06))]'
    />
    {/* faint inner highlight */}
    <div
      aria-hidden='true'
      className='pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10'
    />

    <table
      ref={ref}
      className={cn(
        'relative w-full caption-bottom text-sm',
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
      '[&_tr]:border-b [&_tr]:border-white/10',
      // sticky glass header
      '[&_th]:sticky [&_th]:top-0 [&_th]:z-10',
      '[&_th]:bg-white/8 [&_th]:backdrop-blur-xl',
      '[&_th]:shadow-[inset_0_-1px_0_rgba(255,255,255,0.10)]',
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
      // zebra rows (glass)
      '[&_tr:nth-child(odd)]:bg-white/3',
      '[&_tr:nth-child(even)]:bg-white/6',
      '[&_tr:last-child]:border-0',
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
      'border-t border-white/10 bg-white/6 font-medium backdrop-blur-xl',
      '[&>tr]:last:border-b-0',
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
      'border-b border-white/10 transition-colors',
      // “liquid” hover + selected
      'hover:bg-white/10',
      'data-[state=selected]:bg-white/14',
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
      'h-11 px-3 text-left align-middle font-medium text-foreground/80',
      'whitespace-nowrap',
      // subtle metallic divider
      'border-b border-white/10',
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
      'p-3 align-middle text-foreground/90',
      'border-b border-white/10',
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

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
}