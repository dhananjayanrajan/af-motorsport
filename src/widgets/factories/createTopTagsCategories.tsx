// src/widgets/factories/createTopTagsCategories.ts
import type { WidgetServerProps, CollectionSlug } from 'payload'
import { getWidgetCache, setWidgetCache, buildCacheKey, hasRequiredRoles } from '../../lib/widgetCache'
import { countArrayItems } from '../../lib/widgetUtils'
import type { RecordSummary } from '../../lib/widgetTypes'

type TopTagsCategoriesConfig = {
  collectionSlug: CollectionSlug
  title?: string
  tagLimit?: number
  categoryLimit?: number
  cacheTTL?: number
  requiredRoles?: string[]
}

export function createTopTagsCategories(config: TopTagsCategoriesConfig) {
  return async function TopTagsCategories({ req }: WidgetServerProps) {
    if (!hasRequiredRoles(req, config.requiredRoles)) return null

    const { payload } = req
    const tagLimit = config.tagLimit ?? 15
    const catLimit = config.categoryLimit ?? 15
    const cacheKey = buildCacheKey(config.collectionSlug, 'TopTagsCategories', { tagLimit, catLimit })

    const cached = getWidgetCache<{ tags: [string, number][]; cats: [string, number][] }>(cacheKey)

    let result: { tags: [string, number][]; cats: [string, number][] }

    if (cached) {
      result = cached
    } else {
      const allDocs = await payload.find({
        collection: config.collectionSlug as any,
        depth: 0,
        limit: 1000,
      })

      const docs = allDocs.docs as RecordSummary[]
      const tagCounts = countArrayItems(docs, 'tags')
      const catCounts = countArrayItems(docs, 'categories')

      const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, tagLimit)
      const topCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, catLimit)

      result = { tags: topTags, cats: topCats }
      setWidgetCache(cacheKey, result, config.cacheTTL ?? 60)
    }

    const maxTag = result.tags[0]?.[1] ?? 1
    const maxCat = result.cats[0]?.[1] ?? 1

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

    const TagCloud = ({ items, max }: { items: [string, number][], max: number }) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '40px' }}>
        {items.length === 0 ? (
          <span style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>None</span>
        ) : (
          items.map(([name, count]) => {
            const size = 10 + Math.round((count / max) * 14)
            return (
              <span
                key={name}
                style={{
                  fontSize: `${size}px`,
                  fontWeight: count > max * 0.5 ? 600 : 400,
                  color: 'var(--theme-elevation-700)',
                  lineHeight: 1.2,
                }}
                title={`${count} occurrences`}
              >
                {name}
              </span>
            )
          })
        )}
      </div>
    )

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
        <div style={card}>
          <div style={sectionTitle}>{config.title ? `${config.title} - Tags` : 'Top Tags'}</div>
          <TagCloud items={result.tags} max={maxTag} />
        </div>

        <div style={card}>
          <div style={sectionTitle}>{config.title ? `${config.title} - Categories` : 'Top Categories'}</div>
          <TagCloud items={result.cats} max={maxCat} />
        </div>
      </div>
    )
  }
}