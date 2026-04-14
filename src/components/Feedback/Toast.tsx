import type { ReactNode } from 'react'

// ── Toast ─────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  variant: ToastVariant
  title: string
  description?: string
  onDismiss?: () => void
  className?: string
}

const toastConfig: Record<
  ToastVariant,
  { icon: string; classes: string; iconBg: string }
> = {
  success: {
    icon: '✓',
    classes: 'bg-success-000 border-success-200',
    iconBg: 'bg-success-400 text-base-000',
  },
  error: {
    icon: '✕',
    classes: 'bg-error-000 border-error-300',
    iconBg: 'bg-error-400 text-base-000',
  },
  info: {
    icon: 'i',
    classes: 'bg-primary-000 border-primary-100',
    iconBg: 'bg-primary-400 text-base-000',
  },
  warning: {
    icon: '!',
    classes: 'bg-secondary-100 border-secondary-300',
    iconBg: 'bg-secondary-400 text-base-000',
  },
}

export function Toast({ variant, title, description, onDismiss, className = '' }: ToastProps) {
  const cfg = toastConfig[variant]
  return (
    <div
      role="alert"
      className={`flex items-start gap-space-3 px-space-4 py-space-4 rounded-lg border shadow-elevation-2 font-sans ${cfg.classes} ${className}`}
    >
      <span
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-label-sm font-bold ${cfg.iconBg}`}
      >
        {cfg.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-label-lg font-semibold text-base-900">{title}</p>
        {description && (
          <p className="text-body-sm text-base-600 mt-space-1">{description}</p>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 text-base-500 hover:text-base-800 transition-colors text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}

// ── State View ─────────────────────────────────────────────────────────────────

export type StateViewVariant = 'empty' | 'loading' | 'error' | 'success'

export interface StateViewProps {
  variant: StateViewVariant
  title?: string
  description?: string
  action?: ReactNode
  className?: string
}

const stateConfig: Record<
  StateViewVariant,
  { icon: string; defaultTitle: string; defaultDescription: string }
> = {
  empty: {
    icon: '📭',
    defaultTitle: 'Nothing here yet',
    defaultDescription: 'There is no data to display at the moment.',
  },
  loading: {
    icon: '⏳',
    defaultTitle: 'Loading…',
    defaultDescription: 'Please wait while we fetch your data.',
  },
  error: {
    icon: '⚠️',
    defaultTitle: 'Something went wrong',
    defaultDescription: 'We could not load your data. Please try again.',
  },
  success: {
    icon: '🎉',
    defaultTitle: 'All done!',
    defaultDescription: 'Your action was completed successfully.',
  },
}

export function StateView({ variant, title, description, action, className = '' }: StateViewProps) {
  const cfg = stateConfig[variant]
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-space-10 px-space-8 font-sans ${className}`}
    >
      <span className="text-5xl mb-space-5">{cfg.icon}</span>
      <h3 className="text-heading-h4 text-base-900 mb-space-3">
        {title ?? cfg.defaultTitle}
      </h3>
      <p className="text-body-md text-base-600 max-w-xs">
        {description ?? cfg.defaultDescription}
      </p>
      {action && <div className="mt-space-6">{action}</div>}
    </div>
  )
}
