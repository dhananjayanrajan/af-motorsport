// src/lib/widgetUtils.ts
import type { RecordSummary, SectionName, RelationFieldScan } from './widgetTypes'

export function formatRecordName(doc: any): string {
  if (doc.names?.first) {
    return `${doc.names.first} ${doc.names.last ?? ''}`.trim()
  }
  return doc.alias ?? doc.name ?? doc.title ?? 'Untitled'
}

export function formatTypeName(type: any): string {
  if (typeof type === 'object' && type !== null && 'name' in type) {
    return (type as any).name
  }
  return typeof type === 'string' ? type : 'Uncategorized'
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function calculateCompletionScore(doc: any, sections: SectionName[]): number {
  const enabled = sections.filter(s => doc[s]?.enable).length
  return Math.round((enabled / sections.length) * 100)
}

export function scanRelationFields(obj: any): RelationFieldScan {
  if (!obj || typeof obj !== 'object') return { filled: 0, total: 0 }

  let filled = 0
  let total = 0

  Object.entries(obj).forEach(([key, value]) => {
    // Skip control fields
    if (['enable', 'show', 'visibility', 'id', 'createdAt', 'updatedAt'].includes(key)) return

    if (value === null) {
      total++
    } else if (typeof value === 'number') {
      total++
      filled++
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value) && 'id' in value) {
      total++
      filled++
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nested = scanRelationFields(value)
      total += nested.total
      filled += nested.filled
    }
  })

  return { filled, total }
}

export function countArrayItems(docs: RecordSummary[], field: 'tags' | 'categories'): Record<string, number> {
  const counts: Record<string, number> = {}

  docs.forEach(doc => {
    const items = doc[field]
    if (!Array.isArray(items)) return

    items.forEach(item => {
      const name = typeof item === 'string'
        ? item
        : (item as any)?.name ?? (item as any)?.id ?? 'Unknown'
      counts[name] = (counts[name] || 0) + 1
    })
  })

  return counts
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

export function groupByMonth(docs: RecordSummary[], dateField: 'createdAt' | 'updatedAt'): Record<string, number> {
  const groups: Record<string, number> = {}

  docs.forEach(doc => {
    const date = new Date(doc[dateField])
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    groups[key] = (groups[key] || 0) + 1
  })

  return groups
}