import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'

export const detailsFields: Field[] = [
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayOnly',
    flags: [],
  }),
  pointFieldFactory({
    name: 'locations',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  groupFactory(
    {
      name: 'expectations',
      label: { en: 'Expectations', es: 'Expectativas', pt: 'Expectativas' },
      entity: { en: 'Expectation', es: 'Expectativa', pt: 'Expectativa' },
      description: { en: 'Project expectations', es: 'Expectativas del proyecto', pt: 'Expectativas do projeto' },
    },
    dictionary.host,
    [
      textFieldFactory({
        name: 'name',
        dictionary: dictionary.tabs.details.expectations.name,
        width: 2,
        minLength: 1,
        maxLength: 100,
      }),
      selectFieldFactory({
        name: 'type',
        dictionary: dictionary.tabs.details.expectations.type,
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Optional', value: 'optional' },
        ],
        width: 2,
      }),
      textareaFieldFactory({
        name: 'criteria',
        dictionary: dictionary.tabs.details.expectations.criteria,
        width: 3,
        minLength: 1,
        maxLength: 500,
        rows: 2,
      }),
      textareaFieldFactory({
        name: 'statement',
        dictionary: dictionary.tabs.details.expectations.statement,
        width: 3,
        minLength: 1,
        maxLength: 500,
        rows: 2,
      }),
    ],
    true
  ),
]