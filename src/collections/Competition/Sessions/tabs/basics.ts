import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'

export const basicsFields: Field[] = [
  groupFactory(
    {
      name: 'identifiers',
      label: dictionary.tabs.basics.fields.identifiers.label,
      entity: dictionary.tabs.basics.fields.identifiers.entity,
      description: dictionary.tabs.basics.fields.identifiers.description,
    },
    dictionary.host,
    [
      textFieldFactory({
        name: 'code',
        dictionary: dictionary.tabs.basics.fields.identifiers.fields,
        width: 2,
        flags: ['index'],
        minLength: 1,
        maxLength: 50,
      }),
    ],
    false
  ),
  textFieldFactory({
    name: 'segment',
    dictionary: dictionary.tabs.basics.fields,
    width: 1,
    flags: ['index'],
    minLength: 1,
    maxLength: 100,
  }),
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
