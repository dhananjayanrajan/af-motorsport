import React from 'react'
import Link from 'next/link'
import type {
  StatsBarConfig,
  RecentActivityFeedConfig,
  TypeBreakdownChartConfig,
  CompletionScoreConfig,
  ToggleDistributionConfig,
  RelationshipDensityConfig,
  TopTagsCategoriesConfig,
  PublishingPipelineConfig,
  SlugHealthConfig,
  TimelineConfig,
  SlugHealthResult,
} from './widgetTypes'
import {
  formatRecordName,
  formatTypeName,
  calculateCompletionScore,
  scanRelationFields,
  getPipelineStage,
  scoreColor,
  groupByMonth,
  countArrayItems,
} from './widgetUtils'
import { getWidgetCache, setWidgetCache, buildCacheKey } from './widgetCache'

// ─── Design tokens – using Payload's native CSS variables ───────────────────
const C = {
  bg: 'var(--theme-elevation-0)',
  surface: 'var(--theme-elevation-50)',
  border: 'var(--theme-elevation-150)',
  line: 'var(--theme-elevation-100)',
  muted: 'var(--theme-elevation-300)',
  subtle: 'var(--theme-elevation-400)',
  mid: 'var(--theme-elevation-500)',
  text: 'var(--theme-elevation-800)',
  strong: 'var(--theme-elevation-900)',
  success: 'var(--theme-success-500)',
  error: 'var(--theme-error-500)',
  warn: 'var(--theme-warning-500)',
  // accent colours – derived from theme for consistency
  accent1: 'var(--theme-success-500)',
  accent2: 'var(--theme-warning-500)',
  accent3: 'var(--theme-error-500)',
  accent4: 'var(--theme-elevation-600)',
  accent5: 'var(--theme-elevation-700)',
  accent6: 'var(--theme-elevation-800)',
}
const ACCENT = [C.accent1, C.accent2, C.accent3, C.accent4, C.accent5, C.accent6]

const DEFAULT_LIMIT = 1000

// ─── Primitives – Payload‑style cards ────────────────────────────────────────
const card = (s?: React.CSSProperties): React.CSSProperties => ({
  background: C.bg,
  padding: 12,
  height: '100%',
  boxSizing: 'border-box',
  ...s,
})

const cell = (s?: React.CSSProperties): React.CSSProperties => ({
  background: C.surface,
  border: `2px solid ${C.line}`,
  borderRadius: 2,
  padding: 12,
  boxSizing: 'border-box',
  ...s,
})

const CAP: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  color: C.subtle,
}

const HERO: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 700,
  lineHeight: 1.2,
  color: C.strong,
}

const BIG: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.2,
  color: C.strong,
}

const MID: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.2,
  color: C.strong,
}

// ─── Additional shared styles ────────────────────────────────────────────────
const TRUNCATE: React.CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

const FLEX_BETWEEN: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 4,
}

const LEGEND_ITEM: React.CSSProperties = {
  display: 'flex',
  gap: 4,
  alignItems: 'center',
}

const LEGEND_DOT: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 1,
}

const PROPORTIONAL_BAR: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  height: 8,
  borderRadius: 2,
  overflow: 'hidden',
  gap: 1,
  marginBottom: 16,
}

const RING_WRAPPER: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const RING_CENTER: React.CSSProperties = {
  position: 'absolute',
  textAlign: 'center',
}

const BROWSE_LINK: React.CSSProperties = {
  fontSize: 12,
  color: C.accent1,
  fontWeight: 500,
  textDecoration: 'none',
}

const daysSince = (s: string) => Math.floor((Date.now() - new Date(s).getTime()) / 86400000)
const ageCol = (d: number) => (d <= 7 ? C.success : d <= 30 ? C.warn : C.error)

function Empty({ message = 'No data yet.' }: { message?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        fontSize: 13,
        color: C.subtle,
        fontStyle: 'italic',
      }}
    >
      {message}
    </div>
  )
}

function Bar({ pct, color, h = 4 }: { pct: number; color?: string; h?: number }) {
  return (
    <div style={{ width: '100%', height: h, background: C.line, borderRadius: 2, overflow: 'hidden' }}>
      <div
        style={{
          width: `${Math.min(Math.max(pct, 0), 100)}%`,
          height: '100%',
          background: color ?? C.text,
          borderRadius: 2,
        }}
      />
    </div>
  )
}

function Pill({ label, color, bg }: { label: string; color?: string; bg?: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 2,
        background: bg ?? C.line,
        color: color ?? C.mid,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}

function Ring({ pct, size, stroke, color }: { pct: number; size: number; stroke: number; color: string }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.line} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sparkline({ vals, color, w = 80, h = 32 }: { vals: number[]; color: string; w?: number; h?: number }) {
  if (vals.length < 2) return null
  const max = Math.max(...vals, 1)
  const step = w / (vals.length - 1)
  const pts = vals.map((v, i) => `${i * step},${h - (v / max) * (h - 4)}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── StatsBar — span 2 ────────────────────────────────────────────────────────
export async function renderStatsBar(config: StatsBarConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'StatsBar')
  type D = {
    total: number
    pub: number
    unpub: number
    featured: number
    pinned: number
    thisMonth: number
    lastMonth: number
    trend: number[]
  }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({
      collection: config.collectionSlug,
      depth: 0,
      limit: DEFAULT_LIMIT,
      select: { visibility: true, createdAt: true },
    })
    const docs = res.docs as any[]
    const now = new Date()
    const thisS = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    const lastS = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
    const pub = docs.filter((x) => x.visibility?.check_publish).length
    d = {
      total: docs.length,
      pub,
      unpub: docs.length - pub,
      featured: docs.filter((x) => x.visibility?.check_featured).length,
      pinned: docs.filter((x) => x.visibility?.check_pinned).length,
      thisMonth: docs.filter((x) => new Date(x.createdAt).getTime() >= thisS).length,
      lastMonth: docs.filter((x) => {
        const t = new Date(x.createdAt).getTime()
        return t >= lastS && t < thisS
      }).length,
      trend: Array.from({ length: 6 }, (_, i) => {
        const s = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1).getTime()
        const e = new Date(now.getFullYear(), now.getMonth() - (4 - i), 1).getTime()
        return docs.filter((x) => {
          const t = new Date(x.createdAt).getTime()
          return t >= s && t < e
        }).length
      }),
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const pubPct = d.total > 0 ? Math.round((d.pub / d.total) * 100) : 0
  const delta = d.thisMonth - d.lastMonth

  if (d.total === 0) {
    return (
      <div style={card()}>
        {config.title && <div style={{ ...CAP, marginBottom: 12 }}>{config.title}</div>}
        <Empty message="No records in this collection yet." />
      </div>
    )
  }

  return (
    <div style={card()}>
      {config.title && <div style={{ ...CAP, marginBottom: 16 }}>{config.title}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {/* Zone A: hero total + trend sparkline */}
        <div className='p-16' style={cell({ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 12 })}>
          <div>
            <div style={CAP}>Total</div>
            <div style={{ ...HERO, marginTop: 4 }}>{d.total}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: delta >= 0 ? C.success : C.error, marginBottom: 6 }}>
              {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)} this month
            </div>
            <Sparkline vals={d.trend} color={C.accent1} w={120} h={120} />
          </div>
          <Link
            href={`/admin/collections/${config.collectionSlug}`}
            style={{ ...BROWSE_LINK, display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            Browse all →
          </Link>
        </div>

        {/* Zone B: 2×2 sub‑stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(
            [
              { label: 'Published', n: d.pub, color: C.success },
              { label: 'Unpublished', n: d.unpub, color: C.muted },
              { label: 'Featured', n: d.featured, color: C.warn },
              { label: 'Pinned', n: d.pinned, color: C.accent4 },
            ] as const
          ).map(({ label, n, color }) => (
            <div key={label} style={cell({ display: 'flex', flexDirection: 'column', gap: 4 })}>
              <div style={CAP}>{label}</div>
              <div style={{ ...BIG, color, marginTop: 2 }}>{n}</div>
              <Bar pct={d.total > 0 ? Math.round((n / d.total) * 100) : 0} color={color} h={3} />
              <div style={{ fontSize: 11, color: C.subtle }}>{d.total > 0 ? Math.round((n / d.total) * 100) : 0}%</div>
            </div>
          ))}
        </div>

        {/* Zone C: publish‑rate ring */}
        <div style={cell({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 })}>
          <div style={CAP}>Publish Rate</div>
          <div style={RING_WRAPPER}>
            <Ring pct={pubPct} size={100} stroke={10} color={scoreColor(pubPct)} />
            <div style={RING_CENTER}>
              <div style={{ ...MID, color: scoreColor(pubPct) }}>{pubPct}%</div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: C.subtle }}>
              {d.pub} of {d.total}
            </div>
            <div style={{ fontSize: 12, color: C.subtle }}>records live</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── RecentActivityFeed — span 1 ─────────────────────────────────────────────
export async function renderRecentActivityFeed(config: RecentActivityFeedConfig, payload: any): Promise<React.ReactNode> {
  const limit = config.limit ?? 10
  const cacheKey = buildCacheKey(config.collectionSlug, 'RecentActivityFeed', { limit })
  type Item = { id: any; name: string; type: string; daysAgo: number; published: boolean; completion: number }

  let items = await getWidgetCache<Item[]>(cacheKey)
  if (!items) {
    const res = await payload.find({
      collection: config.collectionSlug,
      depth: 0,
      limit,
      sort: '-updatedAt',
    })
    items = (res.docs as any[]).map((d) => ({
      id: d.id,
      name: formatRecordName(d),
      type: formatTypeName(d.type),
      daysAgo: daysSince(d.updatedAt),
      published: !!d.visibility?.check_publish,
      completion: calculateCompletionScore(d, ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts']),
    }))
    await setWidgetCache(cacheKey, items, config.cacheTTL ?? 60)
  }

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 260 })}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={CAP}>{config.title ?? 'Recent Activity'}</div>
        <Link href={`/admin/collections/${config.collectionSlug}`} style={BROWSE_LINK}>
          All →
        </Link>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', maxHeight: 320 }}>
        {items.length === 0 ? (
          <Empty message="No recent activity." />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {items.map((item, i) => (
              <Link key={item.id} href={`/admin/collections/${config.collectionSlug}/${item.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 6px',
                    borderRadius: 2,
                    transition: 'background 0.1s ease',
                    background: 'transparent',
                  }}
                >
                  {/* Avatar with status color */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: item.published ? `linear-gradient(145deg, ${C.success}40, ${C.success}20)` : C.line,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      color: item.published ? C.success : C.mid,
                    }}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: C.text,
                          ...TRUNCATE,
                        }}
                      >
                        {item.name}
                      </span>
                      {item.published ? (
                        <Pill label="Published" color="white" bg={C.success} />
                      ) : (
                        <Pill label="Draft" color={C.mid} />
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: C.subtle }}>{item.type}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: ageCol(item.daysAgo) }}>
                        {item.daysAgo === 0 ? 'Today' : item.daysAgo === 1 ? '1d ago' : `${item.daysAgo}d ago`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Bar pct={item.completion} color={scoreColor(item.completion)} h={4} />
                      <span style={{ fontSize: 10, fontWeight: 600, color: scoreColor(item.completion), flexShrink: 0 }}>
                        {item.completion}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── TypeBreakdownChart — span 1 ─────────────────────────────────────────────
export async function renderTypeBreakdownChart(config: TypeBreakdownChartConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'TypeBreakdownChart')
  type Row = { name: string; total: number; pub: number; pubPct: number }
  type D = { rows: Row[]; total: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({
      collection: config.collectionSlug,
      depth: 1,
      limit: DEFAULT_LIMIT,
      select: { type: true, visibility: true },
    })
    const map = new Map<string, { t: number; p: number }>()
      ; (res.docs as any[]).forEach((doc) => {
        const key = formatTypeName(doc.type)
        const prev = map.get(key) ?? { t: 0, p: 0 }
        map.set(key, { t: prev.t + 1, p: prev.p + (doc.visibility?.check_publish ? 1 : 0) })
      })
    const rows: Row[] = Array.from(map.entries())
      .map(([name, v]) => ({ name, total: v.t, pub: v.p, pubPct: v.t > 0 ? Math.round((v.p / v.t) * 100) : 0 }))
      .sort((a, b) => b.total - a.total)
    d = { rows, total: res.docs.length }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const nonEmpty = d.rows.filter((r) => r.total > 0)
  const best = nonEmpty.length > 0 ? [...nonEmpty].sort((a, b) => b.pubPct - a.pubPct)[0] : null
  const worst = nonEmpty.length > 1 ? [...nonEmpty].sort((a, b) => a.pubPct - b.pubPct)[0] : null
  const maxT = d.rows[0]?.total ?? 1

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 260 })}>
      <div style={{ ...CAP, marginBottom: 12 }}>{config.title ?? 'Type Breakdown'}</div>

      {d.rows.length === 0 ? (
        <Empty />
      ) : (
        <>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 280 }}>
            {d.rows.map((row) => (
              <div key={row.name} style={{ marginBottom: 10 }}>
                <div style={FLEX_BETWEEN}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{row.name}</span>
                  <span style={{ fontSize: 12, color: C.subtle }}>{row.total}</span>
                </div>
                <div
                  style={{
                    width: `${Math.round((row.total / maxT) * 100)}%`,
                    height: 8,
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    background: C.muted,
                  }}
                >
                  <div style={{ width: `${row.pubPct}%`, background: C.success }} />
                </div>
                <div style={{ fontSize: 10, color: scoreColor(row.pubPct), marginTop: 2, fontWeight: 500 }}>
                  {row.pubPct}% published
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            {[
              { color: C.success, label: 'Published' },
              { color: C.muted, label: 'Draft' },
            ].map(({ color, label }) => (
              <div key={label} style={LEGEND_ITEM}>
                <div style={{ ...LEGEND_DOT, background: color }} />
                <span style={{ fontSize: 10, color: C.subtle }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            {best && (
              <div style={cell({ borderLeft: `2px solid ${C.success}`, padding: '8px 10px' })}>
                <div style={{ ...CAP, color: C.success, marginBottom: 2 }}>Best</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{best.name}</div>
                <div style={{ ...MID, color: C.success, marginTop: 2 }}>{best.pubPct}%</div>
              </div>
            )}
            {worst && worst.name !== best?.name && (
              <div style={cell({ borderLeft: `2px solid ${C.error}`, padding: '8px 10px' })}>
                <div style={{ ...CAP, color: C.error, marginBottom: 2 }}>Needs Work</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{worst.name}</div>
                <div style={{ ...MID, color: C.error, marginTop: 2 }}>{worst.pubPct}%</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ─── CompletionScore — span 2 ─────────────────────────────────────────────────
export async function renderCompletionScore(config: CompletionScoreConfig, payload: any): Promise<React.ReactNode> {
  const sections = config.sections ?? ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts']
  const cacheKey = buildCacheKey(config.collectionSlug, 'CompletionScore', { s: sections.join(',') })
  type Item = { id: any; name: string; score: number }
  type Band = { label: string; count: number; pct: number; color: string }
  type D = { worst: Item[]; best: Item[]; avg: number; bands: Band[]; total: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const all: Item[] = (res.docs as any[])
      .map((doc) => ({ id: doc.id, name: formatRecordName(doc), score: calculateCompletionScore(doc, sections) }))
      .sort((a, b) => a.score - b.score)
    const avg = all.length > 0 ? Math.round(all.reduce((s, r) => s + r.score, 0) / all.length) : 0
    d = {
      total: all.length,
      avg,
      worst: all.slice(0, 5),
      best: all.slice(-5).reverse(),
      bands: (
        [
          { label: '0–25', count: all.filter((r) => r.score <= 25).length, color: C.error },
          { label: '26–50', count: all.filter((r) => r.score > 25 && r.score <= 50).length, color: C.warn },
          { label: '51–75', count: all.filter((r) => r.score > 50 && r.score <= 75).length, color: C.accent1 },
          { label: '76–100', count: all.filter((r) => r.score > 75).length, color: C.success },
        ] as Omit<Band, 'pct'>[]
      ).map((b) => ({ ...b, pct: all.length > 0 ? Math.round((b.count / all.length) * 100) : 0 })),
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const maxBand = Math.max(...d.bands.map((b) => b.count), 1)

  const ScoreRow = ({ item }: { item: Item }) => (
    <Link
      href={`/admin/collections/${config.collectionSlug}/${item.id}`}
      style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}
    >
      <div style={FLEX_BETWEEN}>
        <span
          style={{
            fontSize: 13,
            color: C.text,
            ...TRUNCATE,
            maxWidth: '70%',
          }}
        >
          {item.name}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: scoreColor(item.score) }}>{item.score}%</span>
      </div>
      <Bar pct={item.score} color={scoreColor(item.score)} h={4} />
    </Link>
  )

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 300 })}>
      <div style={{ ...CAP, marginBottom: 16 }}>{config.title ?? 'Profile Completion'}</div>

      {d.total === 0 ? (
        <Empty />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr 1fr',
            gap: 16,
            alignItems: 'stretch',
            flex: 1,
          }}
        >
          {/* Left: ring + histogram */}
          <div
            style={cell({
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              padding: '20px 16px',
            })}
          >
            <div>
              <div style={{ ...CAP, textAlign: 'center', marginBottom: 8 }}>Average Score</div>
              <div style={RING_WRAPPER}>
                <Ring pct={d.avg} size={100} stroke={10} color={scoreColor(d.avg)} />
                <div style={RING_CENTER}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: scoreColor(d.avg) }}>{d.avg}%</div>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: C.subtle }}>
                {d.total} records
              </div>
            </div>

            <div>
              <div style={{ ...CAP, marginBottom: 10 }}>Distribution</div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
                {d.bands.map((b) => (
                  <div
                    key={b.label}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 600, color: b.color }}>{b.count}</span>
                    <div
                      style={{
                        width: '100%',
                        background: b.color,
                        borderRadius: '2px 2px 0 0',
                        opacity: 0.9,
                        height: `${Math.max(Math.round((b.count / maxBand) * 40), 4)}px`,
                      }}
                    />
                    <span style={{ fontSize: 9, color: C.subtle, whiteSpace: 'nowrap' }}>{b.label}</span>
                    <span style={{ fontSize: 9, color: C.mid, whiteSpace: 'nowrap' }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: worst */}
          <div style={cell({ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' })}>
            <div style={{ ...CAP, color: C.error, marginBottom: 12, fontSize: 12 }}>↓ Needs Attention</div>
            <div style={{ overflowY: 'auto', maxHeight: 280, paddingRight: 4 }}>
              {d.worst.length === 0 ? (
                <div style={{ fontSize: 13, color: C.subtle, padding: '8px 0' }}>All records complete.</div>
              ) : (
                d.worst.map((item) => <ScoreRow key={item.id} item={item} />)
              )}
            </div>
          </div>

          {/* Right: best */}
          <div style={cell({ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' })}>
            <div style={{ ...CAP, color: C.success, marginBottom: 12, fontSize: 12 }}>↑ Best Completed</div>
            <div style={{ overflowY: 'auto', maxHeight: 280, paddingRight: 4 }}>
              {d.best.length === 0 ? (
                <div style={{ fontSize: 13, color: C.subtle, padding: '8px 0' }}>No data yet.</div>
              ) : (
                d.best.map((item) => <ScoreRow key={item.id} item={item} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── ToggleDistribution — span 1 ─────────────────────────────────────────────
export async function renderToggleDistribution(config: ToggleDistributionConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'ToggleDistribution')
  type Row = { value: string; count: number; pct: number; avgC: number }
  type D = { rows: Row[]; total: number; uncat: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const docs = res.docs as any[]
    const map = new Map<string, { n: number; c: number }>()
    let uncat = 0
    docs.forEach((doc) => {
      const v = doc.toggle
      if (!v) {
        uncat++
        return
      }
      const k = String(v)
      const p = map.get(k) ?? { n: 0, c: 0 }
      map.set(k, { n: p.n + 1, c: p.c + calculateCompletionScore(doc, ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts']) })
    })
    const rows: Row[] = Array.from(map.entries())
      .map(([value, v]) => ({
        value,
        count: v.n,
        pct: docs.length > 0 ? Math.round((v.n / docs.length) * 100) : 0,
        avgC: v.n > 0 ? Math.round(v.c / v.n) : 0,
      }))
      .sort((a, b) => b.count - a.count)
    d = { rows, total: docs.length, uncat }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 260 })}>
      <div style={{ ...CAP, marginBottom: 12 }}>{config.title ?? 'Mode Distribution'}</div>

      {d.rows.length === 0 ? (
        <Empty message="No toggle data found." />
      ) : (
        <>
          {/* Proportional budget bar */}
          <div style={PROPORTIONAL_BAR}>
            {d.rows.map((r, i) => (
              <div
                key={r.value}
                title={`${r.value}: ${r.pct}%`}
                style={{ width: `${r.pct}%`, background: ACCENT[i % ACCENT.length] }}
              />
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 280 }}>
            {d.rows.map((r, i) => (
              <div
                key={r.value}
                style={cell({
                  borderLeft: `2px solid ${ACCENT[i % ACCENT.length]}`,
                  padding: '10px 12px',
                  marginBottom: 8,
                })}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text, textTransform: 'capitalize' }}>{r.value}</div>
                    <div style={{ fontSize: 11, color: C.subtle, marginTop: 1 }}>{r.pct}% of total</div>
                  </div>
                  <div style={{ ...BIG, color: ACCENT[i % ACCENT.length] }}>{r.count}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Bar pct={r.avgC} color={scoreColor(r.avgC)} h={4} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: scoreColor(r.avgC), flexShrink: 0 }}>{r.avgC}%</span>
                </div>
                <div style={{ fontSize: 10, color: C.subtle, marginTop: 2 }}>avg completion</div>
              </div>
            ))}
          </div>

          {d.uncat > 0 && (
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: C.subtle,
                padding: '6px 10px',
                background: C.surface,
                borderRadius: 2,
                border: `1px solid ${C.line}`,
              }}
            >
              {d.uncat} record{d.uncat > 1 ? 's' : ''} with no mode set
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─── RelationshipDensity — span 2 ────────────────────────────────────────────
export async function renderRelationshipDensity(config: RelationshipDensityConfig, payload: any): Promise<React.ReactNode> {
  const groups = config.relationGroups ?? ['details', 'traits', 'assets', 'contexts']
  const limit = config.limit ?? 6
  const cacheKey = buildCacheKey(config.collectionSlug, 'RelationshipDensity', { g: groups.join(',') })
  type Tile = { group: string; pct: number; filled: number; total: number }
  type DocRow = { id: any; name: string; score: number; breakdown: { group: string; pct: number }[] }
  type D = { tiles: Tile[]; worst: DocRow[] }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 1, limit: DEFAULT_LIMIT })
    const agg: Record<string, { f: number; t: number }> = {}
    groups.forEach((g) => {
      agg[g] = { f: 0, t: 0 }
    })
    const perDoc: DocRow[] = (res.docs as any[]).map((doc) => {
      let tf = 0,
        tt = 0
      const breakdown = groups.map((g) => {
        const s = scanRelationFields(doc[g])
        agg[g].f += s.filled
        agg[g].t += s.total
        tf += s.filled
        tt += s.total
        return { group: g, pct: s.total === 0 ? 0 : Math.round((s.filled / s.total) * 100) }
      })
      return { id: doc.id, name: formatRecordName(doc), score: tt === 0 ? 0 : Math.round((tf / tt) * 100), breakdown }
    })
    d = {
      tiles: groups.map((g) => ({
        group: g,
        filled: agg[g].f,
        total: agg[g].t,
        pct: agg[g].t === 0 ? 0 : Math.round((agg[g].f / agg[g].t) * 100),
      })),
      worst: perDoc.sort((a, b) => a.score - b.score).slice(0, limit),
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 })}>
      <div style={{ ...CAP, marginBottom: 12 }}>{config.title ?? 'Relationship Density'}</div>

      {/* Section heatmap */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${groups.length}, 1fr)`, gap: 8, marginBottom: 16 }}>
        {d.tiles.map((t, i) => (
          <div key={t.group} style={cell({ textAlign: 'center', borderTop: `2px solid ${ACCENT[i % ACCENT.length]}`, padding: '12px 8px' })}>
            <div style={{ fontSize: 20, fontWeight: 700, color: ACCENT[i % ACCENT.length], lineHeight: 1, marginBottom: 4 }}>{t.pct}%</div>
            <Bar pct={t.pct} color={ACCENT[i % ACCENT.length]} h={4} />
            <div style={{ ...CAP, marginTop: 6, textTransform: 'capitalize' }}>{t.group}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
              {t.filled}/{t.total}
            </div>
          </div>
        ))}
      </div>

      {/* Worst records */}
      <div style={{ ...CAP, marginBottom: 8 }}>Lowest density records</div>
      {d.worst.length === 0 ? (
        <Empty message="All records have full relationship density." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, overflowY: 'auto', maxHeight: 200 }}>
          {d.worst.map((doc) => (
            <Link key={doc.id} href={`/admin/collections/${config.collectionSlug}/${doc.id}`} style={{ textDecoration: 'none' }}>
              <div style={cell({ padding: '10px 12px' })}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: C.text,
                      ...TRUNCATE,
                      maxWidth: '70%',
                    }}
                  >
                    {doc.name}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: scoreColor(doc.score) }}>{doc.score}%</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${groups.length}, 1fr)`, gap: 2 }}>
                  {doc.breakdown.map((b, i) => (
                    <div
                      key={b.group}
                      title={`${b.group}: ${b.pct}%`}
                      style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
                    >
                      <Bar pct={b.pct} color={ACCENT[i % ACCENT.length]} h={3} />
                      <span style={{ fontSize: 8, color: C.muted, textTransform: 'capitalize' }}>{b.group.slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── TopTagsCategories — span 1 ──────────────────────────────────────────────
export async function renderTopTagsCategories(config: TopTagsCategoriesConfig, payload: any): Promise<React.ReactNode> {
  const tagLimit = config.tagLimit ?? 15,
    catLimit = config.categoryLimit ?? 15
  const cacheKey = buildCacheKey(config.collectionSlug, 'TopTagsCategories', { tagLimit, catLimit })
  type D = {
    tags: [string, number][]
    cats: [string, number][]
    tagCov: number
    catCov: number
    untagged: number
    uncat: number
    total: number
  }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const docs = res.docs as any[],
      total = docs.length
    const tagC = countArrayItems(docs, 'tags'),
      catC = countArrayItems(docs, 'categories')
    const untagged = docs.filter((x) => !x.tags?.length).length
    const uncat = docs.filter((x) => !x.categories?.length).length
    d = {
      tags: (Object.entries(tagC) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, tagLimit),
      cats: (Object.entries(catC) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, catLimit),
      tagCov: total > 0 ? Math.round(((total - untagged) / total) * 100) : 0,
      catCov: total > 0 ? Math.round(((total - uncat) / total) * 100) : 0,
      untagged,
      uncat,
      total,
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const Cloud = ({ items }: { items: [string, number][] }) => {
    const max = items[0]?.[1] ?? 1
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 8px', lineHeight: 1.5 }}>
        {items.length === 0 ? (
          <span style={{ fontSize: 12, color: C.subtle }}>None yet.</span>
        ) : (
          items.map(([name, count]) => (
            <span
              key={name}
              title={`${count} uses`}
              style={{
                fontSize: 11 + Math.round((count / max) * 6),
                fontWeight: count > max * 0.5 ? 600 : 400,
                color: count > max * 0.5 ? C.text : C.mid,
              }}
            >
              {name}
            </span>
          ))
        )}
      </div>
    )
  }

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 260 })}>
      <div style={{ ...CAP, marginBottom: 12 }}>{config.title ?? 'Tags & Categories'}</div>

      <div style={cell({ marginBottom: 8 })}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={CAP}>Tags</div>
          <div style={{ ...MID, color: C.accent1 }}>{d.tagCov}%</div>
        </div>
        <Bar pct={d.tagCov} color={C.accent1} h={5} />
        <div style={{ fontSize: 10, color: C.subtle, marginTop: 4, marginBottom: 8 }}>
          {d.untagged} of {d.total} untagged
        </div>
        <Cloud items={d.tags} />
      </div>

      <div style={cell()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={CAP}>Categories</div>
          <div style={{ ...MID, color: C.accent4 }}>{d.catCov}%</div>
        </div>
        <Bar pct={d.catCov} color={C.accent4} h={5} />
        <div style={{ fontSize: 10, color: C.subtle, marginTop: 4, marginBottom: 8 }}>
          {d.uncat} of {d.total} uncategorised
        </div>
        <Cloud items={d.cats} />
      </div>
    </div>
  )
}

// ─── PublishingPipeline — span 2 ─────────────────────────────────────────────
export async function renderPublishingPipeline(config: PublishingPipelineConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'PublishingPipeline')
  type PItem = { id: any; name: string; days: number; stale: boolean }
  type D = { stages: Record<string, PItem[]>; avgDays: number; staleCount: number; total: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const stages: Record<string, PItem[]> = { Draft: [], Published: [], Featured: [], Pinned: [] }
    let pubDays = 0,
      pubCount = 0
      ; (res.docs as any[]).forEach((doc) => {
        const stage = getPipelineStage(doc),
          days = daysSince(doc.updatedAt)
        stages[stage].push({ id: doc.id, name: formatRecordName(doc), days, stale: stage === 'Draft' && days > 30 })
        if (stage === 'Published') {
          pubDays += daysSince(doc.createdAt)
          pubCount++
        }
      })
    Object.values(stages).forEach((s) => s.sort((a, b) => b.days - a.days))
    const total = Object.values(stages).reduce((s, a) => s + a.length, 0)
    d = {
      stages,
      total,
      avgDays: pubCount > 0 ? Math.round(pubDays / pubCount) : 0,
      staleCount: stages.Draft.filter((i) => i.stale).length,
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const stageCol: Record<string, string> = {
    Draft: C.muted,
    Published: C.success,
    Featured: C.warn,
    Pinned: C.accent4,
  }

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 })}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={CAP}>{config.title ?? 'Publishing Pipeline'}</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {d.staleCount > 0 && <Pill label={`${d.staleCount} stale drafts`} color="white" bg={C.error} />}
          {d.avgDays > 0 && <span style={{ fontSize: 11, color: C.subtle }}>avg {d.avgDays}d to publish</span>}
        </div>
      </div>

      {/* Proportional flow bar */}
      <div style={PROPORTIONAL_BAR}>
        {Object.entries(d.stages).map(([stage, items]) => (
          <div
            key={stage}
            title={`${stage}: ${items.length}`}
            style={{
              width: `${d.total > 0 ? Math.round((items.length / d.total) * 100) : 25}%`,
              background: stageCol[stage],
            }}
          />
        ))}
      </div>

      {d.total === 0 ? (
        <Empty message="No records in this collection yet." />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, overflowY: 'auto', maxHeight: 240 }}>
          {Object.entries(d.stages).map(([stage, items]) => {
            const avgDays = items.length > 0 ? Math.round(items.reduce((s, i) => s + i.days, 0) / items.length) : 0
            return (
              <div key={stage} style={cell({ borderTop: `2px solid ${stageCol[stage]}`, display: 'flex', flexDirection: 'column' })}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: stageCol[stage], textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {stage}
                  </span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: C.strong }}>{items.length}</span>
                </div>
                <div style={{ fontSize: 10, color: C.subtle, marginBottom: 8 }}>avg {avgDays}d</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 160, overflowY: 'auto' }}>
                  {items.slice(0, 8).map((item) => (
                    <Link key={item.id} href={`/admin/collections/${config.collectionSlug}/${item.id}`} style={{ textDecoration: 'none' }}>
                      <div
                        style={{
                          padding: '6px 8px',
                          background: C.bg,
                          borderRadius: 2,
                          borderLeft: `2px solid ${item.stale ? C.error : C.border}`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 12,
                            color: item.stale ? C.error : C.text,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.name}
                        </div>
                        <div style={{ fontSize: 10, color: ageCol(item.days), marginTop: 1 }}>{item.days}d</div>
                      </div>
                    </Link>
                  ))}
                  {items.length > 8 && <span style={{ fontSize: 10, color: C.subtle, paddingLeft: 4 }}>+{items.length - 8} more</span>}
                  {items.length === 0 && <span style={{ fontSize: 11, color: C.muted }}>Empty</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── SlugHealth — span 1 ─────────────────────────────────────────────────────
export async function renderSlugHealth(config: SlugHealthConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'SlugHealth')
  type Ext = SlugHealthResult & {
    drifted: { id: any; name: string; slug: string }[]
    score: number
    total: number
  }

  let r = await getWidgetCache<Ext>(cacheKey)
  if (!r) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const docs = res.docs as any[]
    const slugMap: Record<string, { id: any; name: string }[]> = {}
    const missing: { id: any; name: string }[] = []
    const autoGen: { id: any; name: string }[] = []
    const drifted: { id: any; name: string; slug: string }[] = []

    docs.forEach((d) => {
      const name = formatRecordName(d),
        item = { id: d.id, name }
      if (!d.slug) {
        missing.push(item)
      } else {
        if (!slugMap[d.slug]) slugMap[d.slug] = []
        slugMap[d.slug].push(item)
        const exp = name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
        if (exp && d.slug !== exp) drifted.push({ id: d.id, name, slug: d.slug })
      }
      if (d.generateSlug === true) autoGen.push(item)
    })

    const dupes = Object.entries(slugMap)
      .filter(([, v]) => v.length > 1)
      .flatMap(([, v]) => v)
    const issues = missing.length + dupes.length
    r = {
      missing,
      autoGen,
      duplicates: dupes,
      drifted,
      score: docs.length > 0 ? Math.round(((docs.length - issues) / docs.length) * 100) : 100,
      total: docs.length,
    }
    await setWidgetCache(cacheKey, r, config.cacheTTL ?? 60)
  }

  const panels = [
    { label: 'Missing', n: r.missing.length, bad: true, color: C.error, icon: '⚠' },
    { label: 'Auto-gen', n: r.autoGen.length, bad: false, color: C.accent1, icon: '⚙' },
    { label: 'Duplicate', n: r.duplicates.length, bad: true, color: C.warn, icon: '⊕' },
    { label: 'Drifted', n: r.drifted.length, bad: false, color: C.accent4, icon: '↻' },
  ]
  const hardIssues = r.missing.length + r.duplicates.length
  const problems = [
    ...r.missing.map((i) => ({ ...i, kind: 'Missing', color: C.error })),
    ...r.duplicates.map((i) => ({ ...i, kind: 'Duplicate', color: C.warn })),
    ...r.drifted.map((i) => ({ ...i, kind: 'Drifted', color: C.accent4 })),
  ]

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 260 })}>
      <div style={{ ...CAP, marginBottom: 12 }}>{config.title ?? 'Slug Health'}</div>

      {/* Hero ring + summary */}
      <div style={cell({ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 })}>
        <div style={RING_WRAPPER}>
          <Ring pct={r.score} size={64} stroke={8} color={scoreColor(r.score)} />
          <div style={RING_CENTER}>
            <div style={{ fontSize: 14, fontWeight: 700, color: scoreColor(r.score) }}>{r.score}%</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
            {hardIssues === 0 ? '✓ No critical issues' : `${hardIssues} critical issue${hardIssues > 1 ? 's' : ''}`}
          </div>
          {r.drifted.length > 0 && (
            <div style={{ fontSize: 12, color: C.accent4, marginTop: 1 }}>
              {r.drifted.length} slug{r.drifted.length > 1 ? 's' : ''} may have drifted
            </div>
          )}
          <div style={{ fontSize: 11, color: C.subtle, marginTop: 2 }}>{r.total} records audited</div>
        </div>
      </div>

      {/* 2×2 metric tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {panels.map((p) => (
          <div key={p.label} style={cell({ textAlign: 'center', borderTop: `2px solid ${p.color}`, padding: '8px 6px' })}>
            <div style={{ fontSize: 16, marginBottom: 2 }}>{p.icon}</div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1,
                color: p.n === 0 ? C.success : p.bad ? C.error : C.text,
              }}
            >
              {p.n === 0 ? '✓' : p.n}
            </div>
            <div style={{ fontSize: 10, color: C.subtle, marginTop: 2 }}>{p.label}</div>
          </div>
        ))}
      </div>

      {/* Unified problem list */}
      {problems.length > 0 && (
        <div style={cell({ padding: 0, overflow: 'hidden', overflowY: 'auto', maxHeight: 180 })}>
          {problems.slice(0, 8).map((item, i) => (
            <Link
              key={`${item.id}-${item.kind}`}
              href={`/admin/collections/${config.collectionSlug}/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderBottom: i < Math.min(problems.length, 8) - 1 ? `1px solid ${C.line}` : 'none',
                }}
              >
                <Pill label={item.kind} color={item.color} bg="transparent" />
                <span
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: C.text,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
          {problems.length > 8 && <div style={{ padding: '6px 12px', fontSize: 11, color: C.subtle }}>+{problems.length - 8} more</div>}
        </div>
      )}
    </div>
  )
}

// ─── Timeline — span 2 ───────────────────────────────────────────────────────
export async function renderTimeline(config: TimelineConfig, payload: any): Promise<React.ReactNode> {
  const dateField = config.dateField ?? 'createdAt'
  const cacheKey = buildCacheKey(config.collectionSlug, 'Timeline', { dateField })
  type D = { timeline: [string, number][]; thisMonth: number; lastMonth: number; total: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({
      collection: config.collectionSlug,
      depth: 0,
      limit: DEFAULT_LIMIT,
      select: { [dateField]: true },
    })
    const docs = res.docs as any[]
    const groups = groupByMonth(docs, dateField)
    const now = new Date()
    const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const lastD = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastKey = `${lastD.getFullYear()}-${String(lastD.getMonth() + 1).padStart(2, '0')}`
    d = {
      timeline: Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)),
      thisMonth: groups[thisKey] ?? 0,
      lastMonth: groups[lastKey] ?? 0,
      total: docs.length,
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  // 🟢 Early exit if no data at all
  if (d.total === 0) {
    return (
      <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 })}>
        {config.title && <div style={{ ...CAP, marginBottom: 12 }}>{config.title}</div>}
        <Empty message="No records created yet." />
      </div>
    )
  }

  const delta = d.thisMonth - d.lastMonth
  const now = new Date()
  const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const max = Math.max(...d.timeline.map(([, v]) => v), 1)
  let cum = 0
  const enriched = d.timeline.map(([month, count]) => {
    cum += count
    return { month, count, cum }
  })
  const maxCum = cum || 1

  return (
    <div style={card({ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 })}>
      {/* Hero stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, marginBottom: 16 }}>
        <div style={cell()}>
          <div style={CAP}>Total</div>
          <div style={{ ...BIG, marginTop: 4 }}>{d.total}</div>
        </div>
        <div style={cell()}>
          <div style={CAP}>This Month</div>
          <div style={{ ...BIG, color: d.thisMonth > 0 ? C.accent1 : C.muted, marginTop: 4 }}>{d.thisMonth}</div>
        </div>
        <div style={cell()}>
          <div style={CAP}>Last Month</div>
          <div style={{ ...BIG, marginTop: 4 }}>{d.lastMonth}</div>
        </div>
        <div style={cell({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 12px' })}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 1,
              color: delta > 0 ? C.success : delta < 0 ? C.error : C.muted,
            }}
          >
            {delta > 0 ? '+' : ''}{delta}
          </div>
          <div style={{ fontSize: 10, color: C.subtle, marginTop: 2 }}>vs last mo</div>
        </div>
      </div>

      {/* Chart zone */}
      <div style={cell({ padding: '12px 12px 8px' })}>
        <div style={{ ...CAP, marginBottom: 12 }}>{config.title ?? 'Creation Timeline'}</div>

        {d.timeline.length === 0 ? (
          <Empty message="No records created yet." />
        ) : (
          <div style={{ position: 'relative', height: 80 }}>
            {/* 🟢 Conditionally render bars based on data density */}
            {enriched.length === 1 ? (
              // Single month: centered fixed‑width bar
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                {enriched.map(({ month, count }) => {
                  const isThis = month === thisKey
                  const h = Math.max(Math.round((count / max) * 56), count > 0 ? 2 : 0)
                  const [yr, mo] = month.split('-')
                  return (
                    <div key={month} title={`${count} in ${mo}/${yr.slice(2)}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
                      {count > 0 && (
                        <span style={{ fontSize: 9, color: isThis ? C.accent1 : C.subtle, marginBottom: 2, fontWeight: isThis ? 600 : 400 }}>
                          {count}
                        </span>
                      )}
                      {count > 0 && (
                        <div style={{ width: '100%', background: isThis ? C.accent1 : C.text, opacity: isThis ? 1 : 0.4, borderRadius: '1px 1px 0 0', height: h }} />
                      )}
                      <span style={{ fontSize: 8, color: isThis ? C.accent1 : C.subtle, marginTop: 4, whiteSpace: 'nowrap', fontWeight: isThis ? 600 : 400 }}>
                        {mo}/{yr.slice(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              // Multiple months: flex distribution across full width
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 2,
                  height: 60,
                  position: 'absolute',
                  bottom: 20,
                  left: 0,
                  right: 0,
                }}
              >
                {enriched.map(({ month, count }) => {
                  const isThis = month === thisKey
                  const h = Math.max(Math.round((count / max) * 56), count > 0 ? 2 : 0)
                  const [yr, mo] = month.split('-')
                  return (
                    <div key={month} title={`${count} in ${mo}/${yr.slice(2)}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {count > 0 && (
                        <span style={{ fontSize: 9, color: isThis ? C.accent1 : C.subtle, marginBottom: 2, fontWeight: isThis ? 600 : 400 }}>
                          {count}
                        </span>
                      )}
                      {count > 0 && (
                        <div
                          style={{
                            width: '100%',
                            background: isThis ? C.accent1 : C.text,
                            opacity: isThis ? 1 : 0.4,
                            borderRadius: '1px 1px 0 0',
                            height: h,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: 8,
                          color: isThis ? C.accent1 : C.subtle,
                          marginTop: 4,
                          whiteSpace: 'nowrap',
                          fontWeight: isThis ? 600 : 400,
                        }}
                      >
                        {mo}/{yr.slice(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Cumulative overlay – only for multiple months */}
            {enriched.length > 1 && cum > 0 && (
              <svg
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 0,
                  right: 0,
                  height: 60,
                  width: '100%',
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                <polyline
                  points={enriched
                    .map(
                      ({ cum: c }, i) =>
                        `${(i / (enriched.length - 1)) * 100}%,${60 - Math.round((c / maxCum) * 50)}`,
                    )
                    .join(' ')}
                  fill="none"
                  stroke={C.accent4}
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
              </svg>
            )}
          </div>
        )}

        {/* Legend – always show if we have data */}
        {d.total > 0 && (
          <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
            {[
              { color: C.text, opacity: '0.4', label: 'Monthly', type: 'box' },
              { color: C.accent1, opacity: '1', label: 'This month', type: 'box' },
              { color: C.accent4, label: `Cumulative (${d.total})`, type: 'dash' },
            ].map((item) => (
              <div key={item.label} style={LEGEND_ITEM}>
                {item.type === 'box' ? (
                  <div style={{ ...LEGEND_DOT, background: item.color, opacity: item.opacity }} />
                ) : (
                  <svg width={14} height={6}>
                    <line x1="0" y1="3" x2="14" y2="3" stroke={item.color} strokeWidth="1.5" strokeDasharray="3 2" />
                  </svg>
                )}
                <span style={{ fontSize: 10, color: C.subtle }}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}