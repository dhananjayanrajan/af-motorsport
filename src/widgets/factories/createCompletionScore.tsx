// src/widgets/factories/createCompletionScore.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import Link from 'next/link'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { formatRecordName, calculateCompletionScore, scoreColor } from '../../lib/widgetUtils'
import type { SectionName } from '../../lib/widgetTypes'

type CompletionScoreConfig = {
  collectionSlug: CollectionSlug
  title?: string
  sections?: SectionName[]
  limit?: number
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createCompletionScore(config: CompletionScoreConfig) {
  return async function CompletionScore({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const sections = config.sections ?? ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts']
    const limit = config.limit ?? 10
    const cacheKey = buildCacheKey(config.collectionSlug, 'CompletionScore', { sections: sections.join(',') })

    const cached = getWidgetCache<{ id: any; name: string; score: number }[]>(cacheKey)

    let scores: { id: any; name: string; score: number }[]

    if (cached) {
      scores = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 100,
        sort: '-updatedAt',
      })

      scores = (allDocs.docs as any[]).map((d: any) => ({
        id: d.id,
        name: formatRecordName(d),
        score: calculateCompletionScore(d, sections)
      })).sort((a, b) => a.score - b.score).slice(0, limit)

      setWidgetCache(cacheKey, scores, config.cacheTTL ?? 60)
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
        <div style={sectionTitle}>{config.title ?? 'Profile Completion'}</div>

        {scores.length === 0 ? (
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No records.</div>
        ) : (
          scores.map((item, i) => (
            <Link
              key={item.id}
              href={`/admin/collections/${config.collectionSlug}/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ marginBottom: i === scores.length - 1 ? 0 : '10px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '5px'
                }}>
                  <span style={{ fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
                    {item.name}
                  </span>
                  <span style={{
                    fontSize: '12px', fontWeight: 600,
                    color: scoreColor(item.score)
                  }}>
                    {item.score}%
                  </span>
                </div>
                {bar(item.score, scoreColor(item.score))}
              </div>
            </Link>
          ))
        )}
      </div>
    )
  }
}