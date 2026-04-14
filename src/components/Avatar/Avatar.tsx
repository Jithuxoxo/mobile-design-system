// ── Types ─────────────────────────────────────────────────────────────────────

export type AvatarSize = 80 | 60 | 48 | 40 | 32 | 24
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline'

export interface AvatarProps {
  size?: AvatarSize
  src?: string
  name?: string
  status?: AvatarStatus
  className?: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const sizeConfig: Record<AvatarSize, { container: string; text: string; statusSize: string; statusOffset: string }> = {
  80: { container: 'w-20 h-20', text: 'text-heading-h2',  statusSize: 'w-4 h-4',    statusOffset: 'bottom-0.5 right-0.5' },
  60: { container: 'w-15 h-15', text: 'text-heading-h3',  statusSize: 'w-3.5 h-3.5', statusOffset: 'bottom-0.5 right-0.5' },
  48: { container: 'w-12 h-12', text: 'text-heading-h4',  statusSize: 'w-3 h-3',    statusOffset: 'bottom-0 right-0' },
  40: { container: 'w-10 h-10', text: 'text-heading-h5',  statusSize: 'w-2.5 h-2.5', statusOffset: 'bottom-0 right-0' },
  32: { container: 'w-8  h-8',  text: 'text-label-md',   statusSize: 'w-2 h-2',    statusOffset: '-bottom-0.5 -right-0.5' },
  24: { container: 'w-6  h-6',  text: 'text-label-sm',   statusSize: 'w-1.5 h-1.5', statusOffset: '-bottom-0.5 -right-0.5' },
}

const statusColors: Record<AvatarStatus, string> = {
  online:  'bg-success-400',
  away:    'bg-secondary-400',
  busy:    'bg-error-400',
  offline: 'bg-base-400',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

// Deterministic background color from name
const bgPalette = [
  'bg-primary-000 text-primary-400',
  'bg-success-000 text-success-400',
  'bg-secondary-100 text-secondary-500',
  'bg-error-000 text-error-400',
  'bg-brand-avatar-blue text-primary-500',
]
function avatarBgFromName(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return bgPalette[Math.abs(hash) % bgPalette.length]
}

// ── Avatar ────────────────────────────────────────────────────────────────────

export function Avatar({ size = 40, src, name = '', status, className = '' }: AvatarProps) {
  const cfg = sizeConfig[size]

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`${cfg.container} rounded-full overflow-hidden flex items-center justify-center font-semibold ${
          src ? '' : avatarBgFromName(name || 'U')
        }`}
      >
        {src ? (
          <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <span className={cfg.text}>{name ? getInitials(name) : '?'}</span>
        )}
      </div>

      {status && (
        <span
          className={`absolute ${cfg.statusOffset} ${cfg.statusSize} ${statusColors[status]} rounded-full border-2 border-base-000`}
        />
      )}
    </div>
  )
}

// ── Avatar Group ──────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  users: { name: string; src?: string }[]
  max?: number
  size?: AvatarSize
  className?: string
}

export function AvatarGroup({ users, max = 4, size = 40, className = '' }: AvatarGroupProps) {
  const shown = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {shown.map((u, i) => (
        <Avatar
          key={i}
          size={size}
          name={u.name}
          src={u.src}
          className="ring-2 ring-base-000"
        />
      ))}
      {overflow > 0 && (
        <div
          className={`${sizeConfig[size].container} rounded-full bg-base-200 text-base-600 flex items-center justify-center ring-2 ring-base-000 ${sizeConfig[size].text} font-semibold`}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
