import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { POINT_SCALE } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'scale',
    options: POINT_SCALE,
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['index'],
  }),
  numberFieldFactory({
    name: 'value',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: ['index'],
    min: 0,
    max: 1000,
    step: 0.5,
  }),
  numberFieldFactory({
    name: 'before',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 0,
    max: 10000,
    step: 0.5,
  }),
  numberFieldFactory({
    name: 'after',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 0,
    max: 10000,
    step: 0.5,
  }),
  numberFieldFactory({
    name: 'delta',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: -10000,
    max: 10000,
    step: 0.5,
  }),
  numberFieldFactory({
    name: 'condition',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: 0,
    max: 9999,
    step: 1,
  }),
  numberFieldFactory({
    name: 'adjustment',
    dictionary: dictionary.tabs.details.fields,
    width: 2,
    flags: [],
    min: -1000,
    max: 1000,
    step: 0.5,
  }),
  textareaFieldFactory({
    name: 'impact',
    dictionary: dictionary.tabs.details.fields,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 2,
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
