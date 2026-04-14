import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'amber'
  | 'dark'
  | 'white'
  | 'disabled'

export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  /** Leading icon element */
  leading?: ReactNode
  /** Trailing icon element */
  trailing?: ReactNode
  children: ReactNode
}

// ── Style maps ────────────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-400 text-base-000 hover:bg-primary-500 active:bg-primary-500 focus-visible:ring-primary-300',
  secondary:
    'bg-base-000 text-primary-400 border border-primary-400 hover:bg-primary-000 active:bg-primary-100 focus-visible:ring-primary-300',
  ghost:
    'bg-transparent text-primary-400 hover:bg-primary-000 active:bg-primary-100 focus-visible:ring-primary-300',
  danger:
    'bg-error-400 text-base-000 hover:bg-error-500 active:bg-error-500 focus-visible:ring-error-300',
  amber:
    'bg-secondary-500 text-base-000 hover:bg-secondary-400 active:bg-secondary-400 focus-visible:ring-secondary-300',
  dark:
    'bg-base-900 text-base-000 hover:bg-base-800 active:bg-base-800 focus-visible:ring-base-600',
  white:
    'bg-base-000 text-base-900 border border-base-300 hover:bg-base-100 active:bg-base-200 focus-visible:ring-base-400',
  disabled:
    'bg-base-200 text-base-400 cursor-not-allowed pointer-events-none',
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-12 px-space-6 gap-space-2 text-action-btn rounded-md',
  md: 'h-10 px-space-6 gap-space-2 text-action-btn rounded-md',
  sm: 'h-8  px-space-4 gap-space-2 text-action-btnsm rounded-md',
  xs: 'h-6  px-space-3 gap-space-1 text-action-btnsm rounded-sm',
}

// ── Component ─────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leading,
      trailing,
      children,
      className = '',
      disabled,
      ...rest
    },
    ref,
  ) => {
    const resolvedVariant = disabled ? 'disabled' : variant

    return (
      <button
        ref={ref}
        disabled={disabled || variant === 'disabled'}
        className={[
          'inline-flex items-center justify-center font-sans font-bold',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          sizeClasses[size],
          variantClasses[resolvedVariant],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {leading && <span className="shrink-0">{leading}</span>}
        <span>{children}</span>
        {trailing && <span className="shrink-0">{trailing}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
