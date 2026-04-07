import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const essentialFields: Field[] = [
  textFieldFactory({
    name: 'name',
    dictionary: dictionary.essential,
    width: 4,
    flags: ['required', 'index', 'unique'],
    minLength: 2,
    maxLength: 100,
  }),
  textFieldFactory({
    name: 'code',
    dictionary: dictionary.essential,
    width: 4,
    flags: ['required', 'index', 'unique'],
    minLength: 2,
    maxLength: 3,
  }),
]
