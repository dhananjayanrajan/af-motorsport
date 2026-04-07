import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { radioFieldFactory } from '@/fields/factories/fields/radioField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { groupFactory } from '@/fields/factories/blueprint'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { MEETUP_FORMAT, MEETUP_ACCESS } from '../sources/constants'

export const detailsFields: Field[] = [
  radioFieldFactory({
    name: 'format',
    options: MEETUP_FORMAT,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: ['index'],
    layout: 'horizontal',
  }),
  radioFieldFactory({
    name: 'access',
    options: MEETUP_ACCESS,
    dictionary: dictionary.tabs.details,
    width: 2,
    flags: [],
    layout: 'horizontal',
  }),
  dateFieldFactory({
    name: 'start_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: ['required', 'index'],
  }),
  dateFieldFactory({
    name: 'end_date',
    dictionary: dictionary.tabs.details,
    width: 2,
    pickerAppearance: 'dayAndTime',
    flags: [],
  }),
  pointFieldFactory({
    name: 'locations',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
  }),
  textareaFieldFactory({
    name: 'notes',
    dictionary: dictionary.tabs.details,
    width: 1,
    flags: [],
    minLength: 1,
    maxLength: 1000,
    rows: 3,
  }),
  groupFactory(
    {
      name: 'hosts',
      label: { en: 'Hosts', es: 'Anfitriones', pt: 'Anfitriões' },
      entity: { en: 'Host', es: 'Anfitrión', pt: 'Anfitrião' },
      description: { en: 'Organizing entities', es: 'Entidades organizadoras', pt: 'Entidades organizadoras' },
    },
    dictionary.host,
    [
      relationshipFieldFactory({
        name: 'organizations',
        relationTo: 'organizations',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 10,
      }),
      relationshipFieldFactory({
        name: 'leaders',
        relationTo: 'leaders',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 10,
      }),
      relationshipFieldFactory({
        name: 'individuals',
        relationTo: 'individuals',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 10,
      }),
    ],
    false
  ),
  groupFactory(
    {
      name: 'attendees',
      label: { en: 'Attendees', es: 'Asistentes', pt: 'Participantes' },
      entity: { en: 'Attendee', es: 'Asistente', pt: 'Participante' },
      description: { en: 'Expected participants', es: 'Participantes esperados', pt: 'Participantes esperados' },
    },
    dictionary.host,
    [
      relationshipFieldFactory({
        name: 'drivers',
        relationTo: 'drivers',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 50,
      }),
      relationshipFieldFactory({
        name: 'members',
        relationTo: 'members',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 50,
      }),
      relationshipFieldFactory({
        name: 'leaders',
        relationTo: 'leaders',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 50,
      }),
      relationshipFieldFactory({
        name: 'individuals',
        relationTo: 'individuals',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 50,
      }),
      relationshipFieldFactory({
        name: 'organizations',
        relationTo: 'organizations',
        dictionary: undefined,
        width: 1,
        flags: ['hasMany'],
        hasMany: true,
        maxRows: 20,
      }),
    ],
    false
  ),
]
