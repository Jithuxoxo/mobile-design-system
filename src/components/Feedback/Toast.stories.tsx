import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { Toast, StateView } from './Toast'
import { Button } from '../Button/Button'

const meta: Meta<typeof Toast> = {
  title: 'Components/Feedback',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Two feedback primitives:\n\n' +
          '- **Toast** — transient notification banner (success / error / info / warning). Shows a coloured icon, title, optional description, and optional dismiss button.\n' +
          '- **StateView** — full-area state placeholder (empty / loading / error / success). Used inside cards or list containers while content loads or is absent.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Semantic type of the notification — controls colour, icon, and ARIA role.',
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
      table: { category: 'Appearance', defaultValue: { summary: 'info' } },
    },
    title: {
      description: 'Bold headline of the notification.',
      control: 'text',
      table: { category: 'Content' },
    },
    description: {
      description: 'Optional supporting text shown below the title.',
      control: 'text',
      table: { category: 'Content' },
    },
    onDismiss: {
      description: 'If provided, renders a dismiss (×) button and fires this callback when clicked.',
      table: { category: 'Actions' },
    },
  },
  args: {
    onDismiss: fn(),
    title: 'Notification title',
    description: 'Supporting detail text goes here.',
  },
}
export default meta

type Story = StoryObj<typeof Toast>

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Toast — Playground',
  args: { variant: 'success', title: 'Changes saved', description: 'Your profile has been updated successfully.' },
  decorators: [(S) => <div className="w-80"><S /></div>],
  parameters: {
    docs: {
      description: {
        story: 'Switch **variant**, edit **title**/**description**, and toggle **onDismiss** via Controls. Click the × to see the action log.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const dismissBtn = canvas.getByRole('button', { name: /dismiss/i })
    await userEvent.click(dismissBtn)
    await expect(args.onDismiss).toHaveBeenCalledOnce()
  },
}

// ── Toast variants ────────────────────────────────────────────────────────────

export const ToastSuccess: Story = {
  name: 'Toast — Success',
  args: { variant: 'success', title: 'Changes saved', description: 'Your profile has been updated.' },
  decorators: [(S) => <div className="w-80"><S /></div>],
  parameters: { docs: { description: { story: 'Use after a successful write operation.' } } },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /dismiss/i }))
    await expect(args.onDismiss).toHaveBeenCalled()
  },
}

export const ToastError: Story = {
  name: 'Toast — Error',
  args: { variant: 'error', title: 'Upload failed', description: 'The file could not be uploaded. Please try again.' },
  decorators: [(S) => <div className="w-80"><S /></div>],
  parameters: { docs: { description: { story: 'Use when an operation fails and the user needs to act.' } } },
}

export const ToastInfo: Story = {
  name: 'Toast — Info',
  args: { variant: 'info', title: 'New plan available', description: 'A new incentive plan has been assigned to you.' },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const ToastWarning: Story = {
  name: 'Toast — Warning',
  args: { variant: 'warning', title: 'Quota almost full', description: 'You are 90% towards your monthly quota.' },
  decorators: [(S) => <div className="w-80"><S /></div>],
}

export const ToastWithoutDismiss: Story = {
  name: 'Toast — No dismiss button',
  args: { variant: 'info', title: 'Syncing data…', description: 'Your dashboard is being updated.', onDismiss: undefined },
  decorators: [(S) => <div className="w-80"><S /></div>],
  parameters: {
    docs: { description: { story: 'Omit `onDismiss` for non-dismissible toasts (e.g. progress notifications).' } },
  },
}

export const AllToasts: StoryObj = {
  name: 'Toast — All Variants',
  render: () => (
    <div className="flex flex-col gap-space-4 w-80">
      <Toast variant="success" title="Changes saved"       description="Your profile has been updated successfully." onDismiss={fn()} />
      <Toast variant="error"   title="Upload failed"       description="The file could not be uploaded. Try again."  onDismiss={fn()} />
      <Toast variant="info"    title="New plan available"  description="A new incentive plan has been assigned."     onDismiss={fn()} />
      <Toast variant="warning" title="Quota almost full"   description="You are 90% towards your monthly quota."    onDismiss={fn()} />
    </div>
  ),
  parameters: { docs: { description: { story: 'All four variants side by side for reference.' } } },
}

// ── StateView ─────────────────────────────────────────────────────────────────

export const StateViewPlayground: StoryObj<typeof StateView> = {
  name: '⚙️ StateView — Playground',
  render: (args) => (
    <div className="w-72 border border-base-300 rounded-md">
      <StateView {...args} />
    </div>
  ),
  argTypes: {
    variant: {
      description: 'Type of state — controls icon and default text.',
      control: 'select',
      options: ['empty', 'loading', 'error', 'success'],
      table: { category: 'Appearance' },
    },
    title: {
      description: 'Override the default title for this state.',
      control: 'text',
      table: { category: 'Content' },
    },
    description: {
      description: 'Override the default description for this state.',
      control: 'text',
      table: { category: 'Content' },
    },
    action: {
      control: false,
      description: 'Optional CTA rendered below the description.',
      table: { category: 'Content' },
    },
  },
  args: { variant: 'empty' },
  parameters: {
    docs: {
      description: {
        story: "StateView fills the container it's placed in. Switch **variant** to preview all states. Use `action` to render a CTA button.",
      },
    },
  },
}

export const StateEmpty: StoryObj = {
  name: 'StateView — Empty',
  render: () => (
    <div className="w-72 border border-base-300 rounded-md">
      <StateView
        variant="empty"
        title="No plans yet"
        description="You haven't been assigned any commission plans."
        action={<Button size="sm" onClick={fn()}>Browse Plans</Button>}
      />
    </div>
  ),
  parameters: { docs: { description: { story: 'Zero-data state — show a helpful prompt and optional CTA.' } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('No plans yet')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /browse plans/i })).toBeVisible()
  },
}

export const StateLoading: StoryObj = {
  name: 'StateView — Loading',
  render: () => (
    <div className="w-72 border border-base-300 rounded-md">
      <StateView variant="loading" />
    </div>
  ),
  parameters: { docs: { description: { story: 'Replace list/card content with this while data is fetching.' } } },
}

export const StateError: StoryObj = {
  name: 'StateView — Error',
  render: () => (
    <div className="w-72 border border-base-300 rounded-md">
      <StateView
        variant="error"
        action={<Button variant="secondary" size="sm" onClick={fn()}>Retry</Button>}
      />
    </div>
  ),
  parameters: { docs: { description: { story: 'Data-fetch failure. Always include a Retry CTA.' } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: /retry/i })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: /retry/i }))
  },
}

export const StateSuccess: StoryObj = {
  name: 'StateView — Success',
  render: () => (
    <div className="w-72 border border-base-300 rounded-md">
      <StateView
        variant="success"
        title="Plan accepted!"
        description="You've successfully accepted the Q2 incentive plan."
      />
    </div>
  ),
}
