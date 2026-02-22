// src/widgets/factories/createRelationshipDensity.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import Link from 'next/link'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { formatRecordName, scanRelationFields, scoreColor } from '../../lib/widgetUtils'

type RelationshipDensityConfig = {
  collectionSlug: CollectionSlug
  title?: string
  relationGroups?: string[]
  limit?: number
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createRelationshipDensity(config: RelationshipDensityConfig) {
  return async function RelationshipDensity({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const relationGroups = config.relationGroups ?? ['details', 'traits', 'metrics', 'assets', 'contexts']
    const limit = config.limit ?? 10
    const cacheKey = buildCacheKey(config.collectionSlug, 'RelationshipDensity', { groups: relationGroups.join(',') })

    const cached = getWidgetCache<{ id: any; name: string; score: number }[]>(cacheKey)

    let densities: { id: any; name: string; score: number }[]

    if (cached) {
      densities = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 1,
        limit: 100,
      })

      densities = (allDocs.docs as any[]).map((d: any) => {
        let totalFilled = 0, totalRelations = 0
        relationGroups.forEach(group => {
          const result = scanRelationFields(d[group])
          totalFilled += result.filled
          totalRelations += result.total
        })
        const score = totalRelations === 0 ? 0 : Math.round((totalFilled / totalRelations) * 100)
        return {
          id: d.id,
          name: formatRecordName(d),
          score
        }
      }).sort((a, b) => b.score - a.score).slice(0, limit)

      setWidgetCache(cacheKey, densities, config.cacheTTL ?? 60)
    }

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

    const bar = (pct: number, color: string) => (
      <div style={{
        width: '100%', height: '3px',
        background: 'var(--theme-elevation-100)',
        borderRadius: '2px', overflow: 'hidden'
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: color, borderRadius: '2px'
        }} />
      </div>
    )

    return (
      <div style={card}>
        <div style={sectionTitle}>{config.title ?? 'Relationship Density'}</div>

        {densities.length === 0 ? (
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No records.</div>
        ) : (
          densities.map((item, i) => {
            const isTop = i < 3
            const isBottom = i >= densities.length - 3 && densities.length > 3
            const color = isTop ? 'var(--theme-success-500)' : isBottom ? 'var(--theme-error-500)' : scoreColor(item.score)

            return (
              <Link
                key={item.id}
                href={`/admin/collections/${config.collectionSlug}/${item.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ marginBottom: i === densities.length - 1 ? 0 : '10px' }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '5px'
                  }}>
                    <span style={{
                      fontSize: '12px', color: 'var(--theme-elevation-500)',
                      fontWeight: isTop || isBottom ? 600 : 400
                    }}>
                      {item.name}{isTop && ' 🏆'}{isBottom && ' ⚠️'}
                    </span>
                    <span style={{
                      fontSize: '12px', fontWeight: 600,
                      color: color
                    }}>
                      {item.score}%
                    </span>
                  </div>
                  {bar(item.score, color)}
                </div>
              </Link>
            )
          })
        )}
      </div>
    )
  }
}