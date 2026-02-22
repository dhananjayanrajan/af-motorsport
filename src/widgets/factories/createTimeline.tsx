// src/widgets/factories/createTimeline.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { groupByMonth } from '../../lib/widgetUtils'
import type { RecordSummary } from '../../lib/widgetTypes'

type TimelineConfig = {
  collectionSlug: CollectionSlug
  title?: string
  dateField?: 'createdAt' | 'updatedAt'
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createTimeline(config: TimelineConfig) {
  return async function Timeline({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const dateField = config.dateField ?? 'createdAt'
    const cacheKey = buildCacheKey(config.collectionSlug, 'Timeline', { dateField })

    const cached = getWidgetCache<[string, number][]>(cacheKey)

    let timeline: [string, number][]

    if (cached) {
      timeline = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 1000,
        select: { [dateField]: true }
      })

      const docs = allDocs.docs as RecordSummary[]
      const groups = groupByMonth(docs, dateField)
      timeline = Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))

      setWidgetCache(cacheKey, timeline, config.cacheTTL ?? 60)
    }

    const maxCount = Math.max(...timeline.map(([, v]) => v), 1)

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

    return (
      <div style={card}>
        <div style={sectionTitle}>{config.title ?? `Creation Timeline (${dateField})`}</div>

        {timeline.length === 0 ? (
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No data yet.</div>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: '4px',
            height: '64px', paddingBottom: '20px'
          }}>
            {timeline.map(([month, count]) => {
              const height = Math.round((count / maxCount) * 48)
              const [year, mon] = month.split('-')
              return (
                <div
                  key={month}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', flex: 1, gap: '4px'
                  }}
                  title={`${count} record${count !== 1 ? 's' : ''}`}
                >
                  <div
                    style={{
                      width: '100%',
                      background: 'var(--theme-elevation-800)',
                      borderRadius: '2px 2px 0 0',
                      height: `${Math.max(height, 3)}px`,
                    }}
                  />
                  <span style={{
                    fontSize: '9px', color: 'var(--theme-elevation-400)',
                    whiteSpace: 'nowrap'
                  }}>
                    {mon}/{year.slice(2)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}