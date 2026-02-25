// FILE: src/collections/Attributes/Principles/tabs/details.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const detailsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'application',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'advanced'],
    }),
  ),
  advanced(
    textareaFieldFactory({
      name: 'rationale',
      dictionary: dictionary.tabs.details.fields,
      width: 1,
      flags: ['localized', 'advanced'],
    }),
  )
]
