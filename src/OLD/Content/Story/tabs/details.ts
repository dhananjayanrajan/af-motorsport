// FILE: src/collections/Content/Stories/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  {
    type: 'row',
    fields: [
      textFieldFactory({
        name: 'alias',
        dictionary: dictionary.tabs.details.fields,
        width: 1,
        flags: ['localized', 'index'],
      }),
      advanced(
        relationshipFieldFactory({
          name: 'narrative',
          relationTo: 'narratives',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['advanced'],
        })
      )
    ],
  },
]
