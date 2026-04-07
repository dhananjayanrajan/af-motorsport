// FILE: src/collections/Competition/Seasons/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const contextsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.authorities,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'organizations',
              relationTo: 'organizations',
              dictionary: dictionary.tabs.contexts.fields.authorities.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'individuals',
              relationTo: 'individuals',
              dictionary: dictionary.tabs.contexts.fields.authorities.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.associations,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'teams',
              relationTo: 'organizations',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'participants',
              relationTo: 'drivers',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 2,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  ),
  advanced(
    relationshipFieldFactory({
      name: 'notes',
      relationTo: 'notes',
      dictionary: dictionary.tabs.contexts.fields,
      width: 2,
      flags: ['hasMany', 'advanced'],
    }),
  )
]
