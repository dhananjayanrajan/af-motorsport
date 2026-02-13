import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { basicsFields } from './basics'
import { detailsFields } from './details'
import { traitsFields } from './traits'
import { metricsFields } from './metrics'
import { assetsFields } from './assets'
import { contextsFields } from './contexts'

export const Members = collectionFactory(
  {
    slug: 'members',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Entities',
      useAsTitle: 'first',
      defaultColumns: ['first', 'last', 'type', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('metrics', dictionary.host, metricsFields),
    tabFactory('assets', dictionary.host, assetsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
