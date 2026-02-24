import type {
  StatsBarConfig,
  RecentActivityFeedConfig,
  TypeBreakdownChartConfig,
  CompletionScoreConfig,
  ToggleDistributionConfig,
  RelationshipDensityConfig,
  TopTagsCategoriesConfig,
  PublishingPipelineConfig,
  SlugHealthConfig,
  TimelineConfig,
  CustomWidgetConfig,
} from './widgetTypes'

export const createStatsBar = (
  config: Omit<StatsBarConfig, 'type'>
): StatsBarConfig => ({ type: 'StatsBar', ...config })

export const createRecentActivityFeed = (
  config: Omit<RecentActivityFeedConfig, 'type'>
): RecentActivityFeedConfig => ({ type: 'RecentActivityFeed', limit: 8, ...config })

export const createTypeBreakdownChart = (
  config: Omit<TypeBreakdownChartConfig, 'type'>
): TypeBreakdownChartConfig => ({ type: 'TypeBreakdownChart', ...config })

export const createCompletionScore = (
  config: Omit<CompletionScoreConfig, 'type'>
): CompletionScoreConfig => ({
  type: 'CompletionScore',
  sections: ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts'],
  limit: 10,
  ...config,
})

export const createToggleDistribution = (
  config: Omit<ToggleDistributionConfig, 'type'>
): ToggleDistributionConfig => ({ type: 'ToggleDistribution', ...config })

export const createRelationshipDensity = (
  config: Omit<RelationshipDensityConfig, 'type'>
): RelationshipDensityConfig => ({
  type: 'RelationshipDensity',
  relationGroups: ['details', 'traits', 'assets', 'contexts'],
  limit: 10,
  ...config,
})

export const createTopTagsCategories = (
  config: Omit<TopTagsCategoriesConfig, 'type'>
): TopTagsCategoriesConfig => ({
  type: 'TopTagsCategories',
  tagLimit: 15,
  categoryLimit: 15,
  ...config,
})

export const createPublishingPipeline = (
  config: Omit<PublishingPipelineConfig, 'type'>
): PublishingPipelineConfig => ({ type: 'PublishingPipeline', ...config })

export const createSlugHealth = (
  config: Omit<SlugHealthConfig, 'type'>
): SlugHealthConfig => ({ type: 'SlugHealth', ...config })

export const createTimeline = (
  config: Omit<TimelineConfig, 'type'>
): TimelineConfig => ({ type: 'Timeline', dateField: 'createdAt', ...config })

export const createCustomWidget = (
  config: Omit<CustomWidgetConfig, 'type'>
): CustomWidgetConfig => ({ type: 'Custom', ...config })