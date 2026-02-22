// FILE: src/collections/Outcomes/Incidents/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'decisions',
          relationTo: 'decisions',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'specifications',
          relationTo: 'specifications',
          dictionary: dictionary.tabs.details.fields,
          width: 2,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
]
