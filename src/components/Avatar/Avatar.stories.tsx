import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'User identity element with two variants.\n\n' +
          '- **Avatar** — single user, 6 sizes (80/60/48/40/32/24 px), initials fallback with deterministic colour from name, optional photo, optional status ring.\n' +
          '- **AvatarGroup** — stacked overlap with configurable max and overflow count.',
      },
    },
  },
  argTypes: {
    size: {
      description: 'Diameter in pixels.',
      control: 'select',
      options: [80, 60, 48, 40, 32, 24],
      table: { category: 'Appearance', defaultValue: { summary: '40' } },
    },
    name: {
      description: 'Full name — used to generate initials and deterministic background colour when no `src` is provided.',
      control: 'text',
      table: { category: 'Content' },
    },
    src: {
      description: 'URL of the avatar photo. Falls back to initials when absent or broken.',
      control: 'text',
      table: { category: 'Content' },
    },
    status: {
      description: 'Presence indicator dot shown at the bottom-right corner.',
      control: 'select',
      options: [undefined, 'online', 'away', 'busy', 'offline'],
      table: { category: 'State', defaultValue: { summary: 'undefined' } },
    },
    className: {
      table: { disable: true },
    },
  },
  args: { name: 'Sarah Johnson', size: 40 },
}
export default meta

type Story = StoryObj<typeof Avatar>

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
  args: { size: 48, status: 'online' },
  parameters: {
    docs: {
      description: {
        story: 'Adjust **size**, **name**, **src**, and **status** in Controls. Change the name to see how the initials and background colour update.',
      },
    },
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'All Sizes',
  render: (args) => (
    <div className="flex items-end gap-space-6">
      {([80, 60, 48, 40, 32, 24] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-space-3">
          <Avatar {...args} size={s} />
          <span className="text-caption text-base-500">{s}px</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '80px — profile headers · 60px — slide-out menu · 48px — greeting banners · 40px — list rows · 32px — compact lists / avatar groups · 24px — inline mentions.',
      },
    },
  },
}

// ── Initials palette ──────────────────────────────────────────────────────────

export const InitialsPalette: Story = {
  name: 'Initials — Colour palette',
  render: () => (
    <div className="flex flex-wrap gap-space-4">
      {[
        'Sarah Johnson', 'Marcus Chen', 'Priya Patel',
        'James Wilson', 'Mei Tanaka', 'Alex Rivera',
        'Divya Sharma', 'Rohan Mehta',
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-space-2">
          <Avatar size={48} name={name} />
          <span className="text-caption text-base-500 text-center max-w-[60px] leading-tight">{name.split(' ')[0]}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Background colour is derived deterministically from the name string — the same name always maps to the same colour.',
      },
    },
  },
}

// ── With photo ────────────────────────────────────────────────────────────────

export const WithPhoto: Story = {
  name: 'With Photo',
  args: {
    size: 48,
    name: 'Sarah Johnson',
    src: 'https://i.pravatar.cc/150?img=47',
  },
  parameters: {
    docs: {
      description: { story: 'When `src` is provided the image is shown inside a circular clip.' },
    },
  },
}

// ── Status indicators ─────────────────────────────────────────────────────────

export const StatusIndicators: Story = {
  name: 'Status Indicators',
  render: () => (
    <div className="flex items-end gap-space-8">
      {(['online', 'away', 'busy', 'offline'] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-space-3">
          <Avatar size={48} name="Sarah Johnson" status={s} />
          <span className="text-label-sm text-base-600 capitalize">{s}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`online` green · `away` amber · `busy` red · `offline` gray. Dot is always anchored to bottom-right, scales with avatar size.',
      },
    },
  },
}

// ── AvatarGroup ───────────────────────────────────────────────────────────────

const DEMO_USERS = [
  { name: 'Sarah Johnson' },
  { name: 'Marcus Chen' },
  { name: 'Priya Patel' },
  { name: 'James Wilson' },
  { name: 'Mei Tanaka' },
  { name: 'Alex Rivera' },
]

export const Group: StoryObj<typeof AvatarGroup> = {
  name: '⚙️ AvatarGroup — Playground',
  render: (args) => <AvatarGroup {...args} />,
  argTypes: {
    max: {
      description: 'Maximum number of avatars shown before the overflow count appears.',
      control: { type: 'number', min: 1, max: 6 },
      table: { category: 'Layout', defaultValue: { summary: '4' } },
    },
    size: {
      description: 'Diameter of each avatar in the group.',
      control: 'select',
      options: [80, 60, 48, 40, 32, 24],
      table: { category: 'Appearance', defaultValue: { summary: '40' } },
    },
    users: {
      control: false,
      description: 'Array of `{ name, src? }` objects.',
      table: { category: 'Content' },
    },
  },
  args: { users: DEMO_USERS, max: 4, size: 40 },
  parameters: {
    docs: {
      description: {
        story: 'Adjust **max** to control how many avatars are shown. Remaining users appear as a `+N` count badge.',
      },
    },
  },
}

export const GroupSizes: StoryObj = {
  name: 'AvatarGroup — Sizes',
  render: () => (
    <div className="flex flex-col gap-space-6">
      {([40, 32, 24] as const).map((s) => (
        <div key={s} className="flex items-center gap-space-4">
          <span className="text-label-sm text-base-500 w-8">{s}px</span>
          <AvatarGroup users={DEMO_USERS} max={4} size={s} />
        </div>
      ))}
    </div>
  ),
}
