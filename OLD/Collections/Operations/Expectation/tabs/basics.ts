// FILE: src/collections/Operations/Expectations/tabs/basics.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { advanced } from '@/fields/factories/toggles/advanced'

export const basicsFields: Field[] = [
  advanced(
    textareaFieldFactory({
      name: 'statement',
      dictionary: dictionary.tabs.basics.fields,
      width: 1,
      flags: ['localized', 'index', 'advanced'],
    }),
  )
]
