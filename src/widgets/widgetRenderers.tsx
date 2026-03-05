import Link from 'next/link'
import React from 'react'
import { buildCacheKey, getWidgetCache, setWidgetCache } from './widgetCache'
import type {
  CompletionScoreConfig,
  PublishingPipelineConfig,
  RecentActivityFeedConfig,
  RelationshipDensityConfig,
  SlugHealthConfig,
  SlugHealthResult,
  StatsBarConfig,
  TimelineConfig,
  ToggleDistributionConfig,
  TopTagsCategoriesConfig,
  TypeBreakdownChartConfig,
} from './widgetTypes'
import {
  calculateCompletionScore,
  countArrayItems,
  formatRecordName,
  formatTypeName,
  getPipelineStage,
  groupByMonth,
  scanRelationFields
} from './widgetUtils'

// Design tokens – Payload's native CSS variables
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

// Primitives – Payload‑style cards
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

// Additional shared styles
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

// Status Bar
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

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 340,
    display: 'flex',
    flexDirection: 'column'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    flex: 1
  }

  if (d.total === 0) {
    return (
      <div style={containerStyle}>
        <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted }}>
          {config.title || 'Collection_Archive'}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: UI.textMuted, fontStyle: 'italic' }}>
          NO_DATA_NODES_FOUND
        </div>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 30, height: 1, background: UI.accent }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 30, background: UI.accent }} />

      {config.title && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, background: UI.accent }} />
            {config.title}
          </div>
          <div style={{ fontSize: 8, fontFamily: 'monospace', color: UI.textMuted, opacity: 0.5 }}>MONUMENT_SYS_V.8.4</div>
        </div>
      )}

      <div style={gridStyle}>
        <div style={{ background: UI.bg, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 8, fontWeight: 900, color: UI.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total_Records</div>
            <div style={{ fontSize: 56, fontWeight: 950, fontStyle: 'italic', lineHeight: 0.8, color: UI.textStrong, letterSpacing: '-0.04em', margin: '12px 0' }}>{d.total}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: delta >= 0 ? UI.success : UI.accent, marginBottom: 12 }}>
              {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)} <span style={{ opacity: 0.5, fontSize: 8 }}>THIS_PERIOD</span>
            </div>
            <Sparkline vals={d.trend} color={UI.accent} w={140} h={30} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: UI.line }}>
          {[
            { label: 'Published', n: d.pub, color: UI.success },
            { label: 'Draft', n: d.unpub, color: UI.textMuted },
            { label: 'Featured', n: d.featured, color: UI.accent },
            { label: 'Pinned', n: d.pinned, color: UI.textStrong },
          ].map((item) => (
            <div key={item.label} style={{ background: UI.surface, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 7, fontWeight: 900, color: UI.textMuted, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 20, fontWeight: 900, fontStyle: 'italic', color: item.color }}>{item.n}</div>
              <div style={{ width: '100%', height: 2, background: UI.line, marginTop: 8 }}>
                <div style={{ width: `${(item.n / d.total) * 100}%`, height: '100%', background: item.color }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: UI.bg, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ring pct={pubPct} size={90} stroke={3} color={pubPct > 80 ? UI.success : UI.accent} />
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 950, fontStyle: 'italic', color: UI.textStrong, lineHeight: 1 }}>{pubPct}%</div>
              <div style={{ fontSize: 6, fontWeight: 900, color: UI.textMuted, textTransform: 'uppercase' }}>Index</div>
            </div>
          </div>
          <Link
            href={`/admin/collections/${config.collectionSlug}`}
            style={{
              marginTop: 20,
              fontSize: 8,
              fontWeight: 900,
              color: UI.accent,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              borderBottom: `1px solid ${UI.accent}44`,
              paddingBottom: 2
            }}
          >
            Terminal_Access →
          </Link>
        </div>
      </div>
    </div>
  )
}

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

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
    warn: 'var(--theme-warning-500)',
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 340,
    height: '100%'
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 2, background: UI.accent }} />
          {config.title ?? 'Recent_Activity_Log'}
        </div>
        <Link href={`/admin/collections/${config.collectionSlug}`} style={{ fontSize: 8, fontWeight: 900, color: UI.accent, textDecoration: 'none', letterSpacing: '0.1em', border: `1px solid ${UI.accent}`, padding: '4px 8px' }}>
          ACCESS_TERMINAL →
        </Link>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: UI.textMuted, fontStyle: 'italic' }}>NO_RECENT_TRANSMISSIONS</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
            {items.map((item) => (
              <Link key={item.id} href={`/admin/collections/${config.collectionSlug}/${item.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px',
                    background: UI.surface,
                    borderLeft: `3px solid ${item.published ? UI.success : UI.line}`,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      background: item.published ? UI.success : UI.line,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 950,
                      fontStyle: 'italic',
                      color: item.published ? UI.bg : UI.textMuted,
                      transform: 'skewX(-12deg)',
                    }}
                  >
                    <span style={{ transform: 'skewX(12deg)' }}>{item.name.charAt(0)}</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 900, color: item.daysAgo <= 1 ? UI.success : UI.textMuted, background: UI.bg, padding: '2px 4px', border: `1px solid ${UI.line}` }}>
                        {item.daysAgo === 0 ? 'T_00:00' : `${item.daysAgo}D_LAG`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 8, fontWeight: 900, color: UI.accent, letterSpacing: '0.1em' }}>{item.type}</span>
                      <div style={{ height: 1, flex: 1, background: UI.line, opacity: 0.3 }} />
                      <span style={{ fontSize: 7, fontWeight: 900, color: UI.textMuted, textTransform: 'uppercase' }}>CP_IDX: {item.completion}%</span>
                    </div>

                    <div style={{ width: '100%', height: 2, background: UI.line, position: 'relative' }}>
                      <div
                        style={{
                          width: `${item.completion}%`,
                          height: '100%',
                          background: item.completion > 80 ? UI.success : item.completion > 40 ? UI.warn : UI.accent,
                        }}
                      />
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

// Type Breakdown - Multi-Channel Signal Monitor
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

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 340,
    height: '100%'
  }

  const listStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 2,
    flex: 1,
    overflowY: 'auto'
  }

  const nonEmpty = d.rows.filter((r) => r.total > 0)
  const best = nonEmpty.length > 0 ? [...nonEmpty].sort((a, b) => b.pubPct - a.pubPct)[0] : null
  const maxT = d.rows[0]?.total ?? 1

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 4, height: 12, background: UI.accent }} />
        {config.title ?? 'Type_Distribution_Matrix'}
      </div>

      <div style={listStyle}>
        {d.rows.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: UI.textMuted, fontStyle: 'italic' }}>NO_NODES_DETECTED</div>
        ) : (
          d.rows.map((row) => (
            <div key={row.name} style={{ background: UI.surface, padding: '16px', borderLeft: `1px solid ${UI.line}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 950, color: UI.textStrong, letterSpacing: '0.05em' }}>{row.name.toUpperCase()}</span>
                <span style={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 900, color: UI.textMuted }}>VOL_{String(row.total).padStart(3, '0')}</span>
              </div>
              <div style={{ width: '100%', height: 4, background: UI.line, position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((row.total / maxT) * 100)}%`, height: '100%', background: UI.textMuted, opacity: 0.2 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: `${row.pubPct}%`, height: '100%', background: UI.success }} />
              </div>
              <div style={{ fontSize: 8, fontWeight: 900, color: row.pubPct > 50 ? UI.success : UI.accent, marginTop: 6, textAlign: 'right', letterSpacing: '0.1em', fontStyle: 'italic' }}>
                {row.pubPct}%_SYNC_STATUS
              </div>
            </div>
          ))
        )}
      </div>

      {best && (
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${UI.line}`, display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, background: UI.bg, padding: '12px 16px', border: `1px solid ${UI.border}`, borderRight: `4px solid ${UI.success}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 7, fontWeight: 900, color: UI.success, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Peak_Sync_Efficiency</div>
              <div style={{ fontSize: 14, fontWeight: 950, fontStyle: 'italic', color: UI.textStrong, textTransform: 'uppercase' }}>{best.name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 950, fontStyle: 'italic', color: UI.success }}>{best.pubPct}%</div>
              <div style={{ fontSize: 6, fontWeight: 900, color: UI.textMuted, textTransform: 'uppercase' }}>Live_Ratio</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Completion Score - System Integrity Diagnostic
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
      bands: [
        { label: '0-25', count: all.filter((r) => r.score <= 25).length, color: 'var(--theme-error-500)' },
        { label: '26-50', count: all.filter((r) => r.score > 25 && r.score <= 50).length, color: 'var(--theme-warning-500)' },
        { label: '51-75', count: all.filter((r) => r.score > 50 && r.score <= 75).length, color: 'var(--theme-elevation-600)' },
        { label: '76-100', count: all.filter((r) => r.score > 75).length, color: 'var(--theme-success-500)' },
      ].map((b) => ({ ...b, pct: all.length > 0 ? Math.round((b.count / all.length) * 100) : 0 })),
    }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 340,
    height: '100%'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    flex: 1
  }

  const ScoreRow = ({ item, color }: { item: Item; color: string }) => (
    <Link href={`/admin/collections/${config.collectionSlug}/${item.id}`} style={{ textDecoration: 'none', display: 'block', background: UI.surface, padding: '10px 12px', borderLeft: `3px solid ${color}`, marginBottom: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
        <span style={{ fontSize: 11, fontWeight: 950, fontStyle: 'italic', color }}>{String(item.score).padStart(2, '0')}%</span>
      </div>
    </Link>
  )

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 2, background: UI.accent }} />
        {config.title ?? 'Integrity_Check_Pulse'}
      </div>

      <div style={gridStyle}>
        <div style={{ background: UI.bg, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <Ring pct={d.avg} size={120} stroke={5} color={d.avg > 70 ? UI.success : UI.accent} />
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 950, fontStyle: 'italic', color: UI.textStrong, lineHeight: 1 }}>{d.avg}%</div>
              <div style={{ fontSize: 7, fontWeight: 900, color: UI.textMuted, textTransform: 'uppercase', marginTop: 4 }}>System_Average</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 2, width: '100%', height: 4 }}>
            {d.bands.map(b => (
              <div key={b.label} style={{ flex: 1, background: b.count > 0 ? b.color : UI.line, opacity: b.count > 0 ? 1 : 0.3 }} />
            ))}
          </div>
        </div>

        <div style={{ background: UI.bg, padding: 20 }}>
          <div style={{ fontSize: 8, fontWeight: 950, color: UI.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: UI.accent }} />
            Critical_Attention
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {d.worst.map(item => <ScoreRow key={item.id} item={item} color={UI.accent} />)}
          </div>
        </div>

        <div style={{ background: UI.bg, padding: 20 }}>
          <div style={{ fontSize: 8, fontWeight: 950, color: UI.success, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: UI.success }} />
            Optimised_Nodes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {d.best.map(item => <ScoreRow key={item.id} item={item} color={UI.success} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// Toggle Distribution - Operation Mode Monitor
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

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
  }

  const COLORS = [UI.accent, UI.textStrong, UI.textMuted, UI.line]

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 340,
    height: '100%'
  }

  const listStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 2,
    flex: 1,
    overflowY: 'auto'
  }

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 2, background: UI.accent }} />
        {config.title ?? 'Operation_Mode_Spread'}
      </div>

      {d.rows.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: UI.textMuted, fontStyle: 'italic' }}>NO_TOGGLE_TELEMETRY</div>
      ) : (
        <>
          <div style={{ display: 'flex', width: '100%', height: 4, background: UI.line, gap: 1, marginBottom: 24 }}>
            {d.rows.map((r, i) => (
              <div key={r.value} style={{ width: `${r.pct}%`, background: COLORS[i % COLORS.length] }} />
            ))}
          </div>

          <div style={listStyle}>
            {d.rows.map((r, i) => (
              <div key={r.value} style={{ background: UI.surface, borderLeft: `3px solid ${COLORS[i % COLORS.length]}`, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase' }}>{r.value}</div>
                    <div style={{ fontSize: 8, fontWeight: 900, color: UI.textMuted, marginTop: 4, fontStyle: 'italic' }}>{r.pct}%_LOAD_LOADOUT</div>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 950, fontStyle: 'italic', color: COLORS[i % COLORS.length], lineHeight: 1 }}>{String(r.count).padStart(2, '0')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 2, background: UI.line }}>
                    <div style={{ width: `${r.avgC}%`, height: '100%', background: r.avgC > 70 ? UI.success : UI.accent }} />
                  </div>
                  <span style={{ fontSize: 8, fontWeight: 950, color: UI.textStrong }}>{r.avgC}%_AVG_SYNC</span>
                </div>
              </div>
            ))}
          </div>

          {d.uncat > 0 && (
            <div style={{ marginTop: 16, fontSize: 8, fontWeight: 950, color: UI.textMuted, padding: '10px', background: UI.bg, border: `1px solid ${UI.line}`, textAlign: 'center', letterSpacing: '0.05em' }}>
              CRITICAL_ALERT: {d.uncat} NODES_MISSING_OPERATIONAL_MODE
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Relationship Density - Sub-System Connectivity Map
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
    groups.forEach((g) => { agg[g] = { f: 0, t: 0 } })
    const perDoc: DocRow[] = (res.docs as any[]).map((doc) => {
      let tf = 0, tt = 0
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

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 340,
    height: '100%'
  }

  const alertGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    flex: 1,
    overflowY: 'auto'
  }

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 2, background: UI.accent }} />
        {config.title ?? 'Relational_Density_Map'}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${groups.length}, 1fr)`, gap: 1, background: UI.line, marginBottom: 24, border: `1px solid ${UI.line}` }}>
        {d.tiles.map((t) => (
          <div key={t.group} style={{ background: UI.bg, textAlign: 'center', padding: '20px 8px' }}>
            <div style={{ fontSize: 28, fontWeight: 950, fontStyle: 'italic', color: t.pct < 50 ? UI.accent : UI.textStrong, lineHeight: 1 }}>{t.pct}%</div>
            <div style={{ fontSize: 7, fontWeight: 950, color: UI.textMuted, textTransform: 'uppercase', marginTop: 10, letterSpacing: '0.1em' }}>{t.group}</div>
            <div style={{ fontSize: 7, fontFamily: 'monospace', fontWeight: 900, color: UI.line, marginTop: 4 }}>{String(t.filled).padStart(2, '0')}/{String(t.total).padStart(2, '0')}_UNIT</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 8, fontWeight: 950, color: UI.accent, textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: UI.accent }} />
        Low_Density_Alerts
      </div>

      <div style={alertGridStyle}>
        {d.worst.map((doc) => (
          <Link key={doc.id} href={`/admin/collections/${config.collectionSlug}/${doc.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: UI.surface, padding: 16, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                <span style={{ fontSize: 13, fontWeight: 950, fontStyle: 'italic', color: UI.accent }}>{doc.score}%</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${groups.length}, 1fr)`, gap: 4 }}>
                {doc.breakdown.map((b) => (
                  <div key={b.group} style={{ height: 3, background: UI.line, position: 'relative' }}>
                    <div style={{ width: `${b.pct}%`, height: '100%', background: UI.accent }} />
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Tags & Categories - Taxonomy Density Map
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

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 340,
    height: '100%'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    flex: 1
  }

  const DataGrid = ({ items, label, cov, unassigned }: { items: [string, number][], label: string, cov: number, unassigned: number }) => (
    <div style={{ background: UI.bg, padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.15em', color: UI.textMuted }}>{label}_SATURATION</div>
          <div style={{ fontSize: 32, fontWeight: 950, fontStyle: 'italic', color: UI.textStrong, lineHeight: 1, marginTop: 4 }}>{cov}%</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 8, fontWeight: 950, color: UI.accent, letterSpacing: '0.05em' }}>{unassigned} MISSING</div>
          <div style={{ fontSize: 8, fontWeight: 900, color: UI.textMuted, marginTop: 2 }}>OF {d.total} NODES</div>
        </div>
      </div>
      <div style={{ width: '100%', height: 2, background: UI.line, marginBottom: 20 }}>
        <div style={{ width: `${cov}%`, height: '100%', background: UI.accent }} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignContent: 'flex-start' }}>
        {items.map(([name, count]) => (
          <div key={name} style={{ background: UI.surface, border: `1px solid ${UI.line}`, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{name}</span>
            <div style={{ width: 1, height: 8, background: UI.line }} />
            <span style={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 900, color: UI.accent }}>{String(count).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 2, background: UI.accent }} />
        {config.title ?? 'Metadata_Coverage_Index'}
      </div>
      <div style={gridStyle}>
        <DataGrid items={d.tags} label="TAG" cov={d.tagCov} unassigned={d.untagged} />
        <DataGrid items={d.cats} label="CATEGORY" cov={d.catCov} unassigned={d.uncat} />
      </div>
    </div>
  )
}

// Publishing Pipeline - Stage-Gate Deployment Tracker
export async function renderPublishingPipeline(config: PublishingPipelineConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'PublishingPipeline')
  type PItem = { id: any; name: string; days: number; stale: boolean }
  type D = { stages: Record<string, PItem[]>; avgDays: number; staleCount: number; total: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const stages: Record<string, PItem[]> = { Draft: [], Published: [], Featured: [], Pinned: [] }
    let pubDays = 0, pubCount = 0
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
    d = { stages, total, avgDays: pubCount > 0 ? Math.round(pubDays / pubCount) : 0, staleCount: stages.Draft.filter((i) => i.stale).length }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
    warn: 'var(--theme-warning-500)',
  }

  const stageMap: Record<string, { color: string; label: string }> = {
    Draft: { color: UI.textMuted, label: 'PRD_DRAFT' },
    Published: { color: UI.success, label: 'STG_LIVE' },
    Featured: { color: UI.warn, label: 'PRM_FEATURE' },
    Pinned: { color: UI.accent, label: 'SYS_PINNED' },
  }

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
    height: '100%'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    flex: 1
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 2, background: UI.accent }} />
            {config.title ?? 'Deployment_Pipeline'}
          </div>
          <div style={{ fontSize: 8, fontWeight: 900, color: UI.textMuted, marginTop: 6, letterSpacing: '0.05em' }}>AVG_LATENCY_TO_PUBLISH: {String(d.avgDays).padStart(2, '0')}D</div>
        </div>
        {d.staleCount > 0 && (
          <div style={{ background: UI.accent, color: UI.bg, padding: '6px 10px', fontSize: 8, fontWeight: 950, letterSpacing: '0.1em', fontStyle: 'italic' }}>
            STALE_DRAFTS_DETECTED: {String(d.staleCount).padStart(2, '0')}
          </div>
        )}
      </div>

      <div style={gridStyle}>
        {Object.entries(d.stages).map(([stage, items]) => (
          <div key={stage} style={{ background: UI.bg, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 12px', borderBottom: `3px solid ${stageMap[stage].color}`, background: UI.surface }}>
              <div style={{ fontSize: 7, fontWeight: 950, color: stageMap[stage].color, letterSpacing: '0.15em' }}>{stageMap[stage].label}</div>
              <div style={{ fontSize: 24, fontWeight: 950, fontStyle: 'italic', color: UI.textStrong, marginTop: 4, lineHeight: 1 }}>{String(items.length).padStart(2, '0')}</div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 1 }}>
              {items.map((item) => (
                <Link key={item.id} href={`/admin/collections/${config.collectionSlug}/${item.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '12px', background: UI.surface, marginBottom: 1, borderLeft: `2px solid ${item.stale ? UI.accent : UI.line}`, transition: 'background 0.2s ease' }}>
                    <div style={{ fontSize: 10, fontWeight: 950, color: item.stale ? UI.accent : UI.textStrong, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 7, fontFamily: 'monospace', fontWeight: 900, color: UI.textMuted, marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
                      <span>STATIONARY_AGE</span>
                      <span style={{ color: item.stale ? UI.accent : UI.textMuted }}>{String(item.days).padStart(3, '0')}D</span>
                    </div>
                  </div>
                </Link>
              ))}
              {items.length === 0 && (
                <div style={{ padding: 20, fontSize: 8, color: UI.line, textAlign: 'center', fontStyle: 'italic', fontWeight: 900 }}>NO_ACTIVE_NODES</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Slug Health - URI Integrity & Routing Diagnostic
export async function renderSlugHealth(config: SlugHealthConfig, payload: any): Promise<React.ReactNode> {
  const cacheKey = buildCacheKey(config.collectionSlug, 'SlugHealth')
  type Ext = SlugHealthResult & { drifted: { id: any; name: string; slug: string }[]; score: number; total: number }

  let r = await getWidgetCache<Ext>(cacheKey)
  if (!r) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT })
    const docs = res.docs as any[]
    const slugMap: Record<string, { id: any; name: string }[]> = {}
    const missing: { id: any; name: string }[] = []
    const autoGen: { id: any; name: string }[] = []
    const drifted: { id: any; name: string; slug: string }[] = []

    docs.forEach((d) => {
      const name = formatRecordName(d), item = { id: d.id, name }
      if (!d.slug) { missing.push(item) }
      else {
        if (!slugMap[d.slug]) slugMap[d.slug] = []
        slugMap[d.slug].push(item)
        const exp = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        if (exp && d.slug !== exp) drifted.push({ id: d.id, name, slug: d.slug })
      }
      if (d.generateSlug === true) autoGen.push(item)
    })

    const dupes = Object.entries(slugMap).filter(([, v]) => v.length > 1).flatMap(([, v]) => v)
    const issues = missing.length + dupes.length
    r = { missing, autoGen, duplicates: dupes, drifted, score: docs.length > 0 ? Math.round(((docs.length - issues) / docs.length) * 100) : 100, total: docs.length }
    await setWidgetCache(cacheKey, r, config.cacheTTL ?? 60)
  }

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    warn: 'var(--theme-warning-500)',
    success: 'var(--theme-success-500)',
  }

  const hardIssues = r.missing.length + r.duplicates.length
  const problems = [
    ...r.missing.map((i) => ({ ...i, kind: 'MISSING', color: UI.accent })),
    ...r.duplicates.map((i) => ({ ...i, kind: 'DUPE', color: UI.warn })),
    ...r.drifted.map((i) => ({ ...i, kind: 'DRIFT', color: UI.textMuted })),
  ]

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
    height: '100%'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    marginBottom: 24
  }

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 12, height: 2, background: UI.accent }} />
        {config.title ?? 'URI_Integrity_Audit'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, padding: 20, background: UI.surface, borderLeft: `4px solid ${r.score === 100 ? UI.success : UI.accent}`, borderBottom: `1px solid ${UI.line}` }}>
        <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
          <Ring pct={r.score} size={72} stroke={6} color={r.score === 100 ? UI.success : UI.accent} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 950, fontStyle: 'italic', color: UI.textStrong }}>{r.score}%</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            {hardIssues === 0 ? 'Routing: Status_Nominal' : `${String(hardIssues).padStart(2, '0')} Routing_Conflicts_Detected`}
          </div>
          <div style={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 900, color: UI.textMuted, marginTop: 6, textTransform: 'uppercase' }}>
            Audited_Nodes: {String(r.total).padStart(3, '0')} // Integrity_Verified
          </div>
        </div>
      </div>

      <div style={gridStyle}>
        {[
          { label: 'MISSING', n: r.missing.length, color: UI.accent },
          { label: 'AUTOGEN', n: r.autoGen.length, color: UI.textMuted },
          { label: 'DUPLICATE', n: r.duplicates.length, color: UI.warn },
          { label: 'DRIFTED', n: r.drifted.length, color: UI.textMuted },
        ].map(p => (
          <div key={p.label} style={{ background: UI.bg, padding: '20px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 950, fontStyle: 'italic', color: p.n > 0 && p.label !== 'AUTOGEN' ? p.color : UI.textStrong, lineHeight: 1 }}>{String(p.n).padStart(2, '0')}</div>
            <div style={{ fontSize: 7, fontWeight: 950, color: UI.textMuted, marginTop: 8, letterSpacing: '0.1em' }}>{p.label}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {problems.map((item) => (
          <Link key={`${item.id}-${item.kind}`} href={`/admin/collections/${config.collectionSlug}/${item.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: UI.surface, marginBottom: 1, borderLeft: `2px solid ${item.color}`, transition: 'background 0.2s ease' }}>
              <span style={{ fontSize: 8, fontWeight: 950, color: item.color, letterSpacing: '0.1em', width: 60 }}>[{item.kind}]</span>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
              <span style={{ fontSize: 8, fontFamily: 'monospace', fontWeight: 900, color: UI.textMuted }}>ID:{String(item.id).slice(-4).toUpperCase()}</span>
            </div>
          </Link>
        ))}
        {problems.length === 0 && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, border: `1px dashed ${UI.line}` }}>
            <span style={{ fontSize: 9, fontWeight: 950, color: UI.line, letterSpacing: '0.2em' }}>CLEAN_SWEEP: NO_ROUTING_ERRORS</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Timeline - Creation Throughput Telemetry
export async function renderTimeline(config: TimelineConfig, payload: any): Promise<React.ReactNode> {
  const dateField = config.dateField ?? 'createdAt'
  const cacheKey = buildCacheKey(config.collectionSlug, 'Timeline', { dateField })
  type D = { timeline: [string, number][]; thisMonth: number; lastMonth: number; total: number }

  let d = await getWidgetCache<D>(cacheKey)
  if (!d) {
    const res = await payload.find({ collection: config.collectionSlug, depth: 0, limit: DEFAULT_LIMIT, select: { [dateField]: true } })
    const docs = res.docs as any[]
    const groups = groupByMonth(docs, dateField)
    const now = new Date()
    const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const lastD = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastKey = `${lastD.getFullYear()}-${String(lastD.getMonth() + 1).padStart(2, '0')}`
    d = { timeline: Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)), thisMonth: groups[thisKey] ?? 0, lastMonth: groups[lastKey] ?? 0, total: docs.length }
    await setWidgetCache(cacheKey, d, config.cacheTTL ?? 60)
  }

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textStrong: 'var(--theme-elevation-950)',
    accent: 'var(--theme-error-500)',
    success: 'var(--theme-success-500)',
  }

  const delta = d.thisMonth - d.lastMonth
  const max = Math.max(...d.timeline.map(([, v]) => v), 1)

  const containerStyle: React.CSSProperties = {
    background: UI.bg,
    padding: 24,
    border: `1px solid ${UI.border}`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
    height: '100%'
  }

  const statGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: 1,
    background: UI.line,
    border: `1px solid ${UI.line}`,
    marginBottom: 24
  }

  return (
    <div style={containerStyle}>
      <div style={statGridStyle}>
        {[
          { label: 'TTL_NODES', val: String(d.total).padStart(3, '0'), color: UI.textStrong },
          { label: 'CURR_MONTH', val: String(d.thisMonth).padStart(2, '0'), color: UI.accent },
          { label: 'PREV_MONTH', val: String(d.lastMonth).padStart(2, '0'), color: UI.textMuted },
          { label: 'VELOCITY', val: `${delta >= 0 ? '+' : ''}${delta}`, color: delta >= 0 ? UI.success : UI.accent },
        ].map(m => (
          <div key={m.label} style={{ background: UI.bg, padding: '20px 12px' }}>
            <div style={{ fontSize: 7, fontWeight: 950, color: UI.textMuted, letterSpacing: '0.15em', marginBottom: 8 }}>{m.label}</div>
            <div style={{ fontSize: 24, fontWeight: 950, fontStyle: 'italic', color: m.color, lineHeight: 1 }}>{m.val}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: UI.surface, padding: 24, border: `1px solid ${UI.line}` }}>
        <div style={{ fontSize: 9, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 2, background: UI.accent }} />
          {config.title ?? 'Throughput_Timeline'}
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 6, position: 'relative', paddingBottom: 24 }}>
          {d.timeline.map(([month, count]) => {
            const h = (count / max) * 100
            const isCurrentYear = month.includes(new Date().getFullYear().toString())
            return (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    width: '100%',
                    height: `${Math.max(h, 2)}%`,
                    background: isCurrentYear ? UI.accent : UI.textMuted,
                    opacity: isCurrentYear ? 1 : 0.3,
                    transition: 'height 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
                  }}
                />
                <div style={{
                  fontSize: 7,
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  color: isCurrentYear ? UI.textStrong : UI.textMuted,
                  transform: 'rotate(-45deg)',
                  marginTop: 12,
                  whiteSpace: 'nowrap'
                }}>
                  {month.split('-')[1]}/{month.split('-')[0].slice(2)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}