import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { dateFieldFactory } from '@/fields/factories/fields/dateField'
import { textareaFieldFactory } from '@/fields/factories/fields/textareaField'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { pointFieldFactory } from '@/fields/factories/fields/pointField'

export const traitsFields: Field[] = [
  groupFactory(
    {
      name: 'milestones',
      label: { en: 'Milestones', es: 'Hitos', pt: 'Marcos' },
      entity: { en: 'Milestone', es: 'Hito', pt: 'Marco' },
      description: { en: 'Timeline milestones', es: 'Hitos de la línea de tiempo', pt: 'Marcos da linha do tempo' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      dateFieldFactory({ name: 'date', dictionary: undefined, width: 2, pickerAppearance: 'dayOnly' }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      uploadFieldFactory({ name: 'icon', relationTo: 'media', dictionary: undefined, width: 1 }),
    ],
    true
  ),
  groupFactory(
    {
      name: 'events',
      label: { en: 'Events', es: 'Eventos', pt: 'Eventos' },
      entity: { en: 'Event', es: 'Evento', pt: 'Evento' },
      description: { en: 'Timeline events', es: 'Eventos de la línea de tiempo', pt: 'Eventos da linha do tempo' },
    },
    dictionary.host,
    [
      textFieldFactory({ name: 'name', dictionary: undefined, width: 2, minLength: 1, maxLength: 100 }),
      dateFieldFactory({ name: 'date', dictionary: undefined, width: 2, pickerAppearance: 'dayAndTime' }),
      textareaFieldFactory({ name: 'description', dictionary: undefined, width: 3, minLength: 1, maxLength: 500, rows: 2 }),
      pointFieldFactory({ name: 'location', dictionary: undefined, width: 1 }),
    ],
    true
  ),
]
