// FILE: Resources/Media/index.ts
import { collectionFactory, tabFactory, groupFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { detailsFields } from './tabs/details'
import { traitsFields } from './tabs/traits'
import { contextsFields } from './tabs/contexts'
const tabGroup = (node: any, fields: any) =>
  groupFactory(node, dictionary.host, fields, true)
export const Media = collectionFactory(
  {
    slug: 'media',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content', 'archive'].includes(role)
        )
      },
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content', 'archive'].includes(role)
        )
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content', 'archive'].includes(role)
        )
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role) =>
          ['admin', 'content', 'archive'].includes(role)
        )
      },
    },
    admin: {
      group: 'Resources',
      useAsTitle: 'name',
      defaultColumns: [],
    },
  },
  essentialFields,
  [
    tabFactory('details', dictionary.host, detailsFields),
    tabFactory('traits', dictionary.host, traitsFields),
    tabFactory('contexts', dictionary.host, contextsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
