// FILE: src/collections/Attributes/Skills/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        relationshipFieldFactory({
          name: 'classifications',
          relationTo: 'classifications',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['hasMany', 'advanced'],
        }),
        textFieldFactory({
          name: 'definition',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
        relationshipFieldFactory({
          name: 'features',
          relationTo: 'features',
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
    },
  )
]
