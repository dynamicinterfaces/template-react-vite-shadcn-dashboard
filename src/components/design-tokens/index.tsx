// Design Tokens Showcase
// Displays all theme tokens: colors, typography, border-radius, spacing

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className='mb-10'>
    <h2 className='text-lg font-semibold mb-4 pb-2 border-b border-border'>{title}</h2>
    {children}
  </div>
)

// ── Colors ─────────────────────────────────────────────────────────────────

const colorTokens = [
  { name: 'background',        cls: 'bg-background border border-border' },
  { name: 'foreground',        cls: 'bg-foreground' },
  { name: 'card',              cls: 'bg-card border border-border' },
  { name: 'primary',           cls: 'bg-primary' },
  { name: 'primary-foreground',cls: 'bg-primary-foreground border border-border' },
  { name: 'secondary',         cls: 'bg-secondary' },
  { name: 'muted',             cls: 'bg-muted' },
  { name: 'muted-foreground',  cls: 'bg-muted-foreground' },
  { name: 'accent',            cls: 'bg-accent' },
  { name: 'destructive',       cls: 'bg-destructive' },
  { name: 'border',            cls: 'bg-border' },
  { name: 'input',             cls: 'bg-input border border-border' },
  { name: 'ring',              cls: 'bg-ring' },
  { name: 'success',           cls: 'bg-success' },
  { name: 'warning',           cls: 'bg-warning' },
  { name: 'info',              cls: 'bg-info' },
]

function ColorGrid() {
  return (
    <div className='grid grid-cols-4 gap-3'>
      {colorTokens.map(({ name, cls }) => (
        <div key={name} className='flex flex-col gap-1'>
          <div className={`h-12 rounded-md ${cls}`} />
          <span className='text-xs text-muted-foreground font-mono'>{name}</span>
        </div>
      ))}
    </div>
  )
}

// ── Typography ─────────────────────────────────────────────────────────────

const typeScale = [
  { label: 'text-4xl / font-bold',  cls: 'text-4xl font-bold',  sample: 'Display Heading' },
  { label: 'text-3xl / font-bold',  cls: 'text-3xl font-bold',  sample: 'Page Title' },
  { label: 'text-2xl / font-semibold', cls: 'text-2xl font-semibold', sample: 'Section Header' },
  { label: 'text-xl / font-semibold',  cls: 'text-xl font-semibold',  sample: 'Card Title' },
  { label: 'text-lg / font-medium', cls: 'text-lg font-medium', sample: 'Subheading' },
  { label: 'text-base',             cls: 'text-base',            sample: 'Body text — the quick brown fox jumps' },
  { label: 'text-sm',               cls: 'text-sm',              sample: 'Small text — helper labels and captions' },
  { label: 'text-xs',               cls: 'text-xs',              sample: 'Extra small — badges, tags, meta' },
  { label: 'text-xs / font-mono',   cls: 'text-xs font-mono',   sample: 'Monospace — code, ids, paths' },
]

function TypographyScale() {
  return (
    <div className='space-y-3'>
      {typeScale.map(({ label, cls, sample }) => (
        <div key={label} className='flex items-baseline gap-4'>
          <span className='w-52 text-xs text-muted-foreground font-mono shrink-0'>{label}</span>
          <span className={cls}>{sample}</span>
        </div>
      ))}
    </div>
  )
}

// ── Border Radius ──────────────────────────────────────────────────────────

const radii = [
  { name: 'rounded-none', cls: 'rounded-none' },
  { name: 'rounded-sm',   cls: 'rounded-sm' },
  { name: 'rounded',      cls: 'rounded' },
  { name: 'rounded-md',   cls: 'rounded-md' },
  { name: 'rounded-lg',   cls: 'rounded-lg' },
  { name: 'rounded-xl',   cls: 'rounded-xl' },
  { name: 'rounded-2xl',  cls: 'rounded-2xl' },
  { name: 'rounded-full', cls: 'rounded-full' },
]

function RadiusScale() {
  return (
    <div className='flex flex-wrap gap-4'>
      {radii.map(({ name, cls }) => (
        <div key={name} className='flex flex-col items-center gap-2'>
          <div className={`w-16 h-16 bg-primary/20 border-2 border-primary ${cls}`} />
          <span className='text-xs text-muted-foreground font-mono'>{name}</span>
        </div>
      ))}
    </div>
  )
}

// ── Spacing ────────────────────────────────────────────────────────────────

const spacings = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

function SpacingScale() {
  return (
    <div className='space-y-2'>
      {spacings.map(n => (
        <div key={n} className='flex items-center gap-3'>
          <span className='w-12 text-xs text-muted-foreground font-mono text-right'>{n}</span>
          <div className='bg-primary/30 h-4' style={{ width: n * 4 }} />
          <span className='text-xs text-muted-foreground'>{n * 4}px</span>
        </div>
      ))}
    </div>
  )
}

// ── Shadows ────────────────────────────────────────────────────────────────

const shadows = [
  { name: 'shadow-sm',  cls: 'shadow-sm' },
  { name: 'shadow',     cls: 'shadow' },
  { name: 'shadow-md',  cls: 'shadow-md' },
  { name: 'shadow-lg',  cls: 'shadow-lg' },
  { name: 'shadow-xl',  cls: 'shadow-xl' },
  { name: 'shadow-2xl', cls: 'shadow-2xl' },
]

function ShadowScale() {
  return (
    <div className='flex flex-wrap gap-6'>
      {shadows.map(({ name, cls }) => (
        <div key={name} className='flex flex-col items-center gap-2'>
          <div className={`w-20 h-20 bg-card rounded-lg ${cls}`} />
          <span className='text-xs text-muted-foreground font-mono'>{name}</span>
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────

import React from 'react'

export default function DesignTokens() {
  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Design Tokens</h1>
        <p className='text-muted-foreground mt-1 text-sm'>All visual primitives used across the application</p>
      </div>
      <Section title='Colors'><ColorGrid /></Section>
      <Section title='Typography'><TypographyScale /></Section>
      <Section title='Border Radius'><RadiusScale /></Section>
      <Section title='Spacing Scale'><SpacingScale /></Section>
      <Section title='Shadows'><ShadowScale /></Section>
    </div>
  )
}
