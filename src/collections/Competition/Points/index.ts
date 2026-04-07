import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { essentialFields } from './tabs/essentials'

export const Points = collectionFactory(
  {
    slug: 'points',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: () => true,
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'race_admin'].includes(role))
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'race_admin'].includes(role))
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'race_admin'].includes(role))
      },
    },
    admin: {
      group: 'Competition',
      useAsTitle: 'name',
      defaultColumns: ['name', 'alias', 'value', 'scale', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('details', dictionary.host, detailsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
