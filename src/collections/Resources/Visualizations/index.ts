import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { detailsFields } from './details'

export const Visualizations = collectionFactory(
  {
    slug: 'visualizations',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Resources',
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
