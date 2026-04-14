import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundation/Colors',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

// ── Data ──────────────────────────────────────────────────────────────────────

const palettes = [
  {
    name: 'Base',
    swatches: [
      { token: 'base-000', hex: '#FFFFFF', label: 'White' },
      { token: 'base-100', hex: '#FAFAF9', label: 'Off White' },
      { token: 'base-200', hex: '#F5F5F4', label: 'Light Gray' },
      { token: 'base-300', hex: '#E7E5E4', label: 'Border' },
      { token: 'base-400', hex: '#DFDEDD', label: 'Divider' },
      { token: 'base-500', hex: '#AAA29E', label: 'Muted' },
      { token: 'base-600', hex: '#616161', label: 'Secondary Text' },
      { token: 'base-700', hex: '#57534E', label: 'Tertiary' },
      { token: 'base-800', hex: '#292524', label: 'Dark' },
      { token: 'base-900', hex: '#0C0A09', label: 'Near Black' },
    ],
  },
  {
    name: 'Primary',
    swatches: [
      { token: 'primary-000', hex: '#E0EDFE', label: 'Tint' },
      { token: 'primary-100', hex: '#C9E0FE', label: 'Light' },
      { token: 'primary-200', hex: '#93C5FD', label: 'Link' },
      { token: 'primary-300', hex: '#3B82F6', label: 'Mid' },
      { token: 'primary-400', hex: '#1D4ED8', label: 'Base' },
      { token: 'primary-500', hex: '#172654', label: 'Dark' },
    ],
  },
  {
    name: 'Secondary',
    swatches: [
      { token: 'secondary-100', hex: '#FFF7ED', label: 'Tint' },
      { token: 'secondary-300', hex: '#FFD166', label: 'Light' },
      { token: 'secondary-400', hex: '#FFB200', label: 'Base' },
      { token: 'secondary-500', hex: '#FFA100', label: 'Dark' },
    ],
  },
  {
    name: 'Success',
    swatches: [
      { token: 'success-000', hex: '#E6FAF2', label: 'Tint' },
      { token: 'success-100', hex: '#C0F0DE', label: 'Light' },
      { token: 'success-200', hex: '#87E1BF', label: 'Mid' },
      { token: 'success-300', hex: '#0EB072', label: 'Base Alt' },
      { token: 'success-400', hex: '#047857', label: 'Base' },
      { token: 'success-500', hex: '#023B2D', label: 'Dark' },
    ],
  },
  {
    name: 'Error',
    swatches: [
      { token: 'error-000', hex: '#FEF3F2', label: 'Tint' },
      { token: 'error-300', hex: '#FDA29B', label: 'Light' },
      { token: 'error-400', hex: '#F04438', label: 'Base' },
      { token: 'error-500', hex: '#D92D20', label: 'Dark' },
    ],
  },
  {
    name: 'Brand',
    swatches: [
      { token: 'brand-purple', hex: '#59149E', label: 'Purple' },
      { token: 'brand-dark-slate', hex: '#272A34', label: 'Dark Slate' },
      { token: 'brand-avatar-blue', hex: '#A4D1F6', label: 'Avatar Blue' },
    ],
  },
]

// ── Swatch component ──────────────────────────────────────────────────────────

function Swatch({ token, hex, label }: { token: string; hex: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-md border border-base-300"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-body-sm font-semibold text-base-900">{label}</p>
        <p className="text-caption text-base-500">{hex}</p>
        <p className="text-caption text-base-400 font-mono">{token}</p>
      </div>
    </div>
  )
}

// ── Story ─────────────────────────────────────────────────────────────────────

function ColorPalette() {
  return (
    <div className="p-space-8 bg-base-100 min-h-screen font-sans">
      <h1 className="text-heading-h1 text-base-900 mb-space-2">Color Tokens</h1>
      <p className="text-body-md text-base-600 mb-space-8">
        30 tokens · Source: Figma &quot;Mobile App Design System&quot;
      </p>

      <div className="flex flex-col gap-space-10">
        {palettes.map((palette) => (
          <section key={palette.name}>
            <h2 className="text-heading-h4 text-base-900 mb-space-5">{palette.name}</h2>
            <div className="grid grid-cols-5 gap-space-5">
              {palette.swatches.map((s) => (
                <Swatch key={s.token} {...s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export const AllColors: StoryObj = {
  render: () => <ColorPalette />,
  name: 'All Colors',
}
