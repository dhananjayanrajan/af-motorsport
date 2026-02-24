import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { AnyWidgetConfig } from './widgetTypes'
import { WIDGET_REGISTRY } from './widgetRegistry'
import { CUSTOM_WIDGET_REGISTRY } from './customWidgetRegistry'
import {
  renderStatsBar, renderRecentActivityFeed, renderTypeBreakdownChart,
  renderCompletionScore, renderToggleDistribution, renderRelationshipDensity,
  renderTopTagsCategories, renderPublishingPipeline, renderSlugHealth, renderTimeline,
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

async function renderWidget(widgetConfig: AnyWidgetConfig, payload: any): Promise<React.ReactNode> {
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
        if (!renderer) {
          console.warn(`[Orchestrator] No renderer for: "${widgetConfig.component}"`)
          return null
        }
        return await renderer(payload)
      }
      default: return null
    }
  } catch (err) {
    console.error('[DashboardOrchestrator] Widget render error:', (widgetConfig as any).type, err)
    const slug = 'collectionSlug' in widgetConfig ? (widgetConfig as any).collectionSlug : undefined
    return <WidgetError type={(widgetConfig as any).type} slug={slug} />
  }
}

type SectionedWidget = AnyWidgetConfig & { _section?: string }

export default async function DashboardOrchestrator(props: any) {
  const payload = await getPayload({ config })
  const user = props?.req?.user ?? props?.user ?? null

  const accessible = (WIDGET_REGISTRY as SectionedWidget[]).filter(w => {
    const roles = ('requiredRoles' in w) ? (w as any).requiredRoles : undefined
    return hasRequiredRoles(user, roles)
  })

  // Group into ordered sections
  const sectionMap = new Map<string, SectionedWidget[]>()
  const ungrouped: SectionedWidget[] = []
  for (const w of accessible) {
    if (w._section) {
      if (!sectionMap.has(w._section)) sectionMap.set(w._section, [])
      sectionMap.get(w._section)!.push(w)
    } else {
      ungrouped.push(w)
    }
  }

  // Render a flat list of widgets into a bento grid
  const renderBentoGrid = async (widgets: SectionedWidget[]) => {
    const rendered = await Promise.all(widgets.map(w => renderWidget(w, payload)))
    return (
      <div className="bento-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        alignItems: 'stretch', // ← changed from 'start' to 'stretch' for consistent heights
      }}>
        {rendered.map((node, i) => {
          if (!node) return null
          const span = (widgets[i] as any).span ?? 3
          return (
            <div
              key={i}
              style={{
                gridColumn: `span ${span}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {node}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '8px 0' }}>

        {/* Ungrouped widgets */}
        {ungrouped.length > 0 && await renderBentoGrid(ungrouped)}

        {/* Sectioned widgets */}
        {await Promise.all(Array.from(sectionMap.entries()).map(async ([heading, widgets]) => {
          const grid = await renderBentoGrid(widgets)
          return (
            <div key={heading}>
              <div style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: 'var(--theme-elevation-500)',
                marginBottom: '12px', paddingBottom: '8px',
              }}>
                {heading}
              </div>
              {grid}
            </div>
          )
        }))}
      </div>
    </>
  )
}