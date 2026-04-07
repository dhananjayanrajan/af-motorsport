import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const essentialFields: Field[] = [
  textFieldFactory({
    name: 'first_name',
    dictionary: dictionary.essential,
    width: 3,
    flags: ['required', 'index'],
    minLength: 1,
    maxLength: 50,
  }),
  textFieldFactory({
    name: 'last_name',
    dictionary: dictionary.essential,
    width: 3,
    flags: ['required', 'index'],
    minLength: 1,
    maxLength: 50,
  }),
  textFieldFactory({
    name: 'alias',
    dictionary: dictionary.essential,
    width: 3,
    flags: [],
    minLength: 1,
    maxLength: 50,
  }),
]
