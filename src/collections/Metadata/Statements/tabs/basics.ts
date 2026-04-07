import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { STATEMENT_STATUS } from '../sources/constants'

export const basicsFields: Field[] = [
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  selectFieldFactory({
    name: 'status',
    options: STATEMENT_STATUS,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  richtextFieldFactory({
    name: 'statement',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
  }),
  dateFieldFactory({
    name: 'issued_date',
    dictionary: dictionary.tabs.basics,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'authority',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: [],
  }),
]
