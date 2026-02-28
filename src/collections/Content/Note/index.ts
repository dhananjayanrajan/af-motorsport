// FILE: Content/Note/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { traitsFields } from './tabs/traits'
import { assetsFields } from './tabs/assets'
export const Notes = collectionFactory(
  {
    slug: 'notes',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content'].includes(role)
        )
      },
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content'].includes(role)
        )
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content'].includes(role)
        )
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content'].includes(role)
        )
      },
    },
    admin: {
      group: 'Content',
      useAsTitle: 'name',
      defaultColumns: ['name', 'type', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('assets', dictionary.host, assetsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
