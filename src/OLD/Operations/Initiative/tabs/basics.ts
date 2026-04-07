// FILE: src/collections/Operations/Initiatives/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const basicsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        textFieldFactory({
          name: 'mission',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
        textareaFieldFactory({
          name: 'description',
          dictionary: dictionary.tabs.basics.fields,
          width: 1,
          flags: ['localized', 'index', 'advanced'],
        }),
      ],
    }
  )
]
