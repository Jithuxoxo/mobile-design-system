import { useState } from 'react'
import { CommentsDrawer, type CommentData } from './screens/CommentsDrawer'

// ── Fixture data ──────────────────────────────────────────────────────────────

const BODY = 'Congratulations on this well-deserved recognition! Your hard work and dedication truly inspire us all.'
const BODY_SHORT = 'Congratulations on this well-deserved recognition!'

const BASE_COMMENTS: CommentData[] = [
  {
    id: 'c1',
    author: { name: 'Robert Fox', role: 'Sr. Product designer' },
    body: BODY,
    timestamp: '22h',
    replies: [
      { id: 'r1', author: { name: 'Arlene McCoy', role: 'Tech Lead' }, body: BODY_SHORT, timestamp: '2d' },
    ],
    totalReplies: 3,
  },
  {
    id: 'c2',
    author: { name: 'Kristin Watson', role: 'Sr. Software Engineer' },
    body: BODY,
    timestamp: '1w',
  },
]

const LIKED_COMMENTS: CommentData[] = BASE_COMMENTS.map(c => ({
  ...c,
  liked: true,
  replies: c.replies?.map(r => ({ ...r, liked: true })),
}))

const EXPANDED_COMMENTS: CommentData[] = [
  {
    ...BASE_COMMENTS[0],
    replies: [
      { id: 'r1', author: { name: 'Arlene McCoy', role: 'Tech Lead' }, body: BODY_SHORT, timestamp: '2d' },
      { id: 'r2', author: { name: 'Albert Flores', role: 'Tech Lead' }, body: BODY_SHORT, timestamp: '1w' },
      { id: 'r3', author: { name: 'Wade Warren', role: 'Tech Lead' }, body: BODY_SHORT, timestamp: '2w' },
    ],
    totalReplies: 3,
  },
  BASE_COMMENTS[1],
]

const MULTI_THREAD: CommentData[] = [
  {
    ...BASE_COMMENTS[0],
    replies: [
      { id: 'r1', author: { name: 'Arlene McCoy', role: 'Tech Lead' }, body: BODY_SHORT, timestamp: '2d' },
    ],
    totalReplies: 3,
  },
  {
    ...BASE_COMMENTS[1],
    replies: [
      { id: 'r2', author: { name: 'Brooklyn Simmons', role: 'System Architect' }, body: BODY_SHORT, timestamp: '2min' },
    ],
    totalReplies: 2,
  },
]

const EMOJI_COMMENTS: CommentData[] = [
  {
    ...BASE_COMMENTS[0],
    replies: [
      { id: 'r1', author: { name: 'Arlene McCoy', role: 'Tech Lead' }, body: '🥰 🥰 ' + BODY_SHORT, timestamp: '2d' },
    ],
    totalReplies: 1,
  },
  BASE_COMMENTS[1],
]

// ── State definitions ─────────────────────────────────────────────────────────

const STATES = [
  { label: 'Default',           key: 'default' },
  { label: 'Expanded replies',  key: 'expanded' },
  { label: 'Multiple threads',  key: 'multi' },
  { label: 'Liked',             key: 'liked' },
  { label: 'Emoji in reply',    key: 'emoji' },
  { label: 'Empty',             key: 'empty' },
  { label: 'Interactive',       key: 'interactive' },
] as const

type StateKey = typeof STATES[number]['key']

function getComments(state: StateKey): CommentData[] {
  switch (state) {
    case 'expanded':    return EXPANDED_COMMENTS
    case 'multi':       return MULTI_THREAD
    case 'liked':       return LIKED_COMMENTS
    case 'emoji':       return EMOJI_COMMENTS
    case 'empty':       return []
    case 'interactive': return BASE_COMMENTS
    default:            return BASE_COMMENTS
  }
}

// ── Phone frame ───────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: 390,
        height: 700,
        background: '#f5f5f4',
        borderRadius: 40,
        boxShadow: '0 30px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Status bar */}
      <div style={{ height: 44, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#0C0A09"/><rect x="4.5" y="2" width="3" height="10" rx="1" fill="#0C0A09"/><rect x="9" y="0" width="3" height="12" rx="1" fill="#0C0A09"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="#0C0A09" opacity="0.3"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.4C10.4 2.4 12.6 3.4 14.1 5L15.5 3.5C13.6 1.3 10.9 0 8 0C5.1 0 2.4 1.3 0.5 3.5L1.9 5C3.4 3.4 5.6 2.4 8 2.4Z" fill="#0C0A09"/><path d="M8 5.6C9.6 5.6 11 6.3 12 7.4L13.4 6C12 4.6 10.1 3.7 8 3.7C5.9 3.7 4 4.6 2.6 6L4 7.4C5 6.3 6.4 5.6 8 5.6Z" fill="#0C0A09"/><circle cx="8" cy="10" r="2" fill="#0C0A09"/></svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#0C0A09" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="#0C0A09"/><path d="M23 4.5V7.5C23.8 7.2 24.5 6.5 24.5 6C24.5 5.5 23.8 4.8 23 4.5Z" fill="#0C0A09" fillOpacity="0.4"/></svg>
        </div>
      </div>

      {/* Feed background */}
      <div style={{ flex: 1, padding: '12px 16px', overflowY: 'auto', background: '#f5f5f4', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[1, 2].map(i => (
          <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: i === 1 ? '#E0EDFE' : '#E6FAF2' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ height: 12, width: 120, background: '#E7E5E4', borderRadius: 4 }} />
                <div style={{ height: 10, width: 80, background: '#F5F5F4', borderRadius: 4 }} />
              </div>
            </div>
            <div style={{ height: 10, background: '#F5F5F4', borderRadius: 4, marginBottom: 8 }} />
            <div style={{ height: 10, width: '80%', background: '#F5F5F4', borderRadius: 4 }} />
            <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 12, borderTop: '1px solid #F5F5F4' }}>
              {['Like', 'Comment', 'Share'].map(action => (
                <div key={action} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ width: 16, height: 16, background: '#E7E5E4', borderRadius: 4 }} />
                  <span style={{ fontSize: 12, color: '#57534E', fontFamily: 'Inter, sans-serif' }}>{action}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export function App() {
  const [activeState, setActiveState] = useState<StateKey>('default')
  const [interactiveComments, setInteractiveComments] = useState<CommentData[]>(BASE_COMMENTS)

  const isInteractive = activeState === 'interactive'
  const comments = isInteractive ? interactiveComments : getComments(activeState)

  function handleSubmit(text: string) {
    if (!isInteractive) return
    setInteractiveComments(prev => [
      ...prev,
      {
        id: `c${Date.now()}`,
        author: { name: 'You', role: 'Team Member' },
        body: text,
        timestamp: 'just now',
      },
    ])
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1D4ED8 0%, #172654 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        padding: '32px 16px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Comments Drawer</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, margin: '4px 0 0' }}>
          Empuls Mobile Design System
        </p>
      </div>

      {/* State tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
          maxWidth: 600,
        }}
      >
        {STATES.map(s => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveState(s.key)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              background: activeState === s.key ? '#fff' : 'rgba(255,255,255,0.15)',
              color: activeState === s.key ? '#1D4ED8' : '#fff',
              transition: 'all 0.15s ease',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Phone mockup */}
      <PhoneFrame>
        <CommentsDrawer
          comments={comments}
          currentUser={{ name: 'You' }}
          onDismiss={() => {}}
          onLike={() => {}}
          onReply={() => {}}
          onSubmitComment={handleSubmit}
          onLoadMoreReplies={() => {}}
        />
      </PhoneFrame>

      {/* Hint for interactive mode */}
      {isInteractive && (
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, textAlign: 'center', maxWidth: 300 }}>
          Click the input, type a comment and press Enter to add it live.
        </p>
      )}
    </div>
  )
}
