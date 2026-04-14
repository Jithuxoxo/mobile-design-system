import type { ReactNode } from 'react'

// ── Status Badge ──────────────────────────────────────────────────────────────

export type BadgeVariant = 'important' | 'success' | 'error' | 'primary' | 'gray' | 'dark'

export interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const badgeVariantClasses: Record<BadgeVariant, string> = {
  important: 'bg-secondary-100 text-secondary-500 border border-secondary-300',
  success:   'bg-success-000  text-success-400  border border-success-200',
  error:     'bg-error-000    text-error-500    border border-error-300',
  primary:   'bg-primary-000  text-primary-400  border border-primary-100',
  gray:      'bg-base-200     text-base-600     border border-base-300',
  dark:      'bg-base-800     text-base-000',
}

export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-space-3 py-space-1 rounded-full text-label-md font-medium ${badgeVariantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// ── Count Badge ───────────────────────────────────────────────────────────────

export type CountBadgeColor = 'red' | 'blue' | 'orange' | 'gray'

export interface CountBadgeProps {
  count: number
  color?: CountBadgeColor
  className?: string
}

const countBadgeClasses: Record<CountBadgeColor, string> = {
  red:    'bg-error-400    text-base-000',
  blue:   'bg-primary-400  text-base-000',
  orange: 'bg-secondary-400 text-base-000',
  gray:   'bg-base-400     text-base-700',
}

export function CountBadge({ count, color = 'red', className = '' }: CountBadgeProps) {
  const display = count > 99 ? '99+' : count
  return (
    <span
      className={`inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-label-sm font-medium tabular-nums ${countBadgeClasses[color]} ${className}`}
    >
      {display}
    </span>
  )
}

// ── Event / Celebration Tags ──────────────────────────────────────────────────

export type EventTagVariant = 'anniversary' | 'birthday' | 'newJoiner' | 'projectDone'

export interface EventTagProps {
  variant: EventTagVariant
  className?: string
}

const eventTagConfig: Record<EventTagVariant, { label: string; emoji: string }> = {
  anniversary: { label: 'Work Anniversary', emoji: '🎉' },
  birthday:    { label: 'Birthday',         emoji: '🎂' },
  newJoiner:   { label: 'New Joiner',       emoji: '👋' },
  projectDone: { label: 'Project Done',     emoji: '🏆' },
}

export function EventTag({ variant, className = '' }: EventTagProps) {
  const { label, emoji } = eventTagConfig[variant]
  return (
    <span
      className={`inline-flex items-center gap-1 px-space-3 py-space-1 rounded-full text-label-md font-medium bg-base-300 text-base-800 ${className}`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  )
}

// ── AI Suggestion Chips ───────────────────────────────────────────────────────

export type ChipVariant = 'tip' | 'info' | 'seePast'

export interface ChipProps {
  variant: ChipVariant
  children?: ReactNode
  onClick?: () => void
  className?: string
}

const chipConfig: Record<ChipVariant, { icon: string; defaultLabel: string; classes: string }> = {
  tip:     { icon: '💡', defaultLabel: 'Tip',           classes: 'bg-secondary-100 text-secondary-500 border border-secondary-300 hover:bg-secondary-300' },
  info:    { icon: 'ℹ️',  defaultLabel: 'Info',          classes: 'bg-primary-000  text-primary-400  border border-primary-100  hover:bg-primary-100'  },
  seePast: { icon: '📅', defaultLabel: 'See Past Data', classes: 'bg-base-200     text-base-700     border border-base-300     hover:bg-base-300'     },
}

export function Chip({ variant, children, onClick, className = '' }: ChipProps) {
  const { icon, defaultLabel, classes } = chipConfig[variant]
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-space-2 px-space-4 py-space-2 rounded-full text-label-md font-medium transition-colors cursor-pointer ${classes} ${className}`}
    >
      <span>{icon}</span>
      <span>{children ?? defaultLabel}</span>
    </button>
  )
}
