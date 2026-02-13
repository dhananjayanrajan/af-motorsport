import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './dictionary'
import { essentialFields } from './essentials'
import { basicsFields } from './basics'
import { detailsFields } from './details'
import { metricsFields } from './metrics'
import { assetsFields } from './assets'
import { contextsFields } from './contexts'

export const Seasons = collectionFactory(
  {
    slug: 'seasons',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    admin: {
      group: 'Competition',
      useAsTitle: 'name',
      defaultColumns: ['name', 'series', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('metrics', dictionary.host, metricsFields),
    tabFactory('assets', dictionary.host, assetsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
