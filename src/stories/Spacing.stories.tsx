import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundation/Spacing',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

// ── Data ──────────────────────────────────────────────────────────────────────

const spacingScale = [
  { token: 'space-0',  value: '0px',  twClass: 'p-space-0'  },
  { token: 'space-1',  value: '2px',  twClass: 'p-space-1'  },
  { token: 'space-2',  value: '4px',  twClass: 'p-space-2'  },
  { token: 'space-3',  value: '8px',  twClass: 'p-space-3'  },
  { token: 'space-4',  value: '12px', twClass: 'p-space-4'  },
  { token: 'space-5',  value: '16px', twClass: 'p-space-5'  },
  { token: 'space-6',  value: '20px', twClass: 'p-space-6'  },
  { token: 'space-7',  value: '24px', twClass: 'p-space-7'  },
  { token: 'space-8',  value: '32px', twClass: 'p-space-8'  },
  { token: 'space-9',  value: '40px', twClass: 'p-space-9'  },
  { token: 'space-10', value: '48px', twClass: 'p-space-10' },
  { token: 'space-11', value: '64px', twClass: 'p-space-11' },
]

const radiusScale = [
  { token: 'none', value: '0px',    cls: 'rounded-none' },
  { token: 'xs',   value: '4px',    cls: 'rounded-xs'   },
  { token: 'sm',   value: '6px',    cls: 'rounded-sm'   },
  { token: 'md',   value: '8px',    cls: 'rounded-md'   },
  { token: 'lg',   value: '12px',   cls: 'rounded-lg'   },
  { token: 'xl',   value: '16px',   cls: 'rounded-xl'   },
  { token: '2xl',  value: '24px',   cls: 'rounded-2xl'  },
  { token: 'full', value: '9999px', cls: 'rounded-full' },
]

// ── Story ─────────────────────────────────────────────────────────────────────

function SpacingScale() {
  return (
    <div className="p-space-8 bg-base-100 min-h-screen font-sans">
      <h1 className="text-heading-h1 text-base-900 mb-space-2">Spacing & Grid</h1>
      <p className="text-body-md text-base-600 mb-space-8">
        4px base unit · 12 steps · Mobile grid: 375px · 16px margin · 12 col · 8px gutter
      </p>

      {/* Spacing scale */}
      <section className="mb-space-10">
        <h2 className="text-heading-h4 text-base-900 mb-space-5">Spacing Scale</h2>
        <div className="flex flex-col gap-space-3">
          {spacingScale.map((s) => (
            <div key={s.token} className="flex items-center gap-space-5">
              <div className="w-20 shrink-0">
                <p className="text-label-md text-base-900 font-mono">{s.token}</p>
                <p className="text-caption text-base-500">{s.value}</p>
              </div>
              <div className="flex items-center gap-space-3 flex-1">
                <div
                  className="h-5 bg-primary-300 rounded-xs"
                  style={{ width: s.value === '0px' ? '2px' : s.value }}
                />
                <p className="text-caption text-base-400 font-mono">{s.twClass}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Border radius */}
      <section>
        <h2 className="text-heading-h4 text-base-900 mb-space-5">Border Radius</h2>
        <div className="flex flex-wrap gap-space-5">
          {radiusScale.map((r) => (
            <div key={r.token} className="flex flex-col items-center gap-space-3">
              <div
                className={`w-16 h-16 bg-primary-000 border-2 border-primary-300 ${r.cls}`}
              />
              <div className="text-center">
                <p className="text-label-sm text-base-900 font-mono">radius-{r.token}</p>
                <p className="text-caption text-base-500">{r.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export const Scale: StoryObj = {
  render: () => <SpacingScale />,
  name: 'Spacing & Radius',
}
