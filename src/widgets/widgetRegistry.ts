import type { AnyWidgetConfig } from './widgetTypes'
import {
  createStatsBar, createRecentActivityFeed, createTypeBreakdownChart,
  createCompletionScore, createToggleDistribution, createRelationshipDensity,
  createTopTagsCategories, createPublishingPipeline, createSlugHealth,
  createTimeline, createCustomWidget,
} from './factories'

// ─────────────────────────────────────────────────────────────────────────────
// WIDGET REGISTRY
//
// span: 1 = narrow (1 col), 2 = medium (2 col), 3 = full width (default)
// The orchestrator lays these out in a 3-column bento grid per section.
// ─────────────────────────────────────────────────────────────────────────────

type SectionedConfig = AnyWidgetConfig & { _section?: string }

function section<T extends AnyWidgetConfig>(config: T, name: string): T & { _section: string } {
  return { ...config, _section: name }
}

export const WIDGET_REGISTRY: SectionedConfig[] = [

  // ── Drivers ──────────────────────────────────────────────────────────────
  // Row 1: stats (2col) + toggle distribution (1col)
  section(createStatsBar({ collectionSlug: 'drivers', title: 'Drivers Overview', cacheTTL: 120, span: 2 }), 'Drivers'),
  section(createToggleDistribution({ collectionSlug: 'drivers', title: 'Display Mode', cacheTTL: 300, span: 1 }), 'Drivers'),
  // Row 2: recent activity (1col) + completion score (2col)
  section(createRecentActivityFeed({ collectionSlug: 'drivers', title: 'Recent Updates', limit: 10, cacheTTL: 60, span: 1 }), 'Drivers'),
  section(createCompletionScore({ collectionSlug: 'drivers', title: 'Profile Completion', sections: ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts'], span: 2 }), 'Drivers'),
  // Row 3: type breakdown (1col) + publishing pipeline (2col)
  section(createTypeBreakdownChart({ collectionSlug: 'drivers', title: 'Driver Types', cacheTTL: 300, span: 1 }), 'Drivers'),
  section(createPublishingPipeline({ collectionSlug: 'drivers', title: 'Publishing Status', cacheTTL: 90, span: 2 }), 'Drivers'),
  // Row 4: relationship density (2col) + slug health (1col)
  section(createRelationshipDensity({ collectionSlug: 'drivers', title: 'Data Relationships', relationGroups: ['details', 'traits', 'metrics', 'assets', 'contexts'], span: 2 }), 'Drivers'),
  section(createSlugHealth({ collectionSlug: 'drivers', title: 'Slug Audit', cacheTTL: 120, span: 1 }), 'Drivers'),
  // Row 5: timeline (2col) + tags (1col)
  section(createTimeline({ collectionSlug: 'drivers', title: 'Creation Timeline', dateField: 'createdAt', cacheTTL: 300, span: 2 }), 'Drivers'),
  section(createTopTagsCategories({ collectionSlug: 'drivers', title: 'Tags & Categories', tagLimit: 10, categoryLimit: 10, cacheTTL: 300, span: 1 }), 'Drivers'),

  // ── Kits ──────────────────────────────────────────────────────────────────
  section(createCustomWidget({ component: 'KitsWorkflow', title: 'Kit Development Pipeline', span: 2 }), 'Kits'),
  section(createStatsBar({ collectionSlug: 'kits', title: 'Kits Overview', cacheTTL: 120, span: 1 }), 'Kits'),
  section(createPublishingPipeline({ collectionSlug: 'kits', title: 'Kit Publishing', cacheTTL: 90, span: 2 }), 'Kits'),
  section(createCompletionScore({ collectionSlug: 'kits', title: 'Kit Completion', sections: ['basics', 'details', 'traits', 'assets', 'contexts'], span: 1 }), 'Kits'),
  section(createRecentActivityFeed({ collectionSlug: 'kits', title: 'Recent Kit Updates', limit: 8, cacheTTL: 60, span: 1 }), 'Kits'),

  // ── Racing Operations ─────────────────────────────────────────────────────
  section(createCustomWidget({ component: 'RacingOperationsWorkflow', title: 'Racing Operations', span: 3 }), 'Racing Operations'),
  section(createStatsBar({ collectionSlug: 'series', title: 'Series', cacheTTL: 300, span: 1 }), 'Racing Operations'),
  section(createStatsBar({ collectionSlug: 'seasons', title: 'Seasons', cacheTTL: 300, span: 1 }), 'Racing Operations'),
  section(createTimeline({ collectionSlug: 'events', title: 'Event Timeline', dateField: 'createdAt', cacheTTL: 300, span: 1 }), 'Racing Operations'),
  section(createPublishingPipeline({ collectionSlug: 'events', title: 'Event Status', cacheTTL: 90, span: 2 }), 'Racing Operations'),

  // ── People & Organisations ────────────────────────────────────────────────
  section(createStatsBar({ collectionSlug: 'organizations', title: 'Organisations', cacheTTL: 300, span: 1 }), 'People & Organisations'),
  section(createRecentActivityFeed({ collectionSlug: 'members', title: 'Recent Members', limit: 8, cacheTTL: 60, span: 2 }), 'People & Organisations'),

  // ── Content ───────────────────────────────────────────────────────────────
  section(createTimeline({ collectionSlug: 'stories', title: 'Story Timeline', cacheTTL: 300, span: 2 }), 'Content'),
  section(createStatsBar({ collectionSlug: 'narratives', title: 'Narratives', cacheTTL: 300, span: 1 }), 'Content'),

  // ── Resources ─────────────────────────────────────────────────────────────
  section(createStatsBar({ collectionSlug: 'media', title: 'Media Library', cacheTTL: 300, span: 1 }), 'Resources'),
  section(createRecentActivityFeed({ collectionSlug: 'cars', title: 'Recent Cars', limit: 8, cacheTTL: 60, span: 2 }), 'Resources'),
]