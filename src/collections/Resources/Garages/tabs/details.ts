import { groupFactory } from '@/fields/factories/blueprint'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { numberFieldFactory } from '@/fields/factories/fields/numberField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { richtextFieldFactory } from '@/fields/factories/fields/richtextField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import type { Field } from 'payload'
import { GARAGE_ACCESSIBILITY, GARAGE_TYPE } from '../sources/constants'
import { dictionary } from '../sources/dictionary'

export const detailsFields: Field[] = [
  selectFieldFactory({
    name: 'type',
    options: GARAGE_TYPE,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  numberFieldFactory({
    name: 'capacity',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 1000,
    step: 1,
  }),
  numberFieldFactory({
    name: 'size_sq_m',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    min: 1,
    max: 100000,
    step: 1,
  }),
  selectFieldFactory({
    name: 'accessibility',
    options: GARAGE_ACCESSIBILITY,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
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
    name: 'location',
    dictionary: dictionary.tabs.details,
    flags: [],
    minLongitude: -180,
    maxLongitude: 180,
    minLatitude: -90,
    maxLatitude: 90,
  }),
  relationshipFieldFactory({
    name: 'ownership',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
  }),
  relationshipFieldFactory({
    name: 'operators',
    relationTo: 'organizations',
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['hasMany'],
    hasMany: true,
    maxRows: 10,
  }),
  groupFactory(
    {
      name: 'amenities',
      label: { en: 'Amenities', es: 'Comodidades', pt: 'Comodidades' },
      entity: { en: 'Amenity', es: 'Comodidad', pt: 'Comodidade' },
      description: { en: 'Facility amenities', es: 'Comodidades de la instalación', pt: 'Comodidades da instalação' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 4, minLength: 1, maxLength: 500, rows: 2 }),
    ],
    true
  ),
  richtextFieldFactory({
    name: 'history',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    flags: [],
    minLength: 1,
    maxLength: 2000,
    rows: 4,
  }),
]
