import type { ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Avatar } from '../Avatar/Avatar'

// ── BottomSheet (base wrapper) ────────────────────────────────────────────────

export interface BottomSheetProps {
  /** Sheet title shown in the header */
  title: string
  /** Optional subtitle / description shown below the title */
  description?: string
  /** Called when the × button is pressed */
  onDismiss?: () => void
  children?: ReactNode
  className?: string
}

export function BottomSheet({
  title,
  description,
  onDismiss,
  children,
  className = '',
}: BottomSheetProps) {
  return (
    <div
      className={`bg-base-000 rounded-t-2xl px-space-5 pt-space-5 pb-space-8 w-full font-sans
        shadow-[0px_-4px_8px_0px_rgba(104,108,157,0.16)] ${className}`}
    >
      {/* Drag handle */}
      <div className="flex justify-center mb-space-5">
        <div className="w-10 h-1 rounded-full bg-base-300" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-space-5">
        <div className="flex-1 min-w-0 pr-space-4">
          <h3 className="text-heading-h3 font-bold text-base-900 leading-snug">{title}</h3>
          {description && (
            <p className="text-body-sm text-base-700 mt-space-2 leading-relaxed">{description}</p>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center text-base-700 hover:bg-base-300 transition-colors shrink-0 mt-[2px]"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={12} color="currentColor" strokeWidth={2} />
          </button>
        )}
      </div>

      {children}
    </div>
  )
}

// ── BottomSheetListItem ───────────────────────────────────────────────────────
// Use case: Nominee details — avatar + name + email

export interface BottomSheetListItemProps {
  name: string
  subtitle: string
  avatarSrc?: string
  trailing?: ReactNode
}

export function BottomSheetListItem({
  name,
  subtitle,
  avatarSrc,
  trailing,
}: BottomSheetListItemProps) {
  return (
    <div className="flex items-center gap-space-3 py-[10px]">
      <Avatar size={32} name={name} src={avatarSrc} />
      <div className="flex-1 min-w-0">
        <p className="text-label-md font-semibold text-base-900 truncate">{name}</p>
        <p className="text-body-sm text-base-700 truncate">{subtitle}</p>
      </div>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </div>
  )
}

// ── BottomSheetActionItem ─────────────────────────────────────────────────────
// Use case: Settings / action menu — icon + label (optional destructive)

export interface BottomSheetActionItemProps {
  icon: ReactNode
  label: string
  /** 'destructive' renders the label and icon in error-400 red */
  variant?: 'default' | 'destructive'
  onClick?: () => void
}

export function BottomSheetActionItem({
  icon,
  label,
  variant = 'default',
  onClick,
}: BottomSheetActionItemProps) {
  const color = variant === 'destructive' ? 'text-error-400' : 'text-base-900'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-space-3 w-full h-9 px-space-2 rounded-md hover:bg-base-100 transition-colors text-left ${color}`}
    >
      <span className={`w-4 h-4 flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </span>
      <span className="text-body-md font-normal">{label}</span>
    </button>
  )
}

// ── BottomSheetSelectField ────────────────────────────────────────────────────
// Use case: Language settings — native select styled to match the design

export interface BottomSheetSelectFieldProps {
  value: string
  options: { label: string; value: string }[]
  onChange?: (value: string) => void
}

export function BottomSheetSelectField({
  value,
  options,
  onChange,
}: BottomSheetSelectFieldProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full h-9 pl-space-4 pr-10 rounded-md border border-base-300/80 bg-base-000 text-body-md text-base-900 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-400/30"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <span className="pointer-events-none absolute right-space-3 top-1/2 -translate-y-1/2 text-base-600">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}
