// FILE: src/collections/Attributes/Classifications/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const detailsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        textFieldFactory({
          name: 'definition',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
        textareaFieldFactory({
          name: 'criteria',
          dictionary: dictionary.tabs.details.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
      ],
    }
  ),
]
