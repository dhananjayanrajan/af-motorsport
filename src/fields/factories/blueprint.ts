// FILE: src/fields/factories/blueprint.ts
import type { CollectionConfig, Tab, Field, StaticLabel, CollectionSlug } from 'payload'
import { enable, show, visibilityGroup } from './toggles/visibility'
import { createToggleGroup } from '@/fields/common/toggle'
import { createSidebarFields } from '@/fields/common/sidebar'
import { createSeoTab } from '@/fields/common/seo'
import { relationshipFieldFactory } from './fields/relationshipField'
import { textFieldFactory } from './fields/textField'
import { advanced } from './toggles/advanced'

const STANDARD_TABS: Record<string, { name: string; label: StaticLabel; description: StaticLabel }> = {
  basics: {
    name: 'basics',
    label: { en: 'Basics', es: 'Básicos', pt: 'Básicos' },
    description: { en: 'Identifying info.', es: 'Información de identificación.', pt: 'Informações de identificação.' }
  },
  details: {
    name: 'details',
    label: { en: 'Details', es: 'Detalles', pt: 'Detalhes' },
    description: { en: 'Extra data.', es: 'Datos adicionales.', pt: 'Dados extras.' }
  },
  traits: {
    name: 'traits',
    label: { en: 'Traits', es: 'Rasgos', pt: 'Traços' },
    description: { en: 'Characteristics.', es: 'Características.', pt: 'Características.' }
  },
  metrics: {
    name: 'metrics',
    label: { en: 'Metrics', es: 'Métricas', pt: 'Métricas' },
    description: { en: 'Performance stats.', es: 'Estadísticas.', pt: 'Estatísticas.' }
  },
  assets: {
    name: 'assets',
    label: { en: 'Assets', es: 'Activos', pt: 'Ativos' },
    description: { en: 'Media files.', es: 'Archivos multimedia.', pt: 'Arquivos de mídia.' }
  },
  contexts: {
    name: 'contexts',
    label: { en: 'Contexts', es: 'Contextos', pt: 'Contextos' },
    description: { en: 'Contextual information.', es: 'Información contextual.', pt: 'Informações contextuais.' }
  },
}

const isAdvancedField = (field: Field): boolean => {
  if ('fields' in field && !('name' in field)) {
    return field.fields.every(isAdvancedField)
  }
  return field.admin?.condition?.toString().includes('advanced') ?? false
}

export const groupFactory = (
  groupLabels: { name: string; label: StaticLabel; entity: StaticLabel; description: StaticLabel },
  host: StaticLabel,
  fields: Field[],
  isArray = false,
): Field => {
  const baseFields = isArray
    ? [
      {
        name: 'list',
        type: 'array' as const,
        label: groupLabels.entity,
        admin: { initCollapsed: true, isSortable: true },
        fields: [...fields, visibilityGroup({ record: host, entity: groupLabels.entity })],
      },
    ]
    : fields

  const group: Field = {
    name: groupLabels.name,
    type: 'group',
    label: groupLabels.label,
    admin: { width: '100%', hideGutter: false, description: groupLabels.description },
    fields: baseFields,
  }

  const allAdvanced = fields.every(isAdvancedField)

  if (allAdvanced) {
    const advancedGroup = advanced(group)
    if (advancedGroup.admin) {
      delete (advancedGroup.admin as any).width
    }
    return advancedGroup
  }

  return group
}

interface GroupFieldFactoryOptions {
  name: string
  dictionary: Record<string, any>
  hostLabel: StaticLabel
  fields: Field[]
  isArray?: boolean
}

export const groupFieldFactory = (opts: GroupFieldFactoryOptions): Field => {
  const dictNode = opts.dictionary[opts.name]

  return groupFactory(
    {
      name: opts.name,
      label: dictNode?.label ?? opts.name,
      entity: dictNode?.entity ?? opts.name,
      description: dictNode?.description ?? '',
    },
    opts.hostLabel,
    opts.fields,
    opts.isArray
  )
}

export const tabFactory = (
  type: keyof typeof STANDARD_TABS,
  host: StaticLabel,
  groups: Field[],
): Tab => {
  const meta = STANDARD_TABS[type]
  return {
    name: meta.name,
    label: meta.label,
    admin: { description: meta.description },
    fields: [
      {
        type: 'group',
        label: meta.label,
        admin: { description: meta.description, hideGutter: false },
        fields: [
          enable({ record: host, label: meta.label })
        ]
      }, ...groups, show({ record: host, label: meta.label })
    ],
  }
}

export const collectionFactory = (
  config: Omit<CollectionConfig, 'fields'>,
  essentials: Field[],
  tabs: Tab[],
  hostLabels: { host: StaticLabel; hostPlural: StaticLabel },
): CollectionConfig => {
  return {
    ...config,
    labels: {
      singular: hostLabels.host,
      plural: hostLabels.hostPlural,
      ...config.labels,
    },
    access: config.access,
    hooks: {
      beforeChange: [],
      afterRead: [],
      beforeValidate: [],
      ...config.hooks,
    },
    admin: {
      useAsTitle: 'id',
      defaultColumns: ['updatedAt', 'createdAt'],
      pagination: { defaultLimit: 10, limits: [10, 20, 50, 100] },
      ...config.admin,
    },
    fields: [
      createToggleGroup(hostLabels.host),
      ...essentials,
      {
        type: 'tabs',
        tabs: [...tabs, createSeoTab()],
      },
      ...createSidebarFields({
        record: hostLabels.host,
        records: hostLabels.hostPlural,
        useAsTitle: config.admin?.useAsTitle
      }),
    ],
    timestamps: true,
    dbName: config.slug,
  } as CollectionConfig
}

interface ConnectFactoryOptions {
  name: string
  relationTo: CollectionSlug | CollectionSlug[]
  dictionary?: Record<string, any>
  hostLabel: StaticLabel
  width?: 1 | 2 | 3 | 4 | 5
  flags?: ('required' | 'localized' | 'index' | 'unique' | 'hasMany' | 'advanced' | 'readonly' | 'disabled' | 'hidden')[]
}

export const connectFactory = (opts: ConnectFactoryOptions, isArray = false): Field => {
  const fields: Field[] = [
    relationshipFieldFactory({
      name: 'relationshipField',
      relationTo: opts.relationTo,
      dictionary: opts.dictionary,
      width: opts.width,
      flags: opts.flags,
    }),
    textFieldFactory({
      name: 'context',
      dictionary: opts.dictionary,
      width: opts.width,
      flags: opts.flags,
    }),
    textFieldFactory({
      name: 'caption',
      dictionary: opts.dictionary,
      width: opts.width,
      flags: opts.flags,
    }),
  ]

  return groupFactory(
    {
      name: opts.name,
      label: opts.hostLabel,
      entity: opts.hostLabel,
      description: { en: 'Connect group', es: 'Grupo de conexión', pt: 'Grupo de conexão' },
    },
    opts.hostLabel,
    fields,
    isArray
  )
}
