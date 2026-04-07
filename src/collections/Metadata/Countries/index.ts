import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { basicsFields } from './tabs/basics'
import { essentialFields } from './tabs/essentials'

export const Countries = collectionFactory(
  {
    slug: 'countries',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: () => true,
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin'].includes(role))
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin'].includes(role))
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin'].includes(role))
      },
    },
    admin: {
      group: 'Metadata',
      useAsTitle: 'name',
      defaultColumns: ['name', 'code', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
