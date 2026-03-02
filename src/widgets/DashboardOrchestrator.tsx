import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { CUSTOM_WIDGET_REGISTRY } from './customWidgetRegistry'
import { WIDGET_REGISTRY } from './widgetRegistry'
import {
  renderCompletionScore,
  renderPublishingPipeline,
  renderRecentActivityFeed,
  renderRelationshipDensity,
  renderSlugHealth,
  renderStatsBar,
  renderTimeline,
  renderToggleDistribution,
  renderTopTagsCategories,
  renderTypeBreakdownChart,
} from './widgetRenderers'
import { hasRequiredRoles } from './widgetUtils'

function WidgetError({ type, slug }: { type: string; slug?: string }) {
  return (
    <div style={{
      padding: '16px',
      background: 'var(--theme-elevation-50)',
      border: '1px solid var(--theme-error-500)',
      borderRadius: '2px',
      fontSize: '13px',
      color: 'var(--theme-error-500)',
    }}>
      Widget failed to load: {type}{slug ? ` (${slug})` : ''}
    </div>
  )
}

async function renderWidget(widgetConfig: any, payload: any): Promise<React.ReactNode> {
  try {
    switch (widgetConfig.type) {
      case 'StatsBar': return await renderStatsBar(widgetConfig, payload)
      case 'RecentActivityFeed': return await renderRecentActivityFeed(widgetConfig, payload)
      case 'TypeBreakdownChart': return await renderTypeBreakdownChart(widgetConfig, payload)
      case 'CompletionScore': return await renderCompletionScore(widgetConfig, payload)
      case 'ToggleDistribution': return await renderToggleDistribution(widgetConfig, payload)
      case 'RelationshipDensity': return await renderRelationshipDensity(widgetConfig, payload)
      case 'TopTagsCategories': return await renderTopTagsCategories(widgetConfig, payload)
      case 'PublishingPipeline': return await renderPublishingPipeline(widgetConfig, payload)
      case 'SlugHealth': return await renderSlugHealth(widgetConfig, payload)
      case 'Timeline': return await renderTimeline(widgetConfig, payload)
      case 'Custom': {
        const renderer = CUSTOM_WIDGET_REGISTRY.get(widgetConfig.component)
        if (!renderer) return null
        return await renderer(payload)
      }
      default: return null
    }
  } catch (err) {
    return <WidgetError type={widgetConfig.type} slug={widgetConfig.collectionSlug} />
  }
}

export default async function DashboardOrchestrator({ initPageResult }: any) {
  const { req } = initPageResult
  const { payload, user } = req

  const accessible = WIDGET_REGISTRY.filter((w: any) => hasRequiredRoles(user, w.requiredRoles))

  const sectionMap = new Map<string, any[]>()
  const ungrouped: any[] = []

  for (const w of accessible) {
    if (w._section) {
      if (!sectionMap.has(w._section)) sectionMap.set(w._section, [])
      sectionMap.get(w._section)!.push(w)
    } else {
      ungrouped.push(w)
    }
  }

  const renderBentoGrid = async (widgets: any[]) => {
    const rendered = await Promise.all(widgets.map(w => renderWidget(w, payload)))
    return (
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        alignItems: 'stretch',
      }}>
        {rendered.map((node, i) => {
          if (!node) return null
          return (
            <div key={i} style={{ gridColumn: `span ${widgets[i].span ?? 3}`, display: 'flex', flexDirection: 'column' }}>
              {node}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Gutter>
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px 0' }}>
        {ungrouped.length > 0 && await renderBentoGrid(ungrouped)}
        {await Promise.all(Array.from(sectionMap.entries()).map(async ([heading, widgets]) => {
          const grid = await renderBentoGrid(widgets)
          return (
            <div key={heading}>
              <div style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'var(--theme-elevation-500)',
                marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--theme-elevation-150)'
              }}>
                {heading}
              </div>
              {grid}
            </div>
          )
        }))}
      </div>
    </Gutter>
  )
}