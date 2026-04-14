import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary interactive element. 8 visual variants, 4 sizes (lg 48px · md 40px · sm 32px · xs 24px), optional full-width mode, and leading/trailing icon slots. Pass `disabled` to suppress interaction while keeping the visual disabled state.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Visual style of the button.',
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'amber', 'dark', 'white', 'disabled'],
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      description: 'Height: `lg`=48px · `md`=40px · `sm`=32px · `xs`=24px.',
      control: 'select',
      options: ['lg', 'md', 'sm', 'xs'],
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      description: 'Stretches to fill its container width.',
      control: 'boolean',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Prevents interaction and applies disabled styling. `onClick` will not fire.',
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    children: {
      description: 'Button label or content.',
      control: 'text',
      table: { category: 'Content' },
    },
    leading: {
      description: 'Element rendered before the label (e.g. an icon).',
      control: false,
      table: { category: 'Content' },
    },
    trailing: {
      description: 'Element rendered after the label (e.g. an icon or badge).',
      control: false,
      table: { category: 'Content' },
    },
    onClick: {
      description: 'Fired on click when not disabled.',
      table: { category: 'Actions' },
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
  },
}
export default meta

type Story = StoryObj<typeof Button>

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
  args: { variant: 'primary', size: 'md' },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive sandbox. Use the **Controls** panel below to change any prop and the **Actions** tab to see click events.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

// ── Variants ──────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Primary' },
  parameters: { docs: { description: { story: 'Default CTA. Use for the single most important action on a surface.' } } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
  },
}

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'Secondary' },
  parameters: { docs: { description: { story: 'Subdued action alongside a Primary button.' } } },
}

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'Ghost' },
  parameters: { docs: { description: { story: 'Minimal surface. Use for tertiary actions or inside dense card layouts.' } } },
}

export const Danger: Story = {
  args: { variant: 'danger', size: 'md', children: 'Delete' },
  parameters: { docs: { description: { story: 'Destructive action — delete, remove, or irreversible operations.' } } },
}

export const Amber: Story = {
  args: { variant: 'amber', size: 'md', children: 'Caution' },
}

export const Dark: Story = {
  args: { variant: 'dark', size: 'md', children: 'Dark' },
}

export const White: Story = {
  args: { variant: 'white', size: 'md', children: 'Explore' },
  decorators: [
    (S) => (
      <div className="bg-brand-purple p-space-6 rounded-md">
        <S />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: { story: 'Use on coloured/dark backgrounds such as `PromoCard`.' },
    },
  },
}

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Disabled', disabled: true },
  parameters: {
    docs: {
      description: { story: '`onClick` is suppressed when `disabled` is true — verified by the play function below.' },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: (args) => (
    <div className="flex items-center gap-space-5">
      {(['lg', 'md', 'sm', 'xs'] as const).map((s) => (
        <div key={s} className="flex flex-col items-center gap-space-2">
          <Button {...args} size={s}>{s.toUpperCase()}</Button>
          <span className="text-caption text-base-500">{({ lg: '48px', md: '40px', sm: '32px', xs: '24px' } as const)[s]}</span>
        </div>
      ))}
    </div>
  ),
  args: { variant: 'primary' },
  parameters: { docs: { description: { story: 'All four heights. Pick the smallest size that maintains tap-target legibility.' } } },
}

export const FullWidth: Story = {
  args: { children: 'Sign In', variant: 'primary', size: 'lg', fullWidth: true },
  decorators: [(S) => <div className="w-80"><S /></div>],
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Expands to fill a container — typical usage inside form cards.' } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
  },
}

// ── All Variants × Sizes matrix ───────────────────────────────────────────────

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger', 'amber', 'dark', 'white', 'disabled'] as const
const SIZES    = ['lg', 'md', 'sm', 'xs'] as const

export const Matrix: Story = {
  name: 'All Variants × Sizes',
  render: () => (
    <div className="p-space-7 bg-base-100 font-sans overflow-x-auto">
      <table className="border-separate border-spacing-space-3">
        <thead>
          <tr>
            <th className="text-label-sm text-base-500 text-left pr-space-5">Variant</th>
            {SIZES.map((s) => (
              <th key={s} className="text-label-sm text-base-500 uppercase">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VARIANTS.map((v) => (
            <tr key={v}>
              <td className="text-label-md text-base-700 pr-space-5 capitalize">{v}</td>
              {SIZES.map((s) => (
                <td key={s}>
                  <Button variant={v} size={s} onClick={fn()}>
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: { layout: 'fullscreen' },
}
