// FILE: Content/History/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { detailsFields } from './tabs/details'
import { traitsFields } from './tabs/traits'
import { assetsFields } from './tabs/assets'
export const Histories = collectionFactory(
{
slug: 'histories',
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
group: 'Content',
useAsTitle: 'name',
defaultColumns: ['name', 'type', 'updatedAt'],
},
},
essentialFields,
[
tabFactory('details', dictionary.host, detailsFields),
tabFactory('traits', dictionary.host, traitsFields),
tabFactory('assets', dictionary.host, assetsFields),
],
{ host: dictionary.host, hostPlural: dictionary.hostPlural }
)
