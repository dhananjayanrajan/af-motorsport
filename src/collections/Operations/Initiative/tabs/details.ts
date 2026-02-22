// FILE: src/collections/Operations/Initiatives/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'narrative',
        relationTo: 'narratives',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['required'],
      }),
    ],
  },
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'strategies',
          relationTo: 'strategies',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'expectations',
          relationTo: 'expectations',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'insights',
          relationTo: 'notes',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
]
