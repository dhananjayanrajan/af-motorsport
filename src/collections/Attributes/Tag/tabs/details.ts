// FILE: src/collections/Attributes/Tags/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        textareaFieldFactory({
          name: 'description',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
      ],
    }
  ),
  advanced(
    {
      type: 'row',
      fields: [
        textFieldFactory({
          name: 'context',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
      ],
    }
  ),
]
