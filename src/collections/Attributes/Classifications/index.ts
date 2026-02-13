import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { basicsFields } from './basics'
import { detailsFields } from './details'
import { contextsFields } from './contexts'

export const Classifications = collectionFactory(
  {
    slug: 'classifications',
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
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
