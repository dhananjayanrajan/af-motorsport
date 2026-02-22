// FILE: src/collections/Operations/Trainings/tabs/traits.ts
import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { advanced } from '@/fields/factories/toggles/advanced'
import { TRAINING_INTENSITY, TRAINING_FORMAT } from '../sources/constants'

export const traitsFields: Field[] = [
  advanced(
    {
      type: 'row',
      fields: [
        selectFieldFactory({
          name: 'intensity',
          options: TRAINING_INTENSITY,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
        selectFieldFactory({
          name: 'format',
          options: TRAINING_FORMAT,
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['advanced'],
        }),
        relationshipFieldFactory({
          name: 'specifications',
          relationTo: 'specifications',
          dictionary: dictionary.tabs.traits.fields,
          width: 3,
          flags: ['hasMany', 'advanced'],
        }),
      ],
    }
  ),
]
