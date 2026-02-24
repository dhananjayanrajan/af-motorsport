import type { CollectionSlug } from 'payload'

export type SectionName = 'basics' | 'details' | 'traits' | 'metrics' | 'assets' | 'contexts'

export type WidgetType =
  | 'StatsBar'
  | 'RecentActivityFeed'
  | 'TypeBreakdownChart'
  | 'CompletionScore'
  | 'ToggleDistribution'
  | 'RelationshipDensity'
  | 'TopTagsCategories'
  | 'PublishingPipeline'
  | 'SlugHealth'
  | 'Timeline'
  | 'Custom'

// span: how many columns the widget occupies in the 3-col bento grid
// 1 = narrow (1/3), 2 = medium (2/3), 3 = full width
export type WidgetSpan = 1 | 2 | 3

export type BaseWidgetConfig = {
  type: WidgetType
  collectionSlug: CollectionSlug
  title?: string
  cacheTTL?: number
  requiredRoles?: string[]
  span?: WidgetSpan
}

export type StatsBarConfig = BaseWidgetConfig & { type: 'StatsBar' }
export type RecentActivityFeedConfig = BaseWidgetConfig & { type: 'RecentActivityFeed'; limit?: number }
export type TypeBreakdownChartConfig = BaseWidgetConfig & { type: 'TypeBreakdownChart' }
export type CompletionScoreConfig = BaseWidgetConfig & { type: 'CompletionScore'; sections?: SectionName[]; limit?: number }
export type ToggleDistributionConfig = BaseWidgetConfig & { type: 'ToggleDistribution' }
export type RelationshipDensityConfig = BaseWidgetConfig & { type: 'RelationshipDensity'; relationGroups?: string[]; limit?: number }
export type TopTagsCategoriesConfig = BaseWidgetConfig & { type: 'TopTagsCategories'; tagLimit?: number; categoryLimit?: number }
export type PublishingPipelineConfig = BaseWidgetConfig & { type: 'PublishingPipeline' }
export type SlugHealthConfig = BaseWidgetConfig & { type: 'SlugHealth' }
export type TimelineConfig = BaseWidgetConfig & { type: 'Timeline'; dateField?: 'createdAt' | 'updatedAt' }

export type CustomWidgetConfig = {
  type: 'Custom'
  component: string
  title?: string
  requiredRoles?: string[]
  span?: WidgetSpan
}

export type AnyWidgetConfig =
  | StatsBarConfig
  | RecentActivityFeedConfig
  | TypeBreakdownChartConfig
  | CompletionScoreConfig
  | ToggleDistributionConfig
  | RelationshipDensityConfig
  | TopTagsCategoriesConfig
  | PublishingPipelineConfig
  | SlugHealthConfig
  | TimelineConfig
  | CustomWidgetConfig

export type SlugHealthResult = {
  missing: { id: any; name: string }[]
  autoGen: { id: any; name: string }[]
  duplicates: { id: any; name: string }[]
}