// FILE: Entities/Individual/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { traitsFields } from './tabs/traits'
import { assetsFields } from './tabs/assets'
import { contextsFields } from './tabs/contexts'
export const Individuals = collectionFactory(
  {
    slug: 'individuals',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'hr', 'race_admin'].includes(role)
        )
      },
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'hr', 'race_admin'].includes(role)
        )
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'hr', 'race_admin'].includes(role)
        )
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'hr', 'race_admin'].includes(role)
        )
      },
    },
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
    tabFactory('assets', dictionary.host, assetsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
