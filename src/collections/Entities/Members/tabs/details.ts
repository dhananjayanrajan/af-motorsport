import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'

export const detailsFields: Field[] = [
  textareaFieldFactory({
    name: 'duties',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
  relationshipFieldFactory({
    name: 'skills',
    relationTo: 'skills',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
  relationshipFieldFactory({
    name: 'trainings',
    relationTo: 'trainings',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 50,
  }),
  groupFactory(
    {
      name: 'addresses',
      label: { en: 'Addresses', es: 'Direcciones', pt: 'Endereços' },
      entity: { en: 'Address', es: 'Dirección', pt: 'Endereço' },
      description: { en: 'Address information', es: 'Información de direcciones', pt: 'Informações de endereços' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textFieldFactory({ name: 'label', dictionary: undefined, width: 2, minLength: 1, maxLength: 50 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
      pointFieldFactory({ name: 'location', dictionary: undefined, width: 4 }),
    ],
    true
  ),
]
