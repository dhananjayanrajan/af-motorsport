import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'

export const detailsFields: Field[] = [
  radioFieldFactory({
    name: 'access',
    options: ['public', 'private', 'exclusive'],
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    layout: 'horizontal',
  }),
  textareaFieldFactory({
    name: 'specification',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details.fields,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
