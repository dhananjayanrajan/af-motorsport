import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { detailsFields } from './details'

export const Tags = collectionFactory(
  {
    slug: 'tags',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Attributes',
      useAsTitle: 'name',
      defaultColumns: ['name', 'type', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('details', dictionary.host, detailsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
