// FILE: Content/Story/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { traitsFields } from './tabs/traits'
import { assetsFields } from './tabs/assets'
import { contextsFields } from './tabs/contexts'
export const Stories = collectionFactory(
  {
    slug: 'stories',
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
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('assets', dictionary.host, assetsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
