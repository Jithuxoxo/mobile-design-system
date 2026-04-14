import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

// ── Data ──────────────────────────────────────────────────────────────────────

const typeScale = [
  {
    group: 'DISPLAY',
    styles: [
      { className: 'text-display-xl', label: 'Display / XLarge', spec: '40px · Bold · -0.5ls', usage: 'Hero banners, splash screens' },
      { className: 'text-display-lg', label: 'Display / Large',  spec: '32px · Bold · -0.3ls', usage: 'Section heroes' },
      { className: 'text-display-md', label: 'Display / Medium', spec: '28px · Bold · -0.2ls', usage: 'Points balance, stats' },
    ],
  },
  {
    group: 'HEADING',
    styles: [
      { className: 'text-heading-h1', label: 'Heading / H1', spec: '24px · Bold',     usage: 'Page titles' },
      { className: 'text-heading-h2', label: 'Heading / H2', spec: '20px · Bold',     usage: 'Section titles' },
      { className: 'text-heading-h3', label: 'Heading / H3', spec: '18px · SemiBold', usage: 'Card headings' },
      { className: 'text-heading-h4', label: 'Heading / H4', spec: '16px · SemiBold', usage: 'Card subtitles' },
      { className: 'text-heading-h5', label: 'Heading / H5', spec: '14px · SemiBold', usage: 'List headers' },
    ],
  },
  {
    group: 'BODY',
    styles: [
      { className: 'text-body-lg', label: 'Body / Large',  spec: '16px · Regular',        usage: 'Body copy' },
      { className: 'text-body-md', label: 'Body / Medium', spec: '14px · Regular',        usage: 'Descriptions' },
      { className: 'text-body-sm', label: 'Body / Small',  spec: '12px · Regular · 0.15ls', usage: 'Helper text, meta' },
      { className: 'text-body-xs', label: 'Body / XSmall', spec: '10px · Regular · 0.15ls', usage: 'Captions, timestamps' },
    ],
  },
  {
    group: 'LABEL',
    styles: [
      { className: 'text-label-lg', label: 'Label / Large',  spec: '14px · Medium',        usage: 'Button labels' },
      { className: 'text-label-md', label: 'Label / Medium', spec: '12px · Medium',        usage: 'Chip/badge labels' },
      { className: 'text-label-sm', label: 'Label / Small',  spec: '10px · Medium · 0.15ls', usage: 'Tab labels, tags' },
    ],
  },
  {
    group: 'ACTION',
    styles: [
      { className: 'text-action-btn',   label: 'Action / Button',   spec: '14px · Bold',   usage: 'Primary CTAs' },
      { className: 'text-action-btnsm', label: 'Action / ButtonSm', spec: '12px · Medium', usage: 'Small CTAs' },
    ],
  },
  {
    group: 'CAPTION & LINK',
    styles: [
      { className: 'text-caption',      label: 'Caption',       spec: '10px · Regular · 0.15ls', usage: 'Image captions' },
      { className: 'text-link-default', label: 'Link / Default', spec: '14px · Medium',          usage: 'Inline text links' },
      { className: 'text-link-sm',      label: 'Link / Small',   spec: '12px · Medium',          usage: 'See all, more links' },
    ],
  },
]

// ── Story ─────────────────────────────────────────────────────────────────────

function TypographyScale() {
  return (
    <div className="p-space-8 bg-base-100 min-h-screen font-sans max-w-4xl">
      <h1 className="text-heading-h1 text-base-900 mb-space-2">Typography Scale</h1>
      <p className="text-body-md text-base-600 mb-space-8">
        20 text styles · Font: Inter · All weights: 400 / 500 / 600 / 700
      </p>

      <div className="flex flex-col gap-space-10">
        {typeScale.map((group) => (
          <section key={group.group}>
            <div className="flex items-center gap-space-3 mb-space-5">
              <div className="h-px flex-1 bg-base-300" />
              <span className="text-label-sm text-base-500 tracking-widest">{group.group}</span>
              <div className="h-px flex-1 bg-base-300" />
            </div>
            <div className="flex flex-col gap-space-7">
              {group.styles.map((s) => (
                <div key={s.className} className="flex items-baseline gap-space-7">
                  <div className="w-48 shrink-0">
                    <p className="text-body-sm text-base-600 font-medium">{s.label}</p>
                    <p className="text-caption text-base-400 font-mono mt-1">{s.spec}</p>
                    <p className="text-caption text-base-400 mt-1">{s.usage}</p>
                  </div>
                  <p className={`${s.className} text-base-900 flex-1`}>
                    The quick brown fox
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export const AllStyles: StoryObj = {
  render: () => <TypographyScale />,
  name: 'All Styles',
}
