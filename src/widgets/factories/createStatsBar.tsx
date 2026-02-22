// src/widgets/factories/createStatsBar.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'

type StatsBarConfig = {
  collectionSlug: CollectionSlug
  title?: string
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createStatsBar(config: StatsBarConfig) {
  return async function StatsBar({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const cacheKey = buildCacheKey(config.collectionSlug, 'StatsBar', { fields: 'visibility' })

    const cached = getWidgetCache<{ total: number; published: number; unpublished: number; featured: number; pinned: number }>(cacheKey)

    let stats: { total: number; published: number; unpublished: number; featured: number; pinned: number }

    if (cached) {
      stats = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 1000,
        select: { visibility: true }
      })

      const docs = allDocs.docs as any[]
      const total = docs.length
      const published = docs.filter((d: any) => d.visibility?.check_publish).length
      const unpublished = total - published
      const featured = docs.filter((d: any) => d.visibility?.check_featured).length
      const pinned = docs.filter((d: any) => d.visibility?.check_pinned).length

      stats = { total, published, unpublished, featured, pinned }
      setWidgetCache(cacheKey, stats, config.cacheTTL ?? 60)
    }

    const card = {
      background: 'var(--theme-elevation-0)',
      border: '1px solid var(--theme-elevation-150)',
      borderRadius: '4px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      flex: 1,
      minWidth: 0,
    } as const

    const widgetStats = [
      { label: 'Total', val: stats.total, icon: '📊' },
      { label: 'Published', val: stats.published, icon: '✅' },
      { label: 'Unpublished', val: stats.unpublished, icon: '⏸️' },
      { label: 'Featured', val: stats.featured, icon: '⭐' },
      { label: 'Pinned', val: stats.pinned, icon: '📌' },
    ]

    return (
      <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '2px' }}>
        {widgetStats.map(({ label, val, icon }) => (
          <div key={label} style={card}>
            <div style={{ fontSize: '20px', lineHeight: 1 }}>{icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--theme-elevation-900)', lineHeight: 1 }}>
              {val}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--theme-elevation-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    )
  }
}