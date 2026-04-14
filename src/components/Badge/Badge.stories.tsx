import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { Badge, CountBadge, EventTag, Chip } from './Badge'

// ── Badge ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Four distinct badge primitives for different labelling needs.\n\n' +
          '- **Badge** — status label (important / success / error / primary / gray / dark)\n' +
          '- **CountBadge** — numeric indicator, caps at 99+\n' +
          '- **EventTag** — celebration labels (anniversary, birthday, new-joiner, project-done)\n' +
          '- **Chip** — AI-suggestion action chips (tip / info / see-past)',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Colour and semantic meaning of the badge.',
      control: 'select',
      options: ['important', 'success', 'error', 'primary', 'gray', 'dark'],
      table: { category: 'Appearance', defaultValue: { summary: 'gray' } },
    },
    children: {
      description: 'Label text shown inside the badge.',
      control: 'text',
      table: { category: 'Content' },
    },
  },
  args: { children: 'Label' },
}
export default meta

type Story = StoryObj<typeof Badge>

// ── Badge — Playground ────────────────────────────────────────────────────────

export const BadgePlayground: Story = {
  name: '⚙️ Badge — Playground',
  args: { variant: 'primary', children: 'New' },
  parameters: {
    docs: {
      description: { story: 'Adjust **variant** and **children** in the Controls panel.' },
    },
  },
}

// ── Badge — All Variants ──────────────────────────────────────────────────────

export const BadgeVariants: Story = {
  name: 'Badge — All Variants',
  render: () => (
    <div className="flex flex-wrap gap-space-3">
      {(['important', 'success', 'error', 'primary', 'gray', 'dark'] as const).map((v) => (
        <Badge key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`important` (amber) → high-priority alerts · `success` → positive status · `error` → failure/blocking · `primary` → informational · `gray` → neutral · `dark` → inverted/dark surfaces.',
      },
    },
  },
}

// ── CountBadge ────────────────────────────────────────────────────────────────

export const CountBadgePlayground: StoryObj<typeof CountBadge> = {
  name: '⚙️ CountBadge — Playground',
  render: (args) => <CountBadge {...args} />,
  argTypes: {
    count: {
      description: 'Numeric count. Displays `99+` when count exceeds 99.',
      control: { type: 'number', min: 0, max: 200 },
      table: { category: 'Content', defaultValue: { summary: '0' } },
    },
    color: {
      description: 'Background colour of the badge.',
      control: 'select',
      options: ['red', 'blue', 'orange', 'gray'],
      table: { category: 'Appearance', defaultValue: { summary: 'red' } },
    },
  },
  args: { count: 5, color: 'red' },
  parameters: {
    docs: {
      description: {
        story: 'Numeric notification dot. `red` → unread alerts, `blue` → informational, `orange` → warnings, `gray` → neutral counts.',
      },
    },
  },
}

export const CountBadgeOverflow: StoryObj = {
  name: 'CountBadge — 99+ overflow',
  render: () => (
    <div className="flex items-center gap-space-5">
      {[1, 9, 42, 99, 100, 999].map((n) => (
        <div key={n} className="flex flex-col items-center gap-space-2">
          <CountBadge count={n} color="red" />
          <span className="text-caption text-base-500">{n}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Counts above 99 are capped and displayed as `99+`.' },
    },
  },
}

export const CountBadgeColors: StoryObj = {
  name: 'CountBadge — All Colors',
  render: () => (
    <div className="flex items-center gap-space-6">
      {(['red', 'blue', 'orange', 'gray'] as const).map((c) => (
        <div key={c} className="flex flex-col items-center gap-space-2">
          <CountBadge count={7} color={c} />
          <span className="text-caption text-base-500 capitalize">{c}</span>
        </div>
      ))}
    </div>
  ),
}

// ── EventTag ──────────────────────────────────────────────────────────────────

export const EventTagPlayground: StoryObj<typeof EventTag> = {
  name: '⚙️ EventTag — Playground',
  render: (args) => <EventTag {...args} />,
  argTypes: {
    variant: {
      description: 'Celebration type — controls label, emoji, and colour.',
      control: 'select',
      options: ['anniversary', 'birthday', 'newJoiner', 'projectDone'],
      table: { category: 'Appearance' },
    },
  },
  args: { variant: 'anniversary' },
  parameters: {
    docs: {
      description: {
        story: 'Switch **variant** in Controls to preview each celebration type.',
      },
    },
  },
}

export const EventTagAll: StoryObj = {
  name: 'EventTag — All Variants',
  render: () => (
    <div className="flex flex-wrap gap-space-3">
      {(['anniversary', 'birthday', 'newJoiner', 'projectDone'] as const).map((v) => (
        <EventTag key={v} variant={v} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Used in `CelebrationRow` list items. Each variant carries a predefined emoji and label.',
      },
    },
  },
}

// ── Chip ──────────────────────────────────────────────────────────────────────

export const ChipPlayground: StoryObj<typeof Chip> = {
  name: '⚙️ Chip — Playground',
  render: (args) => <Chip {...args} />,
  argTypes: {
    variant: {
      description: 'Chip type — determines icon, default label, and colours.',
      control: 'select',
      options: ['tip', 'info', 'seePast'],
      table: { category: 'Appearance' },
    },
    children: {
      description: 'Override the default label text.',
      control: 'text',
      table: { category: 'Content' },
    },
    onClick: {
      description: 'Fired when the chip is clicked.',
      table: { category: 'Actions' },
    },
  },
  args: { variant: 'tip', onClick: fn() },
  parameters: {
    docs: {
      description: {
        story: 'AI-suggestion chips are interactive. Click the chip in Canvas to see the action fire.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const ChipAll: StoryObj = {
  name: 'Chip — All Variants',
  render: () => (
    <div className="flex flex-wrap gap-space-3">
      <Chip variant="tip"     onClick={fn()} />
      <Chip variant="info"    onClick={fn()} />
      <Chip variant="seePast" onClick={fn()} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`tip` · `info` · `seePast` — used in feed items and plan dashboards to surface AI-generated insights.',
      },
    },
  },
}

// ── All Together ──────────────────────────────────────────────────────────────

export const AllBadgeTypes: StoryObj = {
  name: 'All Badge Types',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-space-8 font-sans p-space-6">
      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Status Badges</p>
        <div className="flex flex-wrap gap-space-3">
          {(['important', 'success', 'error', 'primary', 'gray', 'dark'] as const).map((v) => (
            <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>
          ))}
        </div>
      </section>

      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Count Badges</p>
        <div className="flex flex-wrap items-center gap-space-5">
          {(['red', 'blue', 'orange', 'gray'] as const).map((c) => (
            <div key={c} className="flex flex-col items-center gap-space-2">
              <CountBadge count={c === 'gray' ? 100 : 9} color={c} />
              <span className="text-caption text-base-500">{c}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Event Tags</p>
        <div className="flex flex-wrap gap-space-3">
          {(['anniversary', 'birthday', 'newJoiner', 'projectDone'] as const).map((v) => (
            <EventTag key={v} variant={v} />
          ))}
        </div>
      </section>

      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">AI Chips</p>
        <div className="flex flex-wrap gap-space-3">
          <Chip variant="tip"     onClick={fn()} />
          <Chip variant="info"    onClick={fn()} />
          <Chip variant="seePast" onClick={fn()} />
        </div>
      </section>
    </div>
  ),
}
