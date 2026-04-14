import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Home01Icon,
  BarChartIcon,
  RankingIcon,
  UserGroup02Icon,
} from '@hugeicons/core-free-icons'
import { AppHeader, BottomBar, MenuRow, ProfileHeader } from './Navigation'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/Navigation',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Four navigation primitives for mobile app scaffolding.\n\n' +
          '- **AppHeader** — top bar (h=56px): hamburger · logo · notification bell with badge\n' +
          '- **BottomBar** — tab bar (h=84px): up to 6 tabs, active pill bg, optional count badge per tab\n' +
          '- **MenuRow** — h=52px list row with leading icon, label, and trailing chevron; used in slide-out menus\n' +
          '- **ProfileHeader** — user identity block with 60px avatar, name, email, role/department, and edit button',
      },
    },
  },
  argTypes: {
    logo: {
      description: 'Logo text or ReactNode shown in the centre of the header.',
      control: 'text',
      table: { category: 'Content', defaultValue: { summary: '"Compass"' } },
    },
    notificationCount: {
      description: 'Number of unread notifications. Shows a red dot when > 0.',
      control: { type: 'number', min: 0, max: 99 },
      table: { category: 'Content', defaultValue: { summary: '0' } },
    },
    onMenuClick: {
      description: 'Fired when the hamburger icon is clicked.',
      table: { category: 'Actions' },
    },
    onNotificationClick: {
      description: 'Fired when the bell icon is clicked.',
      table: { category: 'Actions' },
    },
  },
  args: {
    onMenuClick: fn(),
    onNotificationClick: fn(),
  },
}
export default meta

// ── Hugeicons shared across stories ──────────────────────────────────────────

const TABS = [
  { id: 'home',        label: 'Home',        icon: <HugeiconsIcon icon={Home01Icon}      size={18} color="#292524" strokeWidth={1.5} /> },
  { id: 'plans',       label: 'Plans',       icon: <HugeiconsIcon icon={BarChartIcon}    size={18} color="#292524" strokeWidth={1.5} /> },
  { id: 'leaderboard', label: 'Leaderboard', icon: <HugeiconsIcon icon={RankingIcon}     size={18} color="#292524" strokeWidth={1.5} />, badge: 2 },
  { id: 'groups',      label: 'Groups',      icon: <HugeiconsIcon icon={UserGroup02Icon} size={18} color="#292524" strokeWidth={1.5} /> },
]

// ── AppHeader ─────────────────────────────────────────────────────────────────

export const AppHeaderPlayground: StoryObj<typeof AppHeader> = {
  name: '⚙️ AppHeader — Playground',
  args: { logo: 'Compass', notificationCount: 3 },
  decorators: [(S) => <div className="w-[375px]"><S /></div>],
  parameters: {
    docs: {
      description: {
        story: 'Adjust **notificationCount** — the red dot appears when it is > 0. Click hamburger or bell to see actions fire.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /open menu/i }))
    await expect(args.onMenuClick).toHaveBeenCalledOnce()
    await userEvent.click(canvas.getByRole('button', { name: /notifications/i }))
    await expect(args.onNotificationClick).toHaveBeenCalledOnce()
  },
}

export const AppHeaderNoNotif: StoryObj<typeof AppHeader> = {
  name: 'AppHeader — No badge',
  args: { logo: 'Compass', notificationCount: 0 },
  decorators: [(S) => <div className="w-[375px]"><S /></div>],
  parameters: { docs: { description: { story: 'The notification dot is hidden when `notificationCount` is 0.' } } },
}

export const AppHeaderWithBadge: StoryObj<typeof AppHeader> = {
  name: 'AppHeader — With badge',
  args: { logo: 'Compass', notificationCount: 12 },
  decorators: [(S) => <div className="w-[375px]"><S /></div>],
}

// ── BottomBar ─────────────────────────────────────────────────────────────────

export const BottomBarPlayground: StoryObj = {
  name: '⚙️ BottomBar — Interactive',
  render: () => {
    const [active, setActive] = useState('home')
    const handleChange = fn()
    return (
      <div className="w-[375px] flex flex-col gap-space-4">
        <p className="text-label-sm text-base-500 text-center">Active: <strong className="text-base-900">{active}</strong></p>
        <BottomBar
          tabs={TABS}
          activeTab={active}
          onTabChange={(id) => { setActive(id); handleChange(id) }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Click each tab to see the active highlight move. The `Leaderboard` tab includes a count badge.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /plans/i }))
    await userEvent.click(canvas.getByRole('button', { name: /leaderboard/i }))
    await userEvent.click(canvas.getByRole('button', { name: /groups/i }))
  },
}

export const BottomBarAllActive: StoryObj = {
  name: 'BottomBar — Each tab active',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Each tab shown in its active state for visual reference.' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-space-5 w-[375px]">
      {TABS.map((t) => (
        <div key={t.id}>
          <p className="text-label-sm text-base-500 mb-space-2 capitalize">Active: {t.label}</p>
          <BottomBar tabs={TABS} activeTab={t.id} onTabChange={fn()} />
        </div>
      ))}
    </div>
  ),
}

// ── MenuRow ───────────────────────────────────────────────────────────────────

export const MenuRowPlayground: StoryObj<typeof MenuRow> = {
  name: '⚙️ MenuRow — Playground',
  render: (args) => (
    <div className="w-[375px] border border-base-300 rounded-md overflow-hidden">
      <MenuRow {...args} />
    </div>
  ),
  argTypes: {
    label: {
      description: 'Row label text.',
      control: 'text',
      table: { category: 'Content' },
    },
    onClick: {
      description: 'Fired when the row is clicked.',
      table: { category: 'Actions' },
    },
    icon: {
      control: false,
      description: 'Leading icon element.',
      table: { category: 'Content' },
    },
    trailing: {
      control: false,
      description: 'Trailing element. Defaults to a right-pointing chevron.',
      table: { category: 'Content' },
    },
  },
  args: { label: 'Commission Plans', icon: <HugeiconsIcon icon={BarChartIcon} size={18} color="#292524" strokeWidth={1.5} />, onClick: fn() },
  parameters: {
    docs: {
      description: { story: 'Edit **label** in Controls. Click the row to see the action fire.' },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const MenuRowList: StoryObj = {
  name: 'MenuRow — Menu list',
  render: () => (
    <div className="w-[375px] divide-y divide-base-200 border border-base-300 rounded-md overflow-hidden">
      <MenuRow label="People directory"  icon={<HugeiconsIcon icon={UserGroup02Icon} size={18} color="#292524" strokeWidth={1.5} />} onClick={fn()} />
      <MenuRow label="Commission Plans"  icon={<HugeiconsIcon icon={BarChartIcon}    size={18} color="#292524" strokeWidth={1.5} />} onClick={fn()} />
      <MenuRow label="Leaderboard"       icon={<HugeiconsIcon icon={RankingIcon}     size={18} color="#292524" strokeWidth={1.5} />} onClick={fn()} />
      <MenuRow label="Home"              icon={<HugeiconsIcon icon={Home01Icon}      size={18} color="#292524" strokeWidth={1.5} />} onClick={fn()} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Compose multiple `MenuRow` items inside a divided container for a full menu list.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const rows = canvas.getAllByRole('button')
    await expect(rows).toHaveLength(4)
    await userEvent.click(rows[1])
  },
}

// ── ProfileHeader ─────────────────────────────────────────────────────────────

export const ProfileHeaderPlayground: StoryObj<typeof ProfileHeader> = {
  name: '⚙️ ProfileHeader — Playground',
  render: (args) => (
    <div className="w-[375px] border border-base-300 rounded-md overflow-hidden">
      <ProfileHeader {...args} />
    </div>
  ),
  argTypes: {
    name: {
      description: 'Full name of the user.',
      control: 'text',
      table: { category: 'Content' },
    },
    email: {
      description: 'Work email address.',
      control: 'text',
      table: { category: 'Content' },
    },
    role: {
      description: 'Job title.',
      control: 'text',
      table: { category: 'Content' },
    },
    department: {
      description: 'Team or department name.',
      control: 'text',
      table: { category: 'Content' },
    },
    avatarSrc: {
      description: 'Photo URL. Falls back to initials when absent.',
      control: 'text',
      table: { category: 'Content' },
    },
    onEditClick: {
      description: 'If provided, shows a pencil icon button and fires this callback on click.',
      table: { category: 'Actions' },
    },
  },
  args: {
    name: 'Jared Dunn',
    email: 'jareddunn@xoxoday.com',
    role: 'HR Head',
    department: 'Administration',
    onEditClick: fn(),
  },
  parameters: {
    docs: {
      description: { story: 'Click the pencil icon to see the `onEditClick` action fire.' },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const editBtn = canvas.getByRole('button', { name: /edit profile/i })
    await userEvent.click(editBtn)
    await expect(args.onEditClick).toHaveBeenCalledOnce()
  },
}

export const ProfileHeaderNoEdit: StoryObj<typeof ProfileHeader> = {
  name: 'ProfileHeader — No edit button',
  render: (args) => (
    <div className="w-[375px] border border-base-300 rounded-md overflow-hidden">
      <ProfileHeader {...args} />
    </div>
  ),
  args: {
    name: 'Priya Patel',
    email: 'priya.patel@acme.com',
    role: 'Senior Sales Executive',
    department: 'Sales',
  },
  parameters: {
    docs: { description: { story: 'Omit `onEditClick` to hide the pencil button (read-only profile view).' } },
  },
}

// ── Full shell preview ────────────────────────────────────────────────────────

export const FullShellPreview: StoryObj = {
  name: 'Full Shell Preview',
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Composing AppHeader + content area + BottomBar into a full mobile shell.' } },
  },
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <div className="w-[375px] flex flex-col h-[812px] bg-base-100 font-sans mx-auto">
        <AppHeader notificationCount={3} onMenuClick={fn()} onNotificationClick={fn()} />
        <div className="flex-1 overflow-auto p-space-5 flex items-center justify-center">
          <p className="text-body-md text-base-500">Screen content area</p>
        </div>
        <BottomBar tabs={TABS} activeTab={active} onTabChange={setActive} />
      </div>
    )
  },
}
