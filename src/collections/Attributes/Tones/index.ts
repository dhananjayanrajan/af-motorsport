import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { basicsFields } from './basics'
import { traitsFields } from './traits'

export const Tones = collectionFactory(
  {
    slug: 'tones',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Attributes',
      useAsTitle: 'name',
      defaultColumns: ['name', 'type', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('traits', dictionary.host, traitsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
