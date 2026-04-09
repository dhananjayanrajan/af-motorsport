// FILE: Outcomes/Award/index.ts
import { collectionFactory, tabFactory } from '@/fields/factories/blueprint'
import { dictionary } from './sources/dictionary'
import { essentialFields } from './tabs/essentials'
import { basicsFields } from './tabs/basics'
import { detailsFields } from './tabs/details'
import { assetsFields } from './tabs/assets'
import { contextsFields } from './tabs/contexts'
export const Awards = collectionFactory(
{
slug: 'awards',
labels: { singular: dictionary.host, plural: dictionary.hostPlural },
access: {
read: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'race_admin', 'content'].includes(role)
)
},
create: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'race_admin', 'content'].includes(role)
)
},
update: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'race_admin', 'content'].includes(role)
)
},
delete: ({ req: { user } }) => {
if (!user || !('roles' in user) || !user.roles) return false
return user.roles.some((role) =>
['admin', 'race_admin', 'content'].includes(role)
)
},
},
admin: {
group: 'Outcomes',
useAsTitle: 'name',
defaultColumns: ['name', 'type', 'updatedAt'],
},
},
essentialFields,
[
tabFactory('basics', dictionary.host, basicsFields),
tabFactory('details', dictionary.host, detailsFields),
tabFactory('assets', dictionary.host, assetsFields),
tabFactory('contexts', dictionary.host, contextsFields),
],
{ host: dictionary.host, hostPlural: dictionary.hostPlural }
)
