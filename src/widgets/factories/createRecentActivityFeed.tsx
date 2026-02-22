// src/widgets/factories/createRecentActivityFeed.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import Link from 'next/link'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { formatRecordName, formatTypeName, formatDate } from '../../lib/widgetUtils'

type RecentActivityConfig = {
  collectionSlug: CollectionSlug
  title?: string
  limit?: number
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createRecentActivityFeed(config: RecentActivityConfig) {
  return async function RecentActivityFeed({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const limit = config.limit ?? 10
    const cacheKey = buildCacheKey(config.collectionSlug, 'RecentActivityFeed', { limit })

    const cached = getWidgetCache<{ id: any; name: string; type: string; updatedAt: string; createdAt: string }[]>(cacheKey)

    let items: { id: any; name: string; type: string; updatedAt: string; createdAt: string }[]

    if (cached) {
      items = cached
    } else {
      const result = await payload.find({
        collection: config.collectionSlug as any,
        depth: 1,
        limit,
        sort: '-updatedAt',
        select: { names: true, alias: true, name: true, title: true, type: true, updatedAt: true, createdAt: true }
      })

      items = (result.docs as any[]).map((d: any) => ({
        id: d.id,
        name: formatRecordName(d),
        type: formatTypeName(d.type),
        updatedAt: formatDate(d.updatedAt),
        createdAt: d.createdAt,
      }))

      setWidgetCache(cacheKey, items, config.cacheTTL ?? 60)
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

    const row = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid var(--theme-elevation-100)',
    } as const

    return (
      <div style={card}>
        <div style={sectionTitle}>{config.title ?? 'Recent Activity'}</div>

        {items.length === 0 ? (
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No records yet.</div>
        ) : (
          items.map((item, i) => (
            <Link
              key={item.id}
              href={`/admin/collections/${config.collectionSlug}/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                ...row,
                borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--theme-elevation-100)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--theme-elevation-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 600,
                    color: 'var(--theme-elevation-500)', flexShrink: 0
                  }}>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--theme-elevation-800)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)' }}>
                      {item.type}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)', whiteSpace: 'nowrap' }}>
                  {item.updatedAt}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    )
  }
}