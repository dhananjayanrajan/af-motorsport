import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import type { Field } from 'payload'
import { CAR_STATUS, CAR_TECHNICAL_CATEGORIES } from '../sources/constants'
import { dictionary } from '../sources/dictionary'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'status',
    options: CAR_STATUS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
  }),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'manufacturers',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 10,
  }),
  relationshipFieldFactory({
    name: 'members',
    relationTo: 'members',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
  selectFieldFactory({
    name: 'technicalCategories',
    options: CAR_TECHNICAL_CATEGORIES,
    dictionary: dictionary.tabs.basics,
    width: 2,
    flags: ['index'],
  }),
  groupFactory(
    {
      name: 'classifications',
      label: { en: 'Classifications', es: 'Clasificaciones', pt: 'Classificações' },
      entity: { en: 'Classification', es: 'Clasificación', pt: 'Classificação' },
      description: { en: 'Technical classifications', es: 'Clasificaciones técnicas', pt: 'Classificações técnicas' },
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
      name: 'specifications',
      label: { en: 'Specifications', es: 'Especificaciones', pt: 'Especificações' },
      entity: { en: 'Specification', es: 'Especificación', pt: 'Especificação' },
      description: { en: 'Technical specifications', es: 'Especificaciones técnicas', pt: 'Especificações técnicas' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'parameter', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'value', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
]
