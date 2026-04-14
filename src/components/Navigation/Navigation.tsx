import type { ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Menu01Icon,
  Notification01Icon,
  ArrowRight01Icon,
  PencilEdit01Icon,
} from '@hugeicons/core-free-icons'

// ── AppHeader ─────────────────────────────────────────────────────────────────
// h=56, bg=base-200, hamburger / logo / bell+badge

export interface AppHeaderProps {
  /** Logo text or element. Defaults to "empuls". */
  logo?: ReactNode
  notificationCount?: number
  onMenuClick?: () => void
  onNotificationClick?: () => void
  className?: string
}

export function AppHeader({
  logo = 'Compass',
  notificationCount = 0,
  onMenuClick,
  onNotificationClick,
  className = '',
}: AppHeaderProps) {
  return (
    <header
      className={`flex items-center justify-between h-14 px-space-5 bg-base-200 font-sans ${className}`}
    >
      {/* Hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        className="text-base-900 hover:text-primary-400 transition-colors p-space-1 -ml-space-1"
        aria-label="Open menu"
      >
        <HugeiconsIcon icon={Menu01Icon} size={20} color="currentColor" strokeWidth={1.5} />
      </button>

      {/* Logo */}
      <div className="flex-1 px-space-4">
        {typeof logo === 'string' ? (
          <span className="text-heading-h3 text-base-900 font-bold">{logo}</span>
        ) : (
          logo
        )}
      </div>

      {/* Bell + badge */}
      <button
        type="button"
        onClick={onNotificationClick}
        className="relative text-base-900 hover:text-primary-400 transition-colors p-space-1"
        aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ''}`}
      >
        <HugeiconsIcon icon={Notification01Icon} size={20} color="currentColor" strokeWidth={1.5} />
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-error-400 border border-base-200" />
        )}
      </button>
    </header>
  )
}

// ── BottomBar ─────────────────────────────────────────────────────────────────
// h=84, bg=white, up to 6 tabs, active tab = pill bg=primary-000

export interface BottomTabItem {
  id: string
  label: string
  icon: ReactNode
  badge?: number
}

export interface BottomBarProps {
  tabs: BottomTabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
}

export function BottomBar({ tabs, activeTab, onTabChange, className = '' }: BottomBarProps) {
  return (
    <nav
      className={`flex items-end justify-around h-[84px] pb-space-3 bg-base-000 border-t border-base-300 font-sans ${className}`}
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className="flex flex-col items-center gap-space-1 w-14 relative"
          >
            {/* Icon pill */}
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                isActive ? 'bg-primary-000 text-primary-400' : 'text-base-700'
              }`}
            >
              {tab.icon}
            </span>

            {/* Badge on icon */}
            {tab.badge && tab.badge > 0 ? (
              <span className="absolute top-0 right-2 min-w-4 h-4 px-0.5 rounded-full bg-error-400 text-base-000 text-[9px] font-bold flex items-center justify-center">
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            ) : null}

            {/* Label */}
            <span
              className={`text-label-sm ${
                isActive ? 'text-primary-400 font-medium' : 'text-base-700 font-normal'
              }`}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ── MenuRow ───────────────────────────────────────────────────────────────────
// h=52, w=343, bg=white, icon + label + chevron

export interface MenuRowProps {
  icon?: ReactNode
  label: string
  trailing?: ReactNode
  onClick?: () => void
  className?: string
}

export function MenuRow({ icon, label, trailing, onClick, className = '' }: MenuRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full h-[52px] px-space-5 bg-base-000 hover:bg-base-100 transition-colors font-sans ${className}`}
    >
      <div className="flex items-center gap-space-4">
        {icon && (
          <span className="w-5 h-5 flex items-center justify-center text-base-900 shrink-0">
            {icon}
          </span>
        )}
        <span className="text-heading-h4 text-base-900">{label}</span>
      </div>
      <span className="text-base-700">
        {trailing ?? <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
      </span>
    </button>
  )
}

// ── ProfileHeader ─────────────────────────────────────────────────────────────
// h=100, w=343, bg=white, avatar-60 + name + email + role·dept + edit button

export interface ProfileHeaderProps {
  name: string
  email: string
  role?: string
  department?: string
  avatarSrc?: string
  onEditClick?: () => void
  className?: string
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

export function ProfileHeader({
  name,
  email,
  role,
  department,
  avatarSrc,
  onEditClick,
  className = '',
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex items-center gap-space-4 px-space-5 py-space-5 bg-base-000 font-sans ${className}`}
    >
      {/* Avatar 60px */}
      <div className="w-15 h-15 rounded-full bg-brand-avatar-blue flex items-center justify-center shrink-0 overflow-hidden">
        {avatarSrc ? (
          <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-heading-h3 font-semibold text-primary-500">{getInitials(name)}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-heading-h4 text-base-900 truncate">{name}</p>
        <p className="text-body-sm text-base-700 truncate">{email}</p>
        {(role || department) && (
          <div className="flex items-center gap-space-2 mt-space-1">
            {role && <span className="text-body-sm text-base-700">{role}</span>}
            {role && department && (
              <span className="w-1 h-1 rounded-full bg-base-400 shrink-0" />
            )}
            {department && <span className="text-body-sm text-base-700 truncate">{department}</span>}
          </div>
        )}
      </div>

      {/* Edit button */}
      {onEditClick && (
        <button
          type="button"
          onClick={onEditClick}
          className="w-7 h-7 rounded-full bg-base-200 flex items-center justify-center text-base-700 hover:bg-base-300 transition-colors shrink-0"
          aria-label="Edit profile"
        >
          <HugeiconsIcon icon={PencilEdit01Icon} size={14} color="currentColor" strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
