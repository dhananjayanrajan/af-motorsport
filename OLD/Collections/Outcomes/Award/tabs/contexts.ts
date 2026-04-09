// FILE: src/collections/Outcomes/Awards/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const contextsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.associations,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'leaders',
              relationTo: 'leaders',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'organizations',
              relationTo: 'organizations',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'individuals',
              relationTo: 'individuals',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      false
    )
  )
]
