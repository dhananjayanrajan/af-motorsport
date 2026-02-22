// src/widgets/factories/createTypeBreakdownChart.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { formatTypeName } from '../../lib/widgetUtils'

type TypeBreakdownConfig = {
  collectionSlug: CollectionSlug
  title?: string
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createTypeBreakdownChart(config: TypeBreakdownConfig) {
  return async function TypeBreakdownChart({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const cacheKey = buildCacheKey(config.collectionSlug, 'TypeBreakdownChart', {})

    const cached = getWidgetCache<[string, number][]>(cacheKey)

    let typeData: [string, number][]
    let total: number

    if (cached) {
      typeData = cached
      total = typeData.reduce((sum, [, c]) => sum + c, 0)
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 1,
        limit: 1000,
        select: { type: true }
      })

      const docs = allDocs.docs as any[]
      total = docs.length

      const typeCounts: Record<string, number> = {}
      docs.forEach((d: any) => {
        const t = formatTypeName(d.type)
        typeCounts[t] = (typeCounts[t] || 0) + 1
      })

      typeData = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])
      setWidgetCache(cacheKey, typeData, config.cacheTTL ?? 60)
    }

    const maxCount = typeData[0]?.[1] ?? 1

    const card = {
      background: 'var(--theme-elevation-0)',
      border: '1px solid var(--theme-elevation-150)',
      borderRadius: '4px',
      padding: '20px',
    } as const

    const sectionTitle = {
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      color: 'var(--theme-elevation-400)',
      marginBottom: '16px',
    }

    const bar = (pct: number) => (
      <div style={{
        width: '100%', height: '3px',
        background: 'var(--theme-elevation-100)',
        borderRadius: '2px', overflow: 'hidden'
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: 'var(--theme-elevation-800)', borderRadius: '2px'
        }} />
      </div>
    )

    return (
      <div style={card}>
        <div style={sectionTitle}>{config.title ?? 'Type Breakdown'}</div>

        {typeData.length === 0 ? (
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No data.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {typeData.map(([name, count]) => {
              const pct = Math.round((count / maxCount) * 100)
              const percentOfTotal = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <div key={name}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '5px'
                  }}>
                    <span style={{ fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
                      {name}
                    </span>
                    <span style={{
                      fontSize: '12px', fontWeight: 600,
                      color: 'var(--theme-elevation-800)'
                    }}>
                      {count} <span style={{ fontWeight: 400, color: 'var(--theme-elevation-400)' }}>({percentOfTotal}%)</span>
                    </span>
                  </div>
                  {bar(pct)}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}