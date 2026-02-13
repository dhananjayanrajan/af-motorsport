import { collectionFactory, tabFactory, groupFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'

export const Members = collectionFactory(
  {
    slug: 'members',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Team',
      useAsTitle: '',
      defaultColumns: [],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, []),
    tabFactory('details', dictionary.host, []),
    tabFactory('traits', dictionary.host, []),
    tabFactory('metrics', dictionary.host, []),
    tabFactory('assets', dictionary.host, []),
    tabFactory('contexts', dictionary.host, []),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
