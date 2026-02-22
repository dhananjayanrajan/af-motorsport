// src/widgets/factories/createToggleDistribution.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'

type ToggleDistributionConfig = {
  collectionSlug: CollectionSlug
  title?: string
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createToggleDistribution(config: ToggleDistributionConfig) {
  return async function ToggleDistribution({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const cacheKey = buildCacheKey(config.collectionSlug, 'ToggleDistribution', {})

    const cached = getWidgetCache<{ simple: number; advanced: number; total: number }>(cacheKey)

    let counts: { simple: number; advanced: number; total: number }

    if (cached) {
      counts = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 1000,
        select: { toggle: true }
      })

      const docs = allDocs.docs as any[]
      const simpleCount = docs.filter((d: any) => d.toggle === 'simple').length
      const advancedCount = docs.filter((d: any) => d.toggle === 'advanced').length
      const total = simpleCount + advancedCount || 1

      counts = { simple: simpleCount, advanced: advancedCount, total }
      setWidgetCache(cacheKey, counts, config.cacheTTL ?? 60)
    }

    const card = {
      background: 'var(--theme-elevation-0)',
      border: '1px solid var(--theme-elevation-150)',
      borderRadius: '4px',
      padding: '16px',
    } as const

    const sectionTitle = {
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      color: 'var(--theme-elevation-400)',
      marginBottom: '12px',
    }

    return (
      <div style={card}>
        <div style={sectionTitle}>{config.title ?? 'Mode Distribution'}</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'Simple', count: counts.simple, color: 'var(--theme-elevation-600)' },
            { label: 'Advanced', count: counts.advanced, color: 'var(--theme-elevation-900)' },
          ].map(({ label, count, color }) => {
            const pct = Math.round((count / counts.total) * 100)
            return (
              <div key={label}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--theme-elevation-500)' }}>
                    {label}
                  </span>
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    color: 'var(--theme-elevation-800)'
                  }}>
                    {count} <span style={{ fontWeight: 400 }}>({pct}%)</span>
                  </span>
                </div>
                <div style={{
                  width: '100%', height: '4px',
                  background: 'var(--theme-elevation-100)',
                  borderRadius: '2px', overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${pct}%`, height: '100%',
                    background: color, borderRadius: '2px'
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}