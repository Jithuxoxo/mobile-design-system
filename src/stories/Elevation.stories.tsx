import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundation/Elevation',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

// ── Data ──────────────────────────────────────────────────────────────────────

const elevations = [
  {
    token: 'elevation-0',
    label: 'Flat',
    value: 'none',
    usage: 'Inline content, dividers',
    shadow: 'shadow-elevation-0',
  },
  {
    token: 'elevation-1',
    label: 'Raised',
    value: '0 1px 3px rgba(0,0,0,0.06)',
    usage: 'Cards, list items',
    shadow: 'shadow-elevation-1',
  },
  {
    token: 'elevation-2',
    label: 'Floating',
    value: '0 6px 12px rgba(0,0,0,0.10)',
    usage: 'Dropdowns, tooltips',
    shadow: 'shadow-elevation-2',
  },
  {
    token: 'elevation-3',
    label: 'Overlay',
    value: '0 24px 40px rgba(0,0,0,0.16)',
    usage: 'Modals, bottom sheets',
    shadow: 'shadow-elevation-3',
  },
]

// ── Story ─────────────────────────────────────────────────────────────────────

function ElevationShowcase() {
  return (
    <div className="p-space-8 bg-base-200 min-h-screen font-sans">
      <h1 className="text-heading-h1 text-base-900 mb-space-2">Elevation</h1>
      <p className="text-body-md text-base-600 mb-space-8">
        4 levels — from flat surfaces to prominent overlays
      </p>

      <div className="flex flex-wrap gap-space-8 items-end">
        {elevations.map((e) => (
          <div key={e.token} className="flex flex-col items-center gap-space-5">
            <div
              className={`w-40 h-32 bg-base-000 rounded-lg ${e.shadow} flex items-center justify-center`}
            >
              <span className="text-heading-h3 text-base-500">{e.label}</span>
            </div>
            <div className="text-center max-w-40">
              <p className="text-label-md text-base-900 font-mono">{e.token}</p>
              <p className="text-caption text-base-500 mt-1">{e.usage}</p>
              <p className="text-caption text-base-400 font-mono mt-1 break-words">{e.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const AllLevels: StoryObj = {
  render: () => <ElevationShowcase />,
  name: 'All Levels',
}
