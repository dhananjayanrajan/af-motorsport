import { adminSearchPlugin } from '@jhb.software/payload-admin-search'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { searchPlugin } from '@payloadcms/plugin-search'
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
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { pt } from '@payloadcms/translations/languages/pt'
import { payloadEnhancedSidebar } from '@veiag/payload-enhanced-sidebar'
import path from 'path'
import { buildConfig } from 'payload'
import { calendarPlugin } from 'schedular-calendar-plugin'
import { fileURLToPath } from 'url'
import { collections, globals, rawCollections } from './lib/payload-registry'
import { plugins as customPlugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseConnection = process.env.DATABASE_URL

if (!databaseConnection) {
  throw new Error('DATABASE_URL is missing from env variables')
}

export default buildConfig({
  bin: [{ scriptPath: path.resolve(dirname, 'seed.ts'), key: 'seed' }],
  admin: {
    components: {
      views: {
        dashboard: {
          Component: '/src/widgets/DashboardOrchestrator',
          path: '/',
          exact: true,
        },
      },
    },
    suppressHydrationWarning: true,
  },
  collections,
  globals,
  db: postgresAdapter({
    pool: {
      connectionString: databaseConnection,
    },
    push: process.env.NODE_ENV !== 'production' ? false : true,
  }),
  editor: lexicalEditor({
    features: () => [
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      LinkFeature({
        enabledCollections: ['pages'],
        fields: ({ defaultFields }) => {
          const filtered = defaultFields.filter((f) => !('name' in f && f.name === 'url'))
          return [
            ...filtered,
            {
              name: 'url',
              type: 'text',
              admin: { condition: ({ linkType }) => linkType !== 'internal' },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ]
        },
      }),
      IndentFeature(),
      EXPERIMENTAL_TableFeature(),
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
    ...customPlugins,
    payloadEnhancedSidebar({
      tabs: [
        { id: 'dashboard', type: 'link', href: '/', icon: 'LayoutDashboard', label: { en: 'Dashboard', es: 'Panel', pt: 'Painel' } },
        { id: 'attributes', type: 'tab', icon: 'Cog', label: { en: 'Attributes', es: 'Atributos', pt: 'Atributos' }, collections: ['categories', 'channels', 'classifications', 'features', 'locations', 'preferences', 'principles', 'skills', 'specifications', 'tags', 'tones'] },
        { id: 'competition', type: 'tab', icon: 'Trophy', label: { en: 'Competition', es: 'Competición', pt: 'Competição' }, collections: ['entries', 'events', 'points', 'results', 'seasons', 'series', 'sessions'] },
        { id: 'content', type: 'tab', icon: 'FileText', label: { en: 'Content', es: 'Contenido', pt: 'Conteúdo' }, collections: ['histories', 'journeys', 'narratives', 'notes', 'pages', 'stories'] },
        { id: 'entities', type: 'tab', icon: 'Users', label: { en: 'Entities', es: 'Entidades', pt: 'Entidades' }, collections: ['drivers', 'individuals', 'leaders', 'members', 'organizations', 'users'] },
        { id: 'operations', type: 'tab', icon: 'Zap', label: { en: 'Operations', es: 'Operaciones', pt: 'Operações' }, collections: ['careers', 'celebrations', 'duties', 'expectations', 'initiatives', 'meetups', 'protocols', 'schedules', 'trainings'] },
        { id: 'outcomes', type: 'tab', icon: 'Target', label: { en: 'Outcomes', es: 'Resultados', pt: 'Resultados' }, collections: ['awards', 'decisions', 'experiences', 'highlights', 'impacts', 'incidents', 'strategies'] },
        { id: 'resources', type: 'tab', icon: 'Package', label: { en: 'Resources', es: 'Recursos', pt: 'Recursos' }, collections: ['archives', 'cars', 'galleries', 'kits', 'media', 'playlists', 'visualizations'] },
        { id: 'settings', type: 'tab', icon: 'Settings', label: { en: 'Settings', es: 'Ajustes', pt: 'Configurações' }, globals: ['header', 'footer', 'identity', 'policies', 'socials', 'announcements', 'questions'] },
      ],
      showLogout: true,
    }),
    calendarPlugin(),
    adminSearchPlugin({ headerSearchComponentStyle: 'bar' }),
    searchPlugin({
      collections: rawCollections.map(c => c.slug),
      defaultPriorities: Object.fromEntries(rawCollections.map(c => [c.slug, 50])),
    }),
    mcpPlugin({
      collections: Object.fromEntries(rawCollections.map(c => [c.slug, { enabled: true }]))
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})