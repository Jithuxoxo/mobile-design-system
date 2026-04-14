import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type InputState = 'default' | 'focused' | 'filled' | 'error' | 'disabled'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorText?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  state?: InputState
}

// ── Style helpers ─────────────────────────────────────────────────────────────

function wrapperClasses(state: InputState, hasError: boolean): string {
  const base =
    'flex items-center gap-space-3 h-12 w-full px-space-4 rounded-md border bg-base-000 transition-colors'

  if (state === 'disabled') return `${base} bg-base-200 border-base-300 cursor-not-allowed`
  if (state === 'error' || hasError)
    return `${base} border-error-400 ring-1 ring-error-400`
  if (state === 'focused')
    return `${base} border-primary-400 ring-1 ring-primary-400`
  return `${base} border-base-300 hover:border-base-500 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400`
}

// ── Component ─────────────────────────────────────────────────────────────────

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      leadingIcon,
      trailingIcon,
      state = 'default',
      disabled,
      className = '',
      id,
      ...rest
    },
    ref,
  ) => {
    const hasError = state === 'error' || !!errorText
    const isDisabled = state === 'disabled' || disabled

    return (
      <div className={`flex flex-col gap-space-2 w-full font-sans ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-label-lg font-medium ${isDisabled ? 'text-base-400' : 'text-base-800'}`}
          >
            {label}
          </label>
        )}

        <div className={wrapperClasses(state, hasError)}>
          {leadingIcon && (
            <span className={`shrink-0 ${isDisabled ? 'text-base-400' : 'text-base-500'}`}>
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={isDisabled}
            className={[
              'flex-1 min-w-0 bg-transparent text-body-md text-base-900',
              'placeholder:text-base-400',
              'outline-none',
              'disabled:cursor-not-allowed disabled:text-base-400',
            ].join(' ')}
            {...rest}
          />

          {trailingIcon && (
            <span className={`shrink-0 ${isDisabled ? 'text-base-400' : 'text-base-500'}`}>
              {trailingIcon}
            </span>
          )}
        </div>

        {(errorText || helperText) && (
          <p className={`text-body-sm ${hasError ? 'text-error-400' : 'text-base-500'}`}>
            {hasError ? errorText : helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
