// payload.config.ts
import path from 'path'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { searchPlugin } from '@payloadcms/plugin-search'
import { calendarPlugin } from 'schedular-calendar-plugin'

import {
  BoldFeature,
  EXPERIMENTAL_TableFeature,
  IndentFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { pt } from '@payloadcms/translations/languages/pt'

import { revalidateTag } from 'next/cache'

import { Championships } from '@/collections/Competition/Championships'
import { Circuits } from '@/collections/Competition/Circuits'
import { Entries } from '@/collections/Competition/Entries'
import { Events } from '@/collections/Competition/Events'
import { Points } from '@/collections/Competition/Points'
import { Races } from '@/collections/Competition/Races'
import { Results } from '@/collections/Competition/Results'
import { Seasons } from '@/collections/Competition/Seasons'
import { Series } from '@/collections/Competition/Series'
import { Sessions } from '@/collections/Competition/Sessions'

import { Drivers } from '@/collections/Entities/Drivers'
import { Individuals } from '@/collections/Entities/Individuals'
import { Leaders } from '@/collections/Entities/Leaders'
import { Members } from '@/collections/Entities/Members'
import { Organizations } from '@/collections/Entities/Organizations'
import { Teams } from '@/collections/Entities/Teams'

import { Initiatives } from '@/collections/Operations/Initiatives'
import { Meetups } from '@/collections/Operations/Meetups'
import { Onboardings } from '@/collections/Operations/Onboardings'
import { Trainings } from '@/collections/Operations/Trainings'
import { Vacancies } from '@/collections/Operations/Vacancies'

import { Awards } from '@/collections/Outcomes/Awards'
import { Celebrations } from '@/collections/Outcomes/Celebrations'
import { Incidents } from '@/collections/Outcomes/Incidents'
import { Interviews } from '@/collections/Outcomes/Interviews'

import { Cars } from '@/collections/Resources/Cars'
import { Garages } from '@/collections/Resources/Garages'
import { Helmets } from '@/collections/Resources/Helmets'
import { Media } from '@/collections/Resources/Media'
import { Suits } from '@/collections/Resources/Suits'

import { Categories } from '@/collections/Metadata/Category'
import { Designations } from '@/collections/Metadata/Designations'
import { Policies as PoliciesCollection } from '@/collections/Metadata/Policies'
import { Regulations } from '@/collections/Metadata/Regulations'
import { Skills } from '@/collections/Metadata/Skills'
import { Slides } from '@/collections/Metadata/Slides'
import { Statements } from '@/collections/Metadata/Statements'
import { Statuses } from '@/collections/Metadata/Statuses'
import { Tags } from '@/collections/Metadata/Tags'
import { Countries } from './collections/Metadata/Countries'

import { Users } from '@/collections/Entities/User'
import { Pages } from '@/collections/Metadata/Pages'

import { Plans } from '@/collections/Pipelines/Plans'
import { Programs } from '@/collections/Pipelines/Programs'
import { Timelines } from '@/collections/Pipelines/Timelines'

import { Identity } from '@/globals/Branding/Identity'
import { Footer } from '@/globals/Configurations/Footer'
import { Header } from '@/globals/Configurations/Header'
import { Announcements } from '@/globals/Connectivity/Announcements'
import { Questions } from '@/globals/Connectivity/Questions'
import { Socials } from '@/globals/Connectivity/Socials'

import { plugins } from './plugins'

const revalidateCollection: CollectionAfterChangeHook = async ({ doc, collection }) => {
  revalidateTag(collection.slug)
  if (doc?.slug) revalidateTag(`${collection.slug}-${doc.slug}`)
  return doc
}

const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, global }) => {
  revalidateTag(`global_${global.slug}`)
  return doc
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error('DATABASE_URL missing')

const collections = [
  Series, Seasons, Events, Sessions, Entries, Results, Points, Circuits, Championships, Races,
  Teams, Drivers, Leaders, Members, Individuals, Organizations, Users,
  Meetups, Initiatives, Trainings, Vacancies, Onboardings,
  Awards, Celebrations, Interviews, Incidents,
  Cars, Helmets, Suits, Garages, Media,
  Designations, Skills, Statuses, Regulations, PoliciesCollection, Statements, Slides, Pages, Categories, Tags, Countries,
  Plans, Timelines, Programs
].map((col) => ({
  ...col,
  hooks: {
    ...col.hooks,
    afterChange: [...(col.hooks?.afterChange || []), revalidateCollection],
  },
}))

const globals = [
  Header,
  Footer,
  Identity,
  Announcements,
  Questions,
  Socials,
].map((g) => ({
  ...g,
  hooks: {
    ...g.hooks,
    afterChange: [...(g.hooks?.afterChange || []), revalidateGlobal],
  },
}))

export default buildConfig({
  admin: {
    components: {
      beforeLogin: [],
      beforeDashboard: [],
    },
    user: Users.slug,
  },
  collections,
  globals,
  db: postgresAdapter({
    pool: { connectionString: DATABASE_URL },
  }),
  editor: lexicalEditor({
    features: () => [
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      IndentFeature(),
      EXPERIMENTAL_TableFeature(),
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
    ],
  }),
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
  plugins: [
    ...plugins,
    calendarPlugin(),
    searchPlugin({
      collections: collections.map((c) => c.slug),
    }),
    mcpPlugin({
      collections: Object.fromEntries(collections.map((c) => [c.slug, { enabled: true }])),
      globals: Object.fromEntries(globals.map((g) => [g.slug, { enabled: true }])),
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})