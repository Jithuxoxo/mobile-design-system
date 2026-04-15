import { useState } from 'react'
import type { StoryObj } from '@storybook/react'
import { fn, expect, within } from '@storybook/test'
import {
  CommentsDrawer,
  type CommentData,
} from './CommentsDrawer'

// ─────────────────────────────────────────────────────────────────────────────
// Storybook metadata
// ─────────────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Screens/Comments Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A bottom-sheet comments drawer for the Empuls social feed.\n\n' +
          '**States covered:**\n' +
          '- Default — 2 top-level comments with a collapsed reply thread\n' +
          '- Expanded replies — "Hide replies" revealed after expanding\n' +
          '- Multiple threads — two separate reply connectors\n' +
          '- Liked — heart icon in filled red state\n' +
          '- Reply mode — composer shows "Replying to …" banner\n' +
          '- Composer focus — toolbar with emoji / GIF / @mention / attach icons + send button\n' +
          '- Empty — no comments posted yet\n\n' +
          '**Design note (from Figma):** Reply is not visible on your own comments; others can see replies to your comments.',
      },
    },
  },
}
export default meta

// ─────────────────────────────────────────────────────────────────────────────
// Fixture data
// ─────────────────────────────────────────────────────────────────────────────

const CURRENT_USER = { name: 'You', avatarSrc: undefined }

const COMMENT_BODY = 'Congratulations on this well-deserved recognition! Your hard work and dedication truly inspire us all.'
const COMMENT_BODY_SHORT = 'Congratulations on this well-deserved recognition!'

const SAMPLE_COMMENTS: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: COMMENT_BODY,
    timestamp: '22h',
    replies: [
      {
        id: 'r1',
        author: { name: 'Arlene McCoy', role: 'Tech Lead' },
        body: COMMENT_BODY_SHORT,
        timestamp: '2d',
      },
    ],
    totalReplies: 3,
  },
  {
    id: 'c2',
    author: { name: 'Kristin Watson', role: 'Sr. Software Engineer' },
    body: COMMENT_BODY,
    timestamp: '1w',
  },
]

const COMMENTS_WITH_EXPANDED_REPLIES: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: COMMENT_BODY,
    timestamp: '22h',
    replies: [
      {
        id: 'r1',
        author: { name: 'Arlene McCoy', role: 'Tech Lead' },
        body: COMMENT_BODY_SHORT,
        timestamp: '2d',
      },
      {
        id: 'r2',
        author: { name: 'Albert Flores', role: 'Tech Lead' },
        body: COMMENT_BODY_SHORT,
        timestamp: '1w',
      },
      {
        id: 'r3',
        author: { name: 'Wade Warren', role: 'Tech Lead' },
        body: COMMENT_BODY_SHORT,
        timestamp: '2w',
      },
    ],
    totalReplies: 3,
  },
  {
    id: 'c2',
    author: { name: 'Kristin Watson', role: 'Sr. Software Engineer' },
    body: COMMENT_BODY,
    timestamp: '1w',
  },
]

const COMMENTS_MULTI_THREAD: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: COMMENT_BODY,
    timestamp: '22h',
    replies: [
      {
        id: 'r1',
        author: { name: 'Arlene McCoy', role: 'Tech Lead' },
        body: COMMENT_BODY_SHORT,
        timestamp: '2d',
      },
    ],
    totalReplies: 3,
  },
  {
    id: 'c2',
    author: { name: 'Kristin Watson', role: 'Sr. Software Engineer' },
    body: COMMENT_BODY,
    timestamp: '1w',
    replies: [
      {
        id: 'r2',
        author: { name: 'Brooklyn Simmons', role: 'System Architect' },
        body: COMMENT_BODY_SHORT,
        timestamp: '2min',
      },
    ],
    totalReplies: 2,
  },
]

const COMMENTS_LIKED: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: COMMENT_BODY,
    timestamp: '22h',
    liked: true,
    replies: [
      {
        id: 'r1',
        author: { name: 'Arlene McCoy', role: 'Tech Lead' },
        body: COMMENT_BODY_SHORT,
        timestamp: '2d',
        liked: true,
      },
    ],
    totalReplies: 3,
  },
  {
    id: 'c2',
    author: { name: 'Kristin Watson', role: 'Sr. Software Engineer' },
    body: COMMENT_BODY,
    timestamp: '1w',
    liked: true,
  },
]

const COMMENTS_WITH_EMOJI: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: COMMENT_BODY,
    timestamp: '22h',
    replies: [
      {
        id: 'r1',
        author: { name: 'Arlene McCoy', role: 'Tech Lead' },
        body: '🥰 🥰 ' + COMMENT_BODY_SHORT,
        timestamp: '2d',
      },
    ],
    totalReplies: 3,
  },
  {
    id: 'c2',
    author: { name: 'Kristin Watson', role: 'Sr. Software Engineer' },
    body: COMMENT_BODY,
    timestamp: '1w',
  },
]

const COMMENTS_WITH_MENTION: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: COMMENT_BODY,
    timestamp: '22h',
    replies: [
      {
        id: 'r1',
        author: { name: 'Arlene McCoy', role: 'Tech Lead' },
        body: '@Marvin McKinney ' + COMMENT_BODY_SHORT,
        timestamp: '2d',
        liked: true,
      },
    ],
    totalReplies: 1,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Utility frame
// ─────────────────────────────────────────────────────────────────────────────

function DrawerFrame({ children }: { children: React.ReactNode }) {
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
      className="relative w-[375px] h-[600px] rounded-2xl overflow-hidden font-sans bg-base-100"
    >
      {/* Fake feed background */}
      <div className="absolute inset-0 flex flex-col gap-space-4 p-space-4 overflow-hidden opacity-40 pointer-events-none select-none">
        {[1, 2].map(i => (
          <div key={i} className="bg-base-000 rounded-md p-space-4 shadow-elevation-1">
            <div className="flex items-center gap-space-3 mb-space-3">
              <div className="w-10 h-10 rounded-full bg-base-300" />
              <div className="flex flex-col gap-space-1">
                <div className="h-3 w-28 bg-base-300 rounded" />
                <div className="h-2 w-20 bg-base-200 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-base-200 rounded" />
              <div className="h-2 w-4/5 bg-base-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Overlay + sheet */}
      {open && (
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={onClose}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="max-h-[90%] flex flex-col"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default state — 2 comments, one collapsed reply thread
// ─────────────────────────────────────────────────────────────────────────────

export const Default: StoryObj = {
  name: '1 · Default (2 comments + collapsed replies)',
  parameters: {
    docs: {
      description: {
        story:
          'The default view: Robert Fox and Kristin Watson have left top-level comments. ' +
          "Arlene McCoy replied to Robert's comment — the thread shows \"View 2 more replies\" since there are 3 total replies server-side.",
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={SAMPLE_COMMENTS}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onLike={fn()}
        onReply={fn()}
        onSubmitComment={fn()}
        onLoadMoreReplies={fn()}
      />
    </DrawerFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Comments')).toBeVisible()
    await expect(canvas.getByText('Robert Fox')).toBeVisible()
    await expect(canvas.getByText('Kristin Watson')).toBeVisible()
    await expect(canvas.getByText('Arlene McCoy')).toBeVisible()
    await expect(canvas.getByText(/View 2 more repl/)).toBeVisible()
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Expanded replies — "Hide replies" visible
// ─────────────────────────────────────────────────────────────────────────────

export const ExpandedReplies: StoryObj = {
  name: '2 · Expanded replies (Hide replies)',
  parameters: {
    docs: {
      description: {
        story:
          'Tap "View N more replies" to reveal all 3 replies for Robert Fox\'s comment. ' +
          '"Hide replies" appears below the thread.',
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={COMMENTS_WITH_EXPANDED_REPLIES}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onLike={fn()}
        onReply={fn()}
        onSubmitComment={fn()}
      />
    </DrawerFrame>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Multiple reply threads (two independent connectors)
// ─────────────────────────────────────────────────────────────────────────────

export const MultipleThreads: StoryObj = {
  name: '3 · Multiple reply threads',
  parameters: {
    docs: {
      description: {
        story:
          'Both top-level comments have replies. Each creates an independent connector line (Vector 346 / Vector 347 in Figma).',
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={COMMENTS_MULTI_THREAD}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onLike={fn()}
        onReply={fn()}
        onSubmitComment={fn()}
      />
    </DrawerFrame>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Liked state — hearts filled red
// ─────────────────────────────────────────────────────────────────────────────

export const LikedState: StoryObj = {
  name: '4 · Liked (favourite) state',
  parameters: {
    docs: {
      description: {
        story:
          'Comments and replies where the current user has already liked them. ' +
          'The heart icon renders in filled error-400 red.',
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={COMMENTS_LIKED}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onLike={fn()}
      />
    </DrawerFrame>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Emoji in comment body
// ─────────────────────────────────────────────────────────────────────────────

export const EmojiInComment: StoryObj = {
  name: '5 · Emoji in comment body',
  parameters: {
    docs: {
      description: {
        story: 'Reply body includes emoji characters. Text renders inline with emojis naturally.',
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={COMMENTS_WITH_EMOJI}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onLike={fn()}
      />
    </DrawerFrame>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. @mention in comment
// ─────────────────────────────────────────────────────────────────────────────

export const MentionInComment: StoryObj = {
  name: '6 · @mention in comment',
  parameters: {
    docs: {
      description: {
        story:
          'Reply body includes an @mention (@Marvin McKinney). ' +
          'In production, this would render as a tappable mention chip.',
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={COMMENTS_WITH_MENTION}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onLike={fn()}
      />
    </DrawerFrame>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Empty state — no comments yet
// ─────────────────────────────────────────────────────────────────────────────

export const EmptyState: StoryObj = {
  name: '7 · Empty (no comments)',
  parameters: {
    docs: {
      description: {
        story: 'When there are no comments the drawer shows a friendly empty message.',
      },
    },
  },
  render: () => (
    <DrawerFrame>
      <CommentsDrawer
        comments={[]}
        currentUser={CURRENT_USER}
        onDismiss={fn()}
        onSubmitComment={fn()}
      />
    </DrawerFrame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText(/No comments yet/)).toBeVisible()
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Reply mode — "Replying to …" banner in composer
// ─────────────────────────────────────────────────────────────────────────────

export const ReplyMode: StoryObj = {
  name: '8 · Reply mode (composer)',
  parameters: {
    docs: {
      description: {
        story:
          'Tap the "Reply" link on a comment to enter reply mode. ' +
          'The composer shows a "Replying to <name>" banner with a dismiss ×. ' +
          'Tap × or submit to exit reply mode.',
      },
    },
  },
  render: () => {
    const [submitted, setSubmitted] = useState<string | null>(null)

    return (
      <DrawerFrame>
        <div className="relative">
          <CommentsDrawer
            comments={SAMPLE_COMMENTS}
            currentUser={CURRENT_USER}
            onDismiss={fn()}
            onLike={fn()}
            onReply={fn()}
            onSubmitComment={(text) => {
              setSubmitted(text)
            }}
          />
          {submitted && (
            <div className="absolute top-2 right-2 bg-success-000 border border-success-300 text-success-400 text-body-sm rounded-md px-space-3 py-space-2">
              Submitted: "{submitted}"
            </div>
          )}
        </div>
      </DrawerFrame>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Interactive — full overlay with dismiss
// ─────────────────────────────────────────────────────────────────────────────

export const Interactive: StoryObj = {
  name: '9 · Interactive — with overlay',
  parameters: {
    docs: {
      description: {
        story:
          'Full interactive demo with a backdrop. Tap "Show comments" to open. ' +
          'Tap × or the backdrop to dismiss. ' +
          'Tap "Reply" under a comment to enter reply mode. ' +
          'Click the input to reveal the composer toolbar.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    const [comments, setComments] = useState<CommentData[]>(SAMPLE_COMMENTS)

    function handleSubmit(text: string) {
      const newComment: CommentData = {
        id: `c${Date.now()}`,
        author: { name: 'You', role: 'Team Member' },
        body: text,
        timestamp: 'just now',
      }
      setComments(prev => [...prev, newComment])
    }

    return (
      <div className="flex flex-col items-center gap-space-4">
        <OverlayFrame open={open} onClose={() => setOpen(false)}>
          <CommentsDrawer
            comments={comments}
            currentUser={CURRENT_USER}
            onDismiss={() => setOpen(false)}
            onLike={fn()}
            onReply={fn()}
            onSubmitComment={handleSubmit}
            onLoadMoreReplies={fn()}
          />
        </OverlayFrame>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-space-5 py-space-3 bg-primary-400 text-base-000 text-action-btn rounded-md hover:bg-primary-500 transition-colors"
        >
          Show comments ({comments.length})
        </button>
      </div>
    )
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. All states at a glance
// ─────────────────────────────────────────────────────────────────────────────

export const AllStates: StoryObj = {
  name: '10 · All states at a glance',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'All key states side-by-side for design review.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-space-6 items-start justify-center font-sans p-space-5">
      {/* Default */}
      <div className="flex flex-col gap-space-2">
        <p className="text-label-md text-base-600 text-center">Default</p>
        <div className="w-[375px] shadow-elevation-2 rounded-t-xl overflow-hidden">
          <CommentsDrawer
            comments={SAMPLE_COMMENTS}
            currentUser={CURRENT_USER}
            onDismiss={fn()}
          />
        </div>
      </div>

      {/* Expanded replies */}
      <div className="flex flex-col gap-space-2">
        <p className="text-label-md text-base-600 text-center">Expanded replies</p>
        <div className="w-[375px] shadow-elevation-2 rounded-t-xl overflow-hidden">
          <CommentsDrawer
            comments={COMMENTS_WITH_EXPANDED_REPLIES}
            currentUser={CURRENT_USER}
            onDismiss={fn()}
          />
        </div>
      </div>

      {/* Liked */}
      <div className="flex flex-col gap-space-2">
        <p className="text-label-md text-base-600 text-center">Liked state</p>
        <div className="w-[375px] shadow-elevation-2 rounded-t-xl overflow-hidden">
          <CommentsDrawer
            comments={COMMENTS_LIKED}
            currentUser={CURRENT_USER}
            onDismiss={fn()}
          />
        </div>
      </div>

      {/* Empty */}
      <div className="flex flex-col gap-space-2">
        <p className="text-label-md text-base-600 text-center">Empty</p>
        <div className="w-[375px] shadow-elevation-2 rounded-t-xl overflow-hidden">
          <CommentsDrawer
            comments={[]}
            currentUser={CURRENT_USER}
            onDismiss={fn()}
          />
        </div>
      </div>
    </div>
  ),
}
