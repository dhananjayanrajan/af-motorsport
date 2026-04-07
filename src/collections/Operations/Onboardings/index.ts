import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { assetsFields } from './tabs/assets'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { essentialFields } from './tabs/essentials'
import { traitsFields } from './tabs/traits'

export const Onboardings = collectionFactory(
  {
    slug: 'onboardings',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: () => true,
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'hr'].includes(role))
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'hr'].includes(role))
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'hr'].includes(role))
      },
    },
    admin: {
      group: 'Operations',
      useAsTitle: 'name',
      defaultColumns: ['name', 'alias', 'type', 'status', 'assigned_to', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('assets', dictionary.host, assetsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
