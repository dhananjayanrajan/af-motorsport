// FILE: src/collections/Resources/Cars/tabs/contexts.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const contextsFields: Field[] = [
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.connections,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'manufacturers',
              relationTo: 'organizations',
              dictionary: dictionary.tabs.contexts.fields.connections.fields.manufacturers,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'drivers',
              relationTo: 'drivers',
              dictionary: dictionary.tabs.contexts.fields.connections.fields.drivers,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'crew',
              relationTo: 'members',
              dictionary: dictionary.tabs.contexts.fields.connections.fields.crew,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
          ]
        }
      ]
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
              name: 'organizations',
              relationTo: 'organizations',
              dictionary: dictionary.tabs.contexts.fields.associations.fields,
              width: 3,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'leaders',
              relationTo: 'leaders',
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
  ),
  advanced(
    groupFactory(
      dictionary.tabs.contexts.fields.content,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'histories',
              relationTo: 'histories',
              dictionary: dictionary.tabs.contexts.fields.content.fields,
              width: 1,
              flags: ['advanced'],
            }),
          ]
        }
      ]
    )
  )
]
