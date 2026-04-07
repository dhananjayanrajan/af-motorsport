// FILE: src/collections/Attributes/Tags/tabs/basics.ts
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'

export const basicsFields: Field[] = [
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics.fields,
    width: 1,
    flags: ['localized'],
  }),
  textFieldFactory({
    name: 'context',
    dictionary: dictionary.tabs.basics.fields,
    width: 1,
    flags: ['localized'],
  }),
]
