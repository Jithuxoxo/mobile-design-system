import { useState, useRef, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Avatar } from '../components/Avatar/Avatar'
import { Button } from '../components/Button/Button'

// ── Types ────────────────────────────────────────────────────────────────────

export interface CommentAuthor {
  name: string
  role?: string
  avatarSrc?: string
}

export interface ReplyData {
  id: string
  author: CommentAuthor
  body: string
  timestamp: string
  liked?: boolean
}

export interface CommentData {
  id: string
  author: CommentAuthor
  body: string
  timestamp: string
  liked?: boolean
  replies?: ReplyData[]
  totalReplies?: number
}

export interface CommentsDrawerProps {
  comments?: CommentData[]
  currentUser?: { name: string; avatarSrc?: string }
  onDismiss?: () => void
  onLike?: (commentId: string, replyId?: string) => void
  onReply?: (commentId: string) => void
  onSubmitComment?: (text: string) => void
  onLoadMoreReplies?: (commentId: string) => void
  className?: string
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {filled ? (
        <path
          d="M8 13.5s-6.5-4-6.5-8C1.5 3.567 3.067 2 5 2c1.185 0 2.202.612 2.85 1.499L8 3.73l.15-.231C8.798 2.612 9.815 2 11 2c1.933 0 3.5 1.567 3.5 3.5 0 4-6.5 8-6.5 8Z"
          fill="#F04438"
        />
      ) : (
        <path
          d="M8 13.5s-6.5-4-6.5-8C1.5 3.567 3.067 2 5 2c1.185 0 2.202.612 2.85 1.499L8 3.73l.15-.231C8.798 2.612 9.815 2 11 2c1.933 0 3.5 1.567 3.5 3.5 0 4-6.5 8-6.5 8Z"
          stroke="#57534E"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="3.5" r="1.2" fill="#57534E" />
      <circle cx="8" cy="8" r="1.2" fill="#57534E" />
      <circle cx="8" cy="12.5" r="1.2" fill="#57534E" />
    </svg>
  )
}

// Toolbar icons (match Figma: emoji face, image/sticker, gif, @, attach)
function EmojiFaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#57534E" strokeWidth="1.4" />
      <circle cx="7.5" cy="8.5" r="1" fill="#57534E" />
      <circle cx="12.5" cy="8.5" r="1" fill="#57534E" />
      <path d="M7 12c.8 1.5 6.2 1.5 6 0" stroke="#57534E" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ImageAddIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="12" height="10" rx="1.5" stroke="#57534E" strokeWidth="1.4" />
      <path d="M2 11l3.5-3.5L8 10l2.5-2L14 11" stroke="#57534E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="7" r="3" fill="#57534E" />
      <path d="M16 5.5v3M14.5 7h3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function GifIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="5" width="17" height="10" rx="2" stroke="#57534E" strokeWidth="1.4" />
      <path d="M7 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.5v-1.5H5.5" stroke="#57534E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="9.5" y1="8" x2="9.5" y2="12" stroke="#57534E" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 8h3m-3 2h2" stroke="#57534E" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function AtIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3.5" stroke="#57534E" strokeWidth="1.4" />
      <path d="M13.5 10a4.5 4.5 0 0 1-4.5 4.5H9a5.5 5.5 0 0 1 0-11c3.038 0 5.5 2.462 5.5 5.5v1.25" stroke="#57534E" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function AttachIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M16.5 9.5L9.5 16.5A5 5 0 0 1 2.5 9.5l7-7a3 3 0 0 1 4.243 4.243L6.5 13.985a1 1 0 0 1-1.414-1.414L12.33 5.33" stroke="#57534E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Keyboard special key icons
function ShiftIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
      <path d="M9 2L16 9H12v5H6V9H2L9 2Z" fill="#444" />
    </svg>
  )
}

function BackspaceIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
      <path d="M8 2H18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-7-6 7-6Z" stroke="#444" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 6l4 4M15 6l-4 4" stroke="#444" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

// ── iOS Keyboard ──────────────────────────────────────────────────────────────

const ROW1 = ['Q','W','E','R','T','Y','U','I','O','P']
const ROW2 = ['A','S','D','F','G','H','J','K','L']
const ROW3 = ['Z','X','C','V','B','N','M']

interface IosKeyboardProps {
  onChar: (ch: string) => void
  onBackspace: () => void
  onReturn: () => void
  onSpace: () => void
}

function IosKeyboard({ onChar, onBackspace, onReturn, onSpace }: IosKeyboardProps) {
  const keyClass =
    'flex items-center justify-center rounded-[4px] h-[42px] select-none cursor-pointer active:opacity-70 transition-opacity'
  const letterKey = `${keyClass} flex-1 bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.3)] text-[#111] text-[22px]`
  const specialKey = `${keyClass} bg-[#abafb7] shadow-[0px_1px_0px_rgba(0,0,0,0.3)]`

  return (
    <div className="w-full bg-[#d1d2d8] shrink-0">
      <div className="flex flex-col gap-[6px] p-[6px]">
        {/* Row 1: Q–P */}
        <div className="flex gap-[6px]">
          {ROW1.map(k => (
            <button key={k} type="button" onMouseDown={e => { e.preventDefault(); onChar(k.toLowerCase()) }}
              className={letterKey} style={{ fontFamily: 'system-ui, sans-serif' }}>
              {k}
            </button>
          ))}
        </div>

        {/* Row 2: A–L (indented) */}
        <div className="flex gap-[6px] px-[14px]">
          {ROW2.map(k => (
            <button key={k} type="button" onMouseDown={e => { e.preventDefault(); onChar(k.toLowerCase()) }}
              className={letterKey} style={{ fontFamily: 'system-ui, sans-serif' }}>
              {k}
            </button>
          ))}
        </div>

        {/* Row 3: Shift + Z–M + Backspace */}
        <div className="flex gap-[6px]">
          <button type="button" onMouseDown={e => e.preventDefault()}
            className={`${specialKey} w-[42px]`}>
            <ShiftIcon />
          </button>
          {ROW3.map(k => (
            <button key={k} type="button" onMouseDown={e => { e.preventDefault(); onChar(k.toLowerCase()) }}
              className={letterKey} style={{ fontFamily: 'system-ui, sans-serif' }}>
              {k}
            </button>
          ))}
          <button type="button" onMouseDown={e => { e.preventDefault(); onBackspace() }}
            className={`${specialKey} w-[42px]`}>
            <BackspaceIcon />
          </button>
        </div>

        {/* Row 4: 123 + emoji + space + return */}
        <div className="flex gap-[6px]">
          <button type="button" onMouseDown={e => e.preventDefault()}
            className={`${specialKey} w-[42px] text-[15px] text-[#111]`}
            style={{ fontFamily: 'system-ui, sans-serif' }}>
            123
          </button>
          <button type="button" onMouseDown={e => e.preventDefault()}
            className={`${specialKey} w-[42px] text-[22px]`}>
            😊
          </button>
          <button type="button" onMouseDown={e => { e.preventDefault(); onSpace() }}
            className={`${keyClass} flex-1 bg-white shadow-[0px_1px_0px_rgba(0,0,0,0.3)] text-[#111] text-[15px]`}
            style={{ fontFamily: 'system-ui, sans-serif' }}>
            space
          </button>
          <button type="button" onMouseDown={e => { e.preventDefault(); onReturn() }}
            className={`${specialKey} w-[80px] text-[15px] text-[#6b6b6b]`}
            style={{ fontFamily: 'system-ui, sans-serif' }}>
            return
          </button>
        </div>
      </div>

      {/* Home indicator safe area */}
      <div className="h-[26px] bg-[#d1d2d8]" />
    </div>
  )
}

// ── Reply row ─────────────────────────────────────────────────────────────────

interface ReplyRowProps {
  reply: ReplyData
  onLike?: () => void
}

function ReplyRow({ reply, onLike }: ReplyRowProps) {
  const [liked, setLiked] = useState(reply.liked ?? false)
  return (
    <div className="flex gap-[12px] items-start">
      <div className="shrink-0 relative z-10">
        <Avatar size={24} name={reply.author.name} src={reply.author.avatarSrc} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <span className="text-heading-h5 text-base-900 whitespace-nowrap">{reply.author.name}</span>
            <span className="w-px h-[10px] bg-base-400 rounded-full" aria-hidden="true" />
            <span className="text-body-sm text-base-700 whitespace-nowrap">{reply.timestamp}</span>
          </div>
          <div className="flex items-center gap-space-4 shrink-0">
            <button type="button" onClick={() => { setLiked(p => !p); onLike?.() }}
              aria-label={liked ? 'Unlike' : 'Like'}
              className="p-0.5 rounded hover:bg-base-200 transition-colors">
              <HeartIcon filled={liked} />
            </button>
            <button type="button" aria-label="More options"
              className="p-0.5 rounded hover:bg-base-200 transition-colors">
              <MoreIcon />
            </button>
          </div>
        </div>
        {reply.author.role && (
          <span className="text-body-sm text-base-700">{reply.author.role}</span>
        )}
        <p className="text-body-md text-base-900 mt-[2px]">{reply.body}</p>
      </div>
    </div>
  )
}

// ── Comment row ───────────────────────────────────────────────────────────────

interface CommentRowProps {
  comment: CommentData
  onLike?: () => void
  onReply?: () => void
  onLikeReply?: (replyId: string) => void
  onLoadMoreReplies?: () => void
}

function CommentRow({ comment, onLike, onReply, onLikeReply, onLoadMoreReplies }: CommentRowProps) {
  const [liked, setLiked] = useState(comment.liked ?? false)
  const [expanded, setExpanded] = useState(false)

  const replies = comment.replies ?? []
  const hasReplies = replies.length > 0
  const totalReplies = comment.totalReplies ?? replies.length
  const hiddenCount = totalReplies - replies.length
  const visibleReplies = expanded ? replies : replies.slice(0, 1)
  const showViewMore = !expanded && (hiddenCount > 0 || replies.length > 1)
  const showHide = expanded && replies.length > 1

  return (
    // Relative container so we can absolutely-position the connector line
    <div className="relative flex flex-col">

      {/*
        ── Connector line ──────────────────────────────────────────────────────
        Positioned at the horizontal center of the parent avatar (x = 11px,
        since the avatar is 24px wide → center at 12px → minus half line
        width ≈ 11px). Spans from just below the avatar (top: 28px) down
        through all visible replies. Matches Figma Vector 346.
      */}
      {hasReplies && (
        <div
          className="absolute w-[1.5px] bg-base-300 rounded-full pointer-events-none"
          style={{ left: 11, top: 28, bottom: showViewMore ? 22 : showHide ? 22 : 0 }}
          aria-hidden="true"
        />
      )}

      {/* ── Parent comment ── */}
      <div className="flex gap-[12px] items-start">
        <div className="shrink-0 relative z-10">
          <Avatar size={24} name={comment.author.name} src={comment.author.avatarSrc} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-[2px] pb-[12px]">
          {/* Name + timestamp + actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <span className="text-heading-h5 text-base-900 whitespace-nowrap">{comment.author.name}</span>
              <span className="w-px h-[10px] bg-base-400 rounded-full" aria-hidden="true" />
              <span className="text-body-sm text-base-700 whitespace-nowrap">{comment.timestamp}</span>
            </div>
            <div className="flex items-center gap-space-4 shrink-0">
              <button type="button" onClick={() => { setLiked(p => !p); onLike?.() }}
                aria-label={liked ? 'Unlike' : 'Like'}
                className="p-0.5 rounded hover:bg-base-200 transition-colors">
                <HeartIcon filled={liked} />
              </button>
              <button type="button" aria-label="More options"
                className="p-0.5 rounded hover:bg-base-200 transition-colors">
                <MoreIcon />
              </button>
            </div>
          </div>
          {/* Role */}
          {comment.author.role && (
            <span className="text-body-sm text-base-700">{comment.author.role}</span>
          )}
          {/* Body */}
          <p className="text-body-md text-base-900 mt-[2px]">{comment.body}</p>
          {/* Reply link */}
          <button type="button" onClick={onReply}
            className="text-action-btnsm text-base-700 mt-[6px] text-left hover:text-base-900 transition-colors w-fit">
            Reply
          </button>
        </div>
      </div>

      {/* ── Reply thread ──
          Indented 36px (= 24px parent avatar + 12px gap) so reply avatars
          align with the parent comment's text content — matching Figma left=52px
          for replies when frame padding is 16px.
      */}
      {hasReplies && (
        <div className="ml-[36px] flex flex-col gap-[10px]">
          {visibleReplies.map(reply => (
            <ReplyRow
              key={reply.id}
              reply={reply}
              onLike={() => onLikeReply?.(reply.id)}
            />
          ))}

          {/* View N more replies */}
          {showViewMore && (
            <button
              type="button"
              onClick={() => { setExpanded(true); if (hiddenCount > 0) onLoadMoreReplies?.() }}
              className="text-body-sm text-base-700 hover:text-base-900 transition-colors text-left"
            >
              View {hiddenCount > 0 ? hiddenCount : replies.length - 1} more{' '}
              {(hiddenCount === 1 || replies.length - 1 === 1) ? 'reply' : 'replies'}
            </button>
          )}

          {/* Hide replies */}
          {showHide && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-body-sm text-base-700 hover:text-base-900 transition-colors text-left"
            >
              Hide replies
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Composer ──────────────────────────────────────────────────────────────────

interface CommentComposerProps {
  currentUser?: { name: string; avatarSrc?: string }
  replyingTo?: string
  onCancelReply?: () => void
  onSubmit?: (text: string) => void
}

function CommentComposer({ currentUser, replyingTo, onCancelReply, onSubmit }: CommentComposerProps) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [keyboardReady, setKeyboardReady] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const composerRef = useRef<HTMLDivElement>(null)
  const prevReplyingTo = useRef<string | undefined>(undefined)

  // Animate keyboard in after it mounts
  useEffect(() => {
    if (focused) {
      requestAnimationFrame(() => setKeyboardReady(true))
    } else {
      setKeyboardReady(false)
    }
  }, [focused])

  // Auto-focus and pre-fill @mention when reply starts; clear on cancel
  useEffect(() => {
    if (replyingTo && replyingTo !== prevReplyingTo.current) {
      const mention = '@' + replyingTo.toLowerCase().replace(/\s+/g, '_') + ' '
      setText(mention)
      setFocused(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    } else if (!replyingTo && prevReplyingTo.current) {
      setText('')
    }
    prevReplyingTo.current = replyingTo
  }, [replyingTo])

  // Dismiss keyboard when clicking outside the entire composer area
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (composerRef.current && !composerRef.current.contains(e.target as Node)) {
        setFocused(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  function handleSubmit() {
    if (!text.trim()) return
    onSubmit?.(text.trim())
    setText('')
    setFocused(false)
    inputRef.current?.blur()
  }

  // Virtual keyboard handlers
  function handleChar(ch: string) { setText(p => p + ch) }
  function handleBackspace() { setText(p => p.slice(0, -1)) }
  function handleSpace() { setText(p => p + ' ') }
  function handleReturn() { handleSubmit() }

  return (
    <div ref={composerRef} className="shrink-0 flex flex-col">
      {/* Composer bar */}
      <div
        className="bg-base-000 px-space-5 pt-[11px] pb-space-4 flex flex-col gap-[14px]"
        style={{
          borderTop: '1px solid #F5F5F4',
          boxShadow: focused ? '0px 1px 13px 0px rgba(0,0,0,0.20)' : undefined,
        }}
      >
        {/* Replying-to banner */}
        {replyingTo && (
          <div className="flex items-center justify-between bg-base-200 rounded-[6px] px-[12px] py-[6px]">
            <span className="text-body-sm text-base-700">
              Replying to <span className="font-semibold text-base-900">{replyingTo}</span>
            </span>
            <button type="button" onClick={onCancelReply} aria-label="Cancel reply"
              className="text-base-500 hover:text-base-900 transition-colors ml-[8px] shrink-0">
              <HugeiconsIcon icon={Cancel01Icon} size={12} color="currentColor" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Row 1: Avatar + Input */}
        <div className="flex items-center gap-[8px]">
          <Avatar size={32} name={currentUser?.name ?? 'You'} src={currentUser?.avatarSrc} />
          <div
            className="flex-1 h-[36px] flex items-center px-[12px] rounded-[6px] cursor-text"
            style={{
              border: focused
                ? '1px solid #1D4ED8'
                : '1px solid rgba(231,229,228,0.6)',
              background: '#fff',
            }}
            onClick={() => { setFocused(true); inputRef.current?.focus() }}
          >
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder="Add your comment here..."
              aria-label="Comment input"
              className="flex-1 text-body-md text-base-900 placeholder:text-base-500 bg-transparent outline-none"
              readOnly={focused} // virtual keyboard handles typing
            />
          </div>
        </div>

        {/* Row 2: Toolbar + Comment button (visible when focused) */}
        {focused && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[14px]">
              <button type="button" onMouseDown={e => e.preventDefault()} aria-label="Emoji">
                <EmojiFaceIcon />
              </button>
              <button type="button" onMouseDown={e => e.preventDefault()} aria-label="Image">
                <ImageAddIcon />
              </button>
              <button type="button" onMouseDown={e => e.preventDefault()} aria-label="GIF">
                <GifIcon />
              </button>
              <button type="button" onMouseDown={e => e.preventDefault()} aria-label="Mention">
                <AtIcon />
              </button>
              <button type="button" onMouseDown={e => e.preventDefault()} aria-label="Attach">
                <AttachIcon />
              </button>
            </div>
            <Button
              size="sm"
              variant="primary"
              disabled={!text.trim()}
              onMouseDown={e => e.preventDefault()}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </div>
        )}
      </div>

      {/* iOS Keyboard — slides up from bottom */}
      {focused && (
        <div
          style={{
            transform: keyboardReady ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <IosKeyboard
            onChar={handleChar}
            onBackspace={handleBackspace}
            onReturn={handleReturn}
            onSpace={handleSpace}
          />
        </div>
      )}
    </div>
  )
}

// ── CommentsDrawer ────────────────────────────────────────────────────────────

export function CommentsDrawer({
  comments = [],
  currentUser,
  onDismiss,
  onLike,
  onReply,
  onSubmitComment,
  onLoadMoreReplies,
  className = '',
}: CommentsDrawerProps) {
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; name: string } | null>(null)

  function handleReply(commentId: string, authorName: string) {
    setReplyingTo({ commentId, name: authorName })
    onReply?.(commentId)
  }

  function handleSubmit(text: string) {
    onSubmitComment?.(text)
    setReplyingTo(null)
  }

  return (
    <div
      className={`bg-base-000 rounded-t-xl w-full font-sans flex flex-col shadow-[0px_-4px_8px_0px_rgba(104,108,157,0.16)] overflow-hidden ${className}`}
    >
      {/* ── Drag handle ── */}
      <div className="flex justify-center pt-[12px] pb-[4px] shrink-0" aria-hidden="true">
        <div className="w-[50px] h-1 rounded-full bg-base-300" />
      </div>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-space-5 pt-space-3 pb-space-4 shrink-0">
        <h3 className="text-heading-h4 text-base-900">Comments</h3>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss comments"
            className="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center text-base-700 hover:bg-base-300 transition-colors"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={12} color="currentColor" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* ── Comment list (scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-space-5 flex flex-col gap-space-5 pb-space-3 min-h-0">
        {comments.length === 0 ? (
          <p className="text-body-sm text-base-500 py-space-5 text-center">
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map(comment => (
            <CommentRow
              key={comment.id}
              comment={comment}
              onLike={() => onLike?.(comment.id)}
              onReply={() => handleReply(comment.id, comment.author.name)}
              onLikeReply={replyId => onLike?.(comment.id, replyId)}
              onLoadMoreReplies={() => onLoadMoreReplies?.(comment.id)}
            />
          ))
        )}
      </div>

      {/* ── Composer + Keyboard ── */}
      <CommentComposer
        currentUser={currentUser}
        replyingTo={replyingTo?.name}
        onCancelReply={() => setReplyingTo(null)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export { CommentRow, ReplyRow, CommentComposer }
