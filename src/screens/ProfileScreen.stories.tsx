import { useState } from 'react'
import type { StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft02Icon,
  ArrowRight01Icon,
  MagicWand01Icon,
  UserMultipleIcon,
  Award01Icon,
  Task01Icon,
  FavouriteIcon,
  GiftIcon,
  Analytics01Icon,
  ShoppingBag01Icon,
  Invoice01Icon,
  Settings01Icon,
  CustomerSupportIcon,
  Logout01Icon,
} from '@hugeicons/core-free-icons'
import { Avatar } from '../components/Avatar/Avatar'

// ─────────────────────────────────────────────────────────────────────────────
// Storybook metadata
// ─────────────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Screens/Profile',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Full-screen Profile / More page shown when the hamburger icon is tapped on Home.\n\n' +
          'Sections:\n' +
          '- **Profile card** — avatar with 60% completion ring, name, email, role · dept, chevron\n' +
          '- **Copilot card** — AI assistant entry-point with suggestion chips\n' +
          '- **Menu card** — Socials, Recognitions, Surveys, Benefits, Gift, Reports & Admin\n' +
          '- **Account card** — Order History (badge), Account Statement, Settings, Support\n' +
          '- **Logout** — navigates to the login flow',
      },
    },
  },
}
export default meta

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components (no react-router — use callback props instead)
// ─────────────────────────────────────────────────────────────────────────────

function ProfileAvatar({ name, completion = 60 }: { name: string; completion?: number }) {
  const size = 76
  const cx = size / 2
  const cy = size / 2
  const r = 34
  const circumference = 2 * Math.PI * r
  const dash = (completion / 100) * circumference
  const gap = circumference - dash

  return (
    <div className="relative shrink-0" style={{ width: size, height: size, margin: '-2px' }}>
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E7E5E4" strokeWidth={3} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#035BFF"
          strokeWidth={3}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Avatar size={60} name={name} />
      </div>
    </div>
  )
}

function Row({
  icon,
  label,
  trailing,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  trailing?: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-space-4 w-full h-[52px] px-space-5 hover:bg-base-100 transition-colors text-left"
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0 text-base-700">
        {icon}
      </span>
      <span className="flex-1 text-label-lg text-base-900">{label}</span>
      <span className="shrink-0 text-base-500">
        {trailing ?? (
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
        )}
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Full profile screen component (prop-driven — no hooks)
// ─────────────────────────────────────────────────────────────────────────────

interface ProfileScreenProps {
  name?: string
  email?: string
  role?: string
  department?: string
  profileCompletion?: number
  onBack?: () => void
  onLogout?: () => void
  onEditProfile?: () => void
  onCopilot?: () => void
}

function ProfileScreenView({
  name = 'Jithu Varghese',
  email = 'jithu@greythr.com',
  role = 'Product Designer',
  department = 'Design',
  profileCompletion = 60,
  onBack,
  onLogout,
  onEditProfile,
  onCopilot,
}: ProfileScreenProps) {
  return (
    <div className="flex flex-col min-h-full font-sans" style={{ background: '#F5F5F4' }}>

      {/* Header */}
      <div
        className="flex items-center h-[56px] px-space-5 shrink-0"
        style={{ background: '#EFF2F5' }}
      >
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-base-800"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={22} color="currentColor" strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[10px] px-space-5 pt-[10px] pb-space-8">

        {/* Profile card */}
        <div className="bg-base-000 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={onEditProfile}
            className="flex items-center gap-space-4 w-full px-space-5 py-space-5 hover:bg-base-100 transition-colors"
            aria-label="Edit profile"
          >
            <ProfileAvatar name={name} completion={profileCompletion} />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-label-lg font-bold text-base-900 truncate">{name}</p>
              <p className="text-body-sm text-base-700 truncate">{email}</p>
              <div className="flex items-center gap-space-2 mt-space-1">
                <span className="text-body-sm text-base-600">{role}</span>
                <span className="w-1 h-1 rounded-full bg-base-400 shrink-0" />
                <span className="text-body-sm text-base-600 truncate">{department}</span>
              </div>
              <p className="text-[10px] text-primary-400 font-medium mt-space-1">
                {profileCompletion}% profile complete
              </p>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} color="#A8A29E" strokeWidth={1.5} />
          </button>
        </div>

        {/* Copilot card */}
        <div className="bg-base-000 rounded-md px-space-5 py-space-5">
          <div className="flex items-center justify-between mb-space-3">
            <div className="flex items-center gap-space-3">
              <span className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-primary-400 shrink-0">
                <HugeiconsIcon icon={MagicWand01Icon} size={16} color="currentColor" strokeWidth={1.5} />
              </span>
              <span className="text-label-lg font-semibold text-base-900">Copilot</span>
            </div>
            <button type="button" onClick={onCopilot} aria-label="Open copilot">
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#A8A29E" strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-body-sm text-base-600 mb-space-4">
            Your AI assistant for incentives, plans, and performance insights.
          </p>
          <div className="flex flex-wrap gap-space-2">
            {['How am I performing?', 'Upcoming payouts', 'View my plan'].map((chip) => (
              <button
                key={chip}
                type="button"
                className="px-space-3 py-space-2 rounded-md border border-base-300/80 text-label-sm text-base-700 hover:bg-base-100 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Menu card */}
        <div className="bg-base-000 rounded-md overflow-hidden divide-y divide-base-300/80">
          <Row icon={<HugeiconsIcon icon={UserMultipleIcon} size={18} color="currentColor" strokeWidth={1.5} />} label="Socials" />
          <Row icon={<HugeiconsIcon icon={Award01Icon}       size={18} color="currentColor" strokeWidth={1.5} />} label="Recognitions" />
          <Row icon={<HugeiconsIcon icon={Task01Icon}        size={18} color="currentColor" strokeWidth={1.5} />} label="Surveys" />
          <Row icon={<HugeiconsIcon icon={FavouriteIcon}     size={18} color="currentColor" strokeWidth={1.5} />} label="Benefits" />
          <Row icon={<HugeiconsIcon icon={GiftIcon}          size={18} color="currentColor" strokeWidth={1.5} />} label="Gift" />
          <Row icon={<HugeiconsIcon icon={Analytics01Icon}   size={18} color="currentColor" strokeWidth={1.5} />} label="Reports & Admin" />
        </div>

        {/* Account card */}
        <div className="bg-base-000 rounded-md overflow-hidden divide-y divide-base-300/80">
          <Row
            icon={<HugeiconsIcon icon={ShoppingBag01Icon} size={18} color="currentColor" strokeWidth={1.5} />}
            label="Order History"
            trailing={
              <div className="flex items-center gap-space-2">
                <span className="px-space-2 py-[2px] rounded-full bg-[#EEF3FF] text-primary-400 text-label-sm font-medium">
                  2 Orders
                </span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#A8A29E" strokeWidth={1.5} />
              </div>
            }
          />
          <Row icon={<HugeiconsIcon icon={Invoice01Icon}        size={18} color="currentColor" strokeWidth={1.5} />} label="Account Statement" />
          <Row icon={<HugeiconsIcon icon={Settings01Icon}       size={18} color="currentColor" strokeWidth={1.5} />} label="Settings" />
          <Row icon={<HugeiconsIcon icon={CustomerSupportIcon}  size={18} color="currentColor" strokeWidth={1.5} />} label="Support" />
        </div>

        {/* Logout card */}
        <div className="bg-base-000 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-space-4 w-full h-[52px] px-space-5 hover:bg-base-100 transition-colors"
            aria-label="Logout"
          >
            <HugeiconsIcon icon={Logout01Icon} size={18} color="#F04438" strokeWidth={1.5} />
            <span className="text-label-lg text-error-400 font-medium">Logout</span>
          </button>
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Phone frame wrapper
// ─────────────────────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[40px] shadow-elevation-3 border border-base-300/80"
      style={{ width: 375, height: 812, background: '#F5F5F4' }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 h-[44px] shrink-0" style={{ background: '#EFF2F5' }}>
        <span className="text-[13px] font-semibold text-[#0C0A09]">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0" y="7" width="3" height="5" rx="0.5" fill="#0C0A09" />
            <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" fill="#0C0A09" />
            <rect x="9" y="2" width="3" height="10" rx="0.5" fill="#0C0A09" />
            <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="#0C0A09" opacity="0.3" />
          </svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
            <path d="M7.5 10a1 1 0 100-2 1 1 0 000 2z" fill="#0C0A09" />
            <path d="M4.5 7.5a4.2 4.2 0 016 0" stroke="#0C0A09" strokeWidth="1.3" strokeLinecap="round" fill="none" />
            <path d="M2 5a7.5 7.5 0 0111 0" stroke="#0C0A09" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="#0C0A09" strokeWidth="1" />
            <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#0C0A09" />
            <path d="M22 4v4" stroke="#0C0A09" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* Scrollable content */}
      <div className="overflow-y-auto" style={{ height: 812 - 44 }}>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────

export const FullScreen: StoryObj = {
  name: '⚙️ Profile — Full Screen',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Complete profile screen in a 375×812 phone frame. Scroll inside the frame to see all sections.',
      },
    },
  },
  render: () => (
    <PhoneFrame>
      <ProfileScreenView
        onBack={fn()}
        onLogout={fn()}
        onEditProfile={fn()}
        onCopilot={fn()}
      />
    </PhoneFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: /go back/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /edit profile/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /logout/i })).toBeVisible()
  },
}

export const ProfileCardSection: StoryObj = {
  name: 'Profile — Card section',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Profile card with avatar completion ring (60%), name, email, role · department.',
      },
    },
  },
  render: () => {
    const [completion, setCompletion] = useState(60)
    return (
      <div className="flex flex-col gap-space-4 w-[375px] font-sans" style={{ background: '#F5F5F4', padding: 16 }}>
        <div className="flex items-center justify-between">
          <span className="text-label-md text-base-600">Profile completion: <strong>{completion}%</strong></span>
          <input
            type="range" min={0} max={100} value={completion}
            onChange={e => setCompletion(Number(e.target.value))}
            className="w-24"
          />
        </div>
        <div className="bg-base-000 rounded-md overflow-hidden">
          <button type="button" className="flex items-center gap-space-4 w-full px-space-5 py-space-5">
            <ProfileAvatar name="Jithu Varghese" completion={completion} />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-label-lg font-bold text-base-900">Jithu Varghese</p>
              <p className="text-body-sm text-base-700">jithu@greythr.com</p>
              <div className="flex items-center gap-space-2 mt-space-1">
                <span className="text-body-sm text-base-600">Product Designer</span>
                <span className="w-1 h-1 rounded-full bg-base-400 shrink-0" />
                <span className="text-body-sm text-base-600">Design</span>
              </div>
              <p className="text-[10px] text-primary-400 font-medium mt-space-1">{completion}% profile complete</p>
            </div>
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} color="#A8A29E" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Drag the slider to preview different completion percentages. The blue arc updates live.',
      },
    },
  },
}

export const CopilotCardSection: StoryObj = {
  name: 'Profile — Copilot card',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Copilot entry-point with description and three AI suggestion chips.',
      },
    },
  },
  render: () => (
    <div className="w-[375px] font-sans" style={{ background: '#F5F5F4', padding: 16 }}>
      <div className="bg-base-000 rounded-md px-space-5 py-space-5">
        <div className="flex items-center justify-between mb-space-3">
          <div className="flex items-center gap-space-3">
            <span className="w-7 h-7 rounded-lg bg-[#EEF3FF] flex items-center justify-center text-primary-400 shrink-0">
              <HugeiconsIcon icon={MagicWand01Icon} size={16} color="currentColor" strokeWidth={1.5} />
            </span>
            <span className="text-label-lg font-semibold text-base-900">Copilot</span>
          </div>
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#A8A29E" strokeWidth={1.5} />
        </div>
        <p className="text-body-sm text-base-600 mb-space-4">
          Your AI assistant for incentives, plans, and performance insights.
        </p>
        <div className="flex flex-wrap gap-space-2">
          {['How am I performing?', 'Upcoming payouts', 'View my plan'].map((chip) => (
            <button
              key={chip}
              type="button"
              className="px-space-3 py-space-2 rounded-md border border-base-300/80 text-label-sm text-base-700 hover:bg-base-100 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const MenuSection: StoryObj = {
  name: 'Profile — Menu & Account sections',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Menu card (6 items) and Account card (4 items) with the Order History badge.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-[10px] w-[375px] font-sans" style={{ background: '#F5F5F4', padding: 16 }}>
      {/* Menu */}
      <div className="bg-base-000 rounded-md overflow-hidden divide-y divide-base-300/80">
        <Row icon={<HugeiconsIcon icon={UserMultipleIcon} size={18} color="currentColor" strokeWidth={1.5} />} label="Socials" />
        <Row icon={<HugeiconsIcon icon={Award01Icon}       size={18} color="currentColor" strokeWidth={1.5} />} label="Recognitions" />
        <Row icon={<HugeiconsIcon icon={Task01Icon}        size={18} color="currentColor" strokeWidth={1.5} />} label="Surveys" />
        <Row icon={<HugeiconsIcon icon={FavouriteIcon}     size={18} color="currentColor" strokeWidth={1.5} />} label="Benefits" />
        <Row icon={<HugeiconsIcon icon={GiftIcon}          size={18} color="currentColor" strokeWidth={1.5} />} label="Gift" />
        <Row icon={<HugeiconsIcon icon={Analytics01Icon}   size={18} color="currentColor" strokeWidth={1.5} />} label="Reports & Admin" />
      </div>
      {/* Account */}
      <div className="bg-base-000 rounded-md overflow-hidden divide-y divide-base-300/80">
        <Row
          icon={<HugeiconsIcon icon={ShoppingBag01Icon} size={18} color="currentColor" strokeWidth={1.5} />}
          label="Order History"
          trailing={
            <div className="flex items-center gap-space-2">
              <span className="px-space-2 py-[2px] rounded-full bg-[#EEF3FF] text-primary-400 text-label-sm font-medium">2 Orders</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="#A8A29E" strokeWidth={1.5} />
            </div>
          }
        />
        <Row icon={<HugeiconsIcon icon={Invoice01Icon}       size={18} color="currentColor" strokeWidth={1.5} />} label="Account Statement" />
        <Row icon={<HugeiconsIcon icon={Settings01Icon}      size={18} color="currentColor" strokeWidth={1.5} />} label="Settings" />
        <Row icon={<HugeiconsIcon icon={CustomerSupportIcon} size={18} color="currentColor" strokeWidth={1.5} />} label="Support" />
      </div>
    </div>
  ),
}

export const LogoutSection: StoryObj = {
  name: 'Profile — Logout row',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Logout row — red icon and label. Fires `onLogout` when clicked.',
      },
    },
  },
  render: () => (
    <div className="w-[375px] font-sans" style={{ background: '#F5F5F4', padding: 16 }}>
      <div className="bg-base-000 rounded-md overflow-hidden">
        <button
          type="button"
          onClick={fn()}
          className="flex items-center gap-space-4 w-full h-[52px] px-space-5 hover:bg-base-100 transition-colors"
          aria-label="Logout"
        >
          <HugeiconsIcon icon={Logout01Icon} size={18} color="#F04438" strokeWidth={1.5} />
          <span className="text-label-lg text-error-400 font-medium">Logout</span>
        </button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /logout/i }))
    await expect(canvas.getByRole('button', { name: /logout/i })).toBeVisible()
  },
}
