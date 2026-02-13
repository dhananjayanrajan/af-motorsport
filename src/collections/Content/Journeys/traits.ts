import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { textFieldFactory } from '@/fields/factories/fields/textField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { JOURNEY_LESSON_SIGNIFICANCE, JOURNEY_LESSON_IMPACT } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'lessons',
    type: 'array',
    label: dictionary.tabs.traits.fields.lessons.label,
    admin: {
      description: dictionary.tabs.traits.fields.lessons.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'lesson',
            dictionary: dictionary.tabs.traits.fields.lessons.fields,
            width: 3,
            flags: ['required'],
          }),
          selectFieldFactory({
            name: 'significance',
            options: JOURNEY_LESSON_SIGNIFICANCE,
            dictionary: dictionary.tabs.traits.fields.lessons.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
      {
        type: 'row',
        fields: [
          textFieldFactory({
            name: 'application',
            dictionary: dictionary.tabs.traits.fields.lessons.fields,
            width: 3,
            flags: [],
          }),
          selectFieldFactory({
            name: 'impact',
            options: JOURNEY_LESSON_IMPACT,
            dictionary: dictionary.tabs.traits.fields.lessons.fields,
            width: 3,
            flags: [],
          }),
        ],
      },
    ],
  },
  {
    type: 'row',
    fields: [
      relationshipFieldFactory({
        name: 'decisions',
        relationTo: 'decisions',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
      relationshipFieldFactory({
        name: 'impacts',
        relationTo: 'impacts',
        dictionary: dictionary.tabs.traits.fields,
        width: 2,
        flags: ['hasMany'],
      }),
    ],
  },
]
