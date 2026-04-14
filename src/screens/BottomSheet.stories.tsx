import { useState } from 'react'
import type { StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  PencilEdit01Icon,
  Message01Icon,
  Delete01Icon,
  Globe02Icon,
} from '@hugeicons/core-free-icons'
import {
  BottomSheet,
  BottomSheetListItem,
  BottomSheetActionItem,
  BottomSheetSelectField,
} from '../components/BottomSheet/BottomSheet'
import { Button } from '../components/Button/Button'

// ─────────────────────────────────────────────────────────────────────────────
// Storybook metadata
// ─────────────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Screens/Bottom Sheet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible bottom sheet primitive with three use-case patterns.\n\n' +
          '- **BottomSheet** — base wrapper: drag handle + title + optional description + dismiss ×\n' +
          '- **BottomSheetListItem** — avatar + name + subtitle row (nominee/contact lists)\n' +
          '- **BottomSheetActionItem** — icon + label row with optional `destructive` variant (action menus)\n' +
          '- **BottomSheetSelectField** — styled native select (form sheets)',
      },
    },
  },
}
export default meta

// ─────────────────────────────────────────────────────────────────────────────
// Sheet frame — simulates 375px mobile width with grey backdrop
// ─────────────────────────────────────────────────────────────────────────────

function SheetFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[375px] font-sans">
      {children}
    </div>
  )
}

function OverlayFrame({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className="relative w-[375px] h-[500px] rounded-2xl overflow-hidden font-sans"
      style={{ background: '#E0E0E0' }}
    >
      {/* Fake screen content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-body-md text-base-500">Screen content</p>
      </div>

      {/* Overlay + sheet */}
      {open && (
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={onClose}
        >
          <div onClick={e => e.stopPropagation()}>{children}</div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Playground
// ─────────────────────────────────────────────────────────────────────────────

export const Playground: StoryObj = {
  name: '⚙️ Bottom Sheet — Playground',
  parameters: {
    docs: {
      description: {
        story: 'Base sheet with only the structural elements — drag handle, title, description, and dismiss button. Compose children freely.',
      },
    },
  },
  render: () => (
    <SheetFrame>
      <BottomSheet
        title="Sheet title"
        description="Optional description text that gives context to what this sheet is about."
        onDismiss={fn()}
      >
        <div className="h-24 rounded-md bg-base-100 flex items-center justify-center">
          <p className="text-body-sm text-base-500">Your content here</p>
        </div>
      </BottomSheet>
    </SheetFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: /dismiss/i })).toBeVisible()
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Nominee Details (list sheet)
// ─────────────────────────────────────────────────────────────────────────────

const NOMINEES = [
  { name: 'Robert Fox',      subtitle: 'k.p.allen@aol.com' },
  { name: 'Ricky Smith',     subtitle: 'j.jones@outlook.com' },
  { name: 'Katie Sims',      subtitle: 'c.a.glasser@outlook.com' },
  { name: 'Marvin McKinney', subtitle: 'm.k.freund@aol.com' },
  { name: 'Jacob Jones',     subtitle: 'stephanienicol@outlook.com' },
]

export const NomineeDetails: StoryObj = {
  name: 'Nominee Details',
  parameters: {
    docs: {
      description: {
        story: 'List of people with 32px avatar, name, and email. Use `BottomSheetListItem` for each row.',
      },
    },
  },
  render: () => (
    <SheetFrame>
      <BottomSheet title="Nominee details" onDismiss={fn()}>
        <div className="flex flex-col divide-y divide-base-200">
          {NOMINEES.map(n => (
            <BottomSheetListItem key={n.name} name={n.name} subtitle={n.subtitle} />
          ))}
        </div>
      </BottomSheet>
    </SheetFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Robert Fox')).toBeVisible()
    await expect(canvas.getByText('Jacob Jones')).toBeVisible()
  },
}

export const NomineeDetailsOverlay: StoryObj = {
  name: 'Nominee Details — with overlay',
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo — tap "Show sheet" to open. Click the backdrop or × to dismiss.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col items-center gap-space-4">
        <OverlayFrame open={open} onClose={() => setOpen(false)}>
          <BottomSheet title="Nominee details" onDismiss={() => setOpen(false)}>
            <div className="flex flex-col divide-y divide-base-200">
              {NOMINEES.map(n => (
                <BottomSheetListItem key={n.name} name={n.name} subtitle={n.subtitle} />
              ))}
            </div>
          </BottomSheet>
        </OverlayFrame>
        <Button size="sm" onClick={() => setOpen(true)}>Show sheet</Button>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Action Menu (settings sheet)
// ─────────────────────────────────────────────────────────────────────────────

export const ActionMenu: StoryObj = {
  name: 'Action Menu',
  parameters: {
    docs: {
      description: {
        story: 'Settings / context-action sheet. Each row uses `BottomSheetActionItem`. The last item uses `variant="destructive"` for red styling.',
      },
    },
  },
  render: () => (
    <SheetFrame>
      <BottomSheet title="Settings" onDismiss={fn()}>
        <div className="flex flex-col gap-space-1">
          <BottomSheetActionItem
            icon={<HugeiconsIcon icon={PencilEdit01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
            label="Edit award category / Nominee"
            onClick={fn()}
          />
          <BottomSheetActionItem
            icon={<HugeiconsIcon icon={Message01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
            label="Message nominator"
            onClick={fn()}
          />
          <BottomSheetActionItem
            icon={<HugeiconsIcon icon={Delete01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
            label="Cancel nomination"
            variant="destructive"
            onClick={fn()}
          />
        </div>
      </BottomSheet>
    </SheetFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Edit award category / Nominee')).toBeVisible()
    await expect(canvas.getByText('Cancel nomination')).toBeVisible()
  },
}

export const ActionMenuOverlay: StoryObj = {
  name: 'Action Menu — with overlay',
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with backdrop. Click an action or × to close.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    const [last, setLast] = useState<string | null>(null)
    return (
      <div className="flex flex-col items-center gap-space-4">
        <OverlayFrame open={open} onClose={() => setOpen(false)}>
          <BottomSheet title="Settings" onDismiss={() => setOpen(false)}>
            <div className="flex flex-col gap-space-1">
              <BottomSheetActionItem
                icon={<HugeiconsIcon icon={PencilEdit01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
                label="Edit award category / Nominee"
                onClick={() => { setLast('Edit'); setOpen(false) }}
              />
              <BottomSheetActionItem
                icon={<HugeiconsIcon icon={Message01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
                label="Message nominator"
                onClick={() => { setLast('Message'); setOpen(false) }}
              />
              <BottomSheetActionItem
                icon={<HugeiconsIcon icon={Delete01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
                label="Cancel nomination"
                variant="destructive"
                onClick={() => { setLast('Cancel nomination'); setOpen(false) }}
              />
            </div>
          </BottomSheet>
        </OverlayFrame>
        <div className="flex items-center gap-space-3">
          <Button size="sm" onClick={() => setOpen(true)}>Show sheet</Button>
          {last && <span className="text-body-sm text-base-600">Tapped: <strong>{last}</strong></span>}
        </div>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Language Settings (form sheet)
// ─────────────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Tamil', value: 'ta' },
  { label: 'Telugu', value: 'te' },
  { label: 'Kannada', value: 'kn' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
]

export const LanguageSettings: StoryObj = {
  name: 'Language Settings',
  parameters: {
    docs: {
      description: {
        story: 'Form sheet with a description, a `BottomSheetSelectField`, and a primary CTA button.',
      },
    },
  },
  render: () => {
    const [lang, setLang] = useState('en')
    return (
      <SheetFrame>
        <BottomSheet
          title="Language settings"
          description="Beta disclaimer: This feature is still under the beta version. The language setting does not cover user generated content like award citation, group names or 3rd party integration."
          onDismiss={fn()}
        >
          <div className="flex flex-col gap-space-4">
            <BottomSheetSelectField
              value={lang}
              options={LANGUAGES}
              onChange={setLang}
            />
            <Button size="md" onClick={fn()}>Update</Button>
          </div>
        </BottomSheet>
      </SheetFrame>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('combobox')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /update/i })).toBeVisible()
  },
}

export const LanguageSettingsOverlay: StoryObj = {
  name: 'Language Settings — with overlay',
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo. Select a language and tap Update.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    const [lang, setLang] = useState('en')
    const [saved, setSaved] = useState<string | null>(null)
    return (
      <div className="flex flex-col items-center gap-space-4">
        <OverlayFrame open={open} onClose={() => setOpen(false)}>
          <BottomSheet
            title="Language settings"
            description="Beta disclaimer: This feature is still under the beta version. The language setting does not cover user generated content like award citation, group names or 3rd party integration."
            onDismiss={() => setOpen(false)}
          >
            <div className="flex flex-col gap-space-4">
              <BottomSheetSelectField
                value={lang}
                options={LANGUAGES}
                onChange={setLang}
              />
              <Button
                size="md"
                onClick={() => {
                  setSaved(LANGUAGES.find(l => l.value === lang)?.label ?? lang)
                  setOpen(false)
                }}
              >
                Update
              </Button>
            </div>
          </BottomSheet>
        </OverlayFrame>
        <div className="flex items-center gap-space-3">
          <Button size="sm" onClick={() => setOpen(true)}>
            <span className="flex items-center gap-space-2">
              <HugeiconsIcon icon={Globe02Icon} size={14} color="currentColor" strokeWidth={1.5} />
              Language
            </span>
          </Button>
          {saved && <span className="text-body-sm text-base-600">Saved: <strong>{saved}</strong></span>}
        </div>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. All variants at a glance
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: StoryObj = {
  name: 'All variants',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'All three sheet patterns side by side for reference.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-space-6 items-start justify-center font-sans">

      {/* Nominee Details */}
      <div className="w-[375px] shadow-elevation-2 rounded-t-2xl overflow-hidden">
        <BottomSheet title="Nominee details" onDismiss={fn()}>
          <div className="flex flex-col divide-y divide-base-200">
            {NOMINEES.map(n => (
              <BottomSheetListItem key={n.name} name={n.name} subtitle={n.subtitle} />
            ))}
          </div>
        </BottomSheet>
      </div>

      {/* Action Menu */}
      <div className="w-[375px] shadow-elevation-2 rounded-t-2xl overflow-hidden">
        <BottomSheet title="Settings" onDismiss={fn()}>
          <div className="flex flex-col gap-space-1">
            <BottomSheetActionItem
              icon={<HugeiconsIcon icon={PencilEdit01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
              label="Edit award category / Nominee"
            />
            <BottomSheetActionItem
              icon={<HugeiconsIcon icon={Message01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
              label="Message nominator"
            />
            <BottomSheetActionItem
              icon={<HugeiconsIcon icon={Delete01Icon} size={16} color="currentColor" strokeWidth={1.5} />}
              label="Cancel nomination"
              variant="destructive"
            />
          </div>
        </BottomSheet>
      </div>

      {/* Language Settings */}
      <div className="w-[375px] shadow-elevation-2 rounded-t-2xl overflow-hidden">
        <BottomSheet
          title="Language settings"
          description="Beta disclaimer: This feature is still under the beta version. The language setting does not cover user generated content."
          onDismiss={fn()}
        >
          <div className="flex flex-col gap-space-4">
            <BottomSheetSelectField value="en" options={LANGUAGES} />
            <Button size="md">Update</Button>
          </div>
        </BottomSheet>
      </div>

    </div>
  ),
}
