import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { SUIT_USAGE, SUIT_DURABILITY, SUIT_MATERIAL, SUIT_APPEARANCE } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'usage',
    options: SUIT_USAGE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'durability',
    options: SUIT_DURABILITY,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'material',
    options: SUIT_MATERIAL,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'appearance',
    options: SUIT_APPEARANCE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  groupFactory(
    {
      name: 'manufacturers',
      label: { en: 'Manufacturers', es: 'Fabricantes', pt: 'Fabricantes' },
      entity: { en: 'Manufacturer', es: 'Fabricante', pt: 'Fabricante' },
      description: { en: 'Component manufacturers', es: 'Fabricantes de componentes', pt: 'Fabricantes de componentes' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
]
