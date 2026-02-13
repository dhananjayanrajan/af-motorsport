import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { detailsFields } from './details'
import { traitsFields } from './traits'

export const Playlists = collectionFactory(
  {
    slug: 'playlists',
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
    tabFactory('traits', dictionary.host, traitsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
