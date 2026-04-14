import { Avatar } from '../Avatar/Avatar'
import { HugeiconsIcon } from '@hugeicons/react'
import { Invoice01Icon } from '@hugeicons/core-free-icons'

// ── LeaderboardRow ────────────────────────────────────────────────────────────
// h=50, w=280. Rank 1=amber, 2=blue-gray, 3=bronze, 4+=gray

export type LeaderboardRank = 1 | 2 | 3 | number

export interface LeaderboardRowProps {
  rank: LeaderboardRank
  name: string
  department: string
  score: number
  avatarSrc?: string
  isSelf?: boolean
  className?: string
}

const rankConfig: Record<number, { glow: string; badge: string; text: string }> = {
  1: { glow: 'bg-secondary-500',  badge: 'text-secondary-500', text: '1' },
  2: { glow: 'bg-primary-200',    badge: 'text-primary-400',   text: '2' },
  3: { glow: 'bg-[#C87B3E]',      badge: 'text-secondary-400', text: '3' },
}

function getRankConfig(rank: number) {
  return rankConfig[rank] ?? { glow: 'bg-base-400', badge: 'text-base-600', text: String(rank) }
}

export function LeaderboardRow({
  rank,
  name,
  department,
  score,
  avatarSrc,
  isSelf = false,
  className = '',
}: LeaderboardRowProps) {
  const cfg = getRankConfig(rank)

  return (
    <div
      className={`flex items-center gap-space-4 py-[10px] px-space-4 font-sans ${
        isSelf ? 'bg-primary-000' : 'bg-base-000'
      } ${className}`}
    >
      {/* Avatar */}
      <Avatar size={40} name={name} src={avatarSrc} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-label-lg font-semibold text-base-900 truncate block">{name}</span>
        <span className="text-body-sm text-base-700 truncate block">{department}</span>
      </div>

      {/* Score pill */}
      <span className="flex items-center justify-center gap-space-1 px-space-2 h-[22px] rounded-md bg-base-200 text-label-md font-semibold text-base-800 shrink-0 tabular-nums">
        {score.toLocaleString()} ⭐
      </span>

      {/* Rank badge */}
      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
        <span className={`absolute inset-0 rounded-full ${cfg.glow} opacity-30`} />
        <span className={`relative text-[9px] font-semibold ${cfg.badge}`}>{cfg.text}</span>
      </div>
    </div>
  )
}

// ── CelebrationRow ────────────────────────────────────────────────────────────
// h=69, w=343, left = avatar + name + celebration tag, right = "Wish" link

export interface CelebrationRowProps {
  name: string
  eventLabel: string
  avatarSrc?: string
  onWish?: () => void
  className?: string
}

export function CelebrationRow({
  name,
  eventLabel,
  avatarSrc,
  onWish,
  className = '',
}: CelebrationRowProps) {
  return (
    <div className={`flex items-center justify-between py-space-5 px-space-4 font-sans ${className}`}>
      {/* Left */}
      <div className="flex items-center gap-space-3 flex-1 min-w-0">
        <Avatar size={40} name={name} src={avatarSrc} />
        <div className="flex flex-col gap-space-1 min-w-0">
          <span className="text-label-lg font-semibold text-base-900 truncate">{name}</span>
          <span className="inline-flex items-center px-space-2 h-[23px] rounded-md bg-base-200 text-body-sm text-base-800 truncate max-w-[200px]">
            {eventLabel}
          </span>
        </div>
      </div>

      {/* Wish CTA */}
      {onWish && (
        <button
          type="button"
          onClick={onWish}
          className="text-body-sm font-medium text-primary-400 hover:underline shrink-0 ml-space-3"
        >
          Wish 🎉
        </button>
      )}
    </div>
  )
}

// ── FeedPost ──────────────────────────────────────────────────────────────────
// h=118, w=343, bg=white, avatar + content column

export interface FeedPostProps {
  authorName: string
  postedOn?: string
  body: string
  timestamp?: string
  avatarSrc?: string
  className?: string
}

export function FeedPost({
  authorName,
  postedOn,
  body,
  timestamp,
  avatarSrc,
  className = '',
}: FeedPostProps) {
  return (
    <div className={`flex gap-space-3 px-space-4 py-space-5 bg-base-000 font-sans ${className}`}>
      {/* Avatar */}
      <Avatar size={40} name={authorName} src={avatarSrc} className="shrink-0" />

      {/* Content */}
      <div className="flex flex-col gap-space-2 flex-1 min-w-0">
        {/* Row 1: name + posted on */}
        <div className="flex flex-wrap items-baseline gap-space-2">
          <span className="text-label-lg font-semibold text-base-900">{authorName}</span>
          {postedOn && (
            <span className="text-body-sm text-base-700 truncate">{postedOn}</span>
          )}
        </div>

        {/* Body */}
        <p className="text-[13px] text-base-800 leading-[1.4] line-clamp-2">{body}</p>

        {/* Timestamp */}
        {timestamp && (
          <span className="text-[11px] text-base-700">{timestamp}</span>
        )}
      </div>
    </div>
  )
}

// ── SurveyCard ────────────────────────────────────────────────────────────────
// h=108, w=244, bg=white, icon + title + author · date

export interface SurveyCardProps {
  title: string
  author: string
  date: string
  onClick?: () => void
  className?: string
}

export function SurveyCard({ title, author, date, onClick, className = '' }: SurveyCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-space-3 py-space-5 px-space-4 bg-base-000 rounded-md shadow-elevation-1 text-left hover:shadow-elevation-2 transition-shadow font-sans ${className}`}
    >
      {/* Icon */}
      <span className="w-6 h-6 rounded-md bg-primary-000 flex items-center justify-center text-primary-400">
        <HugeiconsIcon icon={Invoice01Icon} size={14} color="currentColor" strokeWidth={1.5} />
      </span>

      {/* Title */}
      <p className="text-label-lg font-semibold text-base-900 line-clamp-2">{title}</p>

      {/* Meta */}
      <div className="flex items-center gap-space-2">
        <span className="text-[11px] text-base-700">{author}</span>
        <span className="text-[11px] text-base-400">·</span>
        <span className="text-[11px] text-base-700">{date}</span>
      </div>
    </button>
  )
}
