import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { basicsFields } from './tabs/basics'
import { essentialFields } from './tabs/essentials'

export const Policies = collectionFactory(
  {
    slug: 'policies',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: () => true,
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'legal'].includes(role))
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'legal'].includes(role))
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) => ['admin', 'legal'].includes(role))
      },
    },
    admin: {
      group: 'Metadata',
      useAsTitle: 'name',
      defaultColumns: ['name', 'alias', 'effective_date', 'last_reviewed', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
