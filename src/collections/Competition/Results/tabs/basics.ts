import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const basicsFields: Field[] = [
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics.fields,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
