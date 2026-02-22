// FILE: Attributes/Classification/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { contextsFields } from './tabs/contexts'
export const Classifications = collectionFactory(
{
slug: 'classifications',
labels: { singular: dictionary.host, plural: dictionary.hostPlural },
access: {
read: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'technical'].includes(role)
)
},
create: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'technical'].includes(role)
)
},
update: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'technical'].includes(role)
)
},
delete: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'technical'].includes(role)
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
tabFactory('contexts', dictionary.host, contextsFields),
],
{ host: dictionary.host, hostPlural: dictionary.hostPlural }
)
