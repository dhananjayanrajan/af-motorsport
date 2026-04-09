// FILE: src/collections/Operations/Duties/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'protocols',
          relationTo: 'protocols',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'expectations',
          relationTo: 'expectations',
          dictionary: dictionary.tabs.contexts.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        })
      ]
    }
  ),
]
