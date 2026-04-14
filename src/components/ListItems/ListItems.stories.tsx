import type { Meta, StoryObj } from '@storybook/react'
import { fn, userEvent, within, expect } from '@storybook/test'
import { LeaderboardRow, CelebrationRow, FeedPost, SurveyCard } from './ListItems'

const meta: Meta<typeof LeaderboardRow> = {
  title: 'Components/ListItems',
  component: LeaderboardRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Four list-item components for the Compass feed and ranking surfaces.\n\n' +
          '- **LeaderboardRow** — h=50px: rank badge (gold/silver/bronze/gray glow) + avatar + name/dept + score pill\n' +
          '- **CelebrationRow** — h=69px: avatar + name + event tag + "Wish" CTA\n' +
          '- **FeedPost** — auto-height: avatar + author + channel + body (2-line clamp) + timestamp\n' +
          '- **SurveyCard** — h=auto w=244px: icon + title + author · date meta',
      },
    },
  },
  argTypes: {
    rank: {
      description: 'Rank number. 1 = gold glow, 2 = silver, 3 = bronze, 4+ = gray.',
      control: { type: 'number', min: 1, max: 20 },
      table: { category: 'Content', defaultValue: { summary: '1' } },
    },
    name: {
      description: 'Full name of the ranked user.',
      control: 'text',
      table: { category: 'Content' },
    },
    department: {
      description: 'Department or team label shown below the name.',
      control: 'text',
      table: { category: 'Content' },
    },
    score: {
      description: 'Points score formatted with thousand separators.',
      control: { type: 'number', min: 0, step: 50 },
      table: { category: 'Content' },
    },
    isSelf: {
      description: 'Highlights the row with a blue tint to indicate the current user.',
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    avatarSrc: {
      description: 'Optional avatar photo URL.',
      control: 'text',
      table: { category: 'Content' },
    },
  },
  args: {
    name: 'Ethana Smith',
    department: 'Sales',
    score: 1200,
  },
}
export default meta

// ── LeaderboardRow ────────────────────────────────────────────────────────────

export const LeaderboardRowPlayground: StoryObj<typeof LeaderboardRow> = {
  name: '⚙️ LeaderboardRow — Playground',
  render: (args) => (
    <div className="w-[343px] rounded-md overflow-hidden border border-base-300">
      <LeaderboardRow {...args} />
    </div>
  ),
  args: { rank: 1 },
  parameters: {
    docs: {
      description: {
        story: 'Change **rank** to see the glow colour update (1=gold, 2=silver, 3=bronze, 4+=gray). Toggle **isSelf** to highlight the row.',
      },
    },
  },
}

export const LeaderboardRankColors: StoryObj = {
  name: 'LeaderboardRow — Rank colors',
  render: () => (
    <div className="w-[343px] divide-y divide-base-200 rounded-md overflow-hidden border border-base-300">
      <LeaderboardRow rank={1} name="Ethana Smith"   department="Sales"              score={1200} />
      <LeaderboardRow rank={2} name="Ann Bergson"    department="Marketing"          score={890}  />
      <LeaderboardRow rank={3} name="Jocelyn Geidt"  department="Product Management" score={760}  />
      <LeaderboardRow rank={4} name="Marcus Chen"    department="Engineering"        score={710}  />
      <LeaderboardRow rank={5} name="Priya Patel"    department="Design"             score={680}  isSelf />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Rank 5 has `isSelf=true` — the row background turns `primary-000` blue tint.',
      },
    },
  },
}

export const LeaderboardAllRanks: StoryObj = {
  name: 'LeaderboardRow — All Variants',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-space-6 font-sans">
      {([1, 2, 3, 5] as const).map((rank) => (
        <div key={rank}>
          <p className="text-label-sm text-base-500 uppercase mb-space-2">
            Rank {rank}{rank === 1 ? ' — Gold' : rank === 2 ? ' — Silver' : rank === 3 ? ' — Bronze' : ' — Default'}
          </p>
          <div className="w-[343px] rounded-md overflow-hidden border border-base-300">
            <LeaderboardRow rank={rank} name="Sample User" department="Sales" score={1200 - rank * 100} />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ── CelebrationRow ────────────────────────────────────────────────────────────

export const CelebrationRowPlayground: StoryObj<typeof CelebrationRow> = {
  name: '⚙️ CelebrationRow — Playground',
  render: (args) => (
    <div className="w-[343px] rounded-md overflow-hidden border border-base-300">
      <CelebrationRow {...args} />
    </div>
  ),
  argTypes: {
    name: {
      description: 'Full name of the person being celebrated.',
      control: 'text',
      table: { category: 'Content' },
    },
    eventLabel: {
      description: 'Celebration label shown in the tag (e.g. "🎉 5 Years Work Anniversary").',
      control: 'text',
      table: { category: 'Content' },
    },
    avatarSrc: {
      description: 'Optional avatar photo URL.',
      control: 'text',
      table: { category: 'Content' },
    },
    onWish: {
      description: 'Renders the "Wish 🎉" button and fires this callback on click.',
      table: { category: 'Actions' },
    },
  },
  args: {
    name: 'Joan Westenberg',
    eventLabel: '🎉 5 Years Work Anniversary',
    onWish: fn(),
  },
  parameters: {
    docs: { description: { story: 'Click "Wish 🎉" to fire the `onWish` action.' } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: /wish/i }))
    await expect(args.onWish).toHaveBeenCalledOnce()
  },
}

export const CelebrationRowList: StoryObj = {
  name: 'CelebrationRow — List',
  render: () => (
    <div className="w-[343px] divide-y divide-base-200 rounded-md overflow-hidden border border-base-300">
      <CelebrationRow name="Joan Westenberg" eventLabel="🎉 5 Years Work Anniversary" onWish={fn()} />
      <CelebrationRow name="Sarah Johnson"   eventLabel="🎂 Birthday Today!"           onWish={fn()} />
      <CelebrationRow name="Marcus Chen"     eventLabel="👋 New Joiner — Welcome!"     onWish={fn()} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const wishButtons = canvas.getAllByRole('button', { name: /wish/i })
    await expect(wishButtons).toHaveLength(3)
    await userEvent.click(wishButtons[0])
  },
}

// ── FeedPost ──────────────────────────────────────────────────────────────────

export const FeedPostPlayground: StoryObj<typeof FeedPost> = {
  name: '⚙️ FeedPost — Playground',
  render: (args) => (
    <div className="w-[343px] rounded-md overflow-hidden border border-base-300">
      <FeedPost {...args} />
    </div>
  ),
  argTypes: {
    authorName: {
      description: 'Display name of the post author.',
      control: 'text',
      table: { category: 'Content' },
    },
    postedOn: {
      description: 'Channel or group context (e.g. "posted on Townhall").',
      control: 'text',
      table: { category: 'Content' },
    },
    body: {
      description: 'Post body text. Truncates at 2 lines.',
      control: 'text',
      table: { category: 'Content' },
    },
    timestamp: {
      description: 'Relative timestamp shown below the body (e.g. "2h ago").',
      control: 'text',
      table: { category: 'Content' },
    },
    avatarSrc: {
      description: 'Optional author avatar photo URL.',
      control: 'text',
      table: { category: 'Content' },
    },
  },
  args: {
    authorName: 'Mellane Joe',
    postedOn: 'posted on Xoxoday Townhall',
    body: 'Thank you for displaying the value of teamwork. Great #teamwork keeps us moving forward together!',
    timestamp: '2h ago',
  },
  parameters: {
    docs: { description: { story: 'Edit **body** to test the 2-line clamp. Remove **postedOn** or **timestamp** to see the component adapt.' } },
  },
}

export const FeedPostList: StoryObj = {
  name: 'FeedPost — List',
  render: () => (
    <div className="w-[343px] divide-y divide-base-200 rounded-md overflow-hidden border border-base-300">
      <FeedPost
        authorName="Mellane Joe"
        postedOn="posted on Xoxoday Townhall"
        body="Thank you for displaying the value of teamwork. Great #teamwork keeps us moving forward together!"
        timestamp="2h ago"
      />
      <FeedPost
        authorName="Alex Rivera"
        postedOn="posted on Product Team"
        body="Congrats to @Priya Patel for crushing the Q3 target 🎯 Incredible work ethic and dedication."
        timestamp="5h ago"
      />
    </div>
  ),
}

// ── SurveyCard ────────────────────────────────────────────────────────────────

export const SurveyCardPlayground: StoryObj<typeof SurveyCard> = {
  name: '⚙️ SurveyCard — Playground',
  render: (args) => (
    <SurveyCard {...args} className="w-[244px]" />
  ),
  argTypes: {
    title: {
      description: 'Survey title. Clamps at 2 lines.',
      control: 'text',
      table: { category: 'Content' },
    },
    author: {
      description: 'Name of the survey creator.',
      control: 'text',
      table: { category: 'Content' },
    },
    date: {
      description: 'Due date or publish date of the survey.',
      control: 'text',
      table: { category: 'Content' },
    },
    onClick: {
      description: 'Fired when the card is clicked.',
      table: { category: 'Actions' },
    },
  },
  args: {
    title: 'Vendor Satisfaction Survey',
    author: 'Sophia Maximus',
    date: 'Dec 28, 2024',
    onClick: fn(),
  },
  parameters: {
    docs: { description: { story: 'Click the card to see `onClick` fire. Try a long title to see the 2-line clamp.' } },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const SurveyCardGrid: StoryObj = {
  name: 'SurveyCard — Grid',
  render: () => (
    <div className="flex flex-wrap gap-space-4">
      <SurveyCard title="Vendor Satisfaction Survey"        author="Sophia Maximus" date="Dec 28, 2024" className="w-[244px]" onClick={fn()} />
      <SurveyCard title="Q1 Employee Engagement Pulse"      author="HR Team"        date="Jan 10, 2025" className="w-[244px]" onClick={fn()} />
      <SurveyCard title="Annual Benefits Feedback"          author="People Ops"     date="Feb 3, 2025"  className="w-[244px]" onClick={fn()} />
    </div>
  ),
}

// ── All List Items ────────────────────────────────────────────────────────────

export const AllListItems: StoryObj = {
  name: 'All List Items',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-space-8 font-sans p-space-5 bg-base-100 min-h-screen">
      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Leaderboard</p>
        <div className="divide-y divide-base-200 rounded-md overflow-hidden border border-base-300 bg-base-000">
          <LeaderboardRow rank={1} name="Ethana Smith"  department="Sales"     score={1200} />
          <LeaderboardRow rank={2} name="Ann Bergson"   department="Marketing" score={890}  />
          <LeaderboardRow rank={3} name="Jocelyn Geidt" department="Product"   score={760}  />
          <LeaderboardRow rank={5} name="Priya Patel"   department="Design"    score={680}  isSelf />
        </div>
      </section>

      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Celebrations</p>
        <div className="divide-y divide-base-200 rounded-md overflow-hidden border border-base-300 bg-base-000">
          <CelebrationRow name="Joan Westenberg" eventLabel="🎉 5 Years Work Anniversary" onWish={fn()} />
          <CelebrationRow name="Sarah Johnson"   eventLabel="🎂 Birthday Today!"           onWish={fn()} />
        </div>
      </section>

      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Feed</p>
        <div className="divide-y divide-base-200 rounded-md overflow-hidden border border-base-300 bg-base-000">
          <FeedPost authorName="Mellane Joe" postedOn="posted on Townhall" body="Thank you for displaying the value of teamwork. Great #teamwork keeps us moving forward!" timestamp="2h ago" />
          <FeedPost authorName="Alex Rivera"  postedOn="posted on Product Team" body="Congrats to @Priya Patel for crushing the Q3 target 🎯" timestamp="5h ago" />
        </div>
      </section>

      <section>
        <p className="text-label-sm text-base-500 uppercase tracking-wider mb-space-3">Surveys</p>
        <div className="flex gap-space-4 flex-wrap">
          <SurveyCard title="Vendor Satisfaction Survey"  author="Sophia Maximus" date="Dec 28, 2024" className="w-[244px]" onClick={fn()} />
          <SurveyCard title="Q1 Employee Engagement Pulse" author="HR Team"       date="Jan 10, 2025" className="w-[244px]" onClick={fn()} />
        </div>
      </section>
    </div>
  ),
}
