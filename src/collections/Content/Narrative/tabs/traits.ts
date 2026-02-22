// FILE: src/collections/Content/Narratives/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'tone',
          relationTo: 'tones',
          dictionary: dictionary.tabs.traits.fields,
          width: 1,
          flags: ['advanced'],
        }),
      ],
    }
  ),
]
