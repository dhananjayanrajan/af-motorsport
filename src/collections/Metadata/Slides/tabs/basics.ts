import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { groupFactory } from '@/fields/factories/blueprint'

export const basicsFields: Field[] = [
  groupFactory(
    {
      name: 'identifiers',
      label: { en: 'Identifiers', es: 'Identificadores', pt: 'Identificadores' },
      entity: { en: 'Identifier', es: 'Identificador', pt: 'Identificador' },
      description: { en: 'Slide identification codes', es: 'Códigos de identificación', pt: 'Códigos de identificação' },
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
  textareaFieldFactory({
    name: 'description',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  richtextFieldFactory({
    name: 'story',
    dictionary: dictionary.tabs.basics,
    width: 1,
    flags: [],
  }),
]
