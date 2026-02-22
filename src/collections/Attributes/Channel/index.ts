// FILE: Attributes/Channel/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { traitsFields } from './tabs/traits'
export const Channels = collectionFactory(
{
slug: 'channels',
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
group: 'Attributes',
useAsTitle: 'name',
defaultColumns: ['name', 'type', 'updatedAt'],
},
},
essentialFields,
[
tabFactory('basics', dictionary.host, basicsFields),
tabFactory('traits', dictionary.host, traitsFields),
],
{ host: dictionary.host, hostPlural: dictionary.hostPlural }
)
