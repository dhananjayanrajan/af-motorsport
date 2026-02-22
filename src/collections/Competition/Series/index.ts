// FILE: Competition/Series/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { traitsFields } from './tabs/traits'
import { metricsFields } from './tabs/metrics'
import { assetsFields } from './tabs/assets'
import { contextsFields } from './tabs/contexts'
export const Series = collectionFactory(
  {
    slug: 'series',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'race_admin'].includes(role)
        )
      },
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'race_admin'].includes(role)
        )
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'race_admin'].includes(role)
        )
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'race_admin'].includes(role)
        )
      },
    },
    admin: {
      group: 'Competition',
      useAsTitle: 'name',
      defaultColumns: ['name', 'alias', 'updatedAt'],
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
