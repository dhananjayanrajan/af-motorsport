import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { detailsFields } from './details'
import { traitsFields } from './traits'
import { assetsFields } from './assets'
import { contextsFields } from './contexts'

export const Stories = collectionFactory(
  {
    slug: 'stories',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Content',
      useAsTitle: 'name',
      defaultColumns: ['name', 'type', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('assets', dictionary.host, assetsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
