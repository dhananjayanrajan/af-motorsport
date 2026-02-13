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

// Plugins
import { plugins } from './plugins'
import { searchPlugin } from '@payloadcms/plugin-search'
import { mcpPlugin } from '@payloadcms/plugin-mcp'

// Globals
import { Header } from '@/globals/Configurations/Header'
import { Footer } from '@/globals/Configurations/Footer'

import { Socials } from './globals/Connectivity/Socials'
import { Policies } from './globals/Branding/Policies'
import { Identity } from './globals/Branding/Identity'
import { Announcements } from './globals/Connectivity/Announcements'
import { Questions } from './globals/Connectivity/Questions'

// Collections
import { Categories } from '@/collections/Meta/Categories'
import { Tags } from './collections/Meta/Tags'
import { Users } from '@/collections/Team/Users'
import { Media } from '@/collections/Resources/Media'
import { Pages } from '@/collections/Content/Pages'

import { Series } from '@/collections/Competition/Series'
import { Seasons } from '@/collections/Competition/Seasons'
import { Events } from '@/collections/Competition/Events'
import { Sessions } from '@/collections/Competition/Sessions'
import { Entries } from '@/collections/Competition/Entries'
import { Results } from '@/collections/Competition/Results'
import { Points } from '@/collections/Competition/Points'
import { Drivers } from '@/collections/Entities/Drivers'
import { Leaders } from '@/collections/Entities/Leaders'
import { Members } from '@/collections/Entities/Members'
import { Individuals } from '@/collections/Entities/Individuals'
import { Organizations } from '@/collections/Entities/Organizations'
import { Narratives } from '@/collections/Content/Narratives'
import { Stories } from '@/collections/Content/Stories'
import { Histories } from '@/collections/Content/Histories'
import { Journeys } from '@/collections/Content/Journeys'
import { Notes } from '@/collections/Content/Notes'
import { Cars } from '@/collections/Resources/Cars'
import { Kits } from '@/collections/Resources/Kits'
import { Galleries } from '@/collections/Resources/Galleries'
import { Playlists } from '@/collections/Resources/Playlists'
import { Archives } from '@/collections/Resources/Archives'
import { Visualizations } from '@/collections/Resources/Visualizations'
import { Schedules } from '@/collections/Operations/Schedules'
import { Trainings } from '@/collections/Operations/Trainings'
import { Careers } from '@/collections/Operations/Careers'
import { Initiatives } from '@/collections/Operations/Initiatives'
import { Meetups } from '@/collections/Operations/Meetups'
import { Celebrations } from '@/collections/Operations/Celebrations'
import { Protocols } from '@/collections/Operations/Protocols'
import { Duties } from '@/collections/Operations/Duties'
import { Expectations } from '@/collections/Operations/Expectations'
import { Highlights } from '@/collections/Outcomes/Highlights'
import { Incidents } from '@/collections/Outcomes/Incidents'
import { Impacts } from '@/collections/Outcomes/Impacts'
import { Decisions } from '@/collections/Outcomes/Decisions'
import { Strategies } from '@/collections/Outcomes/Strategies'
import { Awards } from '@/collections/Outcomes/Awards'
import { Experiences } from '@/collections/Outcomes/Experiences'
import { Tones } from '@/collections/Attributes/Tones'
import { Features } from '@/collections/Attributes/Features'
import { Specifications } from '@/collections/Attributes/Specifications'
import { Classifications } from '@/collections/Attributes/Classifications'
import { Skills } from '@/collections/Attributes/Skills'
import { Principles } from '@/collections/Attributes/Principles'
import { Preferences } from '@/collections/Attributes/Preferences'
import { Channels } from '@/collections/Attributes/Channels'
import { Locations } from '@/collections/Attributes/Locations'



const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      beforeLogin: [],
      beforeDashboard: [],
    },
    user: Users.slug,
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
    fallbackLanguage: 'en',
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en-US',
      },
      {
        label: 'Spanish',
        code: 'es-MX',
      },
      {
        label: 'Portugeese',
        code: 'pt-PT',
      },
    ],
    defaultLocale: 'en-US',
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
  //email: nodemailerAdapter(),
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
        series: {
          enabled: true
        },
        seasons: {
          enabled: true
        },
        events: {
          enabled: true
        },
        sessions: {
          enabled: true
        },
        entries: {
          enabled: true
        },
        results: {
          enabled: true
        },
        points: {
          enabled: true
        },
        drivers: {
          enabled: true
        },
        leaders: {
          enabled: true
        },
        members: {
          enabled: true
        },
        individuals: {
          enabled: true
        },
        organizations: {
          enabled: true
        },
        users: {
          enabled: true
        },
        stories: {
          enabled: true
        },
        histories: {
          enabled: true
        },
        journeys: {
          enabled: true
        },
        notes: {
          enabled: true
        },
        pages: {
          enabled: true
        },
        cars: {
          enabled: true
        },
        kits: {
          enabled: true
        },
        media: {
          enabled: true
        },
        galleries: {
          enabled: true
        },
        archives: {
          enabled: true
        },
        visualizations: {
          enabled: true
        },
        schedules: {
          enabled: true
        },
        trainings: {
          enabled: true
        },
        careers: {
          enabled: true
        },
        initiatives: {
          enabled: true
        },
        meetups: {
          enabled: true
        },
        celebrations: {
          enabled: true
        },
        duties: {
          enabled: true
        },
        expectations: {
          enabled: true
        },
        highlights: {
          enabled: true
        },
        incidents: {
          enabled: true
        },
        decisions: {
          enabled: true
        },
        strategies: {
          enabled: true
        },
        awards: {
          enabled: true
        },
        experiences: {
          enabled: true
        },
        categories: {
          enabled: true
        },
        tags: {
          enabled: true
        },
        tones: {
          enabled: true
        },
        features: {
          enabled: true
        },
        classifications: {
          enabled: true
        },
        skills: {
          enabled: true
        },
        preferences: {
          enabled: true
        },
        channels: {
          enabled: true
        },
        forms: {
          enabled: true
        }
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})
