// FILE: src/collections/Content/Notes/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const detailsFields: Field[] = [
  advanced(
    textFieldFactory({
      name: 'alias',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  ),
  advanced(
    textareaFieldFactory({
      name: 'description',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'advanced'],
    }),
  )
]
