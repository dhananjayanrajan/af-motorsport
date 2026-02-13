import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { basicsFields } from './basics'
import { detailsFields } from './details'
import { traitsFields } from './traits'
import { contextsFields } from './contexts'

export const Schedules = collectionFactory(
  {
    slug: 'schedules',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Operations',
      useAsTitle: 'name',
      defaultColumns: ['name', 'type', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
