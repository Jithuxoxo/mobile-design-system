import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Single-line text field with label, optional helper/error text, and leading/trailing icon slots. Supports all HTML `<input>` types. Four visual states: `default` → `focused` (browser-native) → `filled` → `error` → `disabled`.',
      },
    },
  },
  decorators: [(Story) => <div className="w-80 font-sans"><Story /></div>],
  argTypes: {
    label: {
      description: 'Visible label displayed above the field.',
      control: 'text',
      table: { category: 'Content' },
    },
    placeholder: {
      description: 'Ghost text shown when the field is empty.',
      control: 'text',
      table: { category: 'Content' },
    },
    helperText: {
      description: 'Guidance text shown below the field in default state.',
      control: 'text',
      table: { category: 'Content' },
    },
    errorText: {
      description: 'Replaces helper text and applies error styling when `state` is `error`.',
      control: 'text',
      table: { category: 'Content' },
    },
    state: {
      description: 'Visual state of the field.',
      control: 'select',
      options: ['default', 'filled', 'error', 'disabled'],
      table: { category: 'State', defaultValue: { summary: 'default' } },
    },
    type: {
      description: 'HTML input type.',
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'search', 'date'],
      table: { category: 'Behaviour', defaultValue: { summary: 'text' } },
    },
    disabled: {
      description: 'Shorthand for `state="disabled"`. Prevents interaction.',
      control: 'boolean',
      table: { category: 'State' },
    },
    leadingIcon: {
      description: 'Element rendered inside the left edge of the field.',
      control: false,
      table: { category: 'Content' },
    },
    trailingIcon: {
      description: 'Element rendered inside the right edge of the field.',
      control: false,
      table: { category: 'Content' },
    },
    onChange: {
      description: 'Standard `React.ChangeEvent` handler.',
      table: { category: 'Actions' },
    },
  },
  args: {
    onChange: fn(),
    label: 'Label',
    placeholder: 'Placeholder…',
  },
}
export default meta

type Story = StoryObj<typeof Input>

// ── Playground ────────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
  args: { label: 'Email address', type: 'email', placeholder: 'you@company.com' },
  parameters: {
    docs: {
      description: {
        story: 'Adjust **label**, **placeholder**, **state**, and **type** in Controls. Type to see the `onChange` event logged in the Actions tab.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.type(input, 'hello@company.com')
    await expect(input).toHaveValue('hello@company.com')
  },
}

// ── Field types ───────────────────────────────────────────────────────────────

export const EmailField: Story = {
  name: 'Type — Email',
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@company.com',
    leadingIcon: <span className="text-base">✉️</span>,
  },
}

export const PasswordField: Story = {
  name: 'Type — Password',
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    leadingIcon: <span className="text-base">🔒</span>,
    trailingIcon: <span className="text-base cursor-pointer">👁</span>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Password')
    await userEvent.type(input, 'SecretPass123')
    await expect(input).toHaveValue('SecretPass123')
  },
}

export const SearchField: Story = {
  name: 'Type — Search',
  args: {
    label: 'Search plans',
    type: 'search',
    placeholder: 'Search by plan name…',
    leadingIcon: <span className="text-base">🔍</span>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox')
    await userEvent.type(input, 'Q1 Incentives')
    await expect(input).toHaveValue('Q1 Incentives')
  },
}

export const NumberField: Story = {
  name: 'Type — Number with trailing unit',
  args: {
    label: 'Sales volume',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter total units sold this period',
    trailingIcon: <span className="text-label-md text-base-500">units</span>,
  },
}

export const CurrencyField: Story = {
  name: 'Type — Currency',
  args: {
    label: 'Target amount',
    type: 'number',
    placeholder: '0.00',
    leadingIcon: <span className="text-sm font-medium text-base-600">₹</span>,
  },
}

export const DateField: Story = {
  name: 'Type — Date',
  args: {
    label: 'Plan start date',
    type: 'date',
    leadingIcon: <span className="text-base">📅</span>,
  },
}

// ── States ────────────────────────────────────────────────────────────────────

export const StateDefault: Story = {
  name: 'State — Default',
  args: { label: 'Email address', type: 'email', placeholder: 'you@company.com', state: 'default' },
}

export const StateFilled: Story = {
  name: 'State — Filled',
  args: { label: 'Email address', type: 'email', defaultValue: 'john@acme.com', state: 'filled' },
  parameters: { docs: { description: { story: 'Field contains a value. Border subtly darkens.' } } },
}

export const StateError: Story = {
  name: 'State — Error',
  args: {
    label: 'Email address',
    type: 'email',
    defaultValue: 'not-an-email',
    state: 'error',
    errorText: 'Please enter a valid email address.',
    leadingIcon: <span className="text-base">✉️</span>,
  },
  parameters: {
    docs: {
      description: { story: 'Border turns red, `errorText` replaces helper text, and the icon tints to red.' },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const errorMsg = canvas.getByText('Please enter a valid email address.')
    await expect(errorMsg).toBeVisible()
  },
}

export const StateDisabled: Story = {
  name: 'State — Disabled',
  args: {
    label: 'Email address',
    type: 'email',
    defaultValue: 'john@acme.com',
    state: 'disabled',
  },
  parameters: { docs: { description: { story: 'Field is dimmed and not interactive.' } } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('textbox')).toBeDisabled()
  },
}

// ── All States ────────────────────────────────────────────────────────────────

export const AllStates: StoryObj = {
  name: 'All States',
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap gap-space-7 font-sans p-space-7">
      {([
        { state: 'default'  as const, label: 'Default',  value: '',              errorText: undefined },
        { state: 'filled'   as const, label: 'Filled',   value: 'john@acme.com', errorText: undefined },
        { state: 'error'    as const, label: 'Error',    value: 'not-an-email',  errorText: 'Enter a valid email' },
        { state: 'disabled' as const, label: 'Disabled', value: 'john@acme.com', errorText: undefined },
      ]).map(({ state, label, value, errorText }) => (
        <div key={state} className="w-72">
          <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">{label}</p>
          <Input
            label="Email address"
            type="email"
            placeholder="you@company.com"
            state={state}
            defaultValue={value}
            errorText={errorText}
            leadingIcon={<span className="text-base">✉️</span>}
            onChange={fn()}
          />
        </div>
      ))}
    </div>
  ),
}

// ── With helper text ──────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    label: 'Sales volume',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter your total sales volume for this period.',
    trailingIcon: <span className="text-label-md text-base-500">units</span>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const helper = canvas.getByText('Enter your total sales volume for this period.')
    await expect(helper).toBeVisible()
  },
}
