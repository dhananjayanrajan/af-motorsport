import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { plugins } from './plugins'
import { searchPlugin } from '@payloadcms/plugin-search'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { pt } from '@payloadcms/translations/languages/pt'
import { Header } from '@/globals/Configurations/Header'
import { Footer } from '@/globals/Configurations/Footer'
import { Socials } from './globals/Connectivity/Socials'
import { Policies } from './globals/Branding/Policies'
import { Identity } from './globals/Branding/Identity'
import { Announcements } from './globals/Connectivity/Announcements'
import { Questions } from './globals/Connectivity/Questions'
import { Categories } from '@/collections/Attributes/Category'
import { Tags } from './collections/Attributes/Tag'
import { Users } from '@/collections/Entities/User'
import { Media } from '@/collections/Resources/Media'
import { Pages } from '@/collections/Content/Pages'
import { Series } from '@/collections/Competition/Series'
import { Seasons } from '@/collections/Competition/Season'
import { Events } from '@/collections/Competition/Event'
import { Sessions } from '@/collections/Competition/Session'
import { Entries } from '@/collections/Competition/Entry'
import { Results } from '@/collections/Competition/Result'
import { Points } from '@/collections/Competition/Point'
import { Drivers } from '@/collections/Entities/Driver'
import { Leaders } from '@/collections/Entities/Leader'
import { Members } from '@/collections/Entities/Member'
import { Individuals } from '@/collections/Entities/Individual'
import { Organizations } from '@/collections/Entities/Organization'
import { Narratives } from '@/collections/Content/Narrative'
import { Stories } from '@/collections/Content/Story'
import { Histories } from '@/collections/Content/History'
import { Journeys } from '@/collections/Content/Journey'
import { Notes } from '@/collections/Content/Note'
import { Cars } from '@/collections/Resources/Car'
import { Kits } from '@/collections/Resources/Kit'
import { Galleries } from '@/collections/Resources/Gallery'
import { Playlists } from '@/collections/Resources/Playlist'
import { Archives } from '@/collections/Resources/Archive'
import { Visualizations } from '@/collections/Resources/Visualization'
import { Schedules } from '@/collections/Operations/Schedule'
import { Trainings } from '@/collections/Operations/Training'
import { Careers } from '@/collections/Operations/Career'
import { Initiatives } from '@/collections/Operations/Initiative'
import { Meetups } from '@/collections/Operations/Meetup'
import { Celebrations } from '@/collections/Operations/Celebration'
import { Protocols } from '@/collections/Operations/Protocol'
import { Duties } from '@/collections/Operations/Duty'
import { Expectations } from '@/collections/Operations/Expectation'
import { Highlights } from '@/collections/Outcomes/Highlight'
import { Incidents } from '@/collections/Outcomes/Incident'
import { Impacts } from '@/collections/Outcomes/Impact'
import { Decisions } from '@/collections/Outcomes/Decision'
import { Strategies } from '@/collections/Outcomes/Strategy'
import { Awards } from '@/collections/Outcomes/Award'
import { Experiences } from '@/collections/Outcomes/Experience'
import { Tones } from '@/collections/Attributes/Tone'
import { Features } from '@/collections/Attributes/Feature'
import { Specifications } from '@/collections/Attributes/Specification'
import { Classifications } from '@/collections/Attributes/Classification'
import { Skills } from '@/collections/Attributes/Skill'
import { Principles } from '@/collections/Attributes/Principle'
import { Preferences } from '@/collections/Attributes/Preference'
import { Channels } from '@/collections/Attributes/Channel'
import { Locations } from '@/collections/Attributes/Location'
import {
  createStatsBar,
  createRecentActivityFeed,
  createTypeBreakdownChart,
  createCompletionScore,
  createToggleDistribution,
  createRelationshipDensity,
  createTopTagsCategories,
  createPublishingPipeline,
  createSlugHealth,
  createTimeline,
  DriversDashboard,
  RacingOperationsWorkflow,
  KitsWorkflow,
} from './widgets'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const DriversStatsBar = createStatsBar({ collectionSlug: 'drivers', title: 'Drivers Overview', cacheTTL: 120, requiredRoles: ['admin', 'editor'] })
const DriversRecentActivity = createRecentActivityFeed({ collectionSlug: 'drivers', title: 'Recent Driver Updates', limit: 8, cacheTTL: 60 })
const DriversTypeBreakdown = createTypeBreakdownChart({ collectionSlug: 'drivers', title: 'Driver Types', cacheTTL: 300 })
const DriversCompletion = createCompletionScore({ collectionSlug: 'drivers', title: 'Profile Completion', sections: ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts'], limit: 10, cacheTTL: 180 })
const DriversToggleDist = createToggleDistribution({ collectionSlug: 'drivers', title: 'Display Mode', cacheTTL: 300 })
const DriversRelDensity = createRelationshipDensity({ collectionSlug: 'drivers', title: 'Data Relationships', relationGroups: ['details', 'traits', 'metrics', 'assets', 'contexts'], limit: 10, cacheTTL: 180 })
const DriversTagsCats = createTopTagsCategories({ collectionSlug: 'drivers', title: 'Tags & Categories', tagLimit: 12, categoryLimit: 12, cacheTTL: 300 })
const DriversPipeline = createPublishingPipeline({ collectionSlug: 'drivers', title: 'Publishing Status', cacheTTL: 90 })
const DriversSlugHealth = createSlugHealth({ collectionSlug: 'drivers', title: 'Slug Audit', cacheTTL: 120 })
const DriversTimeline = createTimeline({ collectionSlug: 'drivers', title: 'Creation Timeline', dateField: 'createdAt', cacheTTL: 300 })

const KitsStatsBar = createStatsBar({ collectionSlug: 'kits', title: 'Kits Overview', cacheTTL: 120 })
const KitsRecentActivity = createRecentActivityFeed({ collectionSlug: 'kits', title: 'Recent Kit Updates', limit: 8, cacheTTL: 60 })
const KitsPipeline = createPublishingPipeline({ collectionSlug: 'kits', title: 'Kit Publishing', cacheTTL: 90 })
const KitsCompletion = createCompletionScore({ collectionSlug: 'kits', title: 'Kit Completion', sections: ['basics', 'details', 'traits', 'assets', 'contexts'], limit: 10, cacheTTL: 180 })

const SeriesStatsBar = createStatsBar({ collectionSlug: 'series', title: 'Series Stats', cacheTTL: 300 })
const SeasonsStatsBar = createStatsBar({ collectionSlug: 'seasons', title: 'Season Stats', cacheTTL: 300 })
const EventsTimeline = createTimeline({ collectionSlug: 'events', title: 'Event Timeline', dateField: 'createdAt', cacheTTL: 300 })
const EventsPipeline = createPublishingPipeline({ collectionSlug: 'events', title: 'Event Status', cacheTTL: 90 })

const MembersRecentActivity = createRecentActivityFeed({ collectionSlug: 'members', limit: 8, cacheTTL: 60 })
const OrganizationsStatsBar = createStatsBar({ collectionSlug: 'organizations', title: 'Org Overview', cacheTTL: 300 })

const StoriesTimeline = createTimeline({ collectionSlug: 'stories', title: 'Story Timeline', cacheTTL: 300 })
const NarrativesStatsBar = createStatsBar({ collectionSlug: 'narratives', title: 'Narrative Stats', cacheTTL: 300 })

const MediaStatsBar = createStatsBar({ collectionSlug: 'media', title: 'Media Library', cacheTTL: 300 })
const CarsRecentActivity = createRecentActivityFeed({ collectionSlug: 'cars', limit: 8, cacheTTL: 60 })

export default buildConfig({
  bin: [
    {
      scriptPath: path.resolve(dirname, 'seed.ts'),
      key: 'seed',
    },
  ],
  admin: {
    user: Users.slug,
    components: {
      beforeLogin: [],
      beforeDashboard: [],
      afterDashboard: [],
    },
    dashboard: {
      defaultLayout: ({ req }) => {
        return []
      },
      widgets: [
        DriversStatsBar as any,
        DriversRecentActivity as any,
        DriversTypeBreakdown as any,
        DriversTimeline as any,
        DriversTagsCats as any,
        DriversCompletion as any,
        DriversRelDensity as any,
        DriversSlugHealth as any,
        DriversToggleDist as any,
        DriversPipeline as any,
        KitsWorkflow as any,
        KitsStatsBar as any,
        KitsRecentActivity as any,
        KitsPipeline as any,
        KitsCompletion as any,
        RacingOperationsWorkflow as any,
        SeriesStatsBar as any,
        SeasonsStatsBar as any,
        EventsTimeline as any,
        EventsPipeline as any,
        MembersRecentActivity as any,
        OrganizationsStatsBar as any,
        StoriesTimeline as any,
        NarrativesStatsBar as any,
        MediaStatsBar as any,
        CarsRecentActivity as any,
      ],
    },
  },
  collections: [
    Series, Seasons, Events, Sessions, Entries, Results, Points,
    Drivers, Leaders, Members, Individuals, Organizations, Users,
    Narratives, Stories, Histories, Journeys, Notes, Pages,
    Cars, Kits, Media, Galleries, Playlists, Archives, Visualizations,
    Schedules, Trainings, Careers, Initiatives, Meetups, Celebrations, Protocols, Duties, Expectations,
    Highlights, Incidents, Impacts, Decisions, Strategies, Awards, Experiences,
    Categories, Tags, Tones, Features, Specifications, Classifications, Skills, Principles, Preferences, Channels, Locations
  ],
  i18n: {
    supportedLanguages: { en, es, pt },
    fallbackLanguage: 'en',
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Spanish', code: 'es' },
      { label: 'Portuguese', code: 'pt' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })
            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
        IndentFeature(),
        EXPERIMENTAL_TableFeature(),
      ]
    },
  }),
  endpoints: [],
  globals: [
    Header, Footer,
    Identity, Policies,
    Socials, Announcements, Questions,
  ],
  plugins: [
    ...plugins,
    searchPlugin({
      collections: [
        "users", "pages",
        "categories", "tags", "media",
        "forms"
      ],
      defaultPriorities: {
        series: 50,
        seasons: 50,
        events: 50,
        sessions: 50,
        entries: 50,
        results: 50,
        points: 50,
        drivers: 50,
        leaders: 50,
        members: 50,
        individuals: 50,
        organizations: 50,
        users: 50,
        narratives: 50,
        stories: 50,
        histories: 50,
        journeys: 50,
        notes: 50,
        pages: 50,
        cars: 50,
        kits: 50,
        media: 50,
        galleries: 50,
        playlists: 50,
        archives: 50,
        visualizations: 50,
        schedules: 50,
        trainings: 50,
        careers: 50,
        initiatives: 50,
        meetups: 50,
        celebrations: 50,
        protocols: 50,
        duties: 50,
        expectations: 50,
        highlights: 50,
        incidents: 50,
        impacts: 50,
        decisions: 50,
        strategies: 50,
        awards: 50,
        experiences: 50,
        categories: 50,
        tags: 50,
        tones: 50,
        features: 50,
        specifications: 50,
        classifications: 50,
        skills: 50,
        principles: 50,
        preferences: 50,
        channels: 50,
        locations: 50,
        forms: 50,
      },
    }),
    mcpPlugin({
      collections: {
        series: { enabled: true },
        seasons: { enabled: true },
        events: { enabled: true },
        sessions: { enabled: true },
        entries: { enabled: true },
        results: { enabled: true },
        points: { enabled: true },
        drivers: { enabled: true },
        leaders: { enabled: true },
        members: { enabled: true },
        individuals: { enabled: true },
        organizations: { enabled: true },
        users: { enabled: true },
        stories: { enabled: true },
        histories: { enabled: true },
        journeys: { enabled: true },
        notes: { enabled: true },
        pages: { enabled: true },
        cars: { enabled: true },
        kits: { enabled: true },
        media: { enabled: true },
        galleries: { enabled: true },
        archives: { enabled: true },
        visualizations: { enabled: true },
        schedules: { enabled: true },
        trainings: { enabled: true },
        careers: { enabled: true },
        initiatives: { enabled: true },
        meetups: { enabled: true },
        celebrations: { enabled: true },
        duties: { enabled: true },
        expectations: { enabled: true },
        highlights: { enabled: true },
        incidents: { enabled: true },
        decisions: { enabled: true },
        strategies: { enabled: true },
        awards: { enabled: true },
        experiences: { enabled: true },
        categories: { enabled: true },
        tags: { enabled: true },
        tones: { enabled: true },
        features: { enabled: true },
        classifications: { enabled: true },
        skills: { enabled: true },
        preferences: { enabled: true },
        channels: { enabled: true },
        forms: { enabled: true }
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})