import type { Field } from 'payload'
import { dictionary } from './dictionary'
import { relationshipFieldFactory } from '@/fields/factories/fields/relationshipField'
import { selectFieldFactory } from '@/fields/factories/fields/selectField'
import { EXPERIENCE_SKILL_PROFICIENCY } from './constants'

export const traitsFields: Field[] = [
  {
    name: 'skills',
    type: 'array',
    label: dictionary.tabs.traits.fields.skills.label,
    admin: {
      description: dictionary.tabs.traits.fields.skills.description,
    },
    fields: [
      {
        type: 'row',
        fields: [
          relationshipFieldFactory({
            name: 'skill',
            relationTo: 'skills',
            dictionary: dictionary.tabs.traits.fields.skills.fields,
            width: 2,
            flags: ['required'],
          }),
          selectFieldFactory({
            name: 'proficiency',
            options: EXPERIENCE_SKILL_PROFICIENCY,
            dictionary: dictionary.tabs.traits.fields.skills.fields,
            width: 2,
            flags: [],
          }),
        ],
      },
    ],
  },
]
