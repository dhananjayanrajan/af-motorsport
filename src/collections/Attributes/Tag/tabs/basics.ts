// FILE: src/collections/Attributes/Tags/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const basicsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        textareaFieldFactory({
          name: 'description',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
        textFieldFactory({
          name: 'context',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'advanced'],
        }),
      ],
    }
  ),
]
