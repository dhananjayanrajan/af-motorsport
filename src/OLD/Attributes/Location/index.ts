// FILE: Attributes/Location/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { basicsFields } from './tabs/basics'
import { contextsFields } from './tabs/contexts'
import { detailsFields } from './tabs/details'
import { essentialFields } from './tabs/essentials'
import { traitsFields } from './tabs/traits'
export const Locations = collectionFactory(
    {
        slug: 'locations',
        labels: { singular: dictionary.host, plural: dictionary.hostPlural },
        access: {
            read: ({ req: { user } }) => {
                if (!user || !('roles' in user) || !user.roles) return false
                return user.roles.some((role) =>
                    ['admin', 'commercial', 'race_admin'].includes(role)
                )
            },
            create: ({ req: { user } }) => {
                if (!user || !('roles' in user) || !user.roles) return false
                return user.roles.some((role) =>
                    ['admin', 'commercial', 'race_admin'].includes(role)
                )
            },
            update: ({ req: { user } }) => {
                if (!user || !('roles' in user) || !user.roles) return false
                return user.roles.some((role) =>
                    ['admin', 'commercial', 'race_admin'].includes(role)
                )
            },
            delete: ({ req: { user } }) => {
                if (!user || !('roles' in user) || !user.roles) return false
                return user.roles.some((role) =>
                    ['admin', 'commercial', 'race_admin'].includes(role)
                )
            },
        },
        admin: {
            group: 'Attributes',
            useAsTitle: 'name',
            defaultColumns: ['name', 'type', 'updatedAt'],
        },
    },
    essentialFields,
    [
        tabFactory('basics', dictionary.host, basicsFields),
        tabFactory('details', dictionary.host, detailsFields),
        tabFactory('traits', dictionary.host, traitsFields),
        tabFactory('contexts', dictionary.host, contextsFields),
    ],
    { host: dictionary.host, hostPlural: dictionary.hostPlural }
)
