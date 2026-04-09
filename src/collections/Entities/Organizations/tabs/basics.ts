import { groupFactory } from '@/fields/factories/blueprint'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import type { Field } from 'payload'
import { ORGANIZATION_INDUSTRY, ORGANIZATION_TYPE } from '../sources/constants'
import { dictionary } from '../sources/dictionary'

export const basicsFields: Field[] = [
  groupFactory(
    {
      name: 'identifiers',
      label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
      entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
      description: { en: 'Organization codes', es: 'Códigos de organización', pt: 'Códigos de organização' },
    },
    dictionary.host,
    [
      textFieldFactory({
        name: 'code',
        dictionary: undefined,
        width: 2,
        flags: ['index'],
        minLength: 1,
        maxLength: 50,
      }),
    ],
    false
  ),
  textFieldFactory({
    name: 'tagline',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 200,
  }),
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
    name: 'type',
    options: ORGANIZATION_TYPE,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  selectFieldFactory({
    name: 'industry',
    options: ORGANIZATION_INDUSTRY,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
]
