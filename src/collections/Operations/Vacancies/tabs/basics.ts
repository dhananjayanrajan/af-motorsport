import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'

export const basicsFields: Field[] = [
  textFieldFactory({
    name: 'title',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: ['required'],
    minLength: 2,
    maxLength: 100,
  }),
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 6,
  }),
]
