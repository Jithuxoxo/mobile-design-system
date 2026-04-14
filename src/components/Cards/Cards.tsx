import type { ReactNode } from 'react'
import { Avatar } from '../Avatar/Avatar'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUp01Icon, ArrowDown01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

// ── SectionHeader ─────────────────────────────────────────────────────────────
// h=32, title (16px/600) + optional count badge + "See all ›" link

export interface SectionHeaderProps {
  title: string
  count?: number
  onSeeAll?: () => void
  className?: string
}

export function SectionHeader({ title, count, onSeeAll, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between h-8 font-sans ${className}`}>
      {/* Title + count badge */}
      <div className="flex items-center gap-space-2">
        <span className="text-heading-h4 text-base-900">{title}</span>
        {count !== undefined && (
          <span className="min-w-[18px] h-[18px] px-1 rounded-lg bg-error-400 text-base-000 text-[10px] font-bold flex items-center justify-center tabular-nums">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>

      {/* See all */}
      {onSeeAll && (
        <button
          type="button"
          onClick={onSeeAll}
          className="flex items-center gap-0.5 text-body-sm text-primary-400 font-medium hover:underline"
        >
          See all
          <span className="text-body-md leading-none">›</span>
        </button>
      )}
    </div>
  )
}

// ── PointsBalanceCard ─────────────────────────────────────────────────────────
// h=104, w=343, r=8, white bg, left col + shop now button

export interface PointsBalanceCardProps {
  points: number
  currencyLabel?: string
  equivalentAmount?: string
  onShopNow?: () => void
  className?: string
}

export function PointsBalanceCard({
  points,
  currencyLabel = 'My Points',
  equivalentAmount,
  onShopNow,
  className = '',
}: PointsBalanceCardProps) {
  return (
    <div
      className={`flex items-center justify-between px-space-5 py-space-5 bg-base-000 rounded-md shadow-elevation-1 font-sans ${className}`}
    >
      {/* Left col */}
      <div className="flex flex-col gap-space-1">
        <span className="text-label-md text-base-700 font-medium">{currencyLabel}</span>
        <span className="text-display-md text-base-900 leading-none tabular-nums">
          {points.toLocaleString()}
        </span>
        {equivalentAmount && (
          <span className="text-[11px] leading-4 text-primary-200">{equivalentAmount}</span>
        )}
      </div>

      {/* Shop Now */}
      <button
        type="button"
        onClick={onShopNow}
        className="flex items-center justify-center h-10 px-space-5 bg-primary-400 text-base-000 text-action-btn rounded-md hover:bg-primary-500 transition-colors"
      >
        Shop Now
      </button>
    </div>
  )
}

// ── BenefitCard ───────────────────────────────────────────────────────────────
// h=150, w=163 (2-col grid), r=8, icon container + title + description

export interface BenefitCardProps {
  icon: ReactNode
  title: string
  description: string
  onClick?: () => void
  className?: string
}

export function BenefitCard({ icon, title, description, onClick, className = '' }: BenefitCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-space-3 p-space-5 bg-base-000 rounded-md shadow-elevation-1 text-left hover:shadow-elevation-2 transition-shadow w-full font-sans ${className}`}
    >
      {/* Icon */}
      <span className="w-8 h-8 rounded-full bg-primary-000 flex items-center justify-center text-base leading-none">
        {icon}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-space-1">
        <span className="text-label-lg font-semibold text-base-900">{title}</span>
        <span className="text-body-sm text-base-700 line-clamp-2">{description}</span>
      </div>
    </button>
  )
}

// ── PromoCard ─────────────────────────────────────────────────────────────────
// h=144, w=343, r=12, Purple or DarkSlate bg + circular decor + content

export type PromoCardVariant = 'purple' | 'darkSlate'

export interface PromoCardProps {
  variant?: PromoCardVariant
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

const promoBg: Record<PromoCardVariant, string> = {
  purple:    'bg-brand-purple',
  darkSlate: 'bg-brand-dark-slate',
}

export function PromoCard({
  variant = 'purple',
  title,
  subtitle,
  action,
  className = '',
}: PromoCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md p-space-5 flex items-center ${promoBg[variant]} font-sans ${className}`}
    >
      {/* Decorative circle */}
      <div className="absolute -right-8 -top-8 w-38 h-38 rounded-full bg-white opacity-10" />
      <div className="absolute -right-16 bottom-0 w-32 h-32 rounded-full bg-white opacity-5" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-space-3 max-w-[200px]">
        <h3 className="text-heading-h3 text-base-000 leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-body-sm text-base-000 opacity-80 line-clamp-2">{subtitle}</p>
        )}
        {action && <div className="mt-space-1">{action}</div>}
      </div>
    </div>
  )
}

// ── SalesIncentivesCard ───────────────────────────────────────────────────────
// h=395, w=343, r=12 — the main incentive performance card

export interface StatItem {
  label: string
  value: string
}

export interface SalesIncentivesCardProps {
  title: string
  pills?: string[]
  targetLabel?: string
  achieved: number
  target: number
  stats?: StatItem[][]
  expanded?: boolean
  onToggle?: () => void
  className?: string
}

export function SalesIncentivesCard({
  title,
  pills = [],
  targetLabel = 'Target achievement',
  achieved,
  target,
  stats = [],
  expanded = true,
  onToggle,
  className = '',
}: SalesIncentivesCardProps) {
  const pct = Math.min(100, Math.round((achieved / target) * 100))

  return (
    <div
      className={`bg-base-000 rounded-md shadow-elevation-1 overflow-hidden font-sans ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-space-5 pt-space-5">
        <h3 className="text-[15px] font-bold text-base-900 flex-1 pr-space-3">{title}</h3>
        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="w-4 h-4 text-base-600 flex items-center justify-center"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <HugeiconsIcon icon={expanded ? ArrowUp01Icon : ArrowDown01Icon} size={16} color="currentColor" strokeWidth={1.5} />
          </button>
        )}
      </div>

      <div className="px-space-5 pb-space-5">
        {/* Pills */}
        {pills.length > 0 && (
          <div className="flex flex-wrap gap-space-2 mt-space-4">
            {pills.map((pill) => (
              <span
                key={pill}
                className="px-space-3 py-space-1 rounded-full bg-[#E3EAFD] text-primary-400 text-label-md font-medium"
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        {/* Target label */}
        <div className="flex items-center gap-space-2 mt-space-5">
          <span className="text-[13px] font-semibold text-base-900 flex-1">{targetLabel}</span>
        </div>

        {/* Big numbers */}
        <div className="flex items-baseline gap-space-2 mt-space-2">
          <span className="text-[22px] font-bold text-base-900 tabular-nums">
            {achieved.toLocaleString()}
          </span>
          <span className="text-body-md text-base-500">
            of {target.toLocaleString()}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-space-3 h-1.5 rounded-full bg-base-300 overflow-hidden">
          <div
            className="h-full rounded-full bg-success-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>

        {expanded && stats.length > 0 && (
          <>
            {/* Divider */}
            <div className="h-px bg-[#EFF1F5] mt-space-4 -mx-space-5" />

            {/* Stat rows */}
            {stats.map((row, ri) => (
              <div key={ri} className="flex gap-space-5 mt-space-4">
                {row.map((stat) => (
                  <div key={stat.label} className="flex-1">
                    <p className="text-body-sm text-base-700">{stat.label}</p>
                    <p className="text-heading-h4 text-base-900 mt-space-1 tabular-nums">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            ))}

            {/* Show less / more */}
            {onToggle && (
              <button
                type="button"
                onClick={onToggle}
                className="mt-space-4 text-label-lg text-primary-400 font-medium hover:underline"
              >
                Show less
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── LeaderboardWinnersCard ────────────────────────────────────────────────────
// h=410, w=343, r=12, month title + "See all" + rows of winner+points

export interface WinnerRow {
  name: string
  role: string
  points: number
  avatarSrc?: string
}

export interface LeaderboardWinnersCardProps {
  month: string
  winners: WinnerRow[]
  onSeeAll?: () => void
  className?: string
}

export function LeaderboardWinnersCard({
  month,
  winners,
  onSeeAll,
  className = '',
}: LeaderboardWinnersCardProps) {
  return (
    <div className={`bg-base-000 rounded-md shadow-elevation-1 overflow-hidden font-sans ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-space-5 h-14">
        <h3 className="text-heading-h4 text-[#141A20] font-semibold">{month} — Winners</h3>
        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="flex items-center gap-space-1 text-[13px] font-semibold text-primary-400 hover:underline"
          >
            See all
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} color="currentColor" strokeWidth={1.5} />
          </button>
        )}
      </div>
      <div className="h-px bg-[#EFF1F5]" />

      {/* Winner rows */}
      {winners.map((w, i) => (
        <div key={w.name}>
          <div className="flex items-center gap-space-4 px-space-5 h-[68px]">
            <Avatar size={40} name={w.name} src={w.avatarSrc} />
            <div className="flex-1 min-w-0">
              <p className="text-label-lg font-semibold text-base-900 truncate">{w.name}</p>
              <p className="text-body-sm text-base-700 truncate">{w.role}</p>
            </div>
            {/* Points chip */}
            <span className="flex items-center gap-space-2 px-space-3 h-[26px] rounded-full bg-[#FFEFCC] text-label-md font-semibold text-base-800 shrink-0">
              <span>⭐</span>
              <span className="tabular-nums">{w.points.toLocaleString()} pts</span>
            </span>
          </div>
          {i < winners.length - 1 && <div className="h-px bg-[#EFF1F5]" />}
        </div>
      ))}
    </div>
  )
}
