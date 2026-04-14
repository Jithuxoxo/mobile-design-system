import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import {
  SectionHeader,
  PointsBalanceCard,
  BenefitCard,
  PromoCard,
  SalesIncentivesCard,
  LeaderboardWinnersCard,
} from './Cards'
import { Button } from '../Button/Button'

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/Cards',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Six card-level components for the Compass dashboard.\n\n' +
          '- **SectionHeader** — h=32px row: title + optional count badge + "See all" link\n' +
          '- **PointsBalanceCard** — h=104px: loyalty points total with "Shop Now" CTA\n' +
          '- **BenefitCard** — h=150px 2-col tile: icon + title + description\n' +
          '- **PromoCard** — h=auto: coloured banner (purple / dark-slate) with decorative circles and action slot\n' +
          '- **SalesIncentivesCard** — expandable performance card: pills · progress bar · stat grid\n' +
          '- **LeaderboardWinnersCard** — ranked winner list with points chips',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Section heading text.',
      control: 'text',
      table: { category: 'Content' },
    },
    count: {
      description: 'Optional red notification badge shown next to the title.',
      control: { type: 'number', min: 0, max: 200 },
      table: { category: 'Content' },
    },
    onSeeAll: {
      description: 'If provided, renders a "See all ›" link and fires this callback on click.',
      table: { category: 'Actions' },
    },
  },
  args: { onSeeAll: fn() },
}
export default meta

// ── SectionHeader ─────────────────────────────────────────────────────────────

export const SectionHeaderPlayground: StoryObj<typeof SectionHeader> = {
  name: '⚙️ SectionHeader — Playground',
  render: (args) => (
    <div className="w-[343px]">
      <SectionHeader {...args} />
    </div>
  ),
  args: { title: 'Celebrations', count: 3 },
  parameters: {
    docs: {
      description: { story: 'Adjust **title**, **count**, and toggle **onSeeAll** via Controls. Click "See all" to fire the action.' },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /see all/i }))
    await expect(args.onSeeAll).toHaveBeenCalledOnce()
  },
}

export const SectionHeaderVariants: StoryObj = {
  name: 'SectionHeader — Variants',
  render: () => (
    <div className="w-[343px] flex flex-col gap-space-4">
      <SectionHeader title="With count badge" count={3}  onSeeAll={fn()} />
      <SectionHeader title="With see-all only"           onSeeAll={fn()} />
      <SectionHeader title="Title only — no actions" />
    </div>
  ),
  parameters: { docs: { description: { story: 'All three configurations: count + see-all, see-all only, title only.' } } },
}

// ── PointsBalanceCard ─────────────────────────────────────────────────────────

export const PointsBalancePlayground: StoryObj<typeof PointsBalanceCard> = {
  name: '⚙️ PointsBalanceCard — Playground',
  render: (args) => (
    <div className="w-[343px]">
      <PointsBalanceCard {...args} />
    </div>
  ),
  argTypes: {
    points: {
      description: 'Loyalty points balance. Formatted with `toLocaleString()`.',
      control: { type: 'number', min: 0, step: 1000 },
      table: { category: 'Content', defaultValue: { summary: '0' } },
    },
    currencyLabel: {
      description: 'Label above the points number.',
      control: 'text',
      table: { category: 'Content', defaultValue: { summary: '"My Points"' } },
    },
    equivalentAmount: {
      description: 'Optional fiat equivalence shown below the number.',
      control: 'text',
      table: { category: 'Content' },
    },
    onShopNow: {
      description: 'Fired when the "Shop Now" button is clicked.',
      table: { category: 'Actions' },
    },
  },
  args: {
    points: 234122,
    currencyLabel: 'My Points',
    equivalentAmount: 'Equivalent to INR 2,980',
    onShopNow: fn(),
  },
  parameters: {
    docs: { description: { story: 'Edit **points** and **equivalentAmount** in Controls. Click "Shop Now" to log the action.' } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /shop now/i }))
    await expect(args.onShopNow).toHaveBeenCalledOnce()
  },
}

// ── BenefitCard ───────────────────────────────────────────────────────────────

export const BenefitCardPlayground: StoryObj<typeof BenefitCard> = {
  name: '⚙️ BenefitCard — Playground',
  render: (args) => (
    <div className="w-[163px]">
      <BenefitCard {...args} />
    </div>
  ),
  argTypes: {
    icon: {
      control: false,
      description: 'Icon element shown in the coloured circle at the top of the card.',
      table: { category: 'Content' },
    },
    title: {
      description: 'Short benefit name.',
      control: 'text',
      table: { category: 'Content' },
    },
    description: {
      description: 'One-line benefit description. Truncates at 2 lines.',
      control: 'text',
      table: { category: 'Content' },
    },
    onClick: {
      description: 'Fired when the card is clicked.',
      table: { category: 'Actions' },
    },
  },
  args: { icon: '🛍', title: 'Perks Store', description: 'Turn your points into exciting rewards', onClick: fn() },
  parameters: {
    docs: { description: { story: 'Used in a 2-column grid. Click the card to fire `onClick`.' } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const BenefitCardGrid: StoryObj = {
  name: 'BenefitCard — 2-col grid',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-2 gap-space-3 w-[343px]">
      <BenefitCard icon="🛍" title="Perks Store"      description="Turn your points into exciting rewards"   onClick={fn()} />
      <BenefitCard icon="💰" title="Early Salary"     description="Get your salary up to 5 days early"       onClick={fn()} />
      <BenefitCard icon="💻" title="Lease a Device"   description="Lease the latest gadgets at low cost"     onClick={fn()} />
      <BenefitCard icon="🏥" title="Health Insurance" description="Comprehensive health cover for you"        onClick={fn()} />
    </div>
  ),
}

// ── PromoCard ─────────────────────────────────────────────────────────────────

export const PromoCardPlayground: StoryObj<typeof PromoCard> = {
  name: '⚙️ PromoCard — Playground',
  render: (args) => (
    <div className="w-[343px]">
      <PromoCard {...args} action={<Button size="sm" variant="white" onClick={fn()}>Explore</Button>} />
    </div>
  ),
  argTypes: {
    variant: {
      description: 'Background theme of the card.',
      control: 'select',
      options: ['purple', 'darkSlate'],
      table: { category: 'Appearance', defaultValue: { summary: 'purple' } },
    },
    title: {
      description: 'Bold headline on the card.',
      control: 'text',
      table: { category: 'Content' },
    },
    subtitle: {
      description: 'Supporting body text below the title.',
      control: 'text',
      table: { category: 'Content' },
    },
    action: {
      control: false,
      description: 'ReactNode rendered below the subtitle — typically a small `Button`.',
      table: { category: 'Content' },
    },
  },
  args: {
    variant: 'purple',
    title: 'Unlock More with Your Perks',
    subtitle: 'Explore exclusive benefits designed to support you.',
  },
  parameters: { docs: { description: { story: 'Switch **variant** to preview both colour themes. The `action` slot renders a white button on dark backgrounds.' } } },
}

export const PromoPurple: StoryObj = {
  name: 'PromoCard — Purple',
  render: () => (
    <div className="w-[343px]">
      <PromoCard variant="purple" title="Unlock More with Your Perks" subtitle="Explore exclusive benefits designed to support you." action={<Button size="sm" variant="white" onClick={fn()}>Explore</Button>} />
    </div>
  ),
}

export const PromoDarkSlate: StoryObj = {
  name: 'PromoCard — Dark Slate',
  render: () => (
    <div className="w-[343px]">
      <PromoCard variant="darkSlate" title="Play and Enjoy Office Games!" subtitle="Boost your mood, connect with teammates and have fun!" action={<Button size="sm" variant="white" onClick={fn()}>Play Now</Button>} />
    </div>
  ),
}

// ── SalesIncentivesCard ───────────────────────────────────────────────────────

const DEMO_STATS = [
  [{ label: 'Total earnings', value: '₹43,000' }, { label: 'Achievement%', value: '95%' }],
  [{ label: 'Product A Sales', value: '₹35,000' }, { label: 'Product A Ach%', value: '15%' }],
  [{ label: 'Base Incentives', value: '₹35,000' }, { label: 'Bonus', value: '₹8,000' }],
]

export const SalesIncentivesPlayground: StoryObj<typeof SalesIncentivesCard> = {
  name: '⚙️ SalesIncentivesCard — Playground',
  render: (args) => {
    const [expanded, setExpanded] = useState(args.expanded ?? true)
    return (
      <div className="w-[343px]">
        <SalesIncentivesCard {...args} expanded={expanded} onToggle={() => { setExpanded(v => !v); args.onToggle?.() }} />
      </div>
    )
  },
  argTypes: {
    title: {
      description: 'Plan name displayed in the header.',
      control: 'text',
      table: { category: 'Content' },
    },
    achieved: {
      description: 'Current achieved value — used to calculate progress bar percentage.',
      control: { type: 'number', min: 0, step: 10000 },
      table: { category: 'Content' },
    },
    target: {
      description: 'Target value — denominator for the progress percentage.',
      control: { type: 'number', min: 1, step: 10000 },
      table: { category: 'Content' },
    },
    expanded: {
      description: 'Controls whether the stat rows are visible.',
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'true' } },
    },
    onToggle: {
      description: 'Fired when the expand/collapse button or "Show less" link is clicked.',
      table: { category: 'Actions' },
    },
    pills: {
      control: false,
      description: 'Array of pill label strings (e.g. `["12 Days left"]`).',
      table: { category: 'Content' },
    },
    stats: {
      control: false,
      description: '`StatItem[][]` — rows of stat pairs rendered in the expanded section.',
      table: { category: 'Content' },
    },
  },
  args: {
    title: 'Sales Q1 2025-26 Incentives',
    pills: ['0 Days left', 'Achievement % < 125'],
    achieved: 222000,
    target: 234000,
    stats: DEMO_STATS,
    expanded: true,
    onToggle: fn(),
  },
  parameters: {
    docs: { description: { story: 'Click the chevron or "Show less" to toggle expand/collapse. Adjust `achieved` and `target` to see the progress bar change.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggleBtn = canvas.getByRole('button', { name: /collapse/i })
    await userEvent.click(toggleBtn)
    await expect(canvas.queryByText('Show less')).not.toBeInTheDocument()
  },
}

export const SalesIncentivesExpanded: StoryObj = {
  name: 'SalesIncentivesCard — Expanded',
  render: () => {
    const [exp, setExp] = useState(true)
    return (
      <div className="w-[343px]">
        <SalesIncentivesCard title="Sales Q1 2025-26 Incentives" pills={['0 Days left', 'Achievement % < 125']} achieved={222000} target={234000} stats={DEMO_STATS} expanded={exp} onToggle={() => setExp(v => !v)} />
      </div>
    )
  },
}

export const SalesIncentivesCollapsed: StoryObj = {
  name: 'SalesIncentivesCard — Collapsed',
  render: () => {
    const [exp, setExp] = useState(false)
    return (
      <div className="w-[343px]">
        <SalesIncentivesCard title="Sales Q1 2025-26 Incentives" pills={['12 Days left']} achieved={180000} target={234000} expanded={exp} onToggle={() => setExp(v => !v)} />
      </div>
    )
  },
  parameters: { docs: { description: { story: 'Progress bar and header are always visible. Stats are hidden when collapsed.' } } },
}

// ── LeaderboardWinnersCard ────────────────────────────────────────────────────

export const LeaderboardWinnersPlayground: StoryObj<typeof LeaderboardWinnersCard> = {
  name: '⚙️ LeaderboardWinnersCard — Playground',
  render: (args) => (
    <div className="w-[343px]">
      <LeaderboardWinnersCard {...args} />
    </div>
  ),
  argTypes: {
    month: {
      description: 'Month label shown in the header (e.g. "October 2025").',
      control: 'text',
      table: { category: 'Content' },
    },
    winners: {
      control: false,
      description: '`WinnerRow[]` — each entry has `name`, `role`, `points`, and optional `avatarSrc`.',
      table: { category: 'Content' },
    },
    onSeeAll: {
      description: 'If provided, renders a "See all →" link in the header.',
      table: { category: 'Actions' },
    },
  },
  args: {
    month: 'October 2025',
    onSeeAll: fn(),
    winners: [
      { name: 'Jithu Varghese', role: 'Product Designer',  points: 760 },
      { name: 'Pranav Varma',   role: 'UX Architect',       points: 720 },
      { name: 'Siddharth Jha',  role: 'Software Engineer',  points: 690 },
      { name: 'Arun Kumar',     role: 'Data Scientist',     points: 660 },
      { name: 'Divya Sharma',   role: 'Senior Manager',     points: 640 },
    ],
  },
  parameters: {
    docs: { description: { story: 'Click "See all" to fire the action. Change **month** in Controls to update the header.' } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /see all/i }))
    await expect(args.onSeeAll).toHaveBeenCalledOnce()
  },
}
