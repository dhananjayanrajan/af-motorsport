import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { groupFactory } from '@/fields/factories/blueprint'
import { HELMET_USAGE, HELMET_BRANDING, HELMET_STYLE, HELMET_MATERIAL } from '../sources/constants'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'usage',
    options: HELMET_USAGE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  textFieldFactory({
    name: 'concept',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 100,
  }),
  textFieldFactory({
    name: 'designer',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 100,
  }),
  textareaFieldFactory({
    name: 'inspiration',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 500,
    rows: 2,
  }),
  textFieldFactory({
    name: 'color',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    minLength: 1,
    maxLength: 20,
    placeholder: '#HEXCODE',
  }),
  selectFieldFactory({
    name: 'branding',
    options: HELMET_BRANDING,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'style',
    options: HELMET_STYLE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  selectFieldFactory({
    name: 'material',
    options: HELMET_MATERIAL,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  dateFieldFactory({
    name: 'year',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'monthOnly',
    flags: [],
  }),
  groupFactory(
    {
      name: 'classifications',
      label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' },
      entity: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
      description: { en: 'Safety/Technical classifications', es: 'Clasificaciones de seguridad', pt: 'Classificações de segurança' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'criteria', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textareaFieldFactory({ name: 'definition', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
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
