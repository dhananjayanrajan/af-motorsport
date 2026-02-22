// FILE: Attributes/Category/index.ts
import { collectionFactory, tabFactory, groupFactory } from '@/fields/factories/blueprint';
import { dictionary } from './sources/dictionary';
import { essentialFields } from './tabs/essentials';
import { basicsFields } from './tabs/basics';
import { detailsFields } from './tabs/details';
export const Categories = collectionFactory(
  {
    slug: 'categories',
    labels: { singular: dictionary.host, plural: dictionary.hostPlural },
    access: {
      read: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role: string) =>
          ['admin', 'race_admin', 'content', 'commercial', 'technical', 'hr', 'archive'].includes(role)
        )
      },
      create: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role: string) =>
          ['admin', 'race_admin', 'content', 'commercial', 'technical', 'hr', 'archive'].includes(role)
        )
      },
      update: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role: string) =>
          ['admin', 'race_admin', 'content', 'commercial', 'technical', 'hr', 'archive'].includes(role)
        )
      },
      delete: ({ req: { user } }) => {
        if (!user || !('roles' in user) || !user.roles) return false
        return user.roles.some((role: string) =>
          ['admin', 'race_admin', 'content', 'commercial', 'technical', 'hr', 'archive'].includes(role)
        )
      },
    },
    admin: {
      group: 'Attributes',
      useAsTitle: 'name',
      defaultColumns: ['name', 'updatedAt'],
    },
  },
  essentialFields,
  [
    tabFactory('basics', dictionary.host, basicsFields),
    tabFactory('details', dictionary.host, detailsFields),
  ],
  { host: dictionary.host, hostPlural: dictionary.hostPlural }
);
