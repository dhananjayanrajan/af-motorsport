// FILE: src/collections/Outcomes/Strategies/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { groupFactory } from '@/fields/factories/blueprint'

export const detailsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'methodology',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  ),
  advanced(
    groupFactory(
      dictionary.tabs.details.fields.outcomes,
      dictionary.host,
      [
        {
          type: 'row',
          fields: [
            relationshipFieldFactory({
              name: 'decisions',
              relationTo: 'decisions',
              dictionary: dictionary.tabs.details.fields.outcomes.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
            relationshipFieldFactory({
              name: 'impacts',
              relationTo: 'impacts',
              dictionary: dictionary.tabs.details.fields.outcomes.fields,
              width: 1,
              flags: ['hasMany', 'advanced'],
            }),
          ],
        },
      ],
      true
    )
  ),
]
