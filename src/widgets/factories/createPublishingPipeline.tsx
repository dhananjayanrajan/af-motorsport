// src/widgets/factories/createPublishingPipeline.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import Link from 'next/link'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { formatRecordName, getPipelineStage } from '../../lib/widgetUtils'

type PublishingPipelineConfig = {
  collectionSlug: CollectionSlug
  title?: string
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createPublishingPipeline(config: PublishingPipelineConfig) {
  return async function PublishingPipeline({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const cacheKey = buildCacheKey(config.collectionSlug, 'PublishingPipeline', {})

    const cached = getWidgetCache<Record<'Draft' | 'Published' | 'Featured' | 'Pinned', { id: any; name: string }[]>>(cacheKey)

    let pipeline: Record<string, { id: any; name: string }[]>

    if (cached) {
      pipeline = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 1000,
      })

      const docs = allDocs.docs as any[]
      const pipe: Record<string, { id: any; name: string }[]> = {
        Draft: [], Published: [], Featured: [], Pinned: []
      }

      docs.forEach((d: any) => {
        const name = formatRecordName(d)
        const item = { id: d.id, name }
        const stage = getPipelineStage(d)
        pipe[stage].push(item)
      })

      pipeline = pipe
      setWidgetCache(cacheKey, pipeline, config.cacheTTL ?? 60)
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

    return (
      <div style={card}>
        <div style={sectionTitle}>{config.title ?? 'Publishing Pipeline'}</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {Object.entries(pipeline).map(([stage, items]) => (
            <div key={stage}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  color: 'var(--theme-elevation-500)',
                  textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>
                  {stage}
                </span>
                <span style={{
                  fontSize: '11px', fontWeight: 700,
                  color: 'var(--theme-elevation-900)',
                  background: 'var(--theme-elevation-100)',
                  padding: '1px 7px', borderRadius: '10px'
                }}>
                  {items.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '120px', overflowY: 'auto' }}>
                {items.slice(0, 5).map(item => (
                  <Link
                    key={item.id}
                    href={`/admin/collections/${config.collectionSlug}/${item.id}`}
                    style={{
                      fontSize: '12px', color: 'var(--theme-elevation-700)',
                      textDecoration: 'none',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                {items.length > 5 && (
                  <span style={{ fontSize: '11px', color: 'var(--theme-elevation-400)' }}>
                    +{items.length - 5} more
                  </span>
                )}
                {items.length === 0 && (
                  <span style={{ fontSize: '11px', color: 'var(--theme-elevation-300)' }}>
                    Empty
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}