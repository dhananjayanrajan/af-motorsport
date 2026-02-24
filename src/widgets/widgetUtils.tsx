import React from 'react'

// ─── Data helpers ─────────────────────────────────────────────────────────────

export function formatRecordName(doc: any): string {
  if (doc.names?.first) return `${doc.names.first} ${doc.names.last ?? ''}`.trim()
  return doc.alias ?? doc.name ?? doc.title ?? 'Untitled'
}

export function formatTypeName(type: any): string {
  if (typeof type === 'object' && type !== null && 'name' in type) return (type as any).name
  if (typeof type === 'string') return type
  return 'Uncategorized'
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export function calculateCompletionScore(doc: any, sections: string[]): number {
  if (!sections.length) return 0
  return Math.round((sections.filter(s => doc[s]?.enable).length / sections.length) * 100)
}

export function scanRelationFields(obj: any): { filled: number; total: number } {
  if (!obj || typeof obj !== 'object') return { filled: 0, total: 0 }
  let filled = 0, total = 0
  Object.entries(obj).forEach(([key, value]) => {
    if (['enable', 'show', 'visibility', 'id', 'createdAt', 'updatedAt'].includes(key)) return
    if (value === null) {
      total++
    } else if (typeof value === 'number') {
      total++; filled++
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null && 'id' in (value as any)) {
      total++; filled++
    } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const nested = scanRelationFields(value)
      total += nested.total; filled += nested.filled
    }
  })
  return { filled, total }
}

export function getPipelineStage(doc: any): 'Draft' | 'Published' | 'Featured' | 'Pinned' {
  const v = doc.visibility ?? {}
  if (v.check_pinned) return 'Pinned'
  if (v.check_featured) return 'Featured'
  if (v.check_publish) return 'Published'
  return 'Draft'
}

export function scoreColor(score: number): string {
  if (score >= 75) return 'var(--theme-success-500)'
  if (score >= 50) return 'var(--theme-elevation-600)'
  if (score >= 25) return 'var(--theme-warning-500)'
  return 'var(--theme-error-500)'
}

export function groupByMonth(docs: any[], dateField: string): Record<string, number> {
  const groups: Record<string, number> = {}
  docs.forEach(doc => {
    const date = new Date(doc[dateField])
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    groups[key] = (groups[key] || 0) + 1
  })
  return groups
}

export function countArrayItems(docs: any[], field: string): Record<string, number> {
  const counts: Record<string, number> = {}
  docs.forEach(doc => {
    const items = doc[field]
    if (!Array.isArray(items)) return
    items.forEach((item: any) => {
      const name = typeof item === 'object' && item !== null
        ? (item.name ?? item.id ?? 'Unknown')
        : String(item)
      counts[name] = (counts[name] || 0) + 1
    })
  })
  return counts
}

// ─── Shared styles ────────────────────────────────────────────────────────────

export const card: React.CSSProperties = {
  background: 'var(--theme-elevation-0)',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: '4px',
  padding: '20px',
}

export const cardCompact: React.CSSProperties = {
  background: 'var(--theme-elevation-0)',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: '4px',
  padding: '16px',
}

export const sectionTitle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--theme-elevation-400)',
  marginBottom: '16px',
}

export const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 0',
}

export const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--theme-elevation-500)',
}

export const valueStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--theme-elevation-800)',
}

// ─── Shared JSX components ────────────────────────────────────────────────────

export function Bar({ pct, color = 'var(--theme-elevation-800)', height = 3 }: {
  pct: number
  color?: string
  height?: number
}) {
  return (
    <div style={{ width: '100%', height: `${height}px`, background: 'var(--theme-elevation-100)', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(Math.max(pct, 0), 100)}%`, height: '100%', background: color, borderRadius: '2px' }} />
    </div>
  )
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--theme-elevation-400)',
      padding: '24px 0 10px 0',
      borderBottom: '1px solid var(--theme-elevation-100)',
      marginBottom: '2px',
    }}>
      {children}
    </div>
  )
}

export function hasRequiredRoles(user: any, requiredRoles?: string[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true
  if (!user || !('roles' in user)) return false
  const roles = user.roles
  if (!roles || !Array.isArray(roles)) return false
  return requiredRoles.some(role => roles.includes(role))
}

export function WidgetError({ type, slug }: { type: string; slug?: string }) {
  return (
    <div style={{
      padding: '12px 16px',
      background: 'var(--theme-elevation-0)',
      border: '1px solid var(--theme-elevation-150)',
      borderLeft: '3px solid var(--theme-error-500)',
      borderRadius: '4px',
      fontSize: '12px',
      color: 'var(--theme-elevation-500)',
    }}>
      Widget failed to load: {type}{slug ? ` (${slug})` : ''}
    </div>
  )
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) return `${years}y ago`
  if (months > 0) return `${months}mo ago`
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'just now'
}