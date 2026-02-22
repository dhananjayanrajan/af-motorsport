// src/widgets/factories/createSlugHealth.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import Link from 'next/link'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { formatRecordName } from '../../lib/widgetUtils'
import type { SlugHealthResult } from '../../lib/widgetTypes'

type SlugHealthConfig = {
  collectionSlug: CollectionSlug
  title?: string
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createSlugHealth(config: SlugHealthConfig) {
  return async function SlugHealth({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const cacheKey = buildCacheKey(config.collectionSlug, 'SlugHealth', {})

    const cached = getWidgetCache<SlugHealthResult>(cacheKey)

    let result: SlugHealthResult

    if (cached) {
      result = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 1000,
      })

      const docs = allDocs.docs as any[]
      const slugMap: Record<string, { id: any; name: string }[]> = {}
      const missing: { id: any; name: string }[] = []
      const autoGen: { id: any; name: string }[] = []

      docs.forEach((d: any) => {
        const name = formatRecordName(d)
        const item = { id: d.id, name }

        if (!d.slug || d.slug === '') {
          missing.push(item)
        } else {
          if (!slugMap[d.slug]) slugMap[d.slug] = []
          slugMap[d.slug].push(item)
        }

        if (d.generateSlug === true) {
          autoGen.push(item)
        }
      })

      const duplicates = Object.entries(slugMap)
        .filter(([, items]) => items.length > 1)
        .flatMap(([, items]) => items)

      result = { missing, autoGen, duplicates }
      setWidgetCache(cacheKey, result, config.cacheTTL ?? 60)
    }

    const card = {
      background: 'var(--theme-elevation-0)',
      border: '1px solid var(--theme-elevation-150)',
      borderRadius: '4px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      flex: 1,
      minWidth: 0,
    } as const

    const StatCard = ({ label, count, items, bad }: {
      label: string, count: number, items: { id: any; name: string }[], bad: boolean
    }) => {
      const isHealthy = count === 0 && !bad

      return (
        <div style={card}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span style={{ fontSize: '11px', color: 'var(--theme-elevation-500)' }}>{label}</span>
            <span style={{
              fontSize: '18px', fontWeight: 700,
              color: isHealthy ? 'var(--theme-success-500)' : bad ? 'var(--theme-error-500)' : 'var(--theme-elevation-800)'
            }}>
              {isHealthy ? '✓' : count}
            </span>
          </div>

          {count > 0 && items.length > 0 && (
            <div style={{
              marginTop: '8px', borderTop: '1px solid var(--theme-elevation-100)',
              paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
              maxHeight: '80px', overflowY: 'auto'
            }}>
              {items.slice(0, 8).map(item => (
                <Link
                  key={item.id}
                  href={`/admin/collections/${config.collectionSlug}/${item.id}`}
                  style={{ fontSize: '11px', color: 'var(--theme-elevation-600)', textDecoration: 'none' }}
                >
                  {item.name}
                </Link>
              ))}
              {items.length > 8 && (
                <span style={{ fontSize: '10px', color: 'var(--theme-elevation-400)' }}>
                  +{items.length - 8} more
                </span>
              )}
            </div>
          )}
          {count > 0 && items.length === 0 && (
            <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)', marginTop: '8px' }}>
              (no details available)
            </div>
          )}
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', gap: '2px', width: '100%', overflowX: 'auto', paddingBottom: '2px' }}>
        <StatCard label="Missing Slugs" count={result.missing.length} items={result.missing} bad={result.missing.length > 0} />
        <StatCard label="Auto-generated" count={result.autoGen.length} items={result.autoGen} bad={false} />
        <StatCard label="Duplicates" count={result.duplicates.length} items={result.duplicates} bad={result.duplicates.length > 0} />
      </div>
    )
  }
}